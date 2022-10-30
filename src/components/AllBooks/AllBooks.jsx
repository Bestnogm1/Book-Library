import React, { useState, useEffect } from "react";
import striptags from "striptags";
import { Link } from "react-router-dom";
import styles from "./AllBooks.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
import * as bookService from "../../services/bookService";
import * as Bootstrap from "react-bootstrap";

const AllBooks = () => {
  const [allBooks, setAllBooks] = useState(null);
  const [search, setSearch] = useState("");
  const [getSearchValue, setGetSearchValue] = useState(
    "Cracking the coding interview"
  );

  useEffect(() => {
    bookService
      .searchForAllBook(getSearchValue)
      .then((data) => setAllBooks(data));
  }, [getSearchValue]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setGetSearchValue(search);
    setSearch("");
  };

  return (
    <Bootstrap.Container className={styles.AllBookMainContainer}>
      <title> Book Store</title>
      <Bootstrap.Row>
        <Bootstrap.Row>
          <Bootstrap.Col>
            <h1>All Books</h1>
          </Bootstrap.Col>
        </Bootstrap.Row>
        <Bootstrap.Row md={2} className={styles.searchInputButton}>
          <Bootstrap.Form.Control
            className={styles.searchInput}
            type="text"
            placeholder="Search For A Book"
            required
            value={search}
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Bootstrap.Button
            type="submit"
            onClick={handleSubmit}
            className={styles.searchButton}
          >
            Search
          </Bootstrap.Button>
        </Bootstrap.Row>

        <Bootstrap.Row className={styles.testing}>
          {allBooks ? (
            allBooks?.map((book, index) => {
              const title = book?.volumeInfo.title;
              const description = book?.volumeInfo.description;
              const image = book?.volumeInfo.imageLinks?.smallThumbnail;
              const authors = book?.volumeInfo.authors;
              const bookId = book?.id;

              return (
                <Bootstrap.Row
                  key={index}
                  className={styles.booksMainContainer}
                >
                  <div>
                    <div>
                      <div className={styles.booksContainerTopHeader}>
                        {image ? (
                          <img
                            src={image}
                            width="120"
                            height="155"
                            alt={title}
                          />
                        ) : (
                          <AiOutlineFileImage className={styles.NoImage} />
                        )}
                        <div className={styles.titleAuthor}>
                          <h5> {title}</h5>
                          <div>
                            {authors ? (
                              authors.map((author, i) => (
                                <div key={i}>
                                  <h5>{author},</h5>
                                </div>
                              ))
                            ) : (
                              <h5> no author</h5>
                            )}
                          </div>
                          <Link
                            key={bookId}
                            state={{ book }}
                            to={`/book-detail/${bookId}`}
                          >
                            <h5>
                              <Bootstrap.Badge size="small">
                                Book Detail
                              </Bootstrap.Badge>
                            </h5>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.booksContainerDescription}>
                    <div>
                      {description ? (
                        <h6>{striptags(description)}</h6>
                      ) : (
                        <h6>No description available...</h6>
                      )}
                    </div>
                  </div>
                </Bootstrap.Row>
              );
            })
          ) : (
            <div className={styles.loading}>
              <Bootstrap.Spinner animation="border" variant="primary" />
            </div>
          )}
        </Bootstrap.Row>
      </Bootstrap.Row>
    </Bootstrap.Container>
  );
};

export default AllBooks;
