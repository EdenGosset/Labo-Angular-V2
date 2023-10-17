import {Component, OnInit} from '@angular/core';
import {AuthenticationService} from "../../services/authentication.service";

import {Login} from "../../shared/models/login";
import {Token} from "../../shared/models/token";
import {UserRole} from "../../shared/enums/userRole";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginData: Login = {};
  token: Token | undefined;

  constructor(private authService: AuthenticationService) {
  }

  ngOnInit() {
    this.authService.authToken$.subscribe(data => this.token = data)
  }

  onLogin(): void {
    this.authService.login(this.loginData).subscribe(
      {
        next: (token: Token) => {
          if (token !== undefined) {
            console.log('Login successful. Token:', token.token);
            window.location.reload();
          } else {
            console.error('Authentication token is undefined.');
          }
        },
        error: (error) => {
          // Gérer les erreurs de connexion ici
          console.error('Login failed. Error:', error);
        }
      }
    );
  }

  logout(): void {
    this.authService.logout()
  }


}
