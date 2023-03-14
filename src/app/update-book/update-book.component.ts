import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Book } from '../book';
import { BookService } from '../book.service';
import { Genre } from '../genre';
import { Publisher } from '../publisher';

@Component({
  selector: 'app-update-book',
  templateUrl: './update-book.component.html',
  styleUrls: ['./update-book.component.css']
})
export class UpdateBookComponent implements OnInit {
 
  'book_id':number;
  book:Book = new Book();
  genres: Genre[] = [];
  publishers: Publisher[] = [];
  createBookForm!: FormGroup;
  selectedGenere: any;
  selectedPublisher: any;
  constructor(private bookService:BookService, 
    private route:ActivatedRoute, private router:Router,private formBuilder: FormBuilder){
      this.initForm();
    }
    initForm() {
      this.createBookForm = this.formBuilder.group({
        book_name: new FormControl('', Validators.required),
        book_genre: new FormControl('', Validators.required),
        book_author: new FormControl('', Validators.required),
        book_publishers: new FormControl('', Validators.required),
       
      });
    }
  ngOnInit(): void {
    this.book_id = this.route.snapshot.params['book_id'];
    this.bookService.getBookById(this.book_id).subscribe(data => {
      this.book = data;
      this.setFormValues(this.book);
      console.log(JSON.stringify(this.book));
    },
    error => console.log(error));
    this.getGenres();
    this.getPublishers();
  }
  // onSubmit(){
  //   console.log(this.createBookForm.value);
  //   console.log(this.book);
  //   this.bookService.updateBook(this.book_id,this.book).subscribe( data => {
  //   this.goToBookList();
  //   },
  //   error => console.log(error));
    
  // }
  onSubmit() {
    console.log(this.createBookForm.value);
    // this.book = this.createBookForm.value
    // this.book.genre.genre_id = Number(this.createBookForm.get("book_genre")?.value)
    this.bookService.updateBook(this.selectedGenere, this.selectedPublisher, this.book_id, this.createBookForm.value).subscribe(data => {
      this.createBookForm.value
      // this.bookService.updateBook(this.book_id,this.book).subscribe( data => {
       this.goToBookList();
    },
      error => console.log(error));

  }
  setFormValues(book: Book) {
    this.createBookForm = this.formBuilder.group({
      book_name: new FormControl(book.book_name, Validators.required),
      book_genre: new FormControl(this.book.genre.book_genre, Validators.required),
      book_author: new FormControl(book.book_author, Validators.required),
      book_publishers: new FormControl(this.book.publisher.book_publisher, Validators.required),
      
    });
  }
  goToBookList(){
    this.router.navigate(['/books']);
  }
  getGenres(): void {
    this.bookService.getGenre().subscribe({
      next: (response: any) => { this.genres = response; console.log(this.genres); }, error: (error) => { console.log(error) }
    });
   
  }

  getPublishers(): void {
    this.bookService.getPublishers().subscribe(publishers => {
      this.publishers = publishers;
    });
  }
}
