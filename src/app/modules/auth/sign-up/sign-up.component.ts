import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { UntypedFormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from "../../../shared/models/user";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-sign-up",
  templateUrl: "./sign-up.component.html",
  styleUrls: ["./sign-up.component.scss"]
})
export class SignUpComponent implements OnInit {
  user: any;
  @Output() userProfile: EventEmitter<any> = new EventEmitter();
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
        this.userProfile.emit(this.user);
      })
    }else {
      this.user = new User({});
      this.form = User.getForm(this.user);
    }
  }

  signUp() {
    if (this.form.value["password"] !== this.form.value["confirm_password"]) {
      alert("password not equal to confirmPassword");
    } else {
      if (this.form.valid) {
        this.authService.signUp(this.form.value).subscribe(response => {
          console.log(response);
          // this.user = new User(response);
          this.userId = response.id;
          this.router.navigate(["/auth/login"]);
          alert("Register successfully!");
        });
        this.form.reset();
      }
    }
  }
}
