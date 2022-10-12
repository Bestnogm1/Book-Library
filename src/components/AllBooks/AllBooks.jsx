import React, { useState, useEffect } from "react";
import styles from "./AllBooks.module.css";

function AllBooks({}) {
  const [books, setBooks] = useState();
  const [search, setSearch] = useState("dairy of the");

  useEffect(() => {
    async function findBookAllBook(looking) {
      let response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=${looking}&maxResults=12&key=AIzaSyBh9DIgP1FAmJ0ufiaxLXCxtL6PJSZdaCA`
      );
      const data = await response.json();
      setBooks(data.items);
    }
    findBookAllBook(search);
  }, []);

  return (
    <>
      <div className={styles.allBooksContainer}>
        <div className={styles.allBooksInnerContainer}>
          {books?.map((book) => {
            let title = book?.volumeInfo.title;
            let description = book?.volumeInfo.description;
            let image1 = book?.volumeInfo.imageLinks?.smallThumbnail;
            let buyLink = book?.volumeInfo.infoLink;
            let authors = book?.volumeInfo?.authors[0];
            return (
              <>
                <div className={styles.booksContainer} key={book.id}>
                  <div>
                    <div className={styles.imgTitle}>
                      <div className={styles.imgTag}>
                        {image1 ? (
                          <img
                            src={image1}
                            width="120"
                            height="155"
                            alt="imgtag"
                          />
                        ) : (
                          <h6>no img available</h6>
                        )}
                      </div>
                      <div className={styles.allBooksTitleAuthors}>
                        <div>
                          <h5> {title}</h5>
                          <h5>{authors}</h5>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.allBooksDescription}>
                    {/* <h5>{description}</h5> */}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default AllBooks;
