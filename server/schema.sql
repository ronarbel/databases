DROP DATABASE IF EXISTS chat;

CREATE DATABASE chat;

USE chat;

CREATE TABLE rooms (
  id int NOT NULL AUTO_INCREMENT,
  roomname varchar(50),
  PRIMARY KEY (id)
);
ALTER TABLE rooms AUTO_INCREMENT=1;

CREATE TABLE username (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(50),
  PRIMARY KEY (id)
);
ALTER TABLE username AUTO_INCREMENT=1;

CREATE TABLE messages (
  id int NOT NULL AUTO_INCREMENT,
  username_id int NOT NULL,
  roomname_id int NOT NULL,
  text varchar(400),
  PRIMARY KEY (id),
  FOREIGN KEY (username_id) REFERENCES username(id),
  FOREIGN KEY (roomname_id) REFERENCES rooms(id)
);
ALTER TABLE messages AUTO_INCREMENT=1;
/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u student < server/schema.sql
 *  to create the database and the tables.*/

