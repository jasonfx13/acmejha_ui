import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {path: '', loadChildren: () => import('./page/home/home.module').then(m => m.HomeModule)},
  {path: 'job/:jobId', loadChildren: () => import('./page/job-page/job-page.module').then(m => m.JobPageModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
