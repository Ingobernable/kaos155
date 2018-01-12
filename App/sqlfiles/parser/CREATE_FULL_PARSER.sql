CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bbdd_kaos155`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bbdd_kaos155
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
-- Table structure for table `boletin`
--

DROP TABLE IF EXISTS `boletin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(6) DEFAULT NULL,
  `BOLETIN` varchar(25) NOT NULL,
  `dia` varchar(2) NOT NULL,
  `mes` varchar(2) NOT NULL,
  `anyo` varchar(4) NOT NULL,
  `_AREA` varchar(25) DEFAULT NULL,
  `_BOLETIN` varchar(3) DEFAULT NULL,
  `_TRAMITE` varchar(25) DEFAULT NULL,
  `_FORMA` varchar(25) DEFAULT NULL,
  `_ADJUDICADOR` char(6) DEFAULT NULL,
  `_PRECIO` varchar(2) DEFAULT NULL,
  `UTE` tinyint(4) NOT NULL DEFAULT '0',
  `Lotes` int(11) DEFAULT '0',
  `_p` int(11) NOT NULL DEFAULT '0',
  `Objeto_Contrato` text,
  `PDF` varchar(255) NOT NULL,
  `JSON` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_aux_adj`
--

DROP TABLE IF EXISTS `boletin_aux_adj`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_aux_adj` (
  `_auxcode` varchar(6) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `_l` int(11) DEFAULT NULL,
  PRIMARY KEY (`_auxcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_aux_bol`
--

DROP TABLE IF EXISTS `boletin_aux_bol`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_aux_bol` (
  `_auxcode` varchar(6) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `_l` int(11) DEFAULT NULL,
  PRIMARY KEY (`_auxcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_aux_mat`
--

DROP TABLE IF EXISTS `boletin_aux_mat`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_aux_mat` (
  `_auxcode` varchar(8) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `_l` int(11) DEFAULT NULL,
  PRIMARY KEY (`_auxcode`),
  FULLTEXT KEY `text` (`Descripcion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_aux_pre`
--

DROP TABLE IF EXISTS `boletin_aux_pre`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_aux_pre` (
  `_auxcode` varchar(6) NOT NULL,
  `Descripcion` varchar(255) DEFAULT NULL,
  `_l` int(11) DEFAULT NULL,
  PRIMARY KEY (`_auxcode`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_contratos`
--

DROP TABLE IF EXISTS `boletin_contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_contratos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BOLETIN` varchar(25) NOT NULL,
  `counter` int(11) NOT NULL DEFAULT '1',
  `_key` varchar(12) DEFAULT NULL,
  `Empresa` varchar(254) NOT NULL,
  `importe` decimal(13,2) DEFAULT '0.00',
  `_acron` varchar(55) DEFAULT NULL,
  `_nif` varchar(9) DEFAULT NULL,
  `_BormeSuggestEmpresa` varchar(254) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bol_UNIQUE` (`BOLETIN`,`_key`),
  KEY `BOLETIN` (`BOLETIN`),
  KEY `_key` (`_key`),
  FULLTEXT KEY `Empresa` (`Empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_materias`
--

DROP TABLE IF EXISTS `boletin_materias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_materias` (
  `BOLETIN` varchar(25) NOT NULL,
  `COD_Materia` varchar(10) DEFAULT NULL,
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_actos`
--

DROP TABLE IF EXISTS `borme_actos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_actos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Empresa_key` char(12) NOT NULL,
  `Acto` varchar(45) NOT NULL,
  `Motivo` varchar(45) NOT NULL,
  `Texto` varchar(255) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  `Mes` int(11) DEFAULT NULL,
  `Dia` int(11) DEFAULT NULL,
  `BOLETIN` varchar(20) DEFAULT NULL,
  `_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `motivo` (`Empresa_key`,`Motivo`,`Dia`,`Mes`,`Anyo`),
  KEY `Empresa` (`Empresa_key`),
  KEY `Boletin` (`BOLETIN`,`_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_keys`
--

DROP TABLE IF EXISTS `borme_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_keys` (
  `_key` varchar(12) NOT NULL,
  `Nombre` text,
  `_Empresa` tinyint(4) DEFAULT '0',
  `_Directivo` tinyint(4) DEFAULT '0',
  `_Auditor` tinyint(4) DEFAULT '0',
  `Provincia` varchar(25) DEFAULT NULL,
  `BOLETIN` varchar(20) DEFAULT NULL,
  `_ID` int(11) DEFAULT NULL,
  PRIMARY KEY (`_key`),
  FULLTEXT KEY `Name` (`Nombre`),
  FULLTEXT KEY `Prov` (`Provincia`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_relaciones`
--

DROP TABLE IF EXISTS `borme_relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_relaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Empresa_key` char(12) NOT NULL,
  `Relation_key` char(12) NOT NULL,
  `Type` int(11) DEFAULT '1',
  `Motivo` varchar(45) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `Activo` bit(1) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  `Mes` int(11) DEFAULT NULL,
  `Dia` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Empresa` (`Empresa_key`),
  KEY `Directivo` (`Relation_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `relations`
--

DROP TABLE IF EXISTS `relations`;
/*!50001 DROP VIEW IF EXISTS `relations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `relations` AS SELECT 
 1 AS `EKey`,
 1 AS `RKey`,
 1 AS `Empresa`,
 1 AS `Relacion`,
 1 AS `EType`,
 1 AS `RType`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `anyo`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `volumen`
--

DROP TABLE IF EXISTS `volumen`;
/*!50001 DROP VIEW IF EXISTS `volumen`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `volumen` AS SELECT 
 1 AS `now()`,
 1 AS `TABLE_SCHEMA`,
 1 AS `TABLE_NAME`,
 1 AS `TABLE_ROWS`,
 1 AS `AVG_ROW_LENGTH`,
 1 AS `DATA_LENGTH`,
 1 AS `INDEX_LENGTH`,
 1 AS `AUTO_INCREMENT`,
 1 AS `ENGINE`*/;
SET character_set_client = @saved_cs_client;

--
-- Final view structure for view `relations`
--

/*!50001 DROP VIEW IF EXISTS `relations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `relations` AS select `borme_relaciones`.`Empresa_key` AS `EKey`,`borme_relaciones`.`Relation_key` AS `RKey`,`GET_NAME`(`borme_relaciones`.`Empresa_key`) AS `Empresa`,`GET_NAME`(`borme_relaciones`.`Relation_key`) AS `Relacion`,`_type`(`bkm`.`_Empresa`,`bkm`.`_Directivo`,`bkm`.`_Auditor`) AS `EType`,`_type`(`bkr`.`_Empresa`,`bkr`.`_Directivo`,`bkr`.`_Auditor`) AS `RType`,`borme_relaciones`.`Motivo` AS `Motivo`,`borme_relaciones`.`Cargo` AS `Cargo`,`borme_relaciones`.`Activo` AS `Activo`,`borme_relaciones`.`Anyo` AS `anyo` from ((`borme_relaciones` left join `borme_keys` `bkm` on((`borme_relaciones`.`Empresa_key` = `bkm`.`_key`))) left join `borme_keys` `bkr` on((`borme_relaciones`.`Relation_key` = `bkr`.`_key`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `volumen`
--

/*!50001 DROP VIEW IF EXISTS `volumen`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `volumen` AS select now() AS `now()`,`information_schema`.`tables`.`TABLE_SCHEMA` AS `TABLE_SCHEMA`,`information_schema`.`tables`.`TABLE_NAME` AS `TABLE_NAME`,`information_schema`.`tables`.`TABLE_ROWS` AS `TABLE_ROWS`,`information_schema`.`tables`.`AVG_ROW_LENGTH` AS `AVG_ROW_LENGTH`,`information_schema`.`tables`.`DATA_LENGTH` AS `DATA_LENGTH`,`information_schema`.`tables`.`INDEX_LENGTH` AS `INDEX_LENGTH`,`information_schema`.`tables`.`AUTO_INCREMENT` AS `AUTO_INCREMENT`,`information_schema`.`tables`.`ENGINE` AS `ENGINE` from `information_schema`.`tables` where ((`information_schema`.`tables`.`TABLE_SCHEMA` like 'bbdd%') and (`information_schema`.`tables`.`TABLE_ROWS` > 0)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2018-01-12 14:06:54
