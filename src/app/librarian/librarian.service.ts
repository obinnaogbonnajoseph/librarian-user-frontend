import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  private queryUrl = `${environment.baseApi}/librarian`;

  constructor(private httpClient: HttpClient) { }

  public fetchBooks(limit: number, offset: number, filter?: any) {
    const params: any = { page: offset, limit };
    if (filter) {
      Object.keys(filter).forEach(it => {
        if (!filter[it]) {
          return;
        }
        params[it] = filter[it];
      });
    }
    return this.httpClient.get<any[]>(this.queryUrl, {
      params
    });
  }

  public fetchBook(id: number) {
    return this.httpClient.get<any>(this.queryUrl + `/${id}`, {});
  }

  public updateBook(id: number, data: any) {
    return this.httpClient.put<any>(this.queryUrl + `/${id}`, data);
  }

  public addBook(data: any) {
    return this.httpClient.post<any>(this.queryUrl, data);
  }

  public deleteBook(id: number) {
    return this.httpClient.delete<any>(this.queryUrl + `/${id}`);
  }
}
