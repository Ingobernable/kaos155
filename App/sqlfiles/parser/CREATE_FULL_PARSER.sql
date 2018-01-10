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
  `_key` varchar(9) DEFAULT NULL,
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
  `Empresa_key` char(9) NOT NULL,
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
  `_key` varchar(9) NOT NULL,
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
  `Empresa_key` char(9) NOT NULL,
  `Relation_key` char(9) NOT NULL,
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
-- Dumping routines for database 'bbdd_kaos155'
--
/*!50003 DROP FUNCTION IF EXISTS `GET_NAME` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GET_NAME`( __key nvarchar(7)) RETURNS varchar(255) CHARSET utf8
BEGIN
	DECLARE _value nvarchar(255);
	SET _value = (SELECT Nombre FROM borme_keys WHERE _key = __key);

RETURN _value;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `SPLIT_STR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `SPLIT_STR`( s MEDIUMTEXT , del CHAR(1) , i INT) RETURNS text CHARSET utf8
    DETERMINISTIC
BEGIN

        DECLARE n INT ;

        
        SET n = LENGTH(s) - LENGTH(REPLACE(s, del, '')) + 1;

        IF i > n THEN
            RETURN NULL ;
        ELSE
            RETURN SUBSTRING_INDEX(SUBSTRING_INDEX(s, del, i) , del , -1 ) ;        
        END IF;

    END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `UC_Words` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `UC_Words`( str VARCHAR(255) ) RETURNS varchar(255) CHARSET utf8
BEGIN  
  DECLARE c CHAR(1);  
  DECLARE s VARCHAR(255);  
  DECLARE i INT DEFAULT 1;  
  DECLARE bool INT DEFAULT 1;  
  DECLARE punct CHAR(17) DEFAULT ' ()[]{},.-_!@;:?/';  
  SET s = LCASE( str );  
  WHILE i < LENGTH( str ) DO  
     BEGIN  
       SET c = SUBSTRING( s, i, 1 );  
       IF LOCATE( c, punct ) > 0 THEN  
        SET bool = 1;  
      ELSEIF bool=1 THEN  
        BEGIN  
          IF c >= 'a' AND c <= 'z' THEN  
             BEGIN  
               SET s = CONCAT(LEFT(s,i-1),UCASE(c),SUBSTRING(s,i+1));  
               SET bool = 0;  
             END;  
           ELSEIF c >= '0' AND c <= '9' THEN  
            SET bool = 0;  
          END IF;  
        END;  
      END IF;  
      SET i = i+1;  
    END;  
  END WHILE;  
  RETURN s;  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_codeaux` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_codeaux`(
	
	_Type char(3),
	_Descripcion nvarchar(255)
    
) RETURNS varchar(8) CHARSET utf8
BEGIN

	DECLARE _counter INT;
    DECLARE _IDReg nvarchar(6);
	DECLARE _Ret nvarchar(8);
    DECLARE _DESC nvarchar(255);
    
    SET _DESC = UC_Words(_Descripcion);
    
	IF LENGTH(_Descripcion)>0 THEN
        IF _Type = 'ADJ' THEN
			SET _counter= ( SELECT count(*) FROM boletin_aux_ADJ where  descripcion = _DESC );
			IF _counter=0 THEN
				SET _IDReg= (SELECT LPAD( (_auxcode*1)+1,6,0) FROM boletin_aux_ADJ order by _auxcode desc LIMIT 1 );
				IF _IDReg IS NULL THEN
					SET _IDReg = '000001';
                END IF;    
                INSERT INTO boletin_aux_ADJ (_auxcode, descripcion,_l) values ( _IDReg, _DESC, LENGTH(_DESC));
				SET _Ret = _IDReg;
			ELSE 
				SET _Ret = (SELECT _auxcode FROM boletin_aux_ADJ where descripcion = _DESC );
			END IF;    
		END IF;
        
        IF _Type = 'PRE' THEN
			SET _counter= ( SELECT count(*) FROM boletin_aux_PRE where  descripcion = _DESC );
			IF _counter=0 THEN
				SET _IDReg= (SELECT LPAD( (_auxcode*1)+1,2,0) FROM boletin_aux_PRE order by _auxcode desc LIMIT 1 );
				IF _IDReg IS NULL THEN
					SET _IDReg = '01';
                END IF;    
                INSERT INTO boletin_aux_PRE (_auxcode, descripcion,_l) values ( _IDReg, _DESC, LENGTH(_DESC));
				SET _Ret = _IDReg;
			ELSE 
				SET _Ret = (SELECT _auxcode FROM boletin_aux_PRE where descripcion = _DESC );
			END IF;    
		END IF;
        
        IF _Type = 'BOL' THEN
			SET _counter= ( SELECT count(*) FROM boletin_aux_BOL where  descripcion = _DESC );
			IF _counter=0 THEN
				SET _IDReg = (SELECT LPAD( (_auxcode*1)+1,3,0) FROM boletin_aux_BOL order by _auxcode desc LIMIT 1 );
				IF _IDReg IS NULL THEN
					SET _IDReg = '001';
                END IF;    
                INSERT INTO boletin_aux_BOL (_auxcode, descripcion,_l) values ( _IDReg, _DESC, LENGTH(_DESC));
				SET _Ret = _IDReg;
			ELSE 
				SET _Ret = (SELECT _auxcode FROM boletin_aux_BOL where descripcion = _DESC );
			END IF;    
		END IF;
        
        IF _Type = 'TRA' THEN
			SET _counter= ( SELECT count(*) FROM boletin_aux_TRA where  descripcion = _DESC );
			IF _counter=0 THEN
				SET _IDReg = (SELECT LPAD( (_auxcode*1)+1,3,0) FROM boletin_aux_TRA order by _auxcode desc LIMIT 1 );
				IF _IDReg IS NULL THEN
					SET _IDReg = '001';
                END IF;    
                INSERT INTO boletin_aux_TRA (_auxcode, descripcion,_l) values ( _IDReg, _DESC, LENGTH(_DESC));
				SET _Ret = _IDReg;
			ELSE 
				SET _Ret = (SELECT _auxcode FROM boletin_aux_TRA where descripcion = _DESC );
			END IF;    
		END IF;
	END IF;

	RETURN TRIM(_Ret);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_codeaux_ADJ` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_codeaux_ADJ`(	
	_Descripcion nvarchar(255)
) RETURNS varchar(8) CHARSET utf8
BEGIN

	DECLARE _counter INT;
    DECLARE _IDReg nvarchar(6);
	DECLARE _Ret nvarchar(8);
    DECLARE _DESC nvarchar(255);
    
    SET _DESC = UC_Words(_Descripcion);
    
 	IF LENGTH(_DESC)>0 THEN
		SET _counter= ( SELECT count(*) FROM boletin_adjcode where  descripcion = UC_Words(_DESC) );
		IF _counter=0 THEN
			SET _IDReg= (SELECT LPAD( (_auxcode*1)+1,6,0) FROM boletin_adjcode order by _auxcode desc LIMIT 1 );
			INSERT INTO boletin_adjcode (_adjcode, descripcion,_l) values ( _IDReg, _DESC, LENGTH(_DESC));
			SET _Ret = _IDReg;
		ELSE 
			SET _Ret = (SELECT _auxcode FROM boletin_adjcode where descripcion = _DESC );
		END IF;
    END IF;

	RETURN TRIM(_Ret);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_codeaux_BOL` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_codeaux_BOL`(	
	_Descripcion nvarchar(255)
) RETURNS varchar(8) CHARSET utf8
BEGIN

	DECLARE _counter INT;
    DECLARE _IDReg nvarchar(6);
	DECLARE _Ret nvarchar(8);
    
 	IF LENGTH(_Descripcion)>0 THEN
		
		SET _counter= ( SELECT count(*) FROM boletin_auxcode where _type='BOL' AND descripcion = UC_Words(_Descripcion) );
		IF _counter=0 THEN
			SET _IDReg= (SELECT LPAD(count(*)+1,3,0) FROM boletin_auxcode where _type='BOL' );
			INSERT INTO boletin_auxcode (_auxcode,_type, descripcion,_l) values ( _IDReg, 'BOL', UC_Words(_Descripcion), LENGTH(UC_Words(_Descripcion)));
			SET _Ret = _IDReg;
		ELSE 
			SET _Ret = (SELECT _auxcode FROM boletin_auxcode where _type='BOL' AND descripcion = UC_Words(_Descripcion) );
		END IF;
    END IF;

	RETURN TRIM(_Ret);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_codeaux_PRE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_codeaux_PRE`(	
	_Descripcion nvarchar(255)
) RETURNS varchar(8) CHARSET utf8
BEGIN

	DECLARE _counter INT;
    DECLARE _IDReg nvarchar(6);
	DECLARE _Ret nvarchar(8);
    
 	IF LENGTH(_Descripcion)>0 THEN
		
		SET _counter= ( SELECT count(*) FROM boletin_auxcode where _type='PRE' AND descripcion = UC_Words(_Descripcion) );
		IF _counter=0 THEN
			SET _IDReg= (SELECT LPAD(count(*)+1,2,0) FROM boletin_auxcode where _type='PRE' );
			INSERT INTO boletin_auxcode (_auxcode,_type, descripcion,_l) values ( _IDReg, 'PRE', UC_Words(_Descripcion), LENGTH(UC_Words(_Descripcion)));
			SET _Ret = _IDReg;
		ELSE 
			SET _Ret = (SELECT _auxcode FROM boletin_auxcode where _type='PRE' AND descripcion = UC_Words(_Descripcion) );
		END IF;
    END IF;

	RETURN TRIM(_Ret);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_codeaux_TRA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_codeaux_TRA`(	
	_Descripcion nvarchar(255)
) RETURNS varchar(8) CHARSET utf8
BEGIN

	DECLARE _counter INT;
    DECLARE _IDReg nvarchar(6);
	DECLARE _Ret nvarchar(8);
    
 	IF LENGTH(_Descripcion)>0 THEN
		
		SET _counter= ( SELECT count(*) FROM boletin_auxcode where _type='TRA' AND descripcion = UC_Words(_Descripcion) );
		IF _counter=0 THEN
			SET _IDReg= (SELECT LPAD((_auxcode*1)+1,3,0) FROM boletin_auxcode where _type='TRA' Order by _auxcode LIMIT 1 );
			INSERT INTO boletin_auxcode (_auxcode,_type, descripcion,_l) values ( _IDReg, 'TRA', UC_Words(_Descripcion), LENGTH(UC_Words(_Descripcion)));
			SET _Ret = _IDReg;
		ELSE 
			SET _Ret = (SELECT _auxcode FROM boletin_auxcode where _type='TRA' AND descripcion = UC_Words(_Descripcion) );
		END IF;
    END IF;

	RETURN TRIM(_Ret);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_type` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `_type`( Empresa int, Directivo int, Auditor int ) RETURNS int(11)
BEGIN  
  DECLARE _r int;  
  IF Auditor >0 THEN
	SET _r = 2;
  ELSE
	  IF Directivo >0 THEN
		SET _r = 1;
	  ELSE
		  IF Empresa >0 THEN
			SET _r = 0;
		  END IF;
	  END IF;
  END IF;
  RETURN _r;  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `getLST_Aux` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `getLST_Aux`( in _type nvarchar(5), IN _key nvarchar(255))
BEGIN
	IF LENGTH(_key)=0 THEN
    
		SELECT DISTINCT boletin.Tipo_Boletin as code, _tipo_contrato_aux.descripcion FROM boletin 
			RIGHT JOIN _tipo_contrato_aux ON boletin.Tipo_Boletin = _tipo_contrato_aux.codigo 
		WHERE boletin.Type = _type;
        
        SELECT DISTINCT boletin.Tipo_Tramite as code, _tipo_tramitacion_aux.descripcion FROM boletin 
			RIGHT JOIN  _tipo_tramitacion_aux ON boletin.Tipo_Tramite = _tipo_tramitacion_aux.codigo 
		WHERE boletin.Type= _type;
 
		SELECT DISTINCT boletin.Tipo_Adjudicador as code, _adjudicador_aux.descripcion FROM boletin
			RIGHT JOIN  _adjudicador_aux ON boletin.Tipo_Adjudicador = _adjudicador_aux.codigo 
		WHERE boletin.Type= _type;
        
        SELECT DISTINCT boletin.COD_Ambito_Geografico as code, _ambito_geografico_aux.descripcion FROM boletin
			INNER JOIN  _ambito_geografico_aux ON boletin.COD_Ambito_Geografico = _ambito_geografico_aux.codigo
    	WHERE boletin.Type= _type;  
        
        SELECT DISTINCT boletin.COD_Tabla_Precio as code, _tabla_precio_contrato_aux.descripcion FROM boletin
			INNER JOIN  _tabla_precio_contrato_aux ON boletin.COD_Tabla_Precio = _tabla_precio_contrato_aux.codigo
		WHERE boletin.Type= _type;  
 
 
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetRelations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRelations`(
	IN _type nvarchar(10),
    IN _Id BIGINT
)
BEGIN
	IF _type= 'Empresa' THEN 
		SELECT  *	FROM relations_empresa WHERE idEmpresa = _Id;
    END IF;
    
	IF _type= 'Directivo' THEN 
		SELECT  *	FROM relations_directivo WHERE idDirectivo = _Id;
    END IF;    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetSearchLst` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSearchLst`(
	IN _search nvarchar(255)
)
BEGIN
	DECLARE _xsearchEmpresa nvarchar(255);
    
    SET _xsearchEmpresa=CONCAT('%', UCASE(_search) , '%');
    
     
	SELECT  Id,name, ActiveRelations, nBOE, nBOCM, Mark , Id as CompanyId, 0 as PersonId,1 as type	FROM empresa WHERE Name Like _xsearchEmpresa LIMIT 20;

    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `get_boletin` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `get_boletin`( IN Boletin nvarchar(20) )
BEGIN

SELECT boletin.id, BOLETIN,dia,mes,anyo,objeto_contrato,_tipo_contrato_aux.descripcion,_tipo_tramitacion_aux.descripcion,_adjudicador_aux.descripcion,_ambito_geografico_aux.descripcion,PDF,TEXTO,observaciones FROM boletin 
	INNER JOIN _tipo_contrato_aux ON boletin.Tipo_Boletin = _tipo_contrato_aux.codigo 
	INNER JOIN  _tipo_tramitacion_aux ON boletin.Tipo_Tramite = _tipo_tramitacion_aux.codigo 
	INNER JOIN  _adjudicador_aux ON boletin.Tipo_Adjudicador = _adjudicador_aux.codigo 
	INNER JOIN  _ambito_geografico_aux ON boletin.COD_Ambito_Geografico = _ambito_geografico_aux.codigo
	INNER JOIN  _tabla_precio_contrato_aux ON boletin.COD_Tabla_Precio = _tabla_precio_contrato_aux.codigo

WHERE BOLETIN= _Boletin;



END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BOLETIN` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BOLETIN`(
	
    IN _Type nvarchar(5),
    IN _counterMaterias INT,

    IN _BOLETIN nvarchar(18), 
	IN _Objeto TEXT,
    
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
    
    IN _Tipo_BOLETIN nvarchar(255),
	IN _Tipo_TRAMITE nvarchar(255),	    
	IN _Tipo_PRECIO nvarchar(255),
	IN _Tipo_adjudicador  nvarchar(255),
    
	IN _PDF nvarchar(255), 
    IN _Descripcion TEXT,    
	IN _Materias nvarchar(255),
    
    IN _UTE INT, 
    IN _LOTES INT,
	IN _JSON TEXT    
)
BEGIN

	DECLARE _counter int;
	DECLARE _Contador int;

    DECLARE code_Tipo_TRAMITE nvarchar(23);
    DECLARE code_Tipo_BOLETIN nvarchar(22);    
    DECLARE code_Tipo_precio nvarchar(23);
    DECLARE code_Tipo_adjudicador nvarchar(26);
    
    SET code_Tipo_BOLETIN = _codeaux('BOL',_Tipo_BOLETIN);
    SET code_Tipo_TRAMITE = _codeaux('TRA',_Tipo_TRAMITE);    
    SET code_Tipo_precio = _codeaux('PRE',_Tipo_PRECIO);
    SET code_Tipo_adjudicador = _codeaux('ADJ', _Tipo_adjudicador);
        
/*			ALTA DE BOLETIN                   */     

    INSERT IGNORE INTO boletin ( 
	Type,
	BOLETIN, 
	UTE,
    Lotes,
	dia,
	mes,
	anyo,
	
	_BOLETIN, 
	_TRAMITE,            
	_ADJUDICADOR,
	_Precio,
    
     PDF,Objeto_Contrato,JSON) VALUES ( 
	_Type,
	_BOLETIN, 
	_UTE,
    _LOTES,
	_Dia,
	_Mes,
	_Anyo,
	
	code_Tipo_BOLETIN, 
	code_Tipo_TRAMITE,	
	code_Tipo_adjudicador,
	code_Tipo_precio,
    _PDF,_objeto,_JSON);
	
	SET _counter= last_insert_id() ;
	SELECT _counter as ID;
	
	/*			ALTA DE MATERIAS DE BOLETIN                   */ 
	SET _Contador = 0;    
	while _Contador < _counterMaterias do	
		INSERT IGNORE INTO boletin_materias (BOLETIN,COD_Materia) VALUES (_BOLETIN, (SELECT SPLIT_STR(_Materias, ';', _Contador+1)) );
		SET _Contador = _Contador + 1;
	END WHILE;
            

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BOLETIN_Contrato` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_BOLETIN_Contrato`(_BOLETIN nvarchar(20), _keyEmpresa nvarchar(254), _Empresa text , _Importe nvarchar(14) , _key nvarchar(7), _acron nvarchar(55), _nif nvarchar(9), _counter int)
BEGIN
	INSERT IGNORE boletin_contratos (BOLETIN,_BormeEmpresa,Empresa,importe,_key,_acron,_nif, counter) VALUES (_BOLETIN,_keyEmpresa,_Empresa,_Importe,_key,_acron,_nif,_counter);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BOLETIN_Materia_Aux` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BOLETIN_Materia_Aux`(
	IN _Codigo nvarchar(8),
	IN _Descripcion nvarchar(255)  
)
BEGIN

	INSERT IGNORE INTO boletin_aux_MAT(_auxcode, descripcion, _l) VALUES (_Codigo , TRIM(_Descripcion), LENGTH(_Descripcion) );    


    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BORME_Auditor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Auditor`(_Name  nvarchar(250), _iKey  nvarchar(9),_provincia nvarchar(25),_BOLETIN nvarchar(20), _ID INT)
BEGIN
    INSERT borme_keys (_key,Nombre,_Auditor, Provincia,BOLETIN,_ID) VALUES(_iKey,_Name,1,_Provincia,_BOLETIN,_ID) ON DUPLICATE KEY UPDATE _Auditor = 1, Provincia= _provincia;
    SELECT LAST_INSERT_ID() as Id, _iKey as _key;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BORME_Diario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Diario`(
	IN _BOLETIN nvarchar(20) ,
    IN _BOLETIN_ID int,
    IN _Dia INT,
    IN _Mes INT,
    IN _Anyo INT,
    IN _Provincia nvarchar(50),
    IN _Empresa_Id int,
    IN _Empresa_key char(9),
    IN _Relacion_Id int,
    IN _Relacion_key char(9),
    IN _T_Relacion INT,
    IN _Activo int,
    IN _type nvarchar(100), 
    IN _key nvarchar(100),
    IN _value text
    
)
BEGIN
	DECLARE _counter int;
    
	IF _Empresa_Id>0 AND _Relacion_Id>0 THEN
	
			INSERT IGNORE INTO borme_relaciones (Empresa_key,Type,Relation_key,Motivo,Cargo,Activo,Anyo,Mes,Dia)
								  VALUES (_Empresa_key,_T_Relacion,_Relacion_key,_type,_key,_Activo,_Anyo,_Mes,_Dia); 
	else
			INSERT IGNORE INTO borme_actos (Empresa_key,Acto,Motivo,Texto,Anyo,Mes,Dia,BOLETIN,_ID)
								  VALUES (_Empresa_key,_type,_key,_value,_Anyo,_Mes,_Dia,_BOLETIN,_BOLETIN_ID); 		
    END IF;  
    

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BORME_Directivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Directivo`(IN _Name  nvarchar(250) , IN _ikey  nvarchar(9),IN _provincia nvarchar(25),IN _BOLETIN nvarchar(20), IN _ID INT)
BEGIN
    INSERT borme_keys (_key,Nombre,_Directivo,Provincia,BOLETIN,_ID ) VALUES(_iKey,_Name,1,_provincia,_BOLETIN,_ID) ON DUPLICATE KEY UPDATE _Directivo = 1,Provincia=_provincia;
    
	SELECT LAST_INSERT_ID() as Id,_iKey as _key;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BORME_Empresa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Empresa`(IN _Name  nvarchar(250), _iKey  nvarchar(9), _provincia nvarchar(25), _BOLETIN nvarchar(20), _ID INT)
BEGIN
    INSERT borme_keys (_key,Nombre,_Empresa,Provincia,BOLETIN,_ID ) VALUES(_iKey,_Name,1,_provincia,_BOLETIN,_ID) ON DUPLICATE KEY UPDATE _Empresa = 1,Provincia=_provincia;
    

    SELECT LAST_INSERT_ID() as Id,_iKey as _key;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_Tree` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_Tree`(_ikey VARCHAR(7) , _itree JSON  )
BEGIN
 INSERT borme_tree (_key, _tree ) VALUES(_iKey,_itree) ON DUPLICATE KEY UPDATE _tree = _itree;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

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

-- Dump completed on 2018-01-10 10:02:10
