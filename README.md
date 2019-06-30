# photo-upload
upload a photo node.js
db schema :
 CREATE TABLE `bindata` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `data` BLOB,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
