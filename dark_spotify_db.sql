-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Aug 04, 2022 at 12:23 PM
-- Server version: 10.8.3-MariaDB-log
-- PHP Version: 8.1.7

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `dark_spotify_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `AlbumGenreModels`
--

CREATE TABLE `AlbumGenreModels` (
  `id` int(11) NOT NULL,
  `album_id` int(11) DEFAULT NULL,
  `genre_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `AlbumModels`
--

CREATE TABLE `AlbumModels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `release_date` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `AlbumModels`
--

INSERT INTO `AlbumModels` (`id`, `name`, `image`, `release_date`, `createdAt`, `updatedAt`) VALUES
(1, 'Album1', 'image.png', 1649435690, '2022-04-08 19:34:29', '2022-04-08 19:34:29');

-- --------------------------------------------------------

--
-- Table structure for table `AlbumTypeModels`
--

CREATE TABLE `AlbumTypeModels` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `album_type_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `ArtistAlbumModels`
--

CREATE TABLE `ArtistAlbumModels` (
  `artist_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `ArtistGenreModels`
--

CREATE TABLE `ArtistGenreModels` (
  `genre_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `ArtistModels`
--

CREATE TABLE `ArtistModels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(100) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `ArtistModels`
--

INSERT INTO `ArtistModels` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Artist1', NULL, '2022-04-08 19:35:14', '2022-04-08 19:35:14');

-- --------------------------------------------------------

--
-- Table structure for table `AuthAssignmentMinModels`
--

CREATE TABLE `AuthAssignmentMinModels` (
  `id` int(11) NOT NULL,
  `child` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `AuthAssignmentMinModels`
--

INSERT INTO `AuthAssignmentMinModels` (`id`, `child`, `parent`, `createdAt`, `updatedAt`) VALUES
(2, 3, 1, '2022-04-12 11:09:24', '2022-04-12 11:09:24'),
(3, 4, 1, '2022-04-12 11:09:24', '2022-04-12 11:09:24'),
(4, 3, 2, '2022-04-12 11:09:24', '2022-04-12 11:09:24'),
(5, 4, 2, '2022-04-12 11:09:24', '2022-04-12 11:09:24');

-- --------------------------------------------------------

--
-- Table structure for table `AuthAssignmentModels`
--

CREATE TABLE `AuthAssignmentModels` (
  `id` int(11) NOT NULL,
  `child` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `AuthAssignmentModels`
--

INSERT INTO `AuthAssignmentModels` (`id`, `child`, `parent`, `createdAt`, `updatedAt`) VALUES
(1, 1, 2, '2022-04-12 11:08:45', '2022-04-12 11:08:45'),
(2, 2, 3, '2022-04-12 11:08:45', '2022-04-12 11:08:45'),
(3, 2, 4, '2022-04-12 11:08:45', '2022-04-12 11:08:45');

-- --------------------------------------------------------

--
-- Table structure for table `FriendModels`
--

CREATE TABLE `FriendModels` (
  `id` int(11) NOT NULL,
  `child` int(11) DEFAULT NULL,
  `parent` int(11) DEFAULT NULL,
  `accepted` int(11) DEFAULT NULL,
  `initiator` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `FriendModels`
--

INSERT INTO `FriendModels` (`id`, `child`, `parent`, `accepted`, `initiator`, `createdAt`, `updatedAt`) VALUES
(1, 5, 4, 1, 3, '2022-07-05 19:10:38', '2022-07-05 19:56:44'),
(2, 4, 5, 1, 3, '2022-07-05 19:11:00', '2022-07-05 19:56:44'),
(3, 3, 5, 1, 3, '2022-07-17 10:26:22', '2022-07-17 11:24:40'),
(4, 5, 3, 1, 3, '2022-07-17 10:26:22', '2022-07-17 11:24:40'),
(5, 5, 6, 0, 3, '2022-07-17 11:26:31', '2022-07-17 11:26:31'),
(6, 6, 5, 0, 3, '2022-07-17 11:26:31', '2022-07-17 11:26:31'),
(7, 3, 6, 0, 3, '2022-08-04 10:58:19', '2022-08-04 10:58:19'),
(8, 6, 3, 0, 3, '2022-08-04 10:58:19', '2022-08-04 10:58:19');

-- --------------------------------------------------------

--
-- Table structure for table `GenreModels`
--

CREATE TABLE `GenreModels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `GenreModels`
--

INSERT INTO `GenreModels` (`id`, `name`, `createdAt`, `updatedAt`) VALUES
(1, 'Genre1', '2022-04-08 19:35:34', '2022-04-08 19:35:34');

-- --------------------------------------------------------

--
-- Table structure for table `PlaylistGenreModels`
--

CREATE TABLE `PlaylistGenreModels` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `PlaylistModels`
--

CREATE TABLE `PlaylistModels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `PlaylistModels`
--

INSERT INTO `PlaylistModels` (`id`, `name`, `image`, `createdAt`, `updatedAt`) VALUES
(1, 'Playlist 1', 'cover_1658084656177.jpeg', '2022-04-13 01:25:02', '2022-04-13 01:25:02'),
(16, 'Ne22wPlaylist2223', 'cover_1658090181759.jpeg', '2022-07-17 19:24:09', '2022-07-17 20:36:21'),
(17, 'NewPlaylist', NULL, '2022-07-17 20:19:52', '2022-07-17 20:19:52'),
(18, 'NewPlaylist', NULL, '2022-07-17 20:27:10', '2022-07-17 20:27:10'),
(19, 'NewPlaylist22', NULL, '2022-08-04 12:06:25', '2022-08-04 12:06:25');

-- --------------------------------------------------------

--
-- Table structure for table `PlaylistSongModels`
--

CREATE TABLE `PlaylistSongModels` (
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `playlist_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `PlaylistSongModels`
--

INSERT INTO `PlaylistSongModels` (`createdAt`, `updatedAt`, `playlist_id`, `song_id`) VALUES
('2022-04-13 01:25:51', '2022-04-13 01:25:51', 1, 1),
('2022-04-13 01:25:51', '2022-04-13 01:25:51', 1, 2),
('2022-04-13 01:25:51', '2022-04-13 01:25:51', 1, 3),
('2022-07-17 20:29:36', '2022-07-17 20:29:36', 16, 1),
('2022-07-17 20:29:36', '2022-07-17 20:29:36', 16, 3),
('2022-07-17 20:19:52', '2022-07-17 20:19:52', 17, 1),
('2022-07-17 20:19:52', '2022-07-17 20:19:52', 17, 2),
('2022-07-17 20:19:52', '2022-07-17 20:19:52', 17, 3),
('2022-07-17 20:27:10', '2022-07-17 20:27:10', 18, 1),
('2022-07-17 20:27:10', '2022-07-17 20:27:10', 18, 2),
('2022-07-17 20:27:10', '2022-07-17 20:27:10', 18, 3),
('2022-08-04 12:06:25', '2022-08-04 12:06:25', 19, 1),
('2022-08-04 12:06:25', '2022-08-04 12:06:25', 19, 2),
('2022-08-04 12:06:25', '2022-08-04 12:06:25', 19, 3);

-- --------------------------------------------------------

--
-- Table structure for table `PlaylistUserModels`
--

CREATE TABLE `PlaylistUserModels` (
  `owner` tinyint(1) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `user_id` int(11) NOT NULL,
  `playlist_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `PlaylistUserModels`
--

INSERT INTO `PlaylistUserModels` (`owner`, `createdAt`, `updatedAt`, `user_id`, `playlist_id`) VALUES
(1, '2022-07-17 19:24:09', '2022-07-17 19:24:09', 3, 16),
(1, '2022-07-17 20:19:52', '2022-07-17 20:19:52', 3, 17),
(1, '2022-07-17 20:27:10', '2022-07-17 20:27:10', 3, 18),
(1, '2022-08-04 12:06:25', '2022-08-04 12:06:25', 3, 19);

-- --------------------------------------------------------

--
-- Table structure for table `PlaylistVisibleTypeModels`
--

CREATE TABLE `PlaylistVisibleTypeModels` (
  `id` int(11) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `RuleModels`
--

CREATE TABLE `RuleModels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `RuleModels`
--

INSERT INTO `RuleModels` (`id`, `name`, `description`, `createdAt`, `updatedAt`) VALUES
(1, 'Role 1', 'Description', '2022-04-12 11:07:48', '2022-04-12 11:07:48'),
(2, 'Role 2', 'Description', '2022-04-12 11:07:48', '2022-04-12 11:07:48'),
(3, 'Role 3', 'Description', '2022-04-12 11:07:48', '2022-04-12 11:07:48'),
(4, 'Role 4', 'Description', '2022-04-12 11:07:48', '2022-04-12 11:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `SongAlbumModels`
--

CREATE TABLE `SongAlbumModels` (
  `song_id` int(11) NOT NULL,
  `album_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `SongAlbumModels`
--

INSERT INTO `SongAlbumModels` (`song_id`, `album_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2022-04-08 19:44:20', '2022-04-08 19:44:20'),
(2, 1, '2022-04-08 19:44:20', '2022-04-08 19:44:20'),
(3, 1, '2022-04-08 19:44:20', '2022-04-08 19:44:20'),
(31, 1, '2022-04-19 09:34:06', '2022-04-19 09:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `SongArtistModels`
--

CREATE TABLE `SongArtistModels` (
  `song_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `SongArtistModels`
--

INSERT INTO `SongArtistModels` (`song_id`, `artist_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2022-04-08 19:43:39', '2022-04-08 19:43:39'),
(2, 1, '2022-04-08 19:43:39', '2022-04-08 19:43:39'),
(3, 1, '2022-04-08 19:43:39', '2022-04-08 19:43:39'),
(28, 1, '2022-04-19 09:22:04', '2022-04-19 09:22:04'),
(31, 1, '2022-04-19 09:34:06', '2022-04-19 09:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `SongGenreModels`
--

CREATE TABLE `SongGenreModels` (
  `song_id` int(11) NOT NULL,
  `genre_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `SongGenreModels`
--

INSERT INTO `SongGenreModels` (`song_id`, `genre_id`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2022-04-08 19:43:12', '2022-04-08 19:43:12'),
(2, 1, '2022-04-08 19:43:12', '2022-04-08 19:43:12'),
(31, 1, '2022-04-19 09:34:06', '2022-04-19 09:34:06');

-- --------------------------------------------------------

--
-- Table structure for table `SongModels`
--

CREATE TABLE `SongModels` (
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `path` varchar(256) NOT NULL,
  `duration` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `SongModels`
--

INSERT INTO `SongModels` (`id`, `name`, `path`, `duration`, `createdAt`, `updatedAt`) VALUES
(1, 'Song 1', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360845895.mp3', 152, '2022-04-08 19:41:53', '2022-07-26 16:55:37'),
(2, 'Song 2', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360845895.mp3', 152, '2022-04-08 19:41:53', '2022-07-26 16:55:37'),
(3, 'Song 3', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360845895.mp3', 152, '2022-04-08 19:41:53', '2022-07-26 16:55:37'),
(4, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650357516607.mp3', 152, '2022-04-19 08:38:36', '2022-07-26 16:55:37'),
(5, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650357516662.mp3', 223, '2022-04-19 08:38:36', '2022-07-26 16:55:37'),
(6, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650357516694.mp3', 144, '2022-04-19 08:38:36', '2022-07-26 16:55:37'),
(7, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650357568405.mp3', 152, '2022-04-19 08:39:28', '2022-07-26 16:55:37'),
(8, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650357568453.mp3', 223, '2022-04-19 08:39:28', '2022-07-26 16:55:37'),
(9, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650357568495.mp3', 144, '2022-04-19 08:39:28', '2022-07-26 16:55:37'),
(10, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650358498054.mp3', 152, '2022-04-19 08:54:58', '2022-07-26 16:55:37'),
(11, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650358498117.mp3', 223, '2022-04-19 08:54:58', '2022-07-26 16:55:37'),
(12, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650358498153.mp3', 144, '2022-04-19 08:54:58', '2022-07-26 16:55:37'),
(13, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650358891679.mp3', 152, '2022-04-19 09:01:31', '2022-07-26 16:55:37'),
(14, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650358891733.mp3', 223, '2022-04-19 09:01:31', '2022-07-26 16:55:37'),
(15, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650358891759.mp3', 144, '2022-04-19 09:01:31', '2022-07-26 16:55:37'),
(16, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359543664.mp3', 152, '2022-04-19 09:12:23', '2022-07-26 16:55:37'),
(17, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359543727.mp3', 223, '2022-04-19 09:12:23', '2022-07-26 16:55:37'),
(18, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359543762.mp3', 144, '2022-04-19 09:12:23', '2022-07-26 16:55:37'),
(19, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359851146.mp3', 152, '2022-04-19 09:17:31', '2022-07-26 16:55:37'),
(20, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359851203.mp3', 223, '2022-04-19 09:17:31', '2022-07-26 16:55:37'),
(21, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359851250.mp3', 144, '2022-04-19 09:17:31', '2022-07-26 16:55:37'),
(22, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359938491.mp3', 152, '2022-04-19 09:18:58', '2022-07-26 16:55:37'),
(23, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359938549.mp3', 223, '2022-04-19 09:18:58', '2022-07-26 16:55:37'),
(24, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359938581.mp3', 144, '2022-04-19 09:18:58', '2022-07-26 16:55:37'),
(25, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359998302.mp3', 152, '2022-04-19 09:19:58', '2022-07-26 16:55:37'),
(26, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359998363.mp3', 223, '2022-04-19 09:19:58', '2022-07-26 16:55:37'),
(27, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650359998396.mp3', 144, '2022-04-19 09:19:58', '2022-07-26 16:55:37'),
(28, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360123894.mp3', 152, '2022-04-19 09:22:04', '2022-07-26 16:55:37'),
(29, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360123954.mp3', 223, '2022-04-19 09:22:04', '2022-07-26 16:55:37'),
(30, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360123979.mp3', 144, '2022-04-19 09:22:04', '2022-07-26 16:55:37'),
(31, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360845895.mp3', 152, '2022-04-19 09:34:06', '2022-07-26 16:55:37'),
(32, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360845968.mp3', 223, '2022-04-19 09:34:06', '2022-07-26 16:55:37'),
(33, 'Unnamed song', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1650360845996.mp3', 144, '2022-04-19 09:34:06', '2022-07-26 16:55:37'),
(34, 'newSong', '/home/dudosyka/Documents/dark-spotify-backend/files/songs/song_1657985731706.undefined', 11, '2022-07-16 15:35:31', '2022-07-26 16:55:37');

-- --------------------------------------------------------

--
-- Table structure for table `SubscribeModels`
--

CREATE TABLE `SubscribeModels` (
  `user_id` int(11) NOT NULL,
  `artist_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

-- --------------------------------------------------------

--
-- Table structure for table `UserModels`
--

CREATE TABLE `UserModels` (
  `id` int(11) NOT NULL,
  `login` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `listened_time` int(11) DEFAULT NULL,
  `status_song` int(11) DEFAULT NULL,
  `refresh` varchar(1000) NOT NULL,
  `closed` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `UserModels`
--

INSERT INTO `UserModels` (`id`, `login`, `password`, `image`, `listened_time`, `status_song`, `refresh`, `closed`, `createdAt`, `updatedAt`) VALUES
(3, 'dudosyka', '$2b$10$MUnS5mQms69NP93fRiTkq.cxsiZlGhXRHTgoqt.Jf.fHQi0h2ZZra', 'avatar_3.jpeg', 1358, 1, '1657047766', 0, '2022-04-08 19:32:26', '2022-08-04 10:58:03'),
(4, 'dudosyka2', 'pass', 'image.png', 0, NULL, '', 0, '2022-04-08 19:32:26', '2022-04-08 19:32:26'),
(5, 'dudosyka3', 'pass', 'image.png', 0, NULL, '', 1, '2022-04-08 19:32:26', '2022-04-08 19:32:26'),
(6, 'dudosyka4', '$2b$10$507ysAxHnnaMH/0fTlGDKOERnV6tnjgdmxs/DZHi3tQ4UXKbQ2OMu', '', 0, NULL, '', 0, '2022-05-13 07:17:11', '2022-05-13 07:17:11');

-- --------------------------------------------------------

--
-- Table structure for table `UserRuleModels`
--

CREATE TABLE `UserRuleModels` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `rule_id` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `UserRuleModels`
--

INSERT INTO `UserRuleModels` (`id`, `user_id`, `rule_id`, `createdAt`, `updatedAt`) VALUES
(1, 3, 1, '2022-04-12 11:12:33', '2022-04-12 11:12:33');

-- --------------------------------------------------------

--
-- Table structure for table `UserSongModels`
--

CREATE TABLE `UserSongModels` (
  `listen_count` int(11) DEFAULT NULL,
  `downloaded` tinyint(1) DEFAULT NULL,
  `liked` int(11) DEFAULT NULL,
  `user_id` int(11) NOT NULL,
  `song_id` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf16;

--
-- Dumping data for table `UserSongModels`
--

INSERT INTO `UserSongModels` (`listen_count`, `downloaded`, `liked`, `user_id`, `song_id`, `createdAt`, `updatedAt`) VALUES
(2, 0, 1, 3, 1, '2022-04-08 19:42:21', '2022-08-04 10:58:03'),
(1, 0, 1, 3, 2, '2022-04-08 19:42:43', '2022-07-26 17:33:53'),
(0, 0, 1, 3, 3, '2022-08-04 11:58:11', '2022-08-04 11:58:11'),
(0, 0, NULL, 3, 4, '2022-07-31 22:40:35', '2022-07-31 22:40:35'),
(2, 0, NULL, 3, 5, '2022-07-26 17:40:00', '2022-07-26 17:41:36'),
(0, 0, 1, 3, 22, '2022-08-04 12:20:04', '2022-08-04 12:20:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `AlbumGenreModels`
--
ALTER TABLE `AlbumGenreModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `AlbumModels`
--
ALTER TABLE `AlbumModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `AlbumTypeModels`
--
ALTER TABLE `AlbumTypeModels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `album_type_id` (`album_type_id`);

--
-- Indexes for table `ArtistAlbumModels`
--
ALTER TABLE `ArtistAlbumModels`
  ADD PRIMARY KEY (`artist_id`,`album_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `ArtistGenreModels`
--
ALTER TABLE `ArtistGenreModels`
  ADD PRIMARY KEY (`genre_id`,`artist_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `ArtistModels`
--
ALTER TABLE `ArtistModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `AuthAssignmentMinModels`
--
ALTER TABLE `AuthAssignmentMinModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `AuthAssignmentModels`
--
ALTER TABLE `AuthAssignmentModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `FriendModels`
--
ALTER TABLE `FriendModels`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `FriendModels_parent_child_unique` (`child`,`parent`),
  ADD KEY `parent` (`parent`),
  ADD KEY `initiator` (`initiator`);

--
-- Indexes for table `GenreModels`
--
ALTER TABLE `GenreModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PlaylistGenreModels`
--
ALTER TABLE `PlaylistGenreModels`
  ADD PRIMARY KEY (`playlist_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `PlaylistModels`
--
ALTER TABLE `PlaylistModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `PlaylistSongModels`
--
ALTER TABLE `PlaylistSongModels`
  ADD PRIMARY KEY (`playlist_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- Indexes for table `PlaylistUserModels`
--
ALTER TABLE `PlaylistUserModels`
  ADD PRIMARY KEY (`user_id`,`playlist_id`),
  ADD KEY `playlist_id` (`playlist_id`);

--
-- Indexes for table `PlaylistVisibleTypeModels`
--
ALTER TABLE `PlaylistVisibleTypeModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `RuleModels`
--
ALTER TABLE `RuleModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SongAlbumModels`
--
ALTER TABLE `SongAlbumModels`
  ADD PRIMARY KEY (`song_id`,`album_id`),
  ADD KEY `album_id` (`album_id`);

--
-- Indexes for table `SongArtistModels`
--
ALTER TABLE `SongArtistModels`
  ADD PRIMARY KEY (`song_id`,`artist_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `SongGenreModels`
--
ALTER TABLE `SongGenreModels`
  ADD PRIMARY KEY (`song_id`,`genre_id`),
  ADD KEY `genre_id` (`genre_id`);

--
-- Indexes for table `SongModels`
--
ALTER TABLE `SongModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `SubscribeModels`
--
ALTER TABLE `SubscribeModels`
  ADD PRIMARY KEY (`user_id`,`artist_id`),
  ADD KEY `artist_id` (`artist_id`);

--
-- Indexes for table `UserModels`
--
ALTER TABLE `UserModels`
  ADD PRIMARY KEY (`id`),
  ADD KEY `status_song` (`status_song`);

--
-- Indexes for table `UserRuleModels`
--
ALTER TABLE `UserRuleModels`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `UserSongModels`
--
ALTER TABLE `UserSongModels`
  ADD PRIMARY KEY (`user_id`,`song_id`),
  ADD KEY `song_id` (`song_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `AlbumGenreModels`
--
ALTER TABLE `AlbumGenreModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `AlbumModels`
--
ALTER TABLE `AlbumModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `AlbumTypeModels`
--
ALTER TABLE `AlbumTypeModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `ArtistModels`
--
ALTER TABLE `ArtistModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `AuthAssignmentMinModels`
--
ALTER TABLE `AuthAssignmentMinModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `AuthAssignmentModels`
--
ALTER TABLE `AuthAssignmentModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `FriendModels`
--
ALTER TABLE `FriendModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `GenreModels`
--
ALTER TABLE `GenreModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `PlaylistModels`
--
ALTER TABLE `PlaylistModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `PlaylistVisibleTypeModels`
--
ALTER TABLE `PlaylistVisibleTypeModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `RuleModels`
--
ALTER TABLE `RuleModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `SongModels`
--
ALTER TABLE `SongModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `UserModels`
--
ALTER TABLE `UserModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `UserRuleModels`
--
ALTER TABLE `UserRuleModels`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `AlbumTypeModels`
--
ALTER TABLE `AlbumTypeModels`
  ADD CONSTRAINT `AlbumTypeModels_ibfk_1` FOREIGN KEY (`album_type_id`) REFERENCES `AlbumModels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `ArtistAlbumModels`
--
ALTER TABLE `ArtistAlbumModels`
  ADD CONSTRAINT `ArtistAlbumModels_ibfk_1` FOREIGN KEY (`artist_id`) REFERENCES `ArtistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ArtistAlbumModels_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `AlbumModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `ArtistGenreModels`
--
ALTER TABLE `ArtistGenreModels`
  ADD CONSTRAINT `ArtistGenreModels_ibfk_1` FOREIGN KEY (`genre_id`) REFERENCES `GenreModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `ArtistGenreModels_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `ArtistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `FriendModels`
--
ALTER TABLE `FriendModels`
  ADD CONSTRAINT `FriendModels_ibfk_1` FOREIGN KEY (`child`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FriendModels_ibfk_2` FOREIGN KEY (`parent`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FriendModels_ibfk_3` FOREIGN KEY (`initiator`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PlaylistGenreModels`
--
ALTER TABLE `PlaylistGenreModels`
  ADD CONSTRAINT `PlaylistGenreModels_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `PlaylistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PlaylistGenreModels_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `GenreModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PlaylistSongModels`
--
ALTER TABLE `PlaylistSongModels`
  ADD CONSTRAINT `PlaylistSongModels_ibfk_1` FOREIGN KEY (`playlist_id`) REFERENCES `PlaylistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PlaylistSongModels_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `SongModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `PlaylistUserModels`
--
ALTER TABLE `PlaylistUserModels`
  ADD CONSTRAINT `PlaylistUserModels_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `PlaylistUserModels_ibfk_2` FOREIGN KEY (`playlist_id`) REFERENCES `PlaylistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SongAlbumModels`
--
ALTER TABLE `SongAlbumModels`
  ADD CONSTRAINT `SongAlbumModels_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `SongModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SongAlbumModels_ibfk_2` FOREIGN KEY (`album_id`) REFERENCES `AlbumModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SongArtistModels`
--
ALTER TABLE `SongArtistModels`
  ADD CONSTRAINT `SongArtistModels_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `SongModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SongArtistModels_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `ArtistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SongGenreModels`
--
ALTER TABLE `SongGenreModels`
  ADD CONSTRAINT `SongGenreModels_ibfk_1` FOREIGN KEY (`song_id`) REFERENCES `SongModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SongGenreModels_ibfk_2` FOREIGN KEY (`genre_id`) REFERENCES `GenreModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `SubscribeModels`
--
ALTER TABLE `SubscribeModels`
  ADD CONSTRAINT `SubscribeModels_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `SubscribeModels_ibfk_2` FOREIGN KEY (`artist_id`) REFERENCES `ArtistModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `UserModels`
--
ALTER TABLE `UserModels`
  ADD CONSTRAINT `UserModels_ibfk_1` FOREIGN KEY (`status_song`) REFERENCES `SongModels` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `UserSongModels`
--
ALTER TABLE `UserSongModels`
  ADD CONSTRAINT `UserSongModels_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `UserModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `UserSongModels_ibfk_2` FOREIGN KEY (`song_id`) REFERENCES `SongModels` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
