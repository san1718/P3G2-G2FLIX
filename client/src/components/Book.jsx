import Auth from "../utils/auth";
import { Container, Col, Form, Button, Card, Row } from "react-bootstrap";

export default function Book({ book, handleSaveBook, savedBookIds }) {
  return (
    <Col md="4">
      <Card border="dark">
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
          <Card.Text>{book.description}</Card.Text>
          {Auth.loggedIn() && (
            <Button
              disabled={savedBookIds?.some(
                (savedBookId) => savedBookId === book.bookId
              )}
              className="btn-block btn-info"
              onClick={() => handleSaveBook(book.bookId)}
            >
              {savedBookIds?.some((savedBookId) => savedBookId === book.bookId)
                ? "This book has already been saved!"
                : "Save this Book!"}
            </Button>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
}
