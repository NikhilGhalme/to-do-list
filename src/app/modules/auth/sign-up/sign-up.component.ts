import { Component, OnInit } from "@angular/core";
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
  user: User;
  userId: number;
  form: UntypedFormGroup;

  constructor(private signUpService: AuthService, private router: Router) {

  }

  ngOnInit(): void {
    this.user = new User({});
    this.form = User.getForm(this.user);
  }

  signUp() {
    console.log(this.form.value);
    if (this.form.value["password"] !== this.form.value["confirm_password"]) {
      alert("password not equal to confirmPassword");
    } else {
      if (this.form.valid) {
        this.signUpService.signUp(this.form.value).subscribe(response => {
          console.log(response);
          // this.user = new User(response);
          this.userId = response.id;
          this.router.navigate(['/auth/login']);
          alert("Register successfully!");
        });
        this.form.reset();
      }
    }
  }
}
