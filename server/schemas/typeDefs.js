// Using books(googleBooks) and movies(OMDb)
const typeDefs = `

    type User {
        _id: ID!
        username: String!
        email: String!
        bookCount: Int
        savedBooks: [Book]
        movieCount: Int
        savedMovies: [Movie]
        
    }
    
    type Book {
        bookId: ID!
        authors: [String]
        description: String!
        title: String!
        image: String
    }

    type Auth {
        token: ID!
        user: User
    }

    input BookInput {
        bookId: String!
        authors: [String]
        description: String!
        title: String!
        image: String
    }

    type Movie {
        movieId: ID!
        director: String
        description: String!
        title: String!
        image: String
    }

    input MovieInput {
        movieId: String!
        director: String
        description: String!
        title: String!
        image: String
    }
    
    type Query {
        me: User
    }

    type Mutation {
        loginUser(email: String!, password: String!): Auth
        userAdd(username: String!, email: String!, password: String!): Auth
        
        saveBook(bookInput: BookInput): User
        removeBook(bookId: ID!): User
        
        saveMovie(movieInput: MovieInput): User
        removeMovie(movieId: ID!): User
    }
`;

module.exports = typeDefs;
