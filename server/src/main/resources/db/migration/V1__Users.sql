CREATE TABLE users (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(255) NOT NULL,
                      name VARCHAR(255),
                      email VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      location VARCHAR(255)
);

