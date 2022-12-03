import { useEffect, useState, FC } from "react";
import { Link, useParams } from "react-router-dom";
import { handleDeleteBook, showUserBooks } from "../../services/profileService";
import { Badge, Spinner, Container, Row, Col } from "react-bootstrap";
import { AiOutlineFileImage } from "react-icons/ai";
import striptags from "striptags";
import styles from "../../components/AllBooks/AllBooks.module.css";
import { ProfileBookInterface } from "./ProfileDetailInterface/ProfileDetailInterface";
import { UserInterface } from "../../UserInterface";

const ProfileDetail: FC<UserInterface> = ({ user }) => {
  const [profileBook, setProfileBook] = useState<ProfileBookInterface>();
  const { profileId } = useParams<{ profileId?: string }>();

  useEffect(() => {
    showUserBooks(profileId).then((res) => setProfileBook(res));
  }, [profileId]);

  const isThisTheUser = user?.profile === profileId ? true : false;

  return (
    <Container>
      <Row>
        <Row>
          <title>{profileBook?.name} Books</title>
          <Col>
            <div className={styles.booksMainContainerTitle}>
              <h3>{profileBook?.name} Books</h3>
            </div>

            {profileBook ? (
              isThisTheUser && profileBook.bookshelf.length === 0 ? (
                <Link to={`/`}>
                  <h3> Add a book</h3>
                </Link>
              ) : profileBook.bookshelf.length === 0 ? (
                <h1> has no book</h1>
              ) : null
            ) : null}
          </Col>
        </Row>
        <Row className={styles.booksContainer}>
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
                          <Link
                            key={book.bookId}
                            state={{ book }}
                            to={`/book-detail/${book.bookId}`}
                          >
                            <Badge>Book Detail</Badge>
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
};

export default ProfileDetail;
