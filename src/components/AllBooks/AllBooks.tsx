import React, { useState, useEffect, FC } from "react";
import striptags from "striptags";
import Form from "react-bootstrap/Form";
import Spinner from "react-bootstrap/Spinner";
import { Badge, Button, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./AllBooks.module.css";
import { AiOutlineFileImage } from "react-icons/ai";
import { searchForAllBook } from "../../services/bookService";
import { AllBooksInterface } from "./AllBooksInterface/AllBooksInterface";

const AllBooks: FC = () => {
  const [allBooks, setAllBooks] = useState<AllBooksInterface[]>();
  const [search, setSearch] = useState<string>("");
  const [getSearchValue, setGetSearchValue] = useState<string>(
    "Cracking the coding interview"
  );

  useEffect(() => {
    searchForAllBook(getSearchValue).then((data) => setAllBooks(data));
  }, [getSearchValue]);

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    setGetSearchValue(search);
    setSearch("");
  };

  return (
    <Container className={styles.AllBookMainContainer}>
      <title> Book Library</title>
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
        <Row className={styles.booksContainer}>
          {allBooks ? (
            allBooks?.map(({ volumeInfo, id }, index: number) => {
              const title: string | undefined = volumeInfo.title;
              const description: string | undefined = volumeInfo.description;
              const image: string | undefined =
                volumeInfo.imageLinks?.smallThumbnail;
              const authors: string[] | undefined = volumeInfo.authors;
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
                              <Badge>Book Detail</Badge>
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
