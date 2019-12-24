import { Injectable } from '@angular/core';
import { ID } from '@datorama/akita';
import { HttpClient } from '@angular/common/http';
import { BooksStore } from './books.store';
import { BooksQuery } from "./books.query";
import { Book } from './book.model';
import { mapTo } from 'rxjs/operators';
import { timer } from "rxjs";
import { books } from "../books.data";
 

@Injectable({ providedIn: 'root' })
export class BooksService {

  constructor(private booksStore: BooksStore,
              private booksQuery: BooksQuery,
              private http: HttpClient) {
  }

  get() {
    /*
    return this.http.get<Book[]>('https://api.com').pipe(tap(entities => {
      this.booksStore.set(entities);
    }));
    */

   //set the books from the ts
    timer(1000).pipe(mapTo(books))
    .subscribe( books =>{ 
      this.booksStore.set(books);
      console.log(this.booksStore["storeValue"]["entities"])
    });
  

  }

  getBook(id: ID){
    if(this.booksQuery.hasEntity(id)){
      return this.booksQuery.selectEntity(id);
    }
  }

  add(book: Book) {
    this.booksStore.add(book);
  }

  update(id, book: Partial<Book>) {
    this.booksStore.update(id, book);
  }

  remove(id: any) {
    this.booksStore.remove(parseInt(id));
    console.log(this.booksStore["storeValue"]["entities"])
  }
}
