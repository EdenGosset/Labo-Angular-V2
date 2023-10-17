import { CanActivateFn } from '@angular/router';
import {AuthenticationService} from "../services/authentication.service";
import {inject} from "@angular/core";

export const roleGuardGuard: CanActivateFn = (route, state) => {

  const authService: AuthenticationService = inject(AuthenticationService)

  return authService.user?.role == "Admin";
};
