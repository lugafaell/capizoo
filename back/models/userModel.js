class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }
}

const db = require("../config/db");
const bcrypt = require("bcryptjs");

const addUser = (username, password) => {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        return reject(err);
      }

      const query = "INSERT INTO users (username, password) VALUES (?, ?)";
      db.query(query, [username, hashedPassword], (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  });
};

const getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE username = ?";
    db.query(query, [username], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users WHERE id = ?";
    db.query(query, [id], (err, results) => {
      if (err) {
        return reject(err);
      }
      if (results.length > 0) {
        resolve(results[0]);
      } else {
        resolve(null);
      }
    });
  });
};

const getUsers = () => {
  return new Promise((resolve, reject) => {
    const query = "SELECT * FROM users";
    db.query(query, (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results);
    });
  });
};

module.exports = { addUser, getUserByUsername, getUsers, getUserById };
