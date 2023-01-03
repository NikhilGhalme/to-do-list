import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup } from "@angular/forms";
import { User } from 'src/app/shared/models/user';
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  form: UntypedFormGroup;
  user: User;
  constructor(private authService: AuthService) {
    this.authService.user().subscribe(response => {
      console.log(response);
    })
  }

  ngOnInit(): void {
    this.user = new User({});
    this.form = User.getForm(this.user);

  }
  updateProfile(){
    if(this.form.valid){
      this.authService.updateUser(this.form.value).subscribe(response => {
        console.log(response);
      })
    }
  }

}
