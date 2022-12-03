export type BooksDetailsInterface = {
  allowAnonLogging?: boolean;
  authors?: string[];
  averageRating?: number;
  canonicalVolumeLink?: string;
  categories?: string[];
  contentVersion?: string;
  description?: string;
  dimensions?: { height: string; width: string; thickness?: string };
  imageLinks?: { smallThumbnail: string; largeThumbnail?: string };
  industryIdentifiers?: { type: string; identifier?: string }[];
  infoLink?: string;
  maturityRating?: string;
  pageCount?: number;
  panelizationSummary?: {
    containsEpubBubbles?: boolean;
    containsImageBubbles?: boolean;
  };
  previewLink?: string;
  printType?: string;
  printedPagesCount?: number;
  publishedDate?: string;
  publisher?: string;
  ratingsCount?: number;
  readingModes?: { text: boolean; image: boolean };
  subtitle?: string;
  title?: string;
};
export interface SingleBookInterface {
  authors?: string[];
  bookId?: string;
  cover?: string;
  createdAt?: string;
  description?: string;
  ownedBy?: string;
  publishedDate?: string;
  title?: string;
  updatedAt?: string;
  _v?: number;
  _id?: string;
}
