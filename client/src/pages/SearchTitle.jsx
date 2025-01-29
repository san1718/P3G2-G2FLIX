import { useState, useEffect } from "react";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

import Book from "../components/Book";
import Movie from "../components/Movie";
import Auth from "../utils/auth";
import { searchGoogleBooks, searchMovie } from "../utils/API";
import {
  saveBookIds,
  getSavedBookIds,
  saveMovieIds,
  getSavedMovieIds,
} from "../utils/localStorage";
import { useMutation } from "@apollo/client";
import { SAVEBOOK, SAVEMOVIE } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

const SearchTitle = () => {
  // create state for holding returned google api data
  const [searchedBooks, setSearchedBooks] = useState([]);

  const [searchedMovies, setSearchedMovies] = useState([]);
  // create state for holding our search field data
  const [searchInput, setSearchInput] = useState("");

  const [mediaType, setMediaType] = useState("Book");
  // create state to hold saved bookId values
  const [savedBookIds, setSavedBookIds] = useState(getSavedBookIds());

  const [savedMovieIds, setSavedMovieIds] = useState(getSavedMovieIds());

  const [saveBook] = useMutation(SAVEBOOK, {
    refetchQueries: [QUERY_ME, "me"],
  });
  const [saveMovie] = useMutation(SAVEMOVIE, {
    refetchQueries: [QUERY_ME, "me"],
  });

  // set up useEffect hook to save `savedBookIds` list to localStorage on component unmount
  // learn more here: https://reactjs.org/docs/hooks-effect.html#effects-with-cleanup
  useEffect(() => {
    return () => saveBookIds(savedBookIds);
  });

  useEffect(() => {
    return () => saveMovieIds(savedMovieIds);
  });

  // create method to search for books and set state on form submit
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (!searchInput) {
      return false;
    }
    setSearchedBooks([]);
    setSearchedMovies([]);
    try {
      let response = null;
      if (mediaType === "Book") {
        response = await searchGoogleBooks(searchInput);
      } else {
        response = await searchMovie(searchInput);
      }

      if (!response.ok) {
        throw new Error("something went wrong!");
      }
      // console.log(await response.json());

      if (mediaType === "Book") {
        const { items } = await response.json();

        const bookData = items.map((book) => ({
          bookId: book.id,
          authors: book.volumeInfo.authors || ["No author to display"],
          title: book.volumeInfo.title,
          description: book.volumeInfo.description,
          image: book.volumeInfo.imageLinks?.thumbnail || "",
        }));

        setSearchedBooks(bookData);
      } else {
        const movie = await response.json();

        const movieData = [
          {
            movieId: movie.imdbID,
            director: movie.Director || ["No director to display"],
            title: movie.Title,
            description: movie.Plot,
            image: movie.Poster || "",
          },
        ];

        setSearchedMovies(movieData);

        // console.log(await response.json());
      }
      setSearchInput("");
    } catch (err) {
      console.error(err);
    }
  };

  const handleSaveMovie = async (movieId) => {
    const movieToSave = searchedMovies.find(
      (movie) => movie.movieId === movieId
    );

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = saveMovie({
        variables: {
          movieInput: {
            ...movieToSave,
          },
        },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedMovieIds([...savedMovieIds, movieToSave.movieId]);
    } catch (err) {
      console.error(err);
    }
  };

  // create function to handle saving a book to our database
  const handleSaveBook = async (bookId) => {
    // find the book in `searchedBooks` state by the matching id
    const bookToSave = searchedBooks.find((book) => book.bookId === bookId);

    // get token
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data } = saveBook({
        variables: {
          bookInput: {
            ...bookToSave,
          },
        },
      });

      // if book successfully saves to user's account, save book id to state
      setSavedBookIds([...savedBookIds, bookToSave.bookId]);
    } catch (err) {
      console.error(err);
    }
  };

  // Movies

  return (
    <>
      <div className="text-light bg-dark p-5">
        <Container>
          <h1>Search for Title!</h1>
          <Form onSubmit={handleFormSubmit}>
            <Row>
              <Col xs={12} md={6}>
                <Form.Control
                  name="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  type="text"
                  size="lg"
                  placeholder="Search for a book"
                />
              </Col>
              <Col xs={12} md={3}>
                <Form.Select
                  name="mediaType"
                  value={mediaType}
                  onChange={(e) => setMediaType(e.target.value)}
                >
                  <option value="Book">Book</option>
                  <option value="Movie">Movie</option>
                </Form.Select>
              </Col>
              <Col xs={12} md={3}>
                <Button type="submit" variant="success" size="lg">
                  Submit Search
                </Button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>

      <Container>
        <h2 className="pt-5">
          {searchedBooks.length
            ? `Viewing ${searchedBooks.length} results:`
            : "Search for a title to begin"}
        </h2>
        <Row>
          {searchedBooks.map((book) => (
            <Book
              key={book.id}
              book={book}
              handleSaveBook={handleSaveBook}
              savedBookIds={savedBookIds}
            />
          ))}
          {searchedMovies.map((movie) => (
            <Movie
              key={movie.id}
              movie={movie}
              handleSaveMovie={handleSaveMovie}
              savedMovieIds={savedMovieIds}
            />
          ))}
        </Row>
      </Container>
    </>
  );
};

export default SearchTitle;
