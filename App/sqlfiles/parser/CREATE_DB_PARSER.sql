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
  `_BOLETIN` varchar(3) DEFAULT NULL,
  `_TRAMITE` varchar(3) DEFAULT NULL,
  `_ADJUDICADOR` char(5) DEFAULT NULL,
  `_PRECIO` varchar(2) DEFAULT NULL,
  `UTE` tinyint(4) NOT NULL DEFAULT '0',
  `Lotes` int(11) DEFAULT '0',
  `_p` int(11) NOT NULL DEFAULT '0',
  `Objeto_Contrato` text,
  `PDF` varchar(255) NOT NULL,
  `JSON` json NOT NULL,
  PRIMARY KEY (`id`),
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
-- Table structure for table `boletin_aux_tra`
--

DROP TABLE IF EXISTS `boletin_aux_tra`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_aux_tra` (
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
  `_BormeEmpresa` varchar(254) DEFAULT NULL,
  `_key` varchar(7) DEFAULT NULL,
  `Empresa` varchar(254) NOT NULL,
  `importe` decimal(13,2) DEFAULT '0.00',
  `_acron` varchar(55) DEFAULT NULL,
  `_nif` varchar(9) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bol_UNIQUE` (`BOLETIN`,`_key`),
  KEY `BOLETIN` (`BOLETIN`),
  KEY `_key` (`_key`),
  FULLTEXT KEY `Empresa` (`Empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
  `Empresa_key` char(7) NOT NULL,
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
  `_key` varchar(7) NOT NULL,
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
  `Empresa_key` char(7) NOT NULL,
  `Relation_key` char(7) NOT NULL,
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
-- Table structure for table `borme_tree`
--

DROP TABLE IF EXISTS `borme_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_tree` (
  `_Key` varchar(7) NOT NULL,
  `_tree` json DEFAULT NULL,
  PRIMARY KEY (`_Key`),
  UNIQUE KEY `_key_UNIQUE` (`_Key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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