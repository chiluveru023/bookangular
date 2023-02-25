import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Book } from './book';
import { Publisher } from './publisher'
import { Genre } from './genre'
@Injectable({
  providedIn: 'root'
})
export class BookService {
   
  private apiURL = "http://localhost:8585/api/books"
  private apiPublishers ="http://localhost:8585/api/publishers"
  private apiGenre ="http://localhost:8585/api/genres"
  constructor(private httpClient:HttpClient) { }
  getBookList():Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.apiURL}`);
  }
  saveBook(book:Book):Observable<Object>{
    return this.httpClient.post(`${this.apiURL}`, book);
  }

  getPublishers():Observable<Publisher[]>{
    return this.httpClient.get<Publisher[]>(`${this.apiPublishers}`);
  }

  getGenre():Observable<Genre[]>{
    return this.httpClient.get<Genre[]>(`${this.apiGenre}`);
  }
  getBookById(book_id:number):Observable<Book>{
    return this.httpClient.get<Book>(`${this.apiURL}/${book_id}`);
  }

  updateBook(book_id:number,book:Book):Observable<Object>{
    return this.httpClient.put(`${this.apiURL}/${book_id}`,book);
  }
  deleteBook(book_id:number):Observable<Object>{
    return this.httpClient.delete(`${this.apiURL}/${book_id}`);
  }

  clearCache() {
    this.httpClient.get('/api/clear-cache').subscribe(response => {
      console.log('Cache cleared successfully');
    }, error => {
      console.error('Error clearing cache', error);
    });
  }
}
