export interface AllBooksInterface {
  accessInfo: string[];
  country: string;
  accessViewStatus: string;
  embeddable: boolean;
  epub: string;
  pdf: object;
  publicDomain: boolean;
  quoteSharingAllowed: boolean;
  textToSpeechPermission: string;
  viewability: string;
  webReaderLink: string;
  etag: string;
  id: string;
  kind: string;
  saleInfo: string;
  searchInfo: object;
  selfLink: string;
  volumeInfo: VolumeInfoInterface;
}

export interface VolumeInfoInterface {
  allowAnonLogging: boolean;
  authors: string[];
  averageRating: number;
  canonicalVolumeLink: string;
  categories: string[];
  contentVersion: string;
  description: string;
  imageLinks?: {
    smallThumbnail: string;
    thumbnail: string;
  };
  industryIdentifiers: object;
  infoLink: string;
  language: string;
  maturityRating: string;
  pageCount: number;
  panelizationSummary: object;
  previewLink: string;
  printType: string;
  publishedDate: string;
  publisher: string;
  ratingsCount: number;
  readingModes: object;
  subtitle: string;
  title: string;
}

export interface SingleBookDetailInterface {
  authors: string[];
  bookId: string;
  cover: string;
  createdAt: String;
  description: string;
  ownedBy: string;
  publishedDate: string;
  title: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
