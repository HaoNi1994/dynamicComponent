import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './routes/project/project.module#ProjectModule'},
  { path: 'project', loadChildren: './routes/project/project.module#ProjectModule'},
  { path: 'task', loadChildren: './routes/task/task.module#TaskModule'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }