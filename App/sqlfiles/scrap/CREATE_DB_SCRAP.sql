CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_text` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bbdd_kaos155_text`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 54.37.76.38    Database: bbdd_kaos155_text
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.12-MariaDB-10.2.12+maria~stretch-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `anyosread`
--

DROP TABLE IF EXISTS `anyosread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anyosread` (
  `Type` varchar(5) NOT NULL,
  `Anyo` int(11) NOT NULL,
  `scrap` tinyint(1) DEFAULT 0,
  `parser` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`Type`,`Anyo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `errores`
--

DROP TABLE IF EXISTS `errores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `errores` (
  `BOLETIN` varchar(20) NOT NULL,
  `SqlMensaje` text DEFAULT NULL,
  `SqlError` text DEFAULT NULL,
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lastread`
--

DROP TABLE IF EXISTS `lastread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lastread` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(6) CHARACTER SET utf8 NOT NULL,
  `Anyo` varchar(4) NOT NULL,
  `SUMARIO_LAST` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `SUMARIO_NEXT` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `ID_LAST` varchar(145) DEFAULT NULL,
  `Read_Complete` tinyint(1) DEFAULT 0,
  `STOP` tinyint(1) DEFAULT 0,
  PRIMARY KEY (`Type`,`Anyo`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sumarios`
--

DROP TABLE IF EXISTS `sumarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sumarios` (
  `_counter` int(11) DEFAULT NULL,
  `Type` varchar(6) CHARACTER SET utf8 DEFAULT NULL,
  `Anyo` varchar(4) NOT NULL,
  `SUMARIO` varchar(16) CHARACTER SET utf8 NOT NULL,
  `BOLETIN` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Contrato` tinyint(1) DEFAULT 0,
  `scrap` tinyint(1) DEFAULT 0,
  `_error` tinyint(1) DEFAULT 0,
  `parser` int(11) DEFAULT NULL,
  PRIMARY KEY (`BOLETIN`),
  UNIQUE KEY `_Boletin` (`BOLETIN`),
  KEY `_Type` (`Type`,`Anyo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;