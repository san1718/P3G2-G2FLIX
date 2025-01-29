// BOOKS

export const getSavedBookIds = () => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : [];

  return savedBookIds;
};

export const saveBookIds = (bookIdArr) => {
  if (bookIdArr.length) {
    localStorage.setItem('saved_books', JSON.stringify(bookIdArr));
  } else {
    localStorage.removeItem('saved_books');
  }
};

export const removeBookId = (bookId) => {
  const savedBookIds = localStorage.getItem('saved_books')
    ? JSON.parse(localStorage.getItem('saved_books'))
    : null;

  if (!savedBookIds) {
    return false;
  }

  const updatedSavedBookIds = savedBookIds?.filter((savedBookId) => savedBookId !== bookId);
  localStorage.setItem('saved_books', JSON.stringify(updatedSavedBookIds));

  return true;
};

// MOVIES

export const getSavedMovieIds = () => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : [];

  return savedMovieIds;
};

export const saveMovieIds = (movieIdArr) => {
  if (movieIdArr.length) {
    localStorage.setItem('saved_movies', JSON.stringify(movieIdArr));
  } else {
    localStorage.removeItem('saved_movies');
  }
};

export const removeMovieId = (movieId) => {
  const savedMovieIds = localStorage.getItem('saved_movies')
    ? JSON.parse(localStorage.getItem('saved_movies'))
    : null;

  if (!savedMovieIds) {
    return false;
  }

  const updatedSavedMovieIds = savedMovieIds?.filter((savedMovieId) => savedMovieId !== movieId);
  localStorage.setItem('saved_movies', JSON.stringify(updatedSavedMovieIds));

  return true;
};
