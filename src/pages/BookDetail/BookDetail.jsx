import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as bookService from "../../services/bookService";
import { showUserBooks } from "../../services/profileService";

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
    <div>
      <>
        <h1>{bookDetail?.title}</h1>
        {profile && doesUserHaveBook() ? (
          <h1> you already have this book</h1>
        ) : (
          <button onClick={() => addBookToCollection()}>
            add to my collection
          </button>
        )}
      </>
    </div>
  );
}

export default BookDetail;
