import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';

@Injectable({
  providedIn: 'root'
})
export class BookUserService {

  private userUrl = `${environment.baseApi}/auth`;

  constructor(private httpClient: HttpClient) { }

  public searchUsers(filter: any, limit: number, offset: number) {
    const params: any = {
      page: offset,
      limit
    };
    Object.keys(filter).forEach(it => {
      if (!filter[it]) {
        return;
      }
      params[it] = filter[it];
    });
    return this.httpClient.get<any[]>(this.userUrl, {
      params
    });
  }
}
