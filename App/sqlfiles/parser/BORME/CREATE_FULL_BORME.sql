CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_borme` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bbdd_kaos155_borme`;
-- SET sql_mode = '';
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: kaosdev.bbdd.ovh    Database: bbdd_kaos155_borme
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.15-MariaDB-10.2.15+maria~stretch-log

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
-- Table structure for table `Workers_suspicius`
--

DROP TABLE IF EXISTS `Workers_suspicius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `Workers_suspicius` (
  `Borme_Nombre` varchar(255) DEFAULT NULL,
  `_key` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `_Nombre` varchar(100) CHARACTER SET utf8 DEFAULT NULL,
  `Caso` varchar(45) DEFAULT NULL,
  `_Match` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_actos`
--

DROP TABLE IF EXISTS `borme_actos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_actos` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Empresa_key` char(55) NOT NULL,
  `Acto` varchar(45) NOT NULL,
  `Motivo` varchar(55) NOT NULL,
  `Texto` varchar(255) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  `Mes` int(11) DEFAULT NULL,
  `Dia` int(11) DEFAULT NULL,
  `BOLETIN` varchar(20) DEFAULT NULL,
  `_ID` int(11) DEFAULT NULL,
  `DatosRegistrales` varchar(105) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `motivo` (`Empresa_key`,`Motivo`),
  KEY `Empresa` (`Empresa_key`),
  KEY `Boletin` (`BOLETIN`,`_ID`)
) ENGINE=InnoDB AUTO_INCREMENT=6040062 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_empresas`
--

DROP TABLE IF EXISTS `borme_empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_empresas` (
  `_id` int(11) DEFAULT NULL,
  `_key` varchar(36) NOT NULL,
  `Nombre` varchar(250) CHARACTER SET utf8 DEFAULT NULL,
  `provincia` varchar(45) CHARACTER SET utf8 DEFAULT NULL,
  `SA` bit(1) DEFAULT b'0',
  `SL` bit(1) DEFAULT b'0',
  `SLP` bit(1) DEFAULT b'0',
  `SLL` bit(1) DEFAULT b'0',
  `Anyo_constitucion` varchar(8) CHARACTER SET utf8 DEFAULT NULL,
  `Domicilio` varchar(255) CHARACTER SET utf8 DEFAULT NULL,
  `Objeto_Social` text CHARACTER SET utf8 DEFAULT NULL,
  `_Auditor` bit(1) DEFAULT b'0',
  `_Financiera` bit(1) DEFAULT b'0',
  `_sicav` bit(1) DEFAULT b'0',
  `_ute` bit(1) DEFAULT b'0',
  `_last_date_dom` date DEFAULT NULL,
  `_last_date_objeto` date DEFAULT NULL,
  `_activa` bit(1) DEFAULT b'1',
  `_date_extincion` date DEFAULT NULL,
  `_date_activacion` TIMESTAMP  DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`_key`),
  UNIQUE KEY `id` (`_id`),
  KEY `activos` (`_activa`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_keys`
--

DROP TABLE IF EXISTS `borme_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_keys` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `_key` varchar(36) NOT NULL,
  `Nombre` text DEFAULT NULL,
  `_Empresa` bit(1) DEFAULT b'0',
  `_Directivo` bit(1) DEFAULT b'0',
  `_Auditor` bit(1) DEFAULT b'0',
  `_Financiera` bit(1) DEFAULT b'0',
  `_Sicav` bit(1) DEFAULT b'0',
  `_Slp` bit(1) DEFAULT b'0',
  `T_Relations` int(11) DEFAULT 0,
  `ia_suspicius` bit(1) DEFAULT b'0',
  PRIMARY KEY (`id`),
  KEY `T_Relaciones` (`T_Relations`),
  KEY `_estado` (`_Empresa`,`_Directivo`,`_Auditor`,`_Financiera`,`_Sicav`,`_Slp`),
  KEY `_key` (`_key`),
  FULLTEXT KEY `Name` (`Nombre`)
) ENGINE=InnoDB AUTO_INCREMENT=4964597 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_relaciones`
--

DROP TABLE IF EXISTS `borme_relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_relaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Empresa_key` char(55) NOT NULL,
  `Relation_key` char(55) NOT NULL,
  `Type` int(11) DEFAULT 1,
  `Motivo` varchar(45) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `Activo` bit(1) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  `Mes` int(11) DEFAULT NULL,
  `Dia` int(11) DEFAULT NULL,
  `BOLETIN` varchar(20) DEFAULT NULL,
  `DatosRegistrales` varchar(105) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Empresa` (`Empresa_key`),
  KEY `Directivo` (`Relation_key`)
) ENGINE=InnoDB AUTO_INCREMENT=7865008 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ia_data_contratos`
--

DROP TABLE IF EXISTS `ia_data_contratos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ia_data_contratos` (
  `_key` varchar(36) NOT NULL,
  `_type` varchar(6) CHARACTER SET utf8 DEFAULT NULL,
  `_counter` int(11) DEFAULT NULL,
  `_importe` double DEFAULT NULL,
  PRIMARY KEY (`_key`),
  UNIQUE KEY `type` (`_key`,`_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ia_data_seguimiento`
--

DROP TABLE IF EXISTS `ia_data_seguimiento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ia_data_seguimiento` (
  `_key_seguimiento` varchar(36) NOT NULL,
  `_key_empresa` varchar(36) NOT NULL,
  PRIMARY KEY (`_key_seguimiento`,`_key_empresa`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ia_data_suspicius`
--

DROP TABLE IF EXISTS `ia_data_suspicius`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ia_data_suspicius` (
  `_path` varchar(512) CHARACTER SET utf8 NOT NULL,
  `_tree` varchar(512) CHARACTER SET utf8 DEFAULT NULL,
  `_key` varchar(36) NOT NULL,
  `_level` int(11) DEFAULT NULL,
  `_Nombre` varchar(55) CHARACTER SET utf8 DEFAULT NULL,
  `_Empresa` tinyint(4) DEFAULT NULL,
  `_trx` int(11) DEFAULT NULL,
  `_Financiera` tinyint(4) NOT NULL DEFAULT 0,
  `_Auditor` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_path`,`_key`),
  KEY `_trx` (`_trx`),
  KEY `_level` (`_level`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ia_data_tree`
--

DROP TABLE IF EXISTS `ia_data_tree`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ia_data_tree` (
  `_path` varchar(512) CHARACTER SET utf8 NOT NULL,
  `_tree` varchar(512) CHARACTER SET utf8 DEFAULT NULL,
  `_key` varchar(36) NOT NULL,
  `_level` int(11) DEFAULT NULL,
  `_Nombre` varchar(55) CHARACTER SET utf8 DEFAULT NULL,
  `_Empresa` tinyint(4) DEFAULT NULL,
  `_trx` int(11) DEFAULT NULL,
  `max_level` int(11) DEFAULT 1,
  `_suspicius` tinyint(4) NOT NULL DEFAULT 1,
  `_Financiera` tinyint(4) NOT NULL DEFAULT 0,
  `_Auditor` tinyint(4) NOT NULL DEFAULT 0,
  `_Stop` tinyint(4) NOT NULL DEFAULT 0,
  PRIMARY KEY (`_path`,`_key`),
  KEY `_trx` (`_trx`),
  KEY `_level` (`_level`)
) ENGINE=MEMORY DEFAULT CHARSET=latin1 MAX_ROWS=350000;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `ia_data_unique`
--

DROP TABLE IF EXISTS `ia_data_unique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ia_data_unique` (
  `Empresa_key` char(36) NOT NULL,
  `Relation_key` char(36) NOT NULL,
  PRIMARY KEY (`Empresa_key`,`Relation_key`),
  UNIQUE KEY `revert` (`Relation_key`,`Empresa_key`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `relacionado_con`
--

DROP TABLE IF EXISTS `relacionado_con`;
/*!50001 DROP VIEW IF EXISTS `relacionado_con`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `relacionado_con` AS SELECT 
 1 AS `_DKey`,
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `_Sicav`,
 1 AS `_Slp`,
 1 AS `T_Relations`,
 1 AS `ia_suspicius`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `relaciones_de`
--

DROP TABLE IF EXISTS `relaciones_de`;
/*!50001 DROP VIEW IF EXISTS `relaciones_de`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `relaciones_de` AS SELECT 
 1 AS `_DKey`,
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `_Sicav`,
 1 AS `_Slp`,
 1 AS `T_Relations`,
 1 AS `ia_suspicius`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'bbdd_kaos155_borme'
--
/*!50003 DROP FUNCTION IF EXISTS `count_str` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `count_str`( haystack TEXT,  needle VARCHAR(32)) RETURNS int(11)
    DETERMINISTIC
BEGIN
RETURN LENGTH(haystack) - LENGTH( REPLACE ( haystack, needle, space(char_length(needle)-1)));

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `IS_RegExp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `IS_RegExp`( cadena nvarchar(255), search nvarchar(25)) RETURNS int(11)
    DETERMINISTIC
BEGIN

RETURN (SELECT cadena REGEXP search);
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `JSON_Array_Nombramientos` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `JSON_Array_Nombramientos`(empresa_key nvarchar(32), relation_key nvarchar(32)) RETURNS longtext CHARSET latin1
    DETERMINISTIC
BEGIN

DECLARE fin INTEGER DEFAULT 0;
			
DECLARE JSON_OUTPUT JSON;
DECLARE _TJSON nvarchar(255) default '';

DECLARE _keys CURSOR FOR 
	SELECT JSON_object('Activo',CAST(activo as UNSIGNED),'Anyo',anyo,'mes',mes,'dia',dia,'motivo,',motivo,'cargo',cargo) FROM bbdd_kaos155_borme.relaciones_de 
			JOIN borme_relaciones on Empresa_key=_Dkey AND Relation_key = _key
			where _Dkey = empresa_key and _key=relation_key order by anyo desc,mes desc,dia desc,activo desc;

	DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;    

	SET JSON_OUTPUT = JSON_ARRAY();
	SET fin=0;
	OPEN _keys;
	-- get_keys: LOOP
	-- 		FETCH _keys INTO _TJSON;
			
			-- IF fin = 1 THEN
				-- LEAVE get_keys;
			-- END IF;
			-- SET JSON_OUTPUT = JSON_ARRAY_APPEND(JSON_OUTPUT,'$[0]',_TJSON);
            -- LEAVE get_keys;
	-- END LOOP get_keys;
	CLOSE _keys;  
        
RETURN JSON_OUTPUT;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `lastIndex` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `lastIndex`(_str nvarchar(255), _key nvarchar(10) ) RETURNS int(11)
    DETERMINISTIC
BEGIN

RETURN IF(LOCATE(UCASE(_key), UCASE(_str) )>0,LENGTH(_str) - LOCATE(UCASE(_key), REVERSE(UCASE(_str)))-(LENGTH(_key)-1),-1);
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 DROP FUNCTION IF EXISTS `_namespath` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_namespath`(_path nvarchar(256), _key nvarchar(32)) RETURNS text CHARSET latin1
    DETERMINISTIC
BEGIN
	DECLARE _TNombre nvarchar(55);
    DECLARE _fin int;
    SET @path = CONCAT(_path , _key,'#');
    SET @counter = count_str( @path ,'#');
	SET @str = '/'; -- SPLIT_STR(_path,'#',2);
    SET @e=1;
    
    -- SELECT @counter;
	while @e<=@counter DO
		begin
			DECLARE _keys CURSOR FOR 
				SELECT SUBSTR(Nombre,1,55) FROM borme_keys WHERE _key= SPLIT_STR(@path,'#',@e+1);


			DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin=1;    
			OPEN _keys;
			get_keys: LOOP
				FETCH _keys INTO _TNombre;
				-- SELECT _Tkey,_TNombre,_TEmpresa,_tr,_suspicius;
				SET @str = concat(@str, _TNombre, "/");
				IF _fin = 1 THEN
					LEAVE get_keys;
				END IF;
				
								
			END LOOP get_keys;
			CLOSE _keys; 
		end;
        SET @e = @e+1;
	end while;    
    
RETURN @str;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `_truncatestring` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_truncatestring`(str nvarchar(255), e int) RETURNS varchar(255) CHARSET utf8
    DETERMINISTIC
BEGIN

RETURN CONCAT(SUBSTR(str,1,e), IF(LENGTH(str)>e,'...',''));
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `_type`( Empresa int, Directivo int, Auditor int, Financiera int) RETURNS int(11)
    DETERMINISTIC
BEGIN  
  DECLARE _r int; 
  IF Financiera >0 THEN
	SET _r = 3;
  ELSE
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
	END IF;
  RETURN _r;  
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Auditor`(_mes int, _anyo int, _NAME  nvarchar(250), _iKey  nvarchar(55),_provincia nvarchar(25),_BOLETIN nvarchar(20), _ID INT,_empresa INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
		
    
	SET @Directivo =  NOT _NAME REGEXP '.+( SA| SL| SLP| SRC)$'; -- IF( ( lastIndex(_NAME,'SA')=length(_Name)-1 OR lastIndex(_NAME,'SL')=length(_Name)-1 OR lastIndex(_NAME,'SLP') =length(_Name)-2 OR lastIndex(_NAME,'SRC')=length(_Name)-2),0,1);
	SET @Empresa = if(@Directivo=1,0,1);
	
	SET @Financiera = 0;
	SET @Auditor= 1;
	SET @Sicav = 0;
	SET @UTE = _NAME REGEXP ' UTE$';
    
	IF INSTR(UPPER(_NAME),'BANCO ')>0 OR INSTR(UPPER(_NAME),'BANK')>0 OR INSTR(UPPER(_NAME),'CAJA ')>0 OR INSTR(UPPER(_NAME),'CAIXA ')>0 OR INSTR(UPPER(_NAME),'SEGUROS ')>0 OR INSTR(UPPER(_NAME),'CAJAS')>0 THEN
		SET @Financiera = 1;
		SET @Directivo = 0;
		SET @Empresa = 1;
	END IF;
 
	SET @Sicav = 0;
	IF lastIndex(_NAME,'SICAV')>0 THEN
		SET @Sicav = 1;
		SET @Directivo = 0;
		SET @Empresa = 1;
	END IF;
	
	IF @Empresa=1 THEN
		SET _NAME= UCASE(_NAME);
	END IF;
    
	IF @repeat = 0 THEN
		INSERT INTO borme_keys (_key, Nombre, _Empresa,_Directivo, _Auditor, _Financiera, _Sicav) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
        		
        IF @Empresa=1  THEN
			INSERT INTO borme_empresas (_id,_key,Nombre,provincia,SA,SL,SLL,SLP,_Auditor,_Financiera, _Sicav,_ute) 
			VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia,_NAME REGEXP 'SA$',
																	_NAME REGEXP 'SL$',
																	_NAME REGEXP 'SLL$',
																	_NAME REGEXP 'SLP$',@Auditor,@Financiera,@Sicav,@UTE);
		END IF;
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
    END IF;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Diario`(
	IN _BOLETIN nvarchar(20) ,
    IN _BOLETIN_ID int,
    IN _Dia INT,
    IN _Mes INT,
    IN _Anyo INT,
    IN _Provincia nvarchar(50),
    IN _Empresa_Id int,
    IN _Empresa_key nvarchar(36),
    IN _Relacion_Id int,
    IN _Relacion_key nvarchar(36),
    IN _T_Relacion INT,
    IN _Activo int,
    IN _type nvarchar(100), 
    IN _key nvarchar(100),
    IN _value text,
    IN _DatosRegistrales nvarchar(100),
    IN _MinRel int,
    
    IN _Empresa int,
    IN _Directivo int,
    IN _Financiera int,
    IN _Auditor int,
    IN _Sicav int
)
BEGIN



	-- DECLARE @counter int;



    
	IF _Empresa_Id>0 AND _Relacion_Id>0 THEN
			
       -- SET @counter = (SELECT Count(*) FROM ia_data_unique WHERE Empresa_key = _Empresa_key AND Relation_key = _Relacion_key);
		 -- IF @counter=0 THEN	
		
         -- END IF;
        
		INSERT IGNORE INTO borme_relaciones (BOLETIN,Empresa_key,Type,Relation_key,Motivo,Cargo,Activo,Anyo,Mes,Dia,DatosRegistrales)
			VALUES (_BOLETIN,_Empresa_key,_T_Relacion,_Relacion_key,_type,_key,_Activo,_Anyo,_Mes,_Dia,_DatosRegistrales); 
		
         INSERT IGNORE INTO ia_data_unique (Empresa_key,Relation_key) 
		     VALUES (_Empresa_key,_Relacion_key);
             
        IF ROW_COUNT() THEN
			UPDATE borme_keys SET T_Relations =T_Relations + 1 WHERE id = _Empresa_Id OR id = _Relacion_Id;
		END IF;
        -- SET _counter = (SELECT Count(*) FROM ia_data_unique WHERE Relation_key = _Relacion_key);
		 
         SET @counter = (SELECT T_Relations FROM borme_keys WHERE id = _Relacion_Id);      
         IF @counter >= _minRel THEN
			-- Provoca retardos sustituido por procedimiento + rápido
			-- UPDATE borme_keys JOIN ia_data_unique on ia_data_unique.Empresa_key=borme_keys._key SET ia_suspicius=1  WHERE ia_data_unique.Relation_key=_Relacion_key AND NOT borme_keys.ia_suspicius;
            call Insert_Data_IA_seguimiento(_Relacion_key , _MinRel);
			-- SELECT @counter;
		 END IF;	
		
    
    else
		INSERT IGNORE INTO borme_actos (Empresa_key,Acto,Motivo,Texto,Anyo,Mes,Dia,BOLETIN,_ID,DatosRegistrales)
		     VALUES (_Empresa_key,_type,_key,_value,_Anyo,_Mes,_Dia,_BOLETIN,_BOLETIN_ID,_DatosRegistrales); 		


		-- INSERT INTO ia_data_preStadistics (_id_Empresa,_type,_Dia,_Mes,_Anyo,_Tipo,_Moti) VALUES (_Empresa_Id,_type,_Dia,_Mes,_Anyo,_key,_value);
		-- CALL  Insert_Data_IA_movimiento(
											-- _Empresa_key,
                                            -- _Empresa_Id ,
											-- _type ,
											-- _Dia ,
											-- _Mes , 
											-- _Anyo , 
											-- -- _Provincia , 
											
											-- _Empresa ,    
											-- _Financiera ,
											-- _Auditor ,
											-- _Sicav ,
											
											-- _key,
											-- _value 
										-- ); 


		-- INSERT INTO ia_data_preStadistics (id_Empresa,_type,_Dia,_Mes,_Anyo,_Provincia,_Tipo,_Motivo) VALUES (_Empresa_Id,_type,_Dia,_Mes,_Anyo,_Provincia,_key,_value);

        SELECT * FROM borme_keys WHERE id = _Empresa_Id;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Directivo`(_mes int, _anyo int, IN _NAME  nvarchar(250) , IN _ikey  nvarchar(55),IN _provincia nvarchar(25),IN _BOLETIN nvarchar(20), IN _ID INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
	
	SET @Directivo = 1;
	SET @Empresa = 0;
	SET @Financiera = 0;
	SET @Auditor= 0;
    SET @UTE = _NAME REGEXP ' UTE$';
    
	IF INSTR(UPPER(_NAME),'BANCO ')>0 OR INSTR(UPPER(_NAME),'BANK')>0 OR INSTR(UPPER(_NAME),'CAJA ')>0 OR INSTR(UPPER(_NAME),'CAIXA ')>0 OR INSTR(UPPER(_NAME),'SEGUROS ')>0 OR INSTR(UPPER(_NAME),'CAJAS')>0 THEN
		SET @Financiera = 1;
		SET @Directivo = 0;
		SET @Empresa = 1;
	END IF;
 
	SET @Sicav = 0;
	IF lastIndex(_NAME,'SICAV')>0 THEN
		SET @Sicav = 1;
		SET @Directivo = 0;
        SET @Financiera = 0;
		SET @Empresa = 1;
	END IF;
	
	IF INSTR(UPPER(_NAME),'AUDITOR')>0 or INSTR(UPPER(_NAME),'ASESOR')>0 or INSTR(UPPER(_NAME),'CONSULTOR')>0 THEN
		SET @Auditor= 1;
		SET @Directivo = NOT _NAME REGEXP '.+( SA| SL| SLP| SRC)$';
		SET @Empresa = if(@Directivo=1,0,1);
	END IF;
	
	IF @Empresa=1 THEN
		SET _NAME= UCASE(_NAME);
	END IF;
	IF @repeat = 0 THEN       
		INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
        
        IF @Empresa=1  THEN
        INSERT INTO borme_empresas (_id,_key,Nombre,provincia,SA,SL,SLL,SLP,_Auditor,_Financiera, _Sicav,_ute) 
			VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia,_NAME REGEXP 'SA$',
																	_NAME REGEXP 'SL$',
																	_NAME REGEXP 'SLL$',
																	_NAME REGEXP 'SLP$',@Auditor,@Financiera,@Sicav,@UTE);
		END IF;
        
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
    END IF;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Empresa`(_mes int, _anyo int, IN _NAME  nvarchar(250), _iKey  nvarchar(55), _provincia nvarchar(25), _BOLETIN nvarchar(20), _ID INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
	
		SET @Directivo = 0;
		SET @Empresa = 1;
		SET @Financiera = 0;
		SET @Auditor=0;
		SET @Sicav = 0;
		SET @UTE = _NAME REGEXP ' UTE$';
		
		IF INSTR(UPPER(_NAME),'BANCO ')>0 OR INSTR(UPPER(_NAME),'BANK')>0 OR INSTR(UPPER(_NAME),'CAJA ')>0 OR INSTR(UPPER(_NAME),'CAIXA ')>0 OR INSTR(UPPER(_NAME),'SEGUROS ')>0 OR INSTR(UPPER(_NAME),'CAJAS')>0 THEN
			SET @Financiera = 1;
		END IF;
	 
		
		IF INSTR(UPPER(_NAME),' SICAV ')>0 THEN
			SET @Sicav = 1;
            SET @Financiera = 0;
		END IF;

		IF INSTR(UPPER(_NAME),'AUDITOR')>0 or INSTR(UPPER(_NAME),'ASESOR')>0 or INSTR(UPPER(_NAME),'CONSULTOR')>0 THEN
			SET @Auditor= 1;
		END IF;
        
	IF @repeat = 0 THEN
	

         
		INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
        
        INSERT INTO borme_empresas (_id,_key,Nombre,provincia,SA,SL,SLL,SLP,_Auditor,_Financiera, _Sicav,_ute) 
        VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia,_NAME REGEXP 'SA$',
														_NAME REGEXP 'SL$',
														_NAME REGEXP 'SLL$',
														_NAME REGEXP 'SLP$',@Auditor,@Financiera,@Sicav,@UTE);
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius, @Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav ;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_IA_constitucion` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_IA_constitucion`(
	_Mes int, 
	_Anyo int, 
	_Provincia nvarchar(45), 
    
	_empresa int,    
	_financiera int,
	_auditor int,
	_sicav int
)
BEGIN

	IF  _financiera=1 THEN
		INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_empresas,add_financieras) VALUES (_Mes,_Anyo,_Provincia,1,1) ON DUPLICATE KEY UPDATE add_empresas=add_empresas+1 ,add_financieras=add_financieras+1;
	else
		IF  _empresa=1 THEN
			INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_empresas) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE add_empresas=add_empresas+1;
		END IF;		
        IF  _auditor=1 THEN
			INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_auditor) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE add_auditor=add_auditor+1;
		END IF;
		IF  _sicav=1 THEN
			INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_sicav) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE add_sicav=add_sicav+1;
		END IF;

	END IF;

	


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_IA_movimiento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_IA_movimiento`(
	_key nvarchar(36),
	_id_empresa int,
	_type nvarchar(25),
    _Dia nvarchar(2),
	_Mes nvarchar(2), 
	_Anyo nvarchar(4), 
	_Provincia nvarchar(45), 
    
	_empresa int,    
	_financiera int,
	_auditor int,
	_sicav int,
    
    _tipo nvarchar(125),
    _motivo text
)
BEGIN
	SET @Fecha = STR_TO_DATE(CONCAT(_dia,'/',_Mes,'/',_Anyo),'%d/%m/%Y');
	IF _Type='Varios' then
		
        IF _tipo='Cambio de domicilio social' OR _tipo= "Objeto social" THEN
        
			IF _tipo='Cambio de domicilio social' THEN
				UPDATE borme_empresas SET Domicilio = _motivo,_last_date_dom= @Fecha WHERE _last_date_dom<@Fecha OR _last_date_dom is null and _id=_id_empresa;
			END IF;
			IF _tipo= "Objeto social" THEN			
				UPDATE borme_empresas SET Objeto_Social = _motivo,_last_date_objeto= @Fecha WHERE _last_date_objeto<@Fecha OR _last_date_objeto is null and _id=_id_empresa;
			END IF;
			
			IF _Mes=1 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Enero,Total) values(_Provincia,SUBSTR(_tipo,1,45) ,_Anyo,1,1) on duplicate key update Enero=Enero + 1,Total=Total+1;
			END IF;
			IF _Mes=2 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Febrero,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Febrero=Febrero + 1,Total=Total+1;    
			END IF;
			IF _Mes=3 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Marzo,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Marzo=Marzo + 1,Total=Total+1;  
			END IF;
			IF _Mes=4 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Abril,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Abril=Abril + 1,Total=Total+1;    
			END IF;
			IF _Mes=5 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Mayo,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Mayo=Mayo + 1,Total=Total+1;
			END IF;
			IF _Mes=6 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Junio,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Junio=Junio + 1,Total=Total+1;  
			END IF;
			IF _Mes=7 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Julio,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Julio=Julio + 1,Total=Total+1;  
			END IF;
			IF _Mes=8 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Agosto,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Agosto=Agosto + 1,Total=Total+1;  
			END IF;
			IF _Mes=9 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Septiembre,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Septiembre=Septiembre + 1,Total=Total+1;  
			END IF;
			IF _Mes=10 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Octubre,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Octubre=Octubre + 1,Total=Total+1;  
			END IF;
			IF _Mes=11 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Noviembre,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Noviembre=Noviembre + 1,Total=Total+1;  
			END IF;
			IF _Mes=12 THEN
				INSERT INTO borme_stadistics (Provincia, Acto,Anyo,Diciembre,Total) values(_Provincia,SUBSTR(_tipo,1,45),_Anyo,1,1) on duplicate key update Diciembre=Diciembre + 1,Total=Total+1;  
			END IF;
        END IF;
    END IF;
    
	IF _Type='Constitucion' then

		IF  _financiera=1 THEN
			INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_empresas,add_financieras) VALUES (_Mes,_Anyo,_Provincia,1,1) ON DUPLICATE KEY UPDATE add_empresas=add_empresas+1 ,add_financieras=add_financieras+1;
		else
			IF  _empresa=1 THEN
				INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_empresas) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE add_empresas=add_empresas+1;
			END IF;		
			IF  _auditor=1 THEN
				INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_auditor) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE add_auditor=add_auditor+1;
			END IF;
			IF  _sicav=1 THEN
				INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,add_sicav) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE add_sicav=add_sicav+1;
			END IF;

		END IF;       
		IF _tipo='Comienzo de operaciones' THEN
			SET @_Date = STR_TO_DATE(substr(_motivo,1,8), '%d.%m.%Y' );
			IF @_Date IS NOT NULL THEN
				UPDATE borme_empresas SET  _activa=1, _date_activacion=STR_TO_DATE(substr(_motivo,1,8), '%d.%m.%Y'), Anyo_constitucion= substr(_motivo,1,8) where _id = _id_empresa;
			ELSE
				UPDATE borme_empresas SET  _activa=1, _date_activacion=now(), Anyo_constitucion= substr(_motivo,1,8) where _id = _id_empresa;
            END IF;
		END IF;
	end if;
	IF _Type='Extincion' then
		UPDATE borme_empresas SET _activa=0, _date_extincion= @Fecha where _id = _id_empresa;
		IF  _financiera=1 THEN
			INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,sup_empresas,sup_financieras) VALUES (_Mes,_Anyo,_Provincia,1,1) ON DUPLICATE KEY UPDATE sup_empresas=sup_empresas+1 ,sup_financieras=sup_financieras+1;
		else
			IF  _empresa=1 THEN
				INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,sup_empresas) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE sup_empresas=sup_empresas+1;
			END IF;		
			IF  _auditor=1 THEN
				INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,sup_auditor) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE sup_auditor=sup_auditor+1;
			END IF;
			IF  _sicav=1 THEN
				INSERT INTO borme_stadistics_keys (_mes,_anyo,_Provincia,sup_sicav) VALUES (_Mes,_Anyo,_Provincia,1) ON DUPLICATE KEY UPDATE sup_sicav=sup_sicav+1;
			END IF;

		END IF;
	end if;	


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_IA_seguimiento` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_IA_seguimiento`(_dkey VARCHAR(36), _minrel int)
BEGIN
	DECLARE _ekey VARCHAR(36);
    DECLARE _id INT;
    
    DECLARE fin INTEGER DEFAULT 0;
    DECLARE runners_cursor CURSOR FOR 
		SELECT borme_keys.id, _key FROM ia_data_unique JOIN borme_keys on ia_data_unique.Empresa_key=borme_keys._key WHERE ia_data_unique.Relation_key=_dkey AND NOT borme_keys.ia_suspicius;
        
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
    SET @Counter = (SELECT T_Relations FROM borme_keys where _key=_dkey AND T_Relations>_minrel AND _Directivo AND NOT _Auditor AND NOT _Financiera AND NOT _sicav);
    IF @Counter>0 THEN
		OPEN runners_cursor;
		get_cursor: LOOP
			FETCH runners_cursor INTO _id, _ekey;
			IF fin = 1 THEN
			   LEAVE get_cursor;
			END IF;
            UPDATE borme_keys SET ia_suspicius=1 WHERE id = _id;
			INSERT IGNORE ia_data_seguimiento (_key_seguimiento,_key_empresa) VALUES (_dkey,_ekey);
		END LOOP get_cursor;
		
		UPDATE borme_keys SET ia_suspicius=1 WHERE _key = _dkey ;
		CLOSE runners_cursor;   
	END IF;
    SELECT @Counter as counter;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `tree_getRelationsKey` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `tree_getRelationsKey`(in _type int,in _key nvarchar(32))
BEGIN

SELECT 'HI';


	SELECT 
        `bbdd_kaos155_borme`.`ia_data_unique`.`Relation_key` AS `_DKey`,
        `bbdd_kaos155_borme`.`ia_data_unique`.`Empresa_key` AS `_key`,
        `_Empresa`.`Nombre` AS `Nombre`,
        `_Empresa`.`_Empresa` AS `_Empresa`,
        `_Empresa`.`_Directivo` AS `_Directivo`,
        `_Empresa`.`_Auditor` AS `_Auditor`,
        `_Empresa`.`_Financiera` AS `_Financiera`,
        `_Empresa`.`_Sicav` AS `_Sicav`,
        `_Empresa`.`_Slp` AS `_Slp`,
        `_Empresa`.`T_Relations` AS `T_Relations`,
        `_Empresa`.`ia_suspicius` AS `ia_suspicius`
    FROM
        ((`bbdd_kaos155_borme`.`ia_data_unique`
        LEFT JOIN `bbdd_kaos155_borme`.`borme_keys` `_Empresa` ON (`bbdd_kaos155_borme`.`ia_data_unique`.`Empresa_key` = `_Empresa`.`_key`))
        LEFT JOIN `bbdd_kaos155_borme`.`borme_keys` `_directivo` ON (`bbdd_kaos155_borme`.`ia_data_unique`.`Relation_key` = `_directivo`.`_key`))

WHERE ia_data_unique.Relation_key=_key;


END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Tree_IA` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Tree_IA`( IN _Pkey varchar(36),IN maxlevel int, IN min_Relations int, IN max_nodes int	, IN _memory boolean)
BEGIN

    DECLARE _TEmpresa boolean;
    DECLARE _TFinanciera boolean;
    DECLARE _TAuditor boolean;
    DECLARE _suspicius boolean;
    
    DECLARE _Tkey VARCHAR(32);
	DECLARE _TNombre nVARCHAR(55);
    DECLARE _tr int;
    
    DECLARE _contador INTEGER DEFAULT 0;
    DECLARE _count_susp INTEGER DEFAULT 0;
    DECLARE fin INTEGER DEFAULT 0;
    DECLARE _Timex bigint DEFAULT 0;
 
	DECLARE exit handler for SQLEXCEPTION
		 BEGIN
		  GET DIAGNOSTICS CONDITION 1 @sqlstate = RETURNED_SQLSTATE, 
		   @errno = MYSQL_ERRNO, @text = MESSAGE_TEXT;
		  SET @full_error = CONCAT("ERROR ", @errno, " (", @sqlstate, "): ", @text);
    
		SELECT ((UNIX_TIMESTAMP(now())*1000) - _Timex)/1000 as seconds,_contador as nodes,_count_susp as _suspicius,max_nodes,min_Relations;
		SELECT _level,_key,_Nombre, concat(_tree, '\\' ,_Nombre) as _tree,_Empresa,_Financiera,_Auditor, _trx as _score,_path FROM ia_data_suspicius where _path LIKE CONCAT('#',_Tkey,'%') ORDER BY _trx DESC; -- _suspicius  and not _Financiera and not _Auditor;

		  
		  -- SELECT @full_error;
		 END;
 
 
 
	DROP TABLE IF EXISTS ia_data_tree;
	-- SET max_heap_table_size = 2024*1024*1024;
    
    CREATE TABLE IF NOT EXISTS  `ia_data_suspicius` (
		  `_path` nvarchar(512)  DEFAULT NULL,
		  `_tree` nvarchar(512)  DEFAULT NULL,
		  `_key` varchar(36) NOT NULL,
		  `_level` int(11) DEFAULT NULL,
		  `_Nombre` nvarchar(55) DEFAULT NULL,
		  `_Empresa` tinyint(4) DEFAULT NULL,
		  `_trx` int(11) DEFAULT NULL,
		  `_Financiera` tinyint(4) NOT NULL DEFAULT 0,
		  `_Auditor` tinyint(4) NOT NULL DEFAULT 0,
		  
		   PRIMARY KEY (`_path`,`_key`),
		   KEY `_trx` (`_trx`),
		   KEY `_level` (`_level`)
		) ENGINE=innodb DEFAULT CHARSET=latin1;
    
    IF NOT _memory THEN
		CREATE TABLE `ia_data_tree` (
		  `_path` nvarchar(512)  DEFAULT NULL,
		  `_tree` nvarchar(512)  DEFAULT NULL,
		  `_key` varchar(36) NOT NULL,
		  `_level` int(11) DEFAULT NULL,
		  `_Nombre` nvarchar(55) DEFAULT NULL,
		  `_Empresa` tinyint(4) DEFAULT NULL,
		  `_trx` int(11) DEFAULT NULL,
		  `max_level` int(11) DEFAULT 1,
		  `_suspicius` tinyint(4) NOT NULL DEFAULT 1,
		  `_Financiera` tinyint(4) NOT NULL DEFAULT 0,
		  `_Auditor` tinyint(4) NOT NULL DEFAULT 0,
		  `_Stop` tinyint(4) NOT NULL DEFAULT 0,
		  
		   PRIMARY KEY (`_path`,`_key`),
		   KEY `_trx` (`_trx`),
		   KEY `_level` (`_level`)
		) ENGINE=innodb DEFAULT CHARSET=latin1 MAX_ROWS=350000;
	ELSE
		CREATE TABLE `ia_data_tree` (
		  `_path` nvarchar(512)  DEFAULT NULL,
		  `_tree` nvarchar(512)  DEFAULT NULL,
		  `_key` varchar(36) NOT NULL,
		  `_level` int(11) DEFAULT NULL,
		  `_Nombre` nvarchar(55) DEFAULT NULL,
		  `_Empresa` tinyint(4) DEFAULT NULL,
		  `_trx` int(11) DEFAULT NULL,
		  `max_level` int(11) DEFAULT 1,
		  `_suspicius` tinyint(4) NOT NULL DEFAULT 1,
		  `_Financiera` tinyint(4) NOT NULL DEFAULT 0,
		  `_Auditor` tinyint(4) NOT NULL DEFAULT 0,
		  `_Stop` tinyint(4) NOT NULL DEFAULT 0,
		  
		   PRIMARY KEY (`_path`,`_key`),
		   KEY `_trx` (`_trx`),
		   KEY `_level` (`_level`)
		) ENGINE=MEMORY DEFAULT CHARSET=latin1 MAX_ROWS=350000;
    END IF;
    
    SET _Timex = (UNIX_TIMESTAMP(now())*1000);
    -- SELECT _timex;
    
	SET @level=1;
	SET @go = false;
    
	begin
		DECLARE _keys CURSOR FOR 
			SELECT _key,_truncatestring(Nombre,52),_Empresa,_Financiera,_Auditor,T_Relations,ia_suspicius FROM borme_keys WHERE _key=_Pkey;


		DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;    
		OPEN _keys;
		get_keys: LOOP
			FETCH _keys INTO _Tkey,_TNombre,_TEmpresa,_TFinanciera,_TAuditor,_tr,_suspicius;
			
            
			IF fin = 1 THEN
				LEAVE get_keys;
			END IF;
			
			INSERT INTO ia_data_tree (_tree,_path,_key,_Nombre,_Empresa,_Financiera,_Auditor,_trx,_suspicius,_level,max_level) VALUES 
									 ('\\','#',_Tkey,_TNombre,_TEmpresa,_TFinanciera,_TAuditor,_tr,_suspicius,1,maxlevel);
			
            SELECT _Timex as _id,_Tkey,_TNombre,LENGTH(_TNombre);
            
            SET @go = true;
			
		END LOOP get_keys;
		CLOSE _keys;       
	end;
        -- SELECT  _Tlevel,_maxlevel,_TEmpresa,_Tpath, _Tkey, concat(_Tpath,_Tkey);
	IF @go THEN
		while @level<=maxlevel DO
			 IF max_nodes>_contador THEN
				 call `bbdd_kaos155_borme`.`Tree_IA_store`(@level,_Timex,maxlevel,min_Relations,max_nodes,_contador,_count_susp,_contador,_count_susp);
			 END IF;
            set @level=@level+1;
		end while;
	END IF;
    SET @b = '\\';

    SELECT ((UNIX_TIMESTAMP(now())*1000) - _Timex)/1000 as seconds,_contador as nodes,_count_susp as _suspicius,max_nodes,min_Relations;
    SELECT _level,_key,_Nombre, concat(_tree, @b ,_Nombre) as _tree,_Empresa,_Financiera,_Auditor, _trx as _score,_path FROM ia_data_suspicius where _path LIKE CONCAT('#',_Tkey,'%') ORDER BY _trx DESC; -- _suspicius  and not _Financiera and not _Auditor;
    -- DROP TABLE IF EXISTS ia_data_tree;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Tree_IA_GetRelations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Tree_IA_GetRelations`(
	IN _Tlevel int,
    IN _timex bigint,
	IN _maxlevel int,
    IN max_Tr int,
    IN max_node int,
    IN _TEmpresa boolean,
    IN _Tkey VARCHAR(36),
    _Ttr int,
    IN _TParent nvarchar(512),
    IN _Tpath nVARCHAR(512),
    IN _Ttree nVARCHAR(512),
    IN _contador int,
    IN _csusp int,
    OUT _count_susp int
)
BEGIN





	DECLARE _ekey VARCHAR(36);
    DECLARE _empresa boolean;
    DECLARE _financiera boolean;
    DECLARE _auditor boolean;
    
    DECLARE _Nombre nvarchar(55);
    DECLARE _suspicius boolean;
    
    DECLARE fin INTEGER DEFAULT 0;
    DECLARE fin_rdc INTEGER DEFAULT 0;
    DECLARE fin_rcc INTEGER DEFAULT 0;
    DECLARE _full_error nvarchar(512) DEFAULT '';
 
    DECLARE relaciones_de_cursor CURSOR FOR 
		SELECT borme_keys._key,_truncatestring(borme_keys.Nombre,52),borme_keys._Empresa,borme_keys._Financiera,borme_keys._Auditor,borme_keys.T_Relations,borme_keys.ia_suspicius and borme_keys.T_Relations>=max_Tr FROM ia_data_unique JOIN borme_keys on ia_data_unique.Relation_key=borme_keys._key WHERE ia_data_unique.Empresa_key=_Tkey AND ia_data_unique.Relation_key<>SPLIT_STR(_TPath,'#',_Tlevel-1) ;
	
    
    DECLARE relacionado_con_cursor CURSOR FOR 
		SELECT borme_keys._key,_truncatestring(borme_keys.Nombre,52),borme_keys._Empresa,borme_keys._Financiera,borme_keys._Auditor,borme_keys.T_Relations,borme_keys.ia_suspicius and borme_keys.T_Relations>=max_Tr FROM ia_data_unique JOIN borme_keys on ia_data_unique.Empresa_key=borme_keys._key WHERE ia_data_unique.Relation_key=_Tkey AND ia_data_unique.Empresa_key<>SPLIT_STR(_TPath,'#',_Tlevel-1); -- substr(_TPath,2,length(_TPath)-2);


         
	SET _count_susp = _csusp;	

    

         
        IF _Ttr>0 AND _maxlevel>=_Tlevel AND _contador<max_node THEN
			IF _TEmpresa THEN

				begin
				
					DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin_rdc=1;





					OPEN relaciones_de_cursor;
					get_relaciones_decursor: LOOP
                    
                    

                   
                    
                    
                    
						FETCH relaciones_de_cursor INTO _ekey,_Nombre,_empresa,_financiera,_auditor,_Ttr,_suspicius;
                        -- SELECT fin_rdc, _Tpath,@k,_Tlevel;
                        
						IF fin_rdc = 1 or  length(_full_error)>0 THEN
							LEAVE get_relaciones_decursor;
						END IF;
                        
						IF _suspicius AND NOT _Empresa THEN
							SET _count_susp =_count_susp + 1;
                            INSERT IGNORE INTO ia_data_suspicius (_level,_key,_Nombre,_path,_tree,_Empresa,_Financiera,_Auditor,_trx) values
														(_Tlevel, _ekey,_Nombre, _Tpath,_Ttree,_empresa,_financiera,_auditor,_Ttr);
						 END IF;
							INSERT INTO ia_data_tree (_level,_key,_Nombre,_path,_tree,_Empresa,_Financiera,_Auditor,max_level,_trx,_suspicius,_Stop)
								values ( _Tlevel, _ekey,_Nombre, _Tpath,_Ttree,_empresa,_financiera,_auditor,_maxlevel,_Ttr,_suspicius , (_suspicius AND NOT _Empresa  ));
	                    
                                               -- SELECT _path,_Tkey,_ekey,_TEmpresa;
                         
					    -- INSERT INTO ia_data_tree (_level,_key,_Nombre,_path,_tree,_Empresa,_Financiera,_Auditor,max_level,_trx,_suspicius,_Stop)
						-- 	values ( _Tlevel, _ekey,_Nombre, _Tpath,_Ttree,_empresa,_financiera,_auditor,_maxlevel,_Ttr,_suspicius , (_suspicius AND NOT _Empresa  ));
						
                        
					END LOOP get_relaciones_decursor;
					CLOSE relaciones_de_cursor;  
				end;
			ELSE
				begin
					DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin_rcc=1;
					OPEN relacionado_con_cursor;
					get_relacionado_concursor: LOOP
						FETCH relacionado_con_cursor INTO _ekey,_Nombre,_empresa,_financiera,_auditor,_Ttr,_suspicius;
						IF fin_rcc = 1 OR length(_full_error)>0 THEN
							LEAVE get_relacionado_concursor;
						END IF;
                        -- SELECT @Counter,_maxlevel,_path,_path,_ekey,_TEmpresa;
						IF _suspicius AND NOT _Empresa THEN
							SET _count_susp =_count_susp + 1;
                             INSERT IGNORE INTO ia_data_suspicius (_level,_key,_Nombre,_path,_tree,_Empresa,_Financiera,_Auditor,_trx) values
							 								(_Tlevel, _ekey,_Nombre, _Tpath,_Ttree,_empresa,_financiera,_auditor,_Ttr);
						END IF;
						INSERT INTO ia_data_tree (_level,_key,_Nombre,_path,_tree,_Empresa,_Financiera,_Auditor,max_level,_trx,_suspicius,_Stop)
							values ( _Tlevel, _ekey,_Nombre, _Tpath,_Ttree,_empresa,_financiera,_auditor,_maxlevel,_Ttr,_suspicius , (_suspicius AND NOT _Empresa  ));	                    
											 
					END LOOP get_relacionado_concursor;
					CLOSE relacionado_con_cursor;   
				end;
			END IF;
		END IF;

END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Tree_IA_store` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Tree_IA_store`(IN _Tlevel int ,IN _timex bigint,IN _maxlevel int, IN max_Tr int,in _maxnode int,in _Counter int ,   IN _csusp int , OUT _contador int, OUT _count_susp int)
BEGIN

	
    DECLARE _TEmpresa boolean;
    DECLARE _TFinanciera boolean;
    DECLARE _TAuditor boolean;
    DECLARE _Tsuspicius boolean;
    DECLARE _Tstop boolean;
    DECLARE _Ttr int;
    
    DECLARE _Tkey VARCHAR(36);
    DECLARE _TNombre VARCHAR(55);
    DECLARE _Tpath nVARCHAR(512) ; 
	DECLARE _Ttree nVARCHAR(512) ;
    
    DECLARE fin INTEGER DEFAULT 0;
    DECLARE relaciones CURSOR FOR 
		SELECT _tree,_path,_key,_Nombre,_Empresa,_Financiera,_Auditor,_trx,_suspicius,_stop FROM ia_data_tree WHERE _level=_Tlevel;


	DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
    
    SET _count_susp = _csusp;
    SET _contador = _Counter;
    SELECT _level,_key,_Nombre,concat(_tree,'\\',_Nombre) as _tree,_Empresa,_Financiera,_Auditor, _trx as _score,_path FROM ia_data_tree order by _trx;
    
	OPEN relaciones;
	get_relaciones: LOOP
		FETCH relaciones INTO _Ttree,_Tpath,_Tkey,_TNombre,_TEmpresa,_TFinanciera,_TAuditor,_Ttr,_Tsuspicius,_TStop;
        
       -- SELECT  fin,_Tsuspicius, _Tlevel,_TEmpresa,_TFinanciera,_TAuditor,_Tpath, _Tkey, concat(_Tpath,_Tkey);
        
		IF fin = 1 THEN
			LEAVE get_relaciones;
		END IF;
        
        
        IF NOT _TFinanciera AND NOT _TAuditor AND NOT _Tstop AND _maxnode>=_contador THEN -- AND (NOT _suspicius OR (_suspicius AND _TEmpresa)) THEN
		  -- SELECT NOT _TFinanciera AND NOT _TAuditor, fin, _Tlevel,_Tpath,_Tkey,_TEmpresa,_TFinanciera,_TAuditor,_maxlevel;
		  SET _contador = _contador + 1;
		  CALL `bbdd_kaos155_borme`.`Tree_IA_GetRelations`( _Tlevel+1,_timex,_maxlevel,max_Tr,_maxnode,_TEmpresa, _Tkey,_Ttr, _Tpath, concat(_Tpath,_Tkey,"#"), concat(_Ttree,_TNombre,"\\"),_contador,_csusp  , _count_susp );
		 -- INSERT INTO ia_data_tree (_key,_path,_Empresa,max_level) values ( _ekey, concat(_path,'#',_ekey),_empresa,_maxlevel);
		END IF;
    END LOOP get_relaciones;
	CLOSE relaciones; 
    
    
    DELETE FROM ia_data_tree WHERE _level=_Tlevel and not _stop;
	 
	
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `worker_assist` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `worker_assist`()
BEGIN

   DECLARE _fin int DEFAULT 0;
   DECLARE _fin_cursor int DEFAULT 0;
   DECLARE xNombre nvarchar(255);
   
   DECLARE _xNombre nvarchar(255);
   DECLARE _xkey nvarchar(32);
   DECLARE _TMatch Int;
   
   DECLARE keys_cursor CURSOR FOR 
		SELECT _Nombre from Workers_suspicius where LENGTH(_key)=0;

   DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin=1; 
   OPEN keys_cursor;
   
   get_cursor: LOOP
   
		FETCH keys_cursor INTO xNombre;
		IF _fin = 1 THEN
			LEAVE get_cursor;
		END IF;  
		
        BEGIN
			DECLARE _cursor CURSOR FOR 
				SELECT _key,SUBSTR(Nombre,1,255), MATCH(Nombre) AGAINST (xNombre IN BOOLEAN MODE)   FROM borme_keys WHERE _directivo=1 AND MATCH(Nombre) AGAINST (xNombre IN BOOLEAN MODE) LIMIT 1;
            
            DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin_cursor=1;
            -- close _cursor;
            OPEN _cursor;
			FETCH _cursor INTO _xkey, _xNombre,_TMatch;
			
			if _fin_cursor=0 THEN
				UPDATE Workers_suspicius SET _Match=_TMatch, Borme_Nombre=_xNombre, _key = _xkey WHERE _Nombre=xNombre;
			END IF;
            CLOSE _cursor;
        END;
        
   END LOOP get_cursor;
   close keys_cursor;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `_namespath` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `_namespath`(_path nvarchar(256), _key nvarchar(32))
BEGIN
	DECLARE _TNombre nvarchar(55);
    DECLARE _fin int DEFAULT 0;
    
    SET @path = CONCAT(_path , _key,'#');
    SET @counter = count_str( @path ,'#');
	SET @str = '/'; -- SPLIT_STR(_path,'#',2);
    SET @e=1;
    
    
	while @e<=@counter DO
		SET @key = SPLIT_STR(@path,'#',@e+1);
		-- SELECT @counter,@e,@path,@key;
		begin
			DECLARE _keys CURSOR FOR 
				SELECT SUBSTR(Nombre,1,55) FROM borme_keys WHERE _key= @key;


			DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin=1; 
            
            
			OPEN _keys;
			get_keys: LOOP
				FETCH _keys INTO _TNombre;
				-- SELECT _fin;
				SET @str = concat(@str, _TNombre, "/");
				IF _fin = 1 THEN
					LEAVE get_keys;
				END IF;
				
								
			END LOOP get_keys;
			CLOSE _keys; 
		end;
        SET @e = @e+1;
        -- SELECT @e;
	end while;    
    
SELECT @str;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `relacionado_con`
--

/*!50001 DROP VIEW IF EXISTS `relacionado_con`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `relacionado_con` AS select `ia_data_unique`.`Relation_key` AS `_DKey`,`ia_data_unique`.`Empresa_key` AS `_key`,`_Empresa`.`Nombre` AS `Nombre`,`_Empresa`.`_Empresa` AS `_Empresa`,`_Empresa`.`_Directivo` AS `_Directivo`,`_Empresa`.`_Auditor` AS `_Auditor`,`_Empresa`.`_Financiera` AS `_Financiera`,`_Empresa`.`_Sicav` AS `_Sicav`,`_Empresa`.`_Slp` AS `_Slp`,`_Empresa`.`T_Relations` AS `T_Relations`,`_Empresa`.`ia_suspicius` AS `ia_suspicius` from ((`ia_data_unique` left join `borme_keys` `_Empresa` on(`ia_data_unique`.`Empresa_key` = `_Empresa`.`_key`)) left join `borme_keys` `_directivo` on(`ia_data_unique`.`Relation_key` = `_directivo`.`_key`)) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `relaciones_de`
--

/*!50001 DROP VIEW IF EXISTS `relaciones_de`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `relaciones_de` AS select `ia_data_unique`.`Empresa_key` AS `_DKey`,`ia_data_unique`.`Relation_key` AS `_key`,`_directivo`.`Nombre` AS `Nombre`,`_directivo`.`_Empresa` AS `_Empresa`,`_directivo`.`_Directivo` AS `_Directivo`,`_directivo`.`_Auditor` AS `_Auditor`,`_directivo`.`_Financiera` AS `_Financiera`,`_directivo`.`_Sicav` AS `_Sicav`,`_directivo`.`_Slp` AS `_Slp`,`_directivo`.`T_Relations` AS `T_Relations`,`_directivo`.`ia_suspicius` AS `ia_suspicius` from ((`ia_data_unique` left join `borme_keys` `_Empresa` on(`ia_data_unique`.`Empresa_key` = `_Empresa`.`_key`)) left join `borme_keys` `_directivo` on(`ia_data_unique`.`Relation_key` = `_directivo`.`_key`)) order by `ia_data_unique`.`Relation_key` */;
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

-- Dump completed on 2019-04-24 23:18:18
