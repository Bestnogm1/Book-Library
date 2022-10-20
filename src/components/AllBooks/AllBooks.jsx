import React, { useState, useEffect } from "react";
import styles from "./AllBooks.module.css";
import * as bookService from "../../services/bookService";
import { Link } from "react-router-dom";
function AllBooks() {
  const [books, setBooks] = useState(null);
  const [search, setSearch] = useState("");
  const [getSearchValue, setGetSearchValue] = useState("API");

  useEffect(() => {
    bookService
      .searchForAllBook(getSearchValue)
      .then((result) => setBooks(result));
  }, [getSearchValue]);

  function handleSubmit(e) {
    e.preventDefault();
    setGetSearchValue(search);
    setSearch("");
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={search}
          autoComplete="off"
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit"> Search for a Book</button>
      </form>
      <div className={styles.allBooksContainer}>
        <h1>books</h1>
        <div className={styles.allBooksInnerContainer}>
          {books &&
            books?.map((book, index) => {
              const title = book?.volumeInfo.title;
              const description = book?.volumeInfo.description;
              const image = book?.volumeInfo.imageLinks?.smallThumbnail;
              // const buyLink = book?.volumeInfo.infoLink;
              const authors = book?.volumeInfo?.authors[0];
              const bookId = book?.id;
              return (
                <div className={styles.booksContainer} key={index}>
                  <div>
                    <div className={styles.imgTitle}>
                      <div className={styles.imgTag}>
                        {image ? (
                          <img
                            src={image}
                            width="120"
                            height="155"
                            alt="imgtag"
                          />
                        ) : (
                          <h6>no img available</h6>
                        )}
                      </div>
                      <div className={styles.allBooksTitleAuthors}>
                        <div>
                          <h5> {title}</h5>
                          <h5>{authors}</h5>
                          <button>
                            <Link
                              key={bookId}
                              state={{ book }}
                              to={`/book-detail/${bookId}`}
                            >
                              book detail
                            </Link>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.allBooksDescription}>
                    <h5>{description}</h5>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </>
  );
}

export default AllBooks;
