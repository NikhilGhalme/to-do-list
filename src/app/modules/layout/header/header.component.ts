import { Component, OnInit } from "@angular/core";
import { User } from "../../../shared/interfaces/user";
import { AuthService } from "../../../shared/services/auth/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {

  user: any;
  constructor(private authService: AuthService) {
    this.authService.user().subscribe(response => {
      this.user = response;
    });
  }

  ngOnInit(): void {
  }

}
