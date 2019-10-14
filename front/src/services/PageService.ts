import { RxJSHttpClient } from 'rxjs-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../models/Page';
import { AuthService, RestError } from './AuthService';

const authService = AuthService.getInstance();
const HOST = 'http://localhost:8083';

export class PageService {
  private httpClient: RxJSHttpClient;

  constructor() {
    this.httpClient = new RxJSHttpClient();
  }

  getPages$(): Observable<Page[]> {
    return this.httpClient.get(`${HOST}/pages`, { headers: authService.getAuthHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.message);
        }

        return (res as any[]).map(el => new Page(el.email, el.firstName, el.lastName, el.city, el.gender, el.age, el.areasOfInterest));
      })
    );
  }

  getPage$(email: string): Observable<Page> {
    return this.httpClient.get(`${HOST}/pages/${email}/`, { headers: authService.getAuthHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.message);
        }

        return new Page(res.email, res.firstName, res.lastName, res.city, res.gender, res.age, res.areasOfInterest);
      })
    );
  }

  getAreasOfInterest$(): Observable<string[]> {
    return this.httpClient.get(`${HOST}/areas-of-interest/`, { headers: authService.getAuthHeaders() });
  }

  updatePage$(page: Page): Observable<void> {
    return this.httpClient.post(`${HOST}/pages`, { headers: { ...authService.getAuthHeaders(), ['Content-Type']: 'application/json' }, body: {...page} }).pipe(
      map((res: { token: string } & RestError) => {
        if (res.error) {
          throw new Error(res.message);
        }
      })
    );
  }
}
