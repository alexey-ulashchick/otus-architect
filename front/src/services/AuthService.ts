import {RxJSHttpClient} from 'rxjs-http-client';
import { Observable } from 'rxjs';

export class AuthService {

  private httpClient: RxJSHttpClient;

  constructor() {
    this.httpClient = new RxJSHttpClient();
  }

  public login(email: string, password: string): Observable<{token:string}> {
    return this.httpClient.post('http://localhost:8083/sign-in', {body: {email, password}});
  }

}