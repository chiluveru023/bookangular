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
   
  private apiURL = "http://localhost:8181/api/books"
  private apiPublishers ="http://localhost:8181/api/publisher"
  private apiGenre ="http://localhost:8181/api/genre"
  constructor(private httpClient:HttpClient) { }
  getBookList():Observable<Book[]>{
    return this.httpClient.get<Book[]>(`${this.apiURL}`);
  }
  saveBook(genereId: any, publisherId: any,book:Book):Observable<Object>{
    return this.httpClient.post(`${this.apiURL}`+"/" + genereId + "/" + publisherId, book);
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

  updateBook(genereId: any, publisherId: any,book_id:number,book:Book):Observable<Object>{
    const url = this.apiURL +'/'+ genereId + '/' + publisherId + '/'+ book_id;
    return this.httpClient.put(url, book);
  }
  deleteBook(book_id:number):Observable<Object>{
    return this.httpClient.delete(`${this.apiURL}/${book_id}`);
  }

  // 
}
