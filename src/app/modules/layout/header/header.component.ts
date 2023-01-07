import { Component, Injector, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import * as Notiflix from "notiflix";
import { BaseComponent } from "../../../shared/base-component.component";
import { User } from "../../../shared/interfaces/user";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent extends BaseComponent implements OnInit {

  user: any;
  constructor(private injector:Injector,private authService: AuthService,private router:Router) {
    super(injector);
    if(this.token) {
      this.authService.user().subscribe(response => {
        this.user = response;
      });
    }
  }

  ngOnInit(): void {
  }
  logOut(){
    Notiflix.Report.failure("Log Out!","Are you sure you want to log out", "Log out",()=> {
     localStorage.removeItem('token');
     this.router.navigate(['auth/login']);
    }, {backOverlayClickToClose:true});

  }

}
