import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Genre } from '../genre';
import { Publisher } from '../publisher';

@Component({
  selector: 'app-save-book',
  templateUrl: './save-book.component.html',
  styleUrls: ['./save-book.component.css']
})
export class SaveBookComponent implements OnInit {

  book:Book = new Book();
  genres: Genre[] = [];
  publishers :Publisher[] = [];
  constructor(private bookService:BookService, private router:Router){}
 
  ngOnInit(): void {
    this.getGenre();
    this.getPublishers();
  }
  getGenre() {
    this.bookService.getGenre().subscribe((genres:Genre[]) => {
      this.genres= genres;
    });
  }
  getPublishers() : void {
    this.bookService.getPublishers().subscribe((publishers:Publisher[]) =>{ 
      this.publishers = publishers;
    });
  }
  addBook(){
    this.bookService.saveBook(this.book).subscribe( data => {
      console.log(data);
      this.goToBookList();
    },
    error => console.log(error));
  }
   goToBookList(){
    this.router.navigate(['/books']);
  }
  onSubmit(){
    console.log(this.book);
    this.addBook();
  }
}

