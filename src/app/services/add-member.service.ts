import { Injectable } from '@angular/core';
import {catchError, map, Observable, of} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {User, UserRegister} from "../shared/models/user";

@Injectable({
  providedIn: 'root'
})
export class AddMemberService {

  private readonly BASE_URL: string ="https://khun.somee.com/api/Member"
  constructor(private _httpclient: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this._httpclient.get<User[]>(this.BASE_URL)
  }

  addUser(user: UserRegister){
    return this._httpclient.post(this.BASE_URL, user);
  }

  checkEmailExists(email: string): Observable<boolean> {
    return this._httpclient.head<void>(`${this.BASE_URL}/existsEmail?Email=${email}`).pipe(
      map(() => true), // permet une transformation, attribut une valeur
      catchError(() => of(false))
    );
  }

  checkUsernameExists(username: string): Observable<boolean> {
    return this._httpclient.head<void>(`${this.BASE_URL}/existsUsername?Username=${username}`).pipe(
      map(() => true),
      catchError(() => of(false))
    );
  }
}
