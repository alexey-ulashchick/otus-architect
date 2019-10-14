import { RxJSHttpClient } from 'rxjs-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import moment from 'moment';

export interface RestError {
  message: string;
  error: string;
}

let instance: AuthService | null = null;

export class AuthService {
  private httpClient: RxJSHttpClient;

  private constructor() {
    this.httpClient = new RxJSHttpClient();
    instance = this;
  }

  private getToken(): string | null {
    return window.localStorage.getItem('TOKEN');
  }

  private setToken(token: string): void {
    window.localStorage.setItem('TOKEN', token);
  }

  private setEmail(email: string): void {
    window.localStorage.setItem('EMAIL', email);
  }

  public getEmail(): string | null {
    return window.localStorage.getItem('EMAIL');
  }

  public login(email: string, password: string): Observable<void> {
    return this.httpClient.post('http://localhost:8083/sign-in', { body: { email, password } }).pipe(
      map((res: { token: string } & RestError) => {
        if (res.error) {
          throw new Error(res.message);
        }

        this.setToken(res.token);
        this.setEmail(email);
      })
    );
  }

  public signUp(email: string, password: string): Observable<void> {
    return this.httpClient.post('http://localhost:8083/sign-up', { body: { email, password } }).pipe(
      map((res: { email: string } & RestError) => {
        if (res.error) {
          throw new Error(res.message);
        }
      })
    );
  }

  public isAuthorized(): boolean {
    if (!this.getToken()) {
      return false;
    }

    try {
      const { exp }: { exp: number } = JSON.parse(atob(this.getToken()!.split('.')[1]));
      return moment(exp * 1000).isAfter(moment());
    } catch (e) {
      return false;
    }
  }

  public getAuthHeaders(): { ['Authorization']: string } {
    return { Authorization: `Bearer ${this.getToken()}` };
  }

  public logout(): void {
    window.localStorage.removeItem('TOKEN');
  }

  static getInstance(): AuthService {
    return instance || new AuthService();
  }
}
