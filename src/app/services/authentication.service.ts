import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable, tap} from "rxjs";
import {Token} from "../shared/models/token";
import {Login} from "../shared/models/login";
import {User} from "../shared/models/user";



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService implements OnInit{

  private apiUrl = 'https://khun.somee.com/api';
  private authTokenSubject: BehaviorSubject<Token | undefined> = new BehaviorSubject<Token | undefined>(undefined);
  private _userToken?: Token
  constructor(private http: HttpClient) {
    const storedToken = sessionStorage.getItem('token');
    if(storedToken) {
      const token: Token = JSON.parse(storedToken);
      this.authTokenSubject.next(token);
      this._userToken = token;
    }
  }

  ngOnInit() {

  }

  login(login: Login): Observable<Token> {
    return this.http.post<Token>(`${this.apiUrl}/login`, login).pipe(
      tap((token: Token) =>{
        this.authTokenSubject.next(token);
        this._userToken = token;
        sessionStorage.setItem('token', JSON.stringify(token));
        console.log(this._userToken);
      } )
    );
  }

  get user(): User | undefined {
    return this._userToken?.user
  }

  get token(): string | undefined {
    return this._userToken?.token
  }
  getToken(): Token | undefined {
    return this.authTokenSubject.getValue();
  }

  logout(): void {
    this.authTokenSubject.next(undefined);
    // Supprimer le token du stockage local
    sessionStorage.removeItem('token');
    this._userToken = undefined;
  }

  get authToken$(): Observable<Token | undefined> {
    return this.authTokenSubject.asObservable();
  }

  get isConnected$() {
    return this.authTokenSubject.asObservable().pipe(
      map( data => data !== undefined )
    )
  }
}
