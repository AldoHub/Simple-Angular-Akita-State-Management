import { Component, OnInit, OnDestroy, AfterContentInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { BooksService } from "../state/books.service";
import { BooksQuery } from "../state/books.query";
import { BooksStore } from "../state/books.store";
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-book',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit, OnDestroy{

  constructor(private booksService: BooksService, private booksQuery: BooksQuery, private booksStore: BooksStore, private route: ActivatedRoute, private router: Router) { }

  public booksSubscription: Subscription;
  public currentId: any = this.route.snapshot.paramMap.get("id");
  
  public currentBook: any = null;
  
  public editForm = new FormGroup({
    name: new FormControl('', Validators.required),
    description: new FormControl('',  Validators.required),
    price: new FormControl("", Validators.required),
    author: new FormControl("", Validators.required)
  });

  public async getCurrentBook(){
   if(this.booksService.getBook(this.currentId) !== undefined){
    await new Promise(resolve => {
      this.booksSubscription= this.booksService.getBook(this.currentId).subscribe(book =>{
        this.currentBook = book;
        resolve();
        });
     })

     this.editForm.setValue({
      name:  this.currentBook.name,
      description:  this.currentBook.description,
      price:  this.currentBook.price,
      author:  this.currentBook.author
    
    })

   }else{
     await this.booksService.get();
     await new Promise(resolve => {
      this.booksSubscription = this.booksQuery.selectEntity(this.currentId).subscribe(book => {
        this.currentBook = book;
        if(book != undefined){
          this.editForm.setValue({
            name:  book.name,
            description:  book.description,
            price:  book.price,
            author:  book.author
          
          })
        }
        resolve();
      })
     });
     
    
   
   }
  }

  public async editBook(formData: any) {
   this.booksService.update(this.currentId, formData);
  }


  public deleteBook(){
    this.booksService.remove(this.currentId);
  }

  ngOnInit() {
    this.getCurrentBook();
    console.log(this.currentBook);
  }

  ngOnDestroy(){
    this.booksSubscription.unsubscribe();
  }

}
