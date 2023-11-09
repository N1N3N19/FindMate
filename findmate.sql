-- phpMyAdmin SQL Dump
-- version 5.1.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Nov 09, 2023 at 01:00 PM
-- Server version: 5.7.24
-- PHP Version: 8.0.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `findmate`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `username` varchar(30) DEFAULT NULL,
  `password` varchar(30) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `feedback`
--

CREATE TABLE `feedback` (
  `feedback_ID` int(11) NOT NULL,
  `user_ID` int(11) DEFAULT NULL,
  `report_ID` int(11) DEFAULT NULL,
  `detail` text,
  `add_photo` blob
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `message`
--

CREATE TABLE `message` (
  `msg_ID` int(11) NOT NULL,
  `msg_text` text,
  `receiver_ID` int(11) DEFAULT NULL,
  `sender_ID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `swipe`
--

CREATE TABLE `swipe` (
  `swipe_ID` int(11) NOT NULL,
  `user_a` int(11) DEFAULT NULL,
  `user_b` int(11) DEFAULT NULL,
  `swipe_state` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `user_profile`
--

CREATE TABLE `user_profile` (
  `user_ID` int(11) NOT NULL,
  `Name` varchar(30) DEFAULT NULL,
  `Gender` varchar(30) NOT NULL,
  `email` varchar(50) NOT NULL,
  `password` varchar(30) DEFAULT NULL,
  `About_user` text,
  `Profile_pic` blob,
  `DOB` varchar(255) DEFAULT NULL,
  `YES_UID` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `user_profile`
--

INSERT INTO `user_profile` (`user_ID`, `Name`, `Gender`, `email`,`password`, `About_user`, `Profile_pic`, `DOB`, `YES_UID`) VALUES
(1, 'Nine', 'Male', 'pannatjaat@gmail.com',"123445", 'I love Pam very much', 0x617364313234746c6468646773666c64617364, '25-11-2002', NULL),
(2, 'Alice', 'Female', 'alice@gmail.com',"212421", 'I enjoy hiking and reading', 0x617364313234746c6468646773666c64617364, '1995-08-10',  NULL),
(3, 'Bob', 'Male', 'bob@example.com',"123456", 'Tech enthusiast and coffee lover', 0x626f6270726f66696c655f706963, '1988-03-22',  NULL),
(4, 'Eva', 'Female', 'eva@example.com',"1255423", 'Passionate about art and travel', 0x657661313233746c6468646773666c64617364, '1990-05-15', NULL),
(5, 'Charlie', 'Non-Binary', 'charlie@gmail.com',"23432423", 'Tech geek and cat lover', 0x636861726c69655f706963, '1985-12-01',  NULL),
(6, 'Olivia', 'Female', 'olivia@example.com','124454354', 'Fitness enthusiast and foodie', 0x6f6c697669615f706963, '1993-09-28', NULL);

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `feedback`
--
ALTER TABLE `feedback`
  ADD PRIMARY KEY (`feedback_ID`),
  ADD KEY `user_ID` (`user_ID`),
  ADD KEY `report_ID` (`report_ID`);

--
-- Indexes for table `message`
--
ALTER TABLE `message`
  ADD PRIMARY KEY (`msg_ID`),
  ADD KEY `receiver_ID` (`receiver_ID`),
  ADD KEY `sender_ID` (`sender_ID`);

--
-- Indexes for table `swipe`
--
ALTER TABLE `swipe`
  ADD PRIMARY KEY (`swipe_ID`),
  ADD KEY `user_a` (`user_a`),
  ADD KEY `user_b` (`user_b`);

--
-- Indexes for table `user_profile`
--
ALTER TABLE `user_profile`
  ADD PRIMARY KEY (`user_ID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `feedback`
--
ALTER TABLE `feedback`
  MODIFY `feedback_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `message`
--
ALTER TABLE `message`
  MODIFY `msg_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `swipe`
--
ALTER TABLE `swipe`
  MODIFY `swipe_ID` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_profile`
--
ALTER TABLE `user_profile`
  MODIFY `user_ID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `feedback`
--
ALTER TABLE `feedback`
  ADD CONSTRAINT `feedback_ibfk_1` FOREIGN KEY (`user_ID`) REFERENCES `user_profile` (`user_ID`),
  ADD CONSTRAINT `feedback_ibfk_2` FOREIGN KEY (`report_ID`) REFERENCES `user_profile` (`user_ID`);

--
-- Constraints for table `message`
--
ALTER TABLE `message`
  ADD CONSTRAINT `message_ibfk_1` FOREIGN KEY (`receiver_ID`) REFERENCES `user_profile` (`user_ID`),
  ADD CONSTRAINT `message_ibfk_2` FOREIGN KEY (`sender_ID`) REFERENCES `user_profile` (`user_ID`);

--
-- Constraints for table `swipe`
--
ALTER TABLE `swipe`
  ADD CONSTRAINT `swipe_ibfk_1` FOREIGN KEY (`user_a`) REFERENCES `user_profile` (`user_ID`),
  ADD CONSTRAINT `swipe_ibfk_2` FOREIGN KEY (`user_b`) REFERENCES `user_profile` (`user_ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
