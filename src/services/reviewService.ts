import * as tokenService from "./tokenService";

const BASE_URL: string = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/reviews`;

async function getAllReviews() {
  const response = await fetch(`${BASE_URL}/getAllMessages`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  });
  return response.json();
}

type CreateAReview = {
  bookId?: string;
  reviews?: string;
  ownedBy?: string;
};

async function createAReview(reviewsForm: CreateAReview) {
  const response = await fetch(`${BASE_URL}/createReviews`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify(reviewsForm),
  });
  return response.json();
}
export { getAllReviews, createAReview };
