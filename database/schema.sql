CREATE DATABASE IF NOT EXISTS bedroostimages;

USE bedroostimages;

CREATE TABLE IF NOT EXISTS listings (
  listingID INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(40),
  PRIMARY KEY (listingID)
);

CREATE TABLE IF NOT EXISTS images (
  listing_id INT NOT NULL,
  ImageID INT AUTO_INCREMENT PRIMARY KEY,
  ImageUrl VARCHAR(200),
  Caption VARCHAR(40),
  Verified INT,
  FOREIGN KEY (listing_ID)
    REFERENCES listings (listingID)
);