CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_text` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bbdd_kaos155_text`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: bbdd_kaos155_text
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
-- Table structure for table `_bocm_text`
--

DROP TABLE IF EXISTS `_bocm_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_bocm_text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(2) DEFAULT NULL,
  `mes` varchar(2) DEFAULT NULL,
  `anyo` varchar(4) DEFAULT NULL,
  `BOLETIN` varchar(18) DEFAULT NULL,
  `texto` mediumtext,
  `analisis` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_boe_text`
--

DROP TABLE IF EXISTS `_boe_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_boe_text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(2) DEFAULT NULL,
  `mes` varchar(2) DEFAULT NULL,
  `anyo` varchar(4) DEFAULT NULL,
  `BOLETIN` varchar(18) DEFAULT NULL,
  `texto` mediumtext,
  `analisis` mediumtext,
  `importe` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_borme_text`
--

DROP TABLE IF EXISTS `_borme_text`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_borme_text` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dia` varchar(2) DEFAULT NULL,
  `mes` varchar(2) DEFAULT NULL,
  `anyo` varchar(4) DEFAULT NULL,
  `BOLETIN` varchar(18) DEFAULT NULL,
  `texto` mediumtext,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
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
  `SqlMensaje` text,
  `SqlError` text,
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
  `Read_Complete` bit(1) DEFAULT b'0',
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
  `Tipo_contenido` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bbdd_kaos155_text'
--
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Text_BOLETIN_Contrato` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Text_BOLETIN_Contrato`(
	
    IN _Type nvarchar(18),
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
	IN _BOLETIN nvarchar(18),
    
	IN _TEXTO TEXT,
	IN _analisis TEXT,
    IN _importe nvarchar(55)

)
BEGIN
	DECLARE _counter INT;
	IF _Type='BOE' THEN
		SET _counter= ( SELECT count(*) FROM _boe_text WHERE BOLETIN = _BOLETIN ); 
		IF _counter = 0 THEN
				INSERT INTO _boe_text ( 
				BOLETIN, 
				dia,
				mes,
				anyo,  
				TEXTO, 
				analisis,
				importe) VALUES ( 

				_BOLETIN, 
				_Dia,
				_Mes,
				_Anyo,  
				_TEXTO, 
				_analisis,
				_importe );
				SELECT last_insert_id() as ID;
		END IF;
    END IF;
	IF _Type='BOCM' THEN
		SET _counter= ( SELECT count(*) FROM _bocm_text WHERE BOLETIN = _BOLETIN ); 
		IF _counter = 0 THEN
				INSERT INTO _bocm_text ( 
				BOLETIN, 
				dia,
				mes,
				anyo,  
				TEXTO, 
				analisis) VALUES ( 

				_BOLETIN, 
				_Dia,
				_Mes,
				_Anyo,  
				_TEXTO, 
				_analisis);
				SELECT last_insert_id() as ID;
		END IF;
    END IF; 
    IF _Type='BORME' THEN
		SET _counter= ( SELECT count(*) FROM _borme_text WHERE BOLETIN = _BOLETIN ); 
		IF _counter = 0 THEN
				INSERT INTO _borme_text ( 
				BOLETIN, 
				dia,
				mes,
				anyo,  
				TEXTO, 
				analisis,
				importe) VALUES ( 

				_BOLETIN, 
				_Dia,
				_Mes,
				_Anyo,  
				_TEXTO, 
				_analisis );
				SELECT last_insert_id() as ID;
		END IF;
    END IF;
    UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type= _Type AND Anyo=_Anyo;
    UPDATE sumarios SET Tipo_contenido=1 WHERE BOLETIN=_BOLETIN;
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

-- Dump completed on 2017-11-14 22:02:32
