import { Component, OnInit } from '@angular/core';
import { Book } from "../state/book.model";
import { BooksService } from "../state/books.service";
import { BooksQuery } from "../state/books.query";
import { BooksStore } from "../state/books.store";
import { FormGroup, FormControl, Validators } from "@angular/forms";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  constructor(private booksService: BooksService, private booksQuery: BooksQuery, private booksStore: BooksStore) { }

  public postForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('',  Validators.required),
    genres: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required),
    price: new FormControl("", Validators.required),
  });

  public books$ = this.booksQuery.selectAll({sortBy: "name"});
  public loading$ = this.booksQuery.selectLoading();

  public getBooks(){
    this.booksService.get();
  }


  
  public async addBook(formData: Book){

    let currentID;

    await new Promise(resolve => {
      this.booksQuery.selectCount().subscribe(res => {
       currentID = res + 1;
        resolve();
      });
    })
    
   

    let book = {
      id: currentID,
      name: formData.name,
      description: formData.description,
      genres: formData.genres,
      price: formData.price,
      author: formData.author,
    }

    this.booksService.add(book);
    console.log(this.booksStore["storeValue"]["entities"]);
  }



  ngOnInit() {
    console.log(this.booksStore["storeValue"]["entities"]);
    this.getBooks();
  }

}
