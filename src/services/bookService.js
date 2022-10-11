const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/books/allBooks`;

// export async function getAllBooks() {
//   return fetch(BASE_URL).then((res) => res.json());
// }
// export async function findBookAllBook(req, res) {
//   let searchValue = {};
//   let response = await fetch(
//     `https://www.googleapis.com/books/v1/volumes?q=${req.query.search}&maxResults=12&key=${process.env.API_KEY}`
//   );
//   const data = await response.json();
//   res.send(data);
// }
