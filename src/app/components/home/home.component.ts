import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";
import {Token} from "../../shared/models/token";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  token: Token | undefined;
  constructor(private authService: AuthenticationService) {

  }

  ngOnInit() {
    this.authService.authToken$.subscribe(data => this.token = data)
  }

}
