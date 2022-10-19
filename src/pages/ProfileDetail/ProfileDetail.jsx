import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { showUserBooks } from "../../services/profileService";

function ProfileDetail({ props }) {
  let [profileBook, setProfileBook] = useState("");
  let { profileId } = useParams();
  console.log(profileId);
  useEffect(() => {
    showUserBooks(profileId).then((res) => setProfileBook(res));
  }, []);

  console.log(profileBook);
  return (
    <div>
      {profileBook?.bookshelf?.map((book, i) => (
        <div key={i}>
          <h5>{book?.title}</h5>
        </div>
      ))}
    </div>
  );
}

export default ProfileDetail;
// 63457c2bad980aa57ec84512
