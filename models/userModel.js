// importing pg-promise from the config file
const db = require('../db/config');

// creating a model object
const User = {};

// creating the findAll method to find all books belonging to user
User.findAll = id => {
    return db.query('SELECT * FROM users JOIN users_books ON users.id = users_books.user_ref_id JOIN books ON users_books.book_ref_id = books.id WHERE users.id = $1', [id]);
};

// creating the create new user method
User.create = user => {
    return db.one(
        `
        INSERT INTO users
        (username, email, password)
        VALUES ($1, $2, $3) RETURNING *
        `
        [user.username, user.email, user.password]
    );
};

// creating the update user's book method
User.update = (users_book, id) => {
    return db.none(
        `
        UPDATE users_books SET
        status = $1,
        review = $2,
        date_started = $3,
        date_finished = $4
        WHERE id = $5
        `,
        [users_book.status, users_book.review, users_book.date_started, users_book.date_finished]
    );
};

// creating the delete method
User.destroy = id => {
    return db.none(
        `
        DELETE FROM users_books
        WHERE id = $1
        `,
        [id]
    );
};

// exporting the user model
module.exports = User;