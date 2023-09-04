CREATE TABLE User (
                      id INT AUTO_INCREMENT PRIMARY KEY,
                      username VARCHAR(255) NOT NULL,
                      name VARCHAR(255),
                      email VARCHAR(255) NOT NULL,
                      password VARCHAR(255) NOT NULL,
                      location VARCHAR(255)
);

CREATE TABLE Contact (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         userid INT,
                         contactuserid INT,
                         FOREIGN KEY (userid) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
                         FOREIGN KEY (contactuserid) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);

CREATE TABLE Message (
                         id INT AUTO_INCREMENT PRIMARY KEY,
                         senderid INT,
                         receiverid INT,
                         message TEXT,
                         timestamp TIMESTAMP,
                         FOREIGN KEY (senderid) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE,
                         FOREIGN KEY (receiverid) REFERENCES User(id) ON DELETE CASCADE ON UPDATE CASCADE
);
