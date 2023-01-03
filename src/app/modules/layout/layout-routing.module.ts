import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserProfileComponent } from "./user-profile/user-profile.component";

const routes: Routes = [
  {
    path: "",
    redirectTo: "/dashboard/user",
    pathMatch: "full"
  },
  {
    path: "user",
    component: UserProfileComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule { }
