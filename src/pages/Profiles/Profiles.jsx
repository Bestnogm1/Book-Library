import { Link } from "react-router-dom";
import { getAllBooks } from "../../services/bookService";
import { useEffect, useState } from "react";
import striptags from "striptags";
import { Badge, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { AiOutlineFileImage } from "react-icons/ai";
import styles from "../../components/AllBooks/AllBooks.module.css";

const Profiles = ({ profiles, user }) => {
  const [allBooks, setAllBooks] = useState(null);

  useEffect(() => {
    getAllBooks().then((res) => setAllBooks(res));
  }, []);

  return (
    <Container>
      <Row>
        <div className={styles.booksMainContainerTitle}>
          <h3>Other people are reading...</h3>
        </div>
        <Row className={styles.booksContainer}>
          {allBooks ? (
            allBooks.map((book, index) => {
              return (
                <Row key={index} className={styles.booksMainContainer}>
                  <div>
                    <div>
                      <div className={styles.booksContainerTopHeader}>
                        {book.cover ? (
                          <img
                            src={book.cover}
                            width="120"
                            height="155"
                            alt={book.title}
                          />
                        ) : (
                          <AiOutlineFileImage className={styles.NoImage} />
                        )}
                        <div className={styles.titleAuthor}>
                          {user?.profile === book?.ownedBy._id ? (
                            <>
                              <Link to={`/profileDetail/${book.ownedBy._id}`}>
                                <Badge size="small" bg="warning">
                                  You are reading
                                </Badge>
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to={`/profileDetail/${book.ownedBy._id}`}>
                                <Badge size="small" bg="info">
                                  {book.ownedBy.name} is reading
                                </Badge>
                              </Link>
                            </>
                          )}
                          <h5> {book.title}</h5>
                          <div>
                            {book.authors ? (
                              book.authors.map((author, i) => (
                                <div key={i}>
                                  <h5>{author},</h5>
                                </div>
                              ))
                            ) : (
                              <h5> no author</h5>
                            )}
                          </div>
                          <Link
                            key={book.bookId}
                            state={{ book }}
                            to={`/book-detail/${book.bookId}`}
                          >
                            <Badge size="small">Book Detail</Badge>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.booksContainerDescription}>
                    <div>
                      {book.description ? (
                        <h6>{striptags(book.description)}</h6>
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

export default Profiles;
