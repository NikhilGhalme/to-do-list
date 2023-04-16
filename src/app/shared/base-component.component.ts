import { Injector } from "@angular/core";
import { Router } from "@angular/router";
import * as Notiflix from "notiflix";

export abstract class BaseComponent {
   token: string | null;
   notify:any;
   router:Router;
  protected constructor(injector: Injector) {
  this.token = localStorage.getItem('token');
  this.notify = Notiflix;
  }

}
