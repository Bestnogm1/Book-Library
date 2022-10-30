import React, { useState, useEffect } from "react";
import striptags from "striptags";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AllBooks.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
import * as bookService from "../../services/bookService";

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
    <Container className={styles.AllBookMainContainer}>
      <title> Book Store</title>
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
            Search
          </Button>
        </Row>
        <Row className={styles.testing}>
          {allBooks ? (
            allBooks?.map(({ volumeInfo, id }, index) => {
              const title = volumeInfo.title;
              const description = volumeInfo.description;
              const image = volumeInfo.imageLinks?.smallThumbnail;
              const authors = volumeInfo.authors;

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
                          <Link key={id} to={`/book-detail/${id}`}>
                            <h5>
                              <Badge size="small">Book Detail</Badge>
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
};

export default AllBooks;
