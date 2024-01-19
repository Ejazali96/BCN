import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminAuthGuard } from 'src/core/guards/admin-auth.guard';
import { PublicModule } from './public/public.module';
import { LayoutComponent } from './public/layout/layout.component';

const routes: Routes = [
  { path: '', loadChildren: () => PublicModule, component: LayoutComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
