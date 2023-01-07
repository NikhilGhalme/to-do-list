import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import * as Notiflix from "notiflix";
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  user: any;
  userId: number;
  form: UntypedFormGroup;

  constructor(private authService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.user().subscribe(response => {
        this.user = response;
        this.user = new User(this.user);
        this.userId = this.user?.id;
        this.form = User.getForm(this.user);
      })
    }else {
      this.user = new User({});
      this.form = User.getForm(this.user);
    }
  }
  signUp() {
    if (this.form.value["password"] !== this.form.value["confirm_password"]) {
      Notiflix.Notify.warning("Password does not match.",{position: "center-top",fontSize: "20px"});
    } else {
      if (this.form.valid) {
        const service = this.userId ? this.authService.updateUser(this.form.value) : this.authService.signUp(this.form.value);
        service.subscribe(response => {
            if(this.userId){
              this.user = new User(response);
              alert("User updated successfully");
            }  else {
              this.user = new User(response);
              this.userId = this.user?.id;
              Notiflix.Report.success("Register Successfully!","", "Log in",()=> {
                this.router.navigate(['auth/login']);
              });
              this.form.reset();
            }
        });
      }
    }
  }
}
