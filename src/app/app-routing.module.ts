import { NgModule } from '@angular/core';
import {Routes, RouterModule} from "@angular/router";


const routes: Routes = [
  {path: "", loadChildren: () => import("./main/main.module").then(m => m.MainModule)},
  {path: 'book/:id', loadChildren: () => import("./book/book.module").then(m => m.BookModule) },
]

@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: "enabled"})],
  exports: [RouterModule]
})
export class AppRoutingModule { }