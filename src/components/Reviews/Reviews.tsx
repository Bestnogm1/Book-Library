import React, { FC, MouseEvent } from "react";
import { useEffect, useState } from "react";
import * as reviewService from "../../services/reviewService";
import { Badge, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import style from "./Reviews.module.css";
import {
  ReviewsData,
  ReviewsFormInterface,
  ReviewsInterface,
} from "./ReviewsInterface/ReviewsInterface";

const Reviews: FC<ReviewsInterface> = ({ bookId, user }) => {
  const [getAllReviews, setGetAllReviews] = useState<ReviewsFormInterface[]>(
    []
  );
  const [inputData, setInputData] = useState("");

  useEffect(() => {
    reviewService.getAllReviews().then((res) => setGetAllReviews(res));
  }, []);

  const handleSubmit = (evt: MouseEvent) => {
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

  const routeToUserProfile = (review: ReviewsData) => {
    if (review?.ownedBy?._id) return `/profileDetail/${review?.ownedBy?._id}`;
    return `/profileDetail/${user.profile}`;
  };

  return (
    <>
      <div>
        <h1> Reviews </h1>
        <div className={style.reviewInputButton}>
          <textarea
            className={style.reviewInput}
            name="reviews"
            required
            value={inputData}
            onChange={(evt) => setInputData(evt.target.value)}
          />
          <Button size="sm" type="submit" onClick={handleSubmit}>
            submit
          </Button>
        </div>
        <div className={style.reviewMainComponent}>
          {getAllReviews &&
            getAllReviews?.map((review, index) => (
              <React.Fragment key={index}>
                {review?.bookId === bookId ? (
                  <div key={index} className={style.reviewComponent}>
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
              </React.Fragment>
            ))}
        </div>
      </div>
    </>
  );
};

export default Reviews;
