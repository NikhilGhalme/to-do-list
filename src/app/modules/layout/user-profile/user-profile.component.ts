import { Component, Injector, Input, OnInit } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { BaseComponent } from "../../../shared/base-component.component";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent extends BaseComponent implements OnInit {
  form: UntypedFormGroup;
 user: any;
  userId: number;
  userDetail:any;
  constructor(injector:Injector, private authService:AuthService ) {
    super(injector);
  }

  ngOnInit(): void {
    if(this.token){
      this.authService.user().subscribe(res =>{
        this.user = res;
      })
    }
  }

}
