import * as tokenService from "../services/tokenService";
let baseUrl = `http://localhost:3001/api/`;

export async function searchForAllBook(bookTitle) {
  let response = await fetch(`${baseUrl}books/getAllSearchedBook`, {
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
  let response = await fetch(`${baseUrl}`, {
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
  let response = await fetch(`${baseUrl}books/getABookByID`, {
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
  let response = await fetch(`${baseUrl}books/addBookToCollection`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ bookId: bookId }),
  });
}
