import React, { useState, useEffect } from "react";
import styles from "./AllBooks.module.css";
import * as bookService from "../../services/bookService";
import { Link } from "react-router-dom";
import { Button, Col, Container, Row } from "react-bootstrap";
import { AiOutlineFileImage } from "react-icons/ai";
import Spinner from "react-bootstrap/Spinner";
import Form from "react-bootstrap/Form";
import striptags from "striptags";

function AllBooks() {
  const [books, setBooks] = useState(null);
  const [search, setSearch] = useState("");
  const [getSearchValue, setGetSearchValue] = useState(
    "Cracking the coding interview"
  );

  useEffect(() => {
    bookService.searchForAllBook(getSearchValue).then((data) => setBooks(data));
  }, [getSearchValue]);

  function handleSubmit(e) {
    e.preventDefault();
    setGetSearchValue(search);
    setSearch("");
  }
  // md={3}
  return (
    <Container>
      <Row>
        <Row>
          <Col>
            <h1>All Books</h1>
          </Col>
        </Row>
        <Row md={2} className={styles.searchInputButton}>
          <Form.Control
            className={styles.searchInput}
            type="text"
            placeholder="Search For A Book"
            required
            value={search}
            autoComplete="off"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            type="submit"
            onClick={handleSubmit}
            className={styles.searchButton}
          >
            Search for a Book
          </Button>
        </Row>
        <Row className={styles.testing}>
          {books ? (
            books?.map((book, index) => {
              const title = book?.volumeInfo.title;
              const description = book?.volumeInfo.description;
              const image = book?.volumeInfo.imageLinks?.smallThumbnail;
              const authors = book?.volumeInfo.authors;
              const bookId = book?.id;
              return (
                <Row key={index} className={styles.booksMainContainer}>
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
                            <Button size="small">Book detail</Button>
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
                </Row>
              );
            })
          ) : (
            <>
              <div className={styles.loading}>
                <Spinner animation="border" variant="primary" />
              </div>
            </>
          )}
        </Row>
      </Row>
    </Container>
  );
}

export default AllBooks;
