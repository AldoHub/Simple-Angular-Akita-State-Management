import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { BooksStore, BooksState } from './books.store';

@Injectable({ providedIn: 'root' })
export class BooksQuery extends QueryEntity<BooksState> {

  constructor(protected store: BooksStore) {
    super(store);
  }

}
