CREATE TABLE contacts (
                          id INT AUTO_INCREMENT PRIMARY KEY,
                          user_id INT,
                          contact_user_id INT,
                          FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
                          FOREIGN KEY (contact_user_id) REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
);