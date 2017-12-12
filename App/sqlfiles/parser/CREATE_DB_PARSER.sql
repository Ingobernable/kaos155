CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bbdd_kaos155`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: mysql.bbdd.ovh    Database: bbdd_kaos155
-- ------------------------------------------------------
-- Server version	5.7.20

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
-- Table structure for table `_adjudicador_aux`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_adjudicador_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(5) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_ambito_geografico_aux`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_ambito_geografico_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) DEFAULT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  `_type` varchar(8) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_cargo_adjudicador_aux`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_cargo_adjudicador_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(6) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_materias_aux`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_materias_aux` (
  `codigo` varchar(20) NOT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`codigo`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_respons_adjudicador_aux`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_respons_adjudicador_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(6) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tabla_precio_contrato_aux`
--

/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_tabla_precio_contrato_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(2) DEFAULT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_contrato_aux`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_tipo_contrato_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) DEFAULT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_modalidad_aux`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_tipo_modalidad_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) DEFAULT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_procedimiento_aux`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_tipo_procedimiento_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) DEFAULT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_tramitacion_aux`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_tipo_tramitacion_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(3) DEFAULT NULL,
  `descripcion` text,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `codigo_UNIQUE` (`codigo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `Type` varchar(6) DEFAULT NULL,
  `SUMARIO` varchar(16) NOT NULL,
  `BOLETIN` varchar(25) NOT NULL,
  `dia` varchar(2) NOT NULL,
  `mes` varchar(2) NOT NULL,
  `anyo` varchar(4) NOT NULL,
  `UTE` tinyint(4) NOT NULL DEFAULT '0',
  `_p` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_aux`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BOLETIN` varchar(25) NOT NULL,
  `COD_Ambito_Geografico` varchar(3) DEFAULT NULL,
  `Tipo_BOLETIN` varchar(3) DEFAULT NULL,
  `Tipo_TRAMITE` varchar(3) DEFAULT NULL,
  `Tipo_PROCEDIMIENTO` varchar(3) DEFAULT NULL,
  `COD_Tabla_Precio` varchar(2) DEFAULT NULL,
  `Tipo_ADJUDICADOR` char(5) DEFAULT NULL,
  `Code_ADJUDICADOR` varchar(6) DEFAULT NULL,
  `Responsable_ADJUDICADOR` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_contratos`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_contratos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BOLETIN` varchar(25) NOT NULL,
  `counter` int(11) NOT NULL DEFAULT '1',
  `Id_Empresa` int(11) DEFAULT NULL,
  `Empresa` varchar(254) NOT NULL,
  `importe` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_materias`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_materias` (
  `BOLETIN` varchar(25) NOT NULL,
  `COD_Materia` varchar(10) DEFAULT NULL,
  KEY `BOLETIN` (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_textos`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_textos` (
  `BOLETIN` varchar(25) NOT NULL,
  `PDF` varchar(255) DEFAULT NULL,
  `Objeto_Contrato` text,
  `TEXTO` mediumtext,
  `observaciones` mediumtext,
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_auditor`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_auditor` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `_key` char(7) NOT NULL,
  `Name` varchar(232) CHARACTER SET utf8 NOT NULL,
  `TRelations` int(11) DEFAULT '0',
  `ARelations` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `_key_UNIQUE` (`_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_diario`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_diario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BOLETIN` varchar(22) NOT NULL,
  `BOLETIN_Id` int(11) DEFAULT NULL,
  `Dia` int(11) DEFAULT NULL,
  `Mes` int(11) DEFAULT NULL,
  `Anyo` int(11) DEFAULT NULL,
  `Provincia` varchar(45) DEFAULT NULL,
  `Empresa_key` char(7) DEFAULT NULL,
  `T_relation` int(11) DEFAULT '1',
  `Relation_key` char(7) DEFAULT NULL,
  `type` varchar(22) DEFAULT NULL,
  `_key` varchar(55) DEFAULT NULL,
  `_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Empresa_Id` (`Empresa_key`),
  KEY `Directivo_id` (`Relation_key`),
  FULLTEXT KEY `_keys` (`_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_directivo`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_directivo` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` int(11) DEFAULT '1',
  `_key` char(7) DEFAULT NULL,
  `Name` tinytext NOT NULL,
  `TRelations` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `_key` (`_key`),
  FULLTEXT KEY `name_TEXT` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_empresa`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_empresa` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL DEFAULT '0',
  `_key` char(7) NOT NULL,
  `Name` varchar(232) CHARACTER SET utf8 NOT NULL,
  `TRelations` int(11) DEFAULT '0',
  `ERelations` int(11) DEFAULT '0',
  `DRelations` int(11) DEFAULT '0',
  `ARelations` int(11) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `_key_UNIQUE` (`_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_relaciones`
--


/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_relaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Diario_Id` bigint(20) NOT NULL,
  `Empresa_key` char(7) NOT NULL,
  `Relation_key` char(7) NOT NULL,
  `Type` int(11) DEFAULT '1',
  `Motivo` varchar(45) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `Activo` bit(1) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `Diario_Id_UNIQUE` (`Diario_Id`),
  KEY `Empresa` (`Empresa_key`),
  KEY `Directivo` (`Relation_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

