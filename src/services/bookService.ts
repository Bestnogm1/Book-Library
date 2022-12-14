import * as tokenService from "./tokenService";

const baseUrl = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/books`;

export async function searchForAllBook(bookTitle: string) {
  const response = await fetch(`${baseUrl}/getAllSearchedBook`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ title: bookTitle }),
  });
  return response.json();
}

export async function getBookById(_bookId: string) {
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

export async function getASingleBookId(bookId: string | undefined) {
  const response = await fetch(`${baseUrl}/getABookByID`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ bookId: bookId }),
  });
  return response.json();
}

export async function addBookToCollection(bookId: string | undefined) {
  const response = await fetch(`${baseUrl}/addBookToCollection`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
    body: JSON.stringify({ bookId: bookId }),
  });
}

export async function getAllBooks() {
  const response = await fetch(`${baseUrl}/getAllBooks`, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: `Bearer ${tokenService.getToken()}`,
    },
  });
  return response.json();
}
