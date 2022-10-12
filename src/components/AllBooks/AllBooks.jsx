import React, { useState, useEffect } from "react";
import styles from "./AllBooks.module.css";

function AllBooks({}) {
  const [books, setBooks] = useState();
  const [search, setSearch] = useState("zyTCAlFPjgYC");

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
  console.log(books);
  const getId = (bookId) => {
    console.log(bookId);
  };
  return (
    <>
      <div className={styles.allBooksContainer}>
        <h1>books</h1>
        <div className={styles.allBooksInnerContainer}>
          {books?.map((book) => {
            let title = book?.volumeInfo.title;
            let description = book?.volumeInfo.description;
            let image = book?.volumeInfo.imageLinks?.smallThumbnail;
            let buyLink = book?.volumeInfo.infoLink;
            let authors = book?.volumeInfo?.authors[0];
            let bookId = book?.id;
            return (
              <>
                <div
                  className={styles.booksContainer}
                  key={book?.volumeInfo.id}
                >
                  <div>
                    <div className={styles.imgTitle}>
                      <div className={styles.imgTag}>
                        {image ? (
                          <img
                            src={image}
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
                          <button onClick={() => getId(bookId)}>
                            add to collection
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={styles.allBooksDescription}>
                    <h5>{description}</h5>
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
