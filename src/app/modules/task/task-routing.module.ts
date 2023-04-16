import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TaskDetailsComponent } from "./task-details/task-details.component";
import { TaskComponent } from "./task.component";

const routes: Routes = [
	{
		path: "",
		component: TaskComponent,
		children: [
			{
				path: "details",
				component: TaskDetailsComponent,
				title: "Workspace Details"
			}
		]
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule]
})
export class TaskRoutingModule {
}
