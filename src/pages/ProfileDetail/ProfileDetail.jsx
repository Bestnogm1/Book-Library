import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { handleDeleteBook, showUserBooks } from "../../services/profileService";
import { Badge, Spinner } from "react-bootstrap";
import { AiOutlineFileImage } from "react-icons/ai";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import styles from "../../components/AllBooks/AllBooks.module.css";
import striptags from "striptags";

function ProfileDetail({ user }) {
  const [profileBook, setProfileBook] = useState("");
  const { profileId } = useParams();

  useEffect(() => {
    showUserBooks(profileId).then((res) => setProfileBook(res));
  }, [profileId]);

  const isThisTheUser = user.profile === profileId ? true : false;
  console.log(profileBook.bookshelf);
  return (
    <Container>
      <Row>
        <Row>
          <title>{profileBook.name} Books</title>
          <Col>
            <h1>{profileBook.name} Books</h1>
            {isThisTheUser ? (
              profileBook ? (
                profileBook.bookshelf.length === 0 ? (
                  <Link to={`/`}>
                    <h1> add a book</h1>
                  </Link>
                ) : null
              ) : null
            ) : (
              <h1> has no book added yet</h1>
            )}
          </Col>
        </Row>
        <Row className={styles.testing}>
          {profileBook ? (
            profileBook.bookshelf.map((book, index) => {
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
                          <Link key={book.bookId} state={{ book }} to={`/`}>
                            <Badge size="small">Book Detail</Badge>
                          </Link>
                          {isThisTheUser ? (
                            <Link to={`/`}>
                              <Badge
                                bg="danger"
                                onClick={() =>
                                  handleDeleteBook(book._id, profileId)
                                }
                              >
                                Remove Book
                              </Badge>
                            </Link>
                          ) : null}
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
}

export default ProfileDetail;
