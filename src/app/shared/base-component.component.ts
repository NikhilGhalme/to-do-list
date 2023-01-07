import { Injector } from "@angular/core";

export abstract class BaseComponent {
   token: string | null;
  protected constructor(injector: Injector) {
  this.token = localStorage.getItem('token');
  }

}
