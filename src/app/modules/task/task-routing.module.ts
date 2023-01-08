import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TaskDetailsComponent } from "./task-details/task-details.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: "detail",
    pathMatch: 'full'
  },
  {
    path: 'detail',
    component: TaskDetailsComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
