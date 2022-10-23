import React, { useState, useEffect } from "react";
import styles from "./AllBooks.module.css";
import * as bookService from "../../services/bookService";
import { Link } from "react-router-dom";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { Button } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NoImage from "src/Img/NoimagebookStore.jpeg";

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

  return (
    <div className={styles.AllBookMainContainer}>
      <div className={styles.titleForm}>
        <div>
          <h1>books</h1>
        </div>
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
        <div className={styles.AllBookInnerContainer}></div>
        {/* <Container>
          <Row>
            <Col sm>sm=true</Col>
          </Row>
        </Container> */}
        <div>
          <div>
            {books ? (
              books?.map((book, index) => {
                const title = book?.volumeInfo.title;
                const description = book?.volumeInfo.description;
                const image = book?.volumeInfo.imageLinks?.smallThumbnail;
                const authors = book?.volumeInfo.authors;
                // const buyLink = book?.volumeInfo.infoLink;
                const bookId = book?.id;
                return (
                  <Container>
                    <Row>
                      <Col>
                        <div key={index} className={styles.booksMainContainer}>
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
                                  <img
                                    src={NoImage}
                                    width="120"
                                    height="155"
                                    alt="no image"
                                  />
                                )}
                                <div>
                                  <h4> {title}</h4>
                                  <div>
                                    {authors.map((author, i) => (
                                      <div key={i}>
                                        <h5>{author},</h5>
                                      </div>
                                    ))}
                                  </div>
                                  <Link
                                    key={bookId}
                                    state={{ book }}
                                    to={`/book-detail/${bookId}`}
                                  >
                                    <Button size="small">book detail</Button>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className={styles.booksContainerDescription}>
                            <div>
                              {description ? (
                                <h5>{description}</h5>
                              ) : (
                                <h5>No description available...</h5>
                              )}
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                );
              })
            ) : (
              <h1>
                <AiOutlineLoading3Quarters />
              </h1>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllBooks;
