import { Component, Input, OnInit } from "@angular/core";
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
  @Input() user: any;
  userId: number;
  constructor(private authService: AuthService) {
  }

  ngOnInit(): void {

  }

}
