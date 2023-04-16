import { Component, Injector, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { BaseComponent } from "../../../shared/base-component.component";
import { AuthService } from "../../../shared/services/auth/auth.service";
import { User } from "src/app/shared/models/user";

@Component({
  selector: "app-log-in",
  templateUrl: "./log-in.component.html",
  styleUrls: ["./log-in.component.scss"]
})
export class LogInComponent extends BaseComponent implements OnInit {

  user: User;
  constructor(injector: Injector, private loginService: AuthService) {
      super(injector);
  }

  ngOnInit(): void {
  }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("", [Validators.required])
  });

  logIn() {
    if(this.loginForm.valid){
        this.loginService.login(this.loginForm.value).subscribe(response => {
          localStorage.setItem("token", response.token);
          this.notify.Report.success("Login successfully!",'good to go', 'Profile' ,()=>{
            this.router.navigate(['dashboard/user']);
            console.log(response);
          });
        })
    }
  }
}
