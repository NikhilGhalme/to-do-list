import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'to-do-list';
  isLogIn = false;

  constructor(){
    const token = localStorage.getItem("token");
    if(token){
      this.isLogIn = true;
    }
  }
}
