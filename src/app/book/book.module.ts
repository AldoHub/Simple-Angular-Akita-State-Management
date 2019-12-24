import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { BookRoutingModule } from './book-routing.module';
import { BookComponent } from './book.component';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

@NgModule({
  imports: [
    BookRoutingModule,
    ReactiveFormsModule,
   CommonModule
  ],
  declarations: [BookComponent]
})
export class BookModule { }