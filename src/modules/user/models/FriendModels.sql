CREATE TABLE IF NOT EXISTS `FriendModels` (
  `child` int(11) NOT NULL,
  `parent` int(11) NOT NULL,
  `accepted` int(1) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

ALTER TABLE `FriendModels`
  ADD PRIMARY KEY (`child`,`parent`) USING BTREE,
  ADD KEY `parent` (`parent`);

ALTER TABLE `FriendModels`
  ADD CONSTRAINT `FriendModels_ibfk_1` FOREIGN KEY (`child`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FriendModels_ibfk_2` FOREIGN KEY (`parent`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;
