const BASE_URL = `${process.env.REACT_APP_BACKEND_SERVER_URL}/api/books`;

async function getAllBooks() {
  const date = await fetch(BASE_URL, {
    method: "POST",
  });
}
