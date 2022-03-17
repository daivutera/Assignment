-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 17, 2022 at 06:28 PM
-- Server version: 10.4.22-MariaDB
-- PHP Version: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `nodejsexam`
--

-- --------------------------------------------------------

--
-- Table structure for table `accounts`
--

CREATE TABLE `accounts` (
  `id` int(2) NOT NULL,
  `group_id` int(2) NOT NULL,
  `user_id` int(2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `accounts`
--

INSERT INTO `accounts` (`id`, `group_id`, `user_id`) VALUES
(15, 1, 7),
(16, 4, 7),
(24, 1, 6),
(27, 4, 6),
(30, 6, 7),
(35, 5, 7),
(36, 7, 7),
(37, 1, 9),
(38, 4, 9),
(39, 5, 9),
(40, 6, 9),
(41, 7, 9);

-- --------------------------------------------------------

--
-- Table structure for table `bills`
--

CREATE TABLE `bills` (
  `id` int(2) NOT NULL,
  `group_id` int(2) NOT NULL,
  `amount` int(3) NOT NULL,
  `description` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `bills`
--

INSERT INTO `bills` (`id`, `group_id`, `amount`, `description`) VALUES
(1, 1, 200, 'drinks'),
(2, 1, 100, 'fuel'),
(3, 1, 30, 'candies'),
(4, 3, 10, 'tissues'),
(5, 1, 100, 'fuel'),
(6, 3, 246, 'hotel'),
(7, 3, 45, 'celebration event'),
(8, 4, 246, 'celebration event'),
(9, 4, 45, 'flowers'),
(10, 4, 10, 'cookies'),
(11, 4, 101, 'renovation'),
(12, 2, 45, 'renovation'),
(13, 5, 246, 'flowers');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(2) NOT NULL,
  `name` varchar(155) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `name`) VALUES
(1, 'pirma'),
(4, 'Antra'),
(5, 'Trečia'),
(6, 'Ketvirta'),
(7, 'Penkta');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(2) NOT NULL,
  `full_name` varchar(155) NOT NULL,
  `email` varchar(155) NOT NULL,
  `password` varchar(155) NOT NULL,
  `reg_timestamp` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `reg_timestamp`) VALUES
(6, 'John', 'john@johh.net', '$2a$10$NO7y..QN70Kb3IXG3ckfe.0jbyMCm1nOzg6jMvbH76RofecSv5dN2', '2022-03-17 00:11:24'),
(7, 'Mary', 'mary@gmail.com', '$2a$10$ugZBrMcsZyz0qHNUXCAbSuFoXxtqQHV54Xv8DRdJY1zj5uMppQcJy', '2022-03-17 10:07:28'),
(8, 'katherin', 'du@du.lt', '$2a$10$3g0o4KLn69Q8KIY1shdTLO9z./pN315qW/g6ecASrT2aEphKwheBi', '2022-03-17 16:59:39'),
(9, 'testas', 'testas@testas.com', '$2a$10$IEuBAl1PDuxsvRE/qXBbPunWH5GKXAtcvXEqPxUOPweUMNJD0lBpO', '2022-03-17 17:17:07');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `accounts`
--
ALTER TABLE `accounts`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `bills`
--
ALTER TABLE `bills`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `accounts`
--
ALTER TABLE `accounts`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT for table `bills`
--
ALTER TABLE `bills`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(2) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
