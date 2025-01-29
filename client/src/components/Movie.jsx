import Auth from "../utils/auth";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

export default function Movie({ movie, handleSaveMovie, savedMovieIds }) {
  return (
    <Col md="4">
      <Card border="dark">
        {movie?.image ? (
          <Card.Img
            src={movie.image}
            alt={`The cover for ${movie.title}`}
            variant="top"
          />
        ) : null}
        <Card.Body>
          <Card.Title>{movie.title}</Card.Title>
          <p className="small">Director(s): {movie.director}</p>
          <Card.Text>{movie.description}</Card.Text>
          {Auth.loggedIn() && (
            <Button
              disabled={savedMovieIds?.some(
                (savedMovieId) => savedMovieId === movie.movieId
              )}
              className="btn-block btn-info"
              onClick={() => handleSaveMovie(movie.movieId)}
            >
              {savedMovieIds?.some((savedMovieId) => savedMovieId === movie.movieId)
                ? "This movie has already been saved!"
                : "Save this Movie!"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
