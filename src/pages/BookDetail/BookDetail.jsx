import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as bookService from "../../services/bookService";
import { showUserBooks } from "../../services/profileService";
import striptags from "striptags";
import { AiOutlineFileImage } from "react-icons/ai";
import style from "./BookDetail.module.css";
import { Button } from "react-bootstrap";

function BookDetail({ user }) {
  const [bookDetail, setBookDetail] = useState("");
  const [profile, setProfile] = useState(null);
  const { bookId } = useParams();

  useEffect(() => {
    bookService.getASingleBookId(bookId).then((book) => setBookDetail(book));
  }, []);

  useEffect(() => {
    showUserBooks(user?.profile).then((res) => setProfile(res?.bookshelf));
  }, []);

  function addBookToCollection() {
    const newBook = {
      authors: bookDetail.authors,
      bookId: bookId,
    };
    setProfile([...profile, newBook]);
    bookService.addBookToCollection(bookId);
  }

  function doesUserHaveBook() {
    const userHasBook = profile.findIndex(
      (profileBook) => profileBook?.bookId === bookId
    );
    if (userHasBook === -1) {
      return false;
    }
    return true;
  }

  return (
    <>
      <div className={style.BookDetailContainer}>
        <title>{bookDetail?.title}</title>
        {bookDetail ? (
          <div className={style.BookDetailInnerContainer}>
            <div className={style.BookDetailLeft}>
              <div className={style.BookDetailImgTitle}>
                {bookDetail.imageLinks ? (
                  <img
                    className={style.BookDetailImage}
                    src={bookDetail.imageLinks.smallThumbnail}
                    alt={bookDetail.title}
                  />
                ) : (
                  <AiOutlineFileImage className={style.NoImage} />
                )}
                <div className={style.BookDetailLabel}>
                  <h2>{bookDetail?.title}</h2>
                  {bookDetail.authors ? (
                    bookDetail?.authors.map((author, i) => (
                      <div key={i}>
                        <h5>{author}</h5>
                      </div>
                    ))
                  ) : (
                    <h5> no author</h5>
                  )}
                  {profile && doesUserHaveBook() ? (
                    <h6> Book is in your shelf</h6>
                  ) : (
                    <Button onClick={() => addBookToCollection()}>
                      Add to my shelf
                    </Button>
                  )}
                </div>
              </div>
              <a href={bookDetail?.previewLink}> Book detail</a>
              <div className={style.BookDetailImgDescription}>
                {bookDetail.description ? (
                  striptags(bookDetail?.description)
                ) : (
                  <h1> no description....</h1>
                )}
              </div>
            </div>
            <div className={style.BookDetailRight}>
              <h1> Reviews</h1>
              <h5> Reviews </h5>
              <input type="text" />
              <Button size="sm"> add</Button>
            </div>
          </div>
        ) : null}
      </div>
    </>
  );
}

export default BookDetail;
