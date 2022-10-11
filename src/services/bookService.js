const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/books/allBooks`;

export async function getAllBooks() {
  return fetch(BASE_URL).then((res) => res.json());
}
