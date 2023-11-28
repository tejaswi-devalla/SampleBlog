CREATE TABLE User (
  UserID INTEGER PRIMARY KEY,
  Username TEXT,
  Email TEXT
);

INSERT INTO User (Username, Email) VALUES
  ('xyz', 'xyz@gmail.com'),
  ('abc', 'abc@gmail.com');

CREATE TABLE Post (
  PostID INTEGER PRIMARY KEY,
  Title TEXT,
  Content TEXT,
  AuthorID INTEGER,
  FOREIGN KEY (AuthorID) REFERENCES User(UserID)
);

INSERT INTO Post (Title, Content, AuthorID) VALUES
  ('First Post', 'Content of first post.', 1),
  ('Second Post', 'Content of the second post.', 2);

CREATE TABLE Comment (
  CommentID INTEGER PRIMARY KEY,
  Text TEXT,
  UserID INTEGER, 
  PostID INTEGER,
  FOREIGN KEY (UserID) REFERENCES User(UserID),
  FOREIGN KEY (PostID) REFERENCES Post(PostID)
);

INSERT INTO Comment (Text, UserID, PostID) VALUES
  ('Excellent post!', 1, 1),
  ('This is interesting.', 2, 1),
  ('Makes Sense!', 1, 2);

SELECT Post.*, User.Username, User.Email
FROM Post
JOIN User ON Post.AuthorID = User.UserID
WHERE User.UserID = 1;