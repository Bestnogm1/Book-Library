export interface ReviewsInterface {
  bookId?: string;
  user: {
    name: string;
    email: string;
    profile?: string;
    _v: number;
    _id: string;
    createdAt: string;
    updatedAt: string;
  };
}

export interface ReviewsFormInterface {
  bookId?: string;
  ownedBy: { name: string };
  reviews: string;
}

export interface ReviewsData {
  bookId: string;
  createdAt: string;
  ownedBy: {
    _id: string;
    bookshelf: string[];
    email: string;
    name: string;
    createdAt: string;
    updatedAt: string;
    _v: number;
  };
  reviews: string;
  updatedAt: string;
  _id: string;
  _v: number;
}
