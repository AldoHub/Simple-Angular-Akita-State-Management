import { ID } from "@datorama/akita";

export interface Book {
  id: ID;
  name: string;
  author: string;
  genres: string[];
  description: string;
  price: number;
}

export function createBook(params: Partial<Book>) {
  return {
  
  } as Book;
}
