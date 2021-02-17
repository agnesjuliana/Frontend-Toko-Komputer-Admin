-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Feb 17, 2021 at 04:11 PM
-- Server version: 10.4.11-MariaDB
-- PHP Version: 7.4.1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `toko_komputer`
--

-- --------------------------------------------------------

--
-- Table structure for table `admin`
--

CREATE TABLE `admin` (
  `admin_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `admin`
--

INSERT INTO `admin` (`admin_id`, `name`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Siapa', 'jack', '202cb962ac59075b964b07152d234b70', '2020-09-15 02:03:31', '2021-02-15 07:07:33'),
(2, 'Gatau', 'johnny', '202cb962ac59075b964b07152d234b70', '2020-09-15 02:04:07', '2021-02-15 07:07:42'),
(3, 'Ikan', 'stark', '2fbb71b04b02738300427866d6e3181a', '2021-01-27 02:06:37', '2021-02-15 07:07:48');

-- --------------------------------------------------------

--
-- Table structure for table `customer`
--

CREATE TABLE `customer` (
  `customer_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `username` varchar(200) NOT NULL,
  `password` varchar(200) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `customer`
--

INSERT INTO `customer` (`customer_id`, `name`, `phone`, `address`, `image`, `username`, `password`, `createdAt`, `updatedAt`) VALUES
(1, 'Lee Taeyong', '+6281 789 762 655', 'Didalam layar kaca 720px', 'img-1613371686117.jfif', 'leebubu', '202cb962ac59075b964b07152d234b70', '0000-00-00 00:00:00', '2021-02-15 06:49:28'),
(2, 'Na Jaemin', '+6282 766 212 344', 'The Way I Hate You', 'img-1613371760678.jfif', 'nana', '202cb962ac59075b964b07152d234b70', '2020-09-08 09:36:35', '2021-02-15 06:49:20'),
(3, 'Xiao Dejun', '+62 8223 599', 'Di Negri China (tapi lagi asrama di Korea)', 'img-1613371841399.jfif', 'dejun', '202cb962ac59075b964b07152d234b70', '2021-01-29 02:01:10', '2021-02-15 06:50:41'),
(4, 'Mark Lee', '+821037818', 'Didalam mimpi indahmu', 'img-1613371320634.jfif', 'marklee', '202cb962ac59075b964b07152d234b70', '2021-02-15 06:42:00', '2021-02-15 06:42:00');

-- --------------------------------------------------------

--
-- Table structure for table `detail_transaksi`
--

CREATE TABLE `detail_transaksi` (
  `transaksi_id` int(11) NOT NULL,
  `product_id` int(11) NOT NULL,
  `qty` double DEFAULT NULL,
  `price` double NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `detail_transaksi`
--

INSERT INTO `detail_transaksi` (`transaksi_id`, `product_id`, `qty`, `price`, `createdAt`, `updatedAt`) VALUES
(1, 2, 3, 3000, '2020-09-13 10:13:15', '2020-09-13 10:13:15'),
(1, 3, 5, 4000, '2020-09-13 10:13:15', '2020-09-13 10:13:15'),
(2, 2, 10, 3000, '2020-09-13 10:13:40', '2020-09-13 10:13:40'),
(2, 3, 15, 4000, '2020-09-13 10:13:40', '2020-09-13 10:13:40'),
(11, 3, 4, 20000, '2020-09-08 11:17:59', '2021-01-27 02:12:59'),
(11, 2, 3, 20000, '2020-09-08 11:03:11', '2021-01-27 02:11:48'),
(12, 2, 5, 20000, '2020-09-08 11:03:11', '2021-01-27 02:11:48'),
(12, 3, 8, 20000, '2020-09-08 11:17:59', '2021-01-27 02:12:59');

--
-- Triggers `detail_transaksi`
--
DELIMITER $$
CREATE TRIGGER `update_stok` AFTER INSERT ON `detail_transaksi` FOR EACH ROW UPDATE product SET stock = stock - NEW.qty WHERE product_id = NEW.product_id
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Table structure for table `product`
--

CREATE TABLE `product` (
  `product_id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` double DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `product`
--

INSERT INTO `product` (`product_id`, `name`, `price`, `stock`, `image`, `createdAt`, `updatedAt`) VALUES
(2, 'mouse', 200, 102, 'img-1611713506314.jpg', '2020-09-08 11:03:11', '2021-02-17 14:38:07'),
(3, 'RAM 8GB', 20000, 100, 'img-1611713579868.jpg', '2020-09-08 11:17:59', '2021-01-27 02:12:59'),
(5, 'Keyboard', 100000, 50, 'img-1613569613152.jpg', '2021-02-17 13:46:53', '2021-02-17 13:46:53');

-- --------------------------------------------------------

--
-- Table structure for table `sequelizemeta`
--

CREATE TABLE `sequelizemeta` (
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sequelizemeta`
--

INSERT INTO `sequelizemeta` (`name`) VALUES
('20200908065455-create-product.js'),
('20200908065927-create-customer.js'),
('20200908070223-create-transaksi.js'),
('20200908070510-create-detail-transaksi.js'),
('20200915014354-create-admin.js');

-- --------------------------------------------------------

--
-- Table structure for table `transaksi`
--

CREATE TABLE `transaksi` (
  `transaksi_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `waktu` datetime DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `transaksi`
--

INSERT INTO `transaksi` (`transaksi_id`, `customer_id`, `waktu`, `createdAt`, `updatedAt`) VALUES
(1, 1, '2020-09-13 00:00:00', '2020-09-13 10:13:15', '2020-09-13 10:13:15'),
(2, 2, '2020-09-13 00:00:00', '2020-09-13 10:13:40', '2020-09-13 10:13:40'),
(11, 2, '2021-01-27 00:00:00', '2021-01-27 05:55:40', '2021-01-27 05:55:40'),
(12, 1, '2021-01-27 00:00:00', '2021-01-27 06:04:35', '2021-01-27 06:04:35');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `admin`
--
ALTER TABLE `admin`
  ADD PRIMARY KEY (`admin_id`);

--
-- Indexes for table `customer`
--
ALTER TABLE `customer`
  ADD PRIMARY KEY (`customer_id`);

--
-- Indexes for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD KEY `transaksi_id` (`transaksi_id`),
  ADD KEY `product_id` (`product_id`);

--
-- Indexes for table `product`
--
ALTER TABLE `product`
  ADD PRIMARY KEY (`product_id`);

--
-- Indexes for table `sequelizemeta`
--
ALTER TABLE `sequelizemeta`
  ADD PRIMARY KEY (`name`),
  ADD UNIQUE KEY `name` (`name`);

--
-- Indexes for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD PRIMARY KEY (`transaksi_id`),
  ADD KEY `customer_id` (`customer_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `admin`
--
ALTER TABLE `admin`
  MODIFY `admin_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `customer`
--
ALTER TABLE `customer`
  MODIFY `customer_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `product`
--
ALTER TABLE `product`
  MODIFY `product_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `transaksi`
--
ALTER TABLE `transaksi`
  MODIFY `transaksi_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `detail_transaksi`
--
ALTER TABLE `detail_transaksi`
  ADD CONSTRAINT `detail_transaksi_ibfk_1` FOREIGN KEY (`transaksi_id`) REFERENCES `transaksi` (`transaksi_id`),
  ADD CONSTRAINT `detail_transaksi_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `product` (`product_id`);

--
-- Constraints for table `transaksi`
--
ALTER TABLE `transaksi`
  ADD CONSTRAINT `transaksi_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer` (`customer_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
