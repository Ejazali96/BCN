import { Component } from '@angular/core';
import { PaginationConfig } from 'src/core/models/pagination-config.model';
import { VehicleService } from 'src/core/services/vehicle.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent {
  paginationConfig: PaginationConfig = new PaginationConfig()
  cols!: any[];
  totalRecords: number = 0;
  data: any[] = [];

  constructor(
    private service: VehicleService,
    ) {

  }

  ngOnInit(): void {
  }

  LoadGridList(event: any = null) {
    this.paginationConfig.size = event ? event.rows : this.paginationConfig.size
    this.paginationConfig.page = event ? event.first / this.paginationConfig.size + 1 : this.paginationConfig.page

    setTimeout(() => {
      this.service.GetAll(this.paginationConfig)?.subscribe((response: any) => {
        this.data = response.payload;
        this.totalRecords = response.count;
        // this.data.forEach((element) => {
        //   element.pickup = element.locations.find((x: any) => x.type == 'Pickup')?.address
        //   element.dropOff = element.locations.find((x: any) => x.type == 'DropOff')?.address
        // })
        console.log(this.data)
      });
      this.cols = [
        { field: "name", header: "Name" },
        { field: "seats", header: "Seats" },
        { field: "bags", header: "Bags" },
      ];
    }, 200);
  }

  Edit(id: string) {
    // this.router.navigate(['/admin/business/save'], { queryParams: { id: id } })
  }

  Delete(id: string) {
    // this.confirmation.confirm({
    //   message: 'Do you want to delete this user?',
    //   header: 'Delete Confirmation',
    //   accept: () => {
    //     this.service.Delete(id).subscribe((res: any) => {
    //       if (res.isSuccess) {
    //         this.toastr.success('User Deleted')
    //         this.LoadGridList()
    //       }
    //     })
    //   },
    //   reject: () => {
    //   }
    // });
  }

  Filter() {
    this.paginationConfig.page = 1
    this.paginationConfig.size = 10
    this.LoadGridList()
  }
}
