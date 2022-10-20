import * as tokenService from "../services/tokenService";
const baseUrl = `http://localhost:3001/api/`;

export async function searchForAllBook(bookTitle) {
  const response = await fetch(`${baseUrl}books/getAllSearchedBook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ title: bookTitle }),
  });
  return response.json();
}

export async function getBookById(_bookId) {
  const response = await fetch(`${baseUrl}`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ bookId: _bookId }),
  });
  return response.json();
}

export async function getASingleBookId(bookId) {
  const response = await fetch(`${baseUrl}books/getABookByID`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ bookId: bookId }),
  });
  return response.json();
}
export async function addBookToCollection(bookId) {
  const response = await fetch(`${baseUrl}books/addBookToCollection`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ bookId: bookId }),
  });
}
