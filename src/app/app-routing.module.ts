import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
    title: "To Do List Authentication",
  },
  {
    path: "dashboard",
    loadChildren: () => import("./modules/layout/layout.module").then(m => m.LayoutModule),
    title: "To Do List Authentication",
  },
  {
    path: "",
    redirectTo: "/auth/login",
    pathMatch: "full",
  },
  { path: "**", redirectTo: "/errors/404" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
