import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as bookService from "../../services/bookService";
import { showUserBooks } from "../../services/profileService";

function BookDetail({ user }) {
  let [bookDetail, setBookDetail] = useState("");
  const [profile, setProfile] = useState("");
  let { bookId } = useParams();

  useEffect(() => {
    bookService.getASingleBookId(bookId).then((book) => setBookDetail(book));
    showUserBooks(user.profile).then((res) => setProfile(res.bookshelf));
  }, []);
  // 63457c2bad980aa57ec84514
  console.log(profile);

  function addBookToCollection() {
    bookService.addBookToCollection(bookId);
  }
  function doesUserHaveBook() {
    profile.filter((profileBook) => {
      // if(profileBook.bookId)
    });
  }
  return (
    <div>
      <>
        <h1>{bookDetail?.title}</h1>
        {doesUserHaveBook() ? (
          <h1> you aredy have this book</h1>
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
