CREATE DATABASE chat;

USE chat;

CREATE TABLE messages (
  id int NOT NULL,
  username varchar(50),
  roomname varchar(50),
  text varchar(400),
  PRIMARY KEY (id)
  /* Describe your table here.*/
);

/* Create other tables and define schemas for them here! */




/*  Execute this file from the command line by typing:
 *    mysql -u root < server/schema.sql
 *  to create the database and the tables.*/

