import { RxJSHttpClient } from 'rxjs-http-client';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Page } from '../models/Page';
import { AuthService } from './AuthService';

const authService = AuthService.getInstance();

export class PageService {
  private httpClient: RxJSHttpClient;

  constructor() {
    this.httpClient = new RxJSHttpClient();
  }

  getPages$(): Observable<Page[]> {
    return this.httpClient.get('http://localhost:8083/pages', { headers: authService.getAuthHeaders() }).pipe(
      map((res: any) => {
        if (res.error) {
          throw new Error(res.message);
        }

        return (res as any[]).map(el => new Page(el.email, el.firstName, el.lastName, el.city, el.gender, el.age, el.areasOfInterest));
      })
    );
  }
}
