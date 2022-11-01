import React from "react";
import { useEffect, useState } from "react";
import * as reviewService from "../../services/reviewService";
import { Badge, Button, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Reviews.module.css";

const Reviews = ({ bookId, user }) => {
  const [getAllReviews, setGetAllReviews] = useState(null);
  const [inputData, setInputData] = useState("");
  useEffect(() => {
    reviewService.getAllReviews().then((res) => setGetAllReviews(res));
  }, []);

  const handleSubmit = (evt) => {
    evt.preventDefault();
    const newReview = {
      bookId,
      ownedBy: { name: user.name },
      reviews: inputData,
    };
    setGetAllReviews([...getAllReviews, newReview]);
    reviewService.createAReview({ ...newReview, ownedBy: user.profile });
    setInputData("");
  };
  // const isThisTheUser = user.profile === profileId ? true : false;

  console.log(getAllReviews);
  const routeToUserProfile = (review) => {
    if (review.ownedBy._id) return `/profileDetail/${review.ownedBy._id}`;
    return `/profileDetail/${user.profile}`;
  };
  return (
    <>
      <div>
        <h1> Reviews </h1>
        <input
          type="text"
          name="reviews"
          required
          value={inputData}
          onChange={(evt) => setInputData(evt.target.value)}
        />
        <Button size="sm" type="submit" onClick={handleSubmit}>
          add
        </Button>
        <div className={style.reviewMainComponent}>
          {getAllReviews &&
            getAllReviews?.map((review, index) => (
              <div key={index} className={style.reviewComponent}>
                <div>
                  {review?.bookId === bookId ? (
                    <div>
                      <Link to={routeToUserProfile(review)}>
                        <div className={style.reviewName}>
                          <h6>
                            <Badge>{review.ownedBy.name}</Badge>
                          </h6>
                        </div>
                      </Link>
                      <div className={style.reviewReview}>
                        <h6>{review.reviews}</h6>
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
