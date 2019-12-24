import { Injectable } from '@angular/core';
import { Book } from './book.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

export interface BooksState extends EntityState<Book> {}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'books' })
export class BooksStore extends EntityStore<BooksState> {

  constructor() {
    super();
  }

}

