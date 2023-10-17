import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable, switchMap, take} from 'rxjs';
import {AuthenticationService} from "../services/authentication.service";
import {Token} from "../shared/models/token";




@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthenticationService) {}


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const authToken : string | undefined = this.authService.token;
    console.log(authToken + "_________1")
    if (authToken) {

      console.log(authToken + "_________2")

      // Clonez la requête et ajoutez l'en-tête d'autorisation avec le token
      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${authToken}`
        }
      });
      // Passez la nouvelle requête modifiée au gestionnaire HTTP
      return next.handle(authReq);
    }
    // Si le token n'est pas disponible, laissez la requête inchangée
    return next.handle(request);
  }

}
