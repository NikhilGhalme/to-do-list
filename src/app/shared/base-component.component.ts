import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import * as Notiflix from "notiflix";

export abstract class BaseComponent {
   token: string | null;
   notify:any;
   router:Router;
    isMobileDevice = window.innerWidth < 720;
  protected constructor(injector: Injector) {
      this.router = injector.get(Router);
  this.token = localStorage.getItem('token');
  this.notify = Notiflix;
  }


}
