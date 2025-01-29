import { useState, useEffect } from "react";
import { Container, Card, Button, Row, Col, Accordion } from "react-bootstrap";
import { useQuery, useMutation } from "@apollo/client";
import Auth from "../utils/auth";
import { QUERY_ME } from "../utils/queries";
import { REMOVEBOOK, REMOVEMOVIE } from "../utils/mutations";
import { removeBookId, removeMovieId } from "../utils/localStorage";

const SavedTitles = () => {
  const { loading, data, error: userError } = useQuery(QUERY_ME);
  const [removeBook, { error: bookError }] = useMutation(REMOVEBOOK, {
    refetchQueries: [QUERY_ME, "me"],
  });
  const [removeMovie, { error: movieError }] = useMutation(REMOVEMOVIE, {
    refetchQueries: [QUERY_ME, "me"],
  });
  const userData = data?.me || [];
  // create function that accepts the book's mongo _id value as param and deletes the book from the database
  const handleDeleteBook = async (bookId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data, error } = await removeBook({ variables: { bookId } });
      console.log(error);
      // upon success, remove book's id from localStorage
      removeBookId(bookId);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteMovie = async (movieId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { data, error } = await removeMovie({ variables: { movieId } });
      console.log(error);
      // upon success, remove movie's id from localStorage
      removeMovieId(movieId);
    } catch (err) {
      console.error(err);
    }
  };

  // if data isn't here yet, say so
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  if (userError) {
    console.log(userError);
  }

  return (
    <>
      <div fluid className="text-light bg-dark p-5">
        <Container>
          <h1>Viewing saved titles!</h1>
        </Container>
      </div>
      <Container>
        <h2 className="pt-5">
          {userData.savedBooks.length
            ? `Viewing ${userData.savedBooks.length} saved ${
                userData.savedBooks.length === 1 ? "book" : "books"
              }:`
            : "You have no saved books!"}
        </h2>
        <Row>
          {userData.savedBooks.map((book) => {
            return (
              <Col md="4">
                <Card key={book.bookId} border="dark">
                  {book.image ? (
                    <Card.Img
                      src={book.image}
                      alt={`The cover for ${book.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{book.title}</Card.Title>
                    <p className="small">Authors: {book.authors}</p>
                    {/* <Card.Text>{book.description}</Card.Text> */}
                    <Accordion defaultActiveKey="0">
                      <Accordion.Item eventKey="0">
                        <Accordion.Header>Description</Accordion.Header>
                        <Accordion.Body>{book.description}</Accordion.Body>
                      </Accordion.Item>
                    </Accordion>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteBook(book.bookId)}
                    >
                      Delete this Book!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
      <Container>
        <h2 className="pt-5">
          {userData.savedMovies.length
            ? `Viewing ${userData.savedMovies.length} saved ${
                userData.savedMovies.length === 1 ? "movie" : "movies"
              }:`
            : "You have no saved movies!"}
        </h2>
        <Row>
          {userData.savedMovies.map((movie) => {
            return (
              <Col md="4">
                <Card key={movie.movieId} border="dark">
                  {movie.image ? (
                    <Card.Img
                      src={movie.image}
                      alt={`The poster for ${movie.title}`}
                      variant="top"
                    />
                  ) : null}
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <p className="small">Authors: {movie.authors}</p>
                    <Card.Text>{movie.description}</Card.Text>
                    <Button
                      className="btn-block btn-danger"
                      onClick={() => handleDeleteMovie(movie.movieId)}
                    >
                      Delete this Movie!
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </>
  );
};

export default SavedTitles;
