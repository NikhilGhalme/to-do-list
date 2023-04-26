import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./shared/guards/auth.guard";
import { GuestGuard } from "./shared/guards/guest.guard";

const routes: Routes = [
	{
		path: "auth",
		loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
		title: "To Do List Authentication",
		canActivate: [GuestGuard],
	},
	{
		path: "dashboard",
		loadChildren: () => import("./modules/layout/layout.module").then(m => m.LayoutModule),
		canActivate: [AuthGuard],
		title: "ToDoList | Profile",
	},
	{
		path: "task",
		loadChildren: () => import("./modules/task/task.module").then(m => m.TaskModule),
		canActivate: [AuthGuard],
		title: "ToDoList | Workspace Management",
	},
	{
		path: " ",
		redirectTo: "/auth/login",
		pathMatch: "full",
	},
	{path: "**", redirectTo: "/auth/login",},
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {

}
