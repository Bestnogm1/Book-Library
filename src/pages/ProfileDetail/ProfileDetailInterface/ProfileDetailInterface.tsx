import { SingleBookInterface } from "../../BookDetail/BookDetailInterface/BookDetailInterface";

export interface ProfileBookInterface {
  bookshelf: SingleBookInterface[];
  createdAt: string;
  name: string;
  updatedAt: string;
  _v: number;
  _id: string;
}

export interface AllUserBookInterface {
  authors: string[];
  bookId: string;
  cover: string;
  createdAt: String;
  description: string;
  ownedBy: {
    _id?: string;
    bookshelf?: string[];
    email?: string;
    name?: string;
    createdAt?: string;
    updatedAt?: string;
    _v?: number;
  };
  publishedDate: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
