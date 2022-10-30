import * as tokenService from "../services/tokenService";

const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/profiles`;

async function getAllProfiles() {
  const res = await fetch(BASE_URL, {
    headers: { Authorization: `Bearer ${tokenService.getToken()}` },
  });
  return await res.json();
}
async function showUserBooks(profileId) {
  const response = await fetch(`${BASE_URL}/show`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ profileId: profileId }),
  });
  return response.json();
}

async function handleDeleteBook(bookId, userId) {
  const response = await fetch(`${BASE_URL}/deleteBook/${userId}`, {
    method: "DELETE",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ booksId: bookId }),
  });
}

export { getAllProfiles, showUserBooks, handleDeleteBook };
