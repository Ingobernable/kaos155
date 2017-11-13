-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: bbdd_kaos155
-- ------------------------------------------------------
-- Server version	5.7.19-log

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
-- Table structure for table `__text_scrap_boletin`
--

DROP TABLE IF EXISTS `__text_scrap_boletin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `__text_scrap_boletin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(2) DEFAULT NULL,
  `mes` varchar(2) DEFAULT NULL,
  `anyo` varchar(4) DEFAULT NULL,
  `BOLETIN` varchar(18) DEFAULT NULL,
  `texto` mediumtext,
  `analisis` mediumtext,
  `Type` varchar(10) DEFAULT NULL,
  `importe` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `errores`
--

DROP TABLE IF EXISTS `errores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `errores` (
  `BOLETIN` varchar(20) NOT NULL,
  `SqlMensaje` text,
  `SqlError` text,
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;



DROP TABLE IF EXISTS `lastread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lastread` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(6) CHARACTER SET utf8 NOT NULL,
  `Anyo` varchar(4) NOT NULL,
  `SUMARIO_LAST` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `ID_LAST` varchar(145) DEFAULT NULL,
  `Read_Complete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`SUMARIO_NEXT`,`Type`,`Anyo`),
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
  `Type` varchar(6) CHARACTER SET utf8 DEFAULT NULL,
  `SUMARIO` varchar(16) CHARACTER SET utf8 NOT NULL,
  `SUMARIO_NEXT` varchar(16) DEFAULT NULL,
  `BOLETIN` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Tipo_contenido` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-11-11 22:53:43
