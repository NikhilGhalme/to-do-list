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
  @Input() user: any;
  userId: number;
  constructor(injector:Injector, ) {
    super(injector);
  }

  ngOnInit(): void {

  }

}
