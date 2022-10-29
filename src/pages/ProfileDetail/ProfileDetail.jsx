import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { showUserBooks } from "../../services/profileService";
import { Button, Spinner } from "react-bootstrap";
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
  console.log(user.profile, "user");
  console.log(profileId, "profileId");
  const isThisTheUSer = user.profile === profileId ? true : false;
  console.log(profileBook, "profileBook");
  return (
    <Container>
      <Row>
        <Row>
          <Col>
            <h1>{profileBook.name} Books</h1>
          </Col>
        </Row>
        <Row className={styles.testing}>
          {profileBook ? (
            profileBook?.bookshelf?.map((book, index) => {
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
                          <Link
                            key={book.bookId}
                            state={{ book }}
                            to={`/book-detail/${book.bookId}`}
                          >
                            <Button size="small">Book detail</Button>
                          </Link>

                          {isThisTheUSer ? (
                            <Button size="sm" variant="danger">
                              delete book
                            </Button>
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
