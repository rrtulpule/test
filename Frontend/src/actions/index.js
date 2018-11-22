import axios from "axios";

export const FETCH_BOOKS = "fetch_books";
export const CREATE_BOOK = "create_book";

const ROOT_URL = "http://localhost:3001";

//target action
export function fetchBooks() {
  //middleware call
  //receive response from backend
  const response = axios.get(`${ROOT_URL}/books`);
  //Action dispatched
  console.log("in Response",response);
  return {
    type: FETCH_BOOKS,
    payload: response
  };
}

export function createBook(values, callback) {
  const request = axios
    .post(`${ROOT_URL}/login`, values)
    .then(() => callback());

  return {
    type: FETCH_BOOKS,
    payload: request
  };
}

