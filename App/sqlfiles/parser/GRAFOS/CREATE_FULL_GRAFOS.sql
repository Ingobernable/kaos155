CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_grafos` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bbdd_kaos155_grafos`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bbdd_kaos155_grafos
-- ------------------------------------------------------
-- Server version	5.7.20-log

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
-- Table structure for table `cypher_data_grafos`
--

DROP TABLE IF EXISTS `cypher_data_grafos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cypher_data_grafos` (
  `boletin` varchar(25) DEFAULT NULL,
  `_keyA` varchar(28) NOT NULL,
  `_keyB` varchar(28) NOT NULL,
  `_cypher` text,
  `_date` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `_parse` tinyint(4) DEFAULT '0',
  `command` varchar(5) DEFAULT NULL,
  `r` varchar(13) CHARACTER SET utf8 DEFAULT NULL,
  PRIMARY KEY (`_keyA`,`_keyB`),
  UNIQUE KEY `_id` (`_keyA`,`_keyB`),
  KEY `_iparse` (`_parse`),
  KEY `_idate` (`_date`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bbdd_kaos155_grafos'
--
/*!50003 DROP PROCEDURE IF EXISTS `parser_data_cypher` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `parser_data_cypher`()
BEGIN
	DECLARE __cypher text;
	DECLARE __keyA text;
	DECLARE __keyB text;
    
    
    
	DECLARE CR_grafos CURSOR
		FOR SELECT _cypher,_keyA,_keyB FROM cypher_data_grafos where _parse = 0 limit 1;
    
    START TRANSACTION;
		OPEN CR_grafos;
		FETCH CR_grafos INTO __cypher,__keyA,__keyB;
		UPDATE cypher_data_grafos SET _parse = 1 where _keyA=__keyA AND _keyB=__keyB; 
    COMMIT;
    
	CLOSE CR_grafos;
    
    SELECT __cypher;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-02-18 10:26:23
