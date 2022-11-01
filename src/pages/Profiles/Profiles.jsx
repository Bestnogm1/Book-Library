import { Link } from "react-router-dom";
import { getAllBooks } from "../../services/bookService";
import { useEffect, useState } from "react";
import striptags from "striptags";
import { Badge, Spinner } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { AiOutlineFileImage } from "react-icons/ai";
import styles from "../../components/AllBooks/AllBooks.module.css";
const Profiles = ({ profiles }) => {
  const [allBooks, setAllBooks] = useState(null);
  useEffect(() => {
    getAllBooks().then((res) => setAllBooks(res));
  }, []);
  console.log(profiles);
  return (
    <Container>
      <Row>
        <Row className={styles.testing}>
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
                          <Link to={`/profileDetail/${book.ownedBy._id}`}>
                            <Badge size="small" bg="secondary">
                              {book.ownedBy.name} is reading
                            </Badge>
                          </Link>
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
    // <>
    //   <title>All Profiles</title>
    //   <div>
    //     {allBooks &&
    //       allBooks.map((book) => (
    //         <div>
    //           <h1>{book.bookId}</h1>
    //         </div>
    //       ))}
    //   </div>
    //   <h1>Hello. This is a list of all the profiles.</h1>
    //   {profiles.length ? (
    //     <div>
    //       {profiles.map((profile) => (
    //         <div key={profile._id}>
    //           <Link state={{ profile }} to={`/profileDetail/${profile._id}`}>
    //             <p key={profile._id}>{profile.name}</p>
    //           </Link>
    //         </div>
    //       ))}
    //     </div>
    //   ) : (
    //     <p>No profiles yet</p>
    //   )}
    // </>
  );
};

export default Profiles;
