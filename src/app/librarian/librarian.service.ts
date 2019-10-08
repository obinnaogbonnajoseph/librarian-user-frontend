import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environment/environment';


@Injectable({
  providedIn: 'root'
})
export class LibrarianService {

  private queryUrl = `${environment.queryResultBaseUrl}`;

  constructor(private httpClient: HttpClient) { }

  public fetchBooks(limit: number, offset: number) {
    const params: any = { _start: offset.toString(), _limit: limit.toString() };
    return this.httpClient.get<any>(this.queryUrl, {
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
