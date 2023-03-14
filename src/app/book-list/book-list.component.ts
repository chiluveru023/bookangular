import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book'
import { BookService } from '../book.service';
import { Genre } from '../genre';
@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit {
  books:Book[] = [];
 
constructor( private bookService:BookService, private router:Router){}
ngOnInit(): void {
  
this.getBooks();
}
private getBooks(){
  this.bookService.getBookList().subscribe(data => {
    this.books = data;
    console.log(this.books);
  });
}
goToAddBook() {
  this.router.navigate(['save-book']);
}
bookDetails(book_id:number){
  this.router.navigate(['book-details',book_id]);
}
updateBook(book_id:number){
this.router.navigate(['update-book',book_id]);
}

deleteBook(book_id:number){
  if(confirm("Are you sure you want to delete this book?")){
  this.bookService.deleteBook(book_id).subscribe(data =>{
    console.log(data);
    this.getBooks();
  })
}
}
}
