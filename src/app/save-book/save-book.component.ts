import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
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
  createBookForm!: FormGroup;
  selectedGenere: any;
  selectedPublisher: any;
  constructor(private bookService:BookService, private router:Router,private formBuilder: FormBuilder){
    this.initForm();
  }
 
  ngOnInit(): void {
    console.log("book.book_genre");
    this.getGenre();
    this.getPublishers();
  }
  initForm() {
    this.createBookForm = this.formBuilder.group({
      book_name: new FormControl(''),
      book_genre: new FormControl(''),
      book_author: new FormControl(''),
      book_publishers: new FormControl(''),
      book_ratings: new FormControl('')
    });
  }
  addBook(){
    this.bookService.saveBook(this.selectedGenere, this.selectedPublisher, this.createBookForm.value).subscribe( data => {
      console.log(data);
      this.goToBookList();
    },
    error => console.log(error));
  }
  goToBookList(){
    this.router.navigate(['/books']);
  }
  createBook() {
    console.log(this.book);
    this.addBook();
  }
  getGenre() {
    this.bookService.getGenre().subscribe({
      next: (response: any) => { this.genres = response; console.log(this.genres); }, error: (error) => { console.log(error) }
    });
  }
  getPublishers() : void {
    this.bookService.getPublishers().subscribe((publishers:Publisher[]) =>{ 
      this.publishers = publishers;
    });
  }
}

