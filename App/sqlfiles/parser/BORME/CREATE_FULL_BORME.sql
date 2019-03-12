CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_borme` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bbdd_kaos155_borme`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 54.37.77.130    Database: bbdd_kaos155_borme
-- ------------------------------------------------------
-- Server version	5.5.5-10.2.22-MariaDB-10.2.22+maria~stretch-log

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
-- Temporary view structure for view `RelacionadoCON`
--

DROP TABLE IF EXISTS `RelacionadoCON`;
/*!50001 DROP VIEW IF EXISTS `RelacionadoCON`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `RelacionadoCON` AS SELECT 
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `Type`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `Anyo`,
 1 AS `Mes`,
 1 AS `Dia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `Relacionadocon`
--

DROP TABLE IF EXISTS `Relacionadocon`;
/*!50001 DROP VIEW IF EXISTS `Relacionadocon`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Relacionadocon` AS SELECT 
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `Type`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `Anyo`,
 1 AS `Mes`,
 1 AS `Dia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `RelacionesDE`
--

DROP TABLE IF EXISTS `RelacionesDE`;
/*!50001 DROP VIEW IF EXISTS `RelacionesDE`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `RelacionesDE` AS SELECT 
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `Type`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `Anyo`,
 1 AS `Mes`,
 1 AS `Dia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `Relacionesde`
--

DROP TABLE IF EXISTS `Relacionesde`;
/*!50001 DROP VIEW IF EXISTS `Relacionesde`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `Relacionesde` AS SELECT 
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `Type`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `Anyo`,
 1 AS `Mes`,
 1 AS `Dia`*/;
SET character_set_client = @saved_cs_client;

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
) ENGINE=InnoDB AUTO_INCREMENT=7646539 DEFAULT CHARSET=utf8;
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
  PRIMARY KEY (`_key`),
  UNIQUE KEY `id` (`_id`)
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
) ENGINE=InnoDB AUTO_INCREMENT=2053174 DEFAULT CHARSET=utf8;
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
  `DatosRegistrales` varchar(105) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `Empresa` (`Empresa_key`),
  KEY `Directivo` (`Relation_key`)
) ENGINE=InnoDB AUTO_INCREMENT=12038967 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_stadistics`
--

DROP TABLE IF EXISTS `borme_stadistics`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_stadistics` (
  `Provincia` varchar(50) CHARACTER SET utf8 NOT NULL,
  `Anyo` int(11) NOT NULL,
  `Acto` varchar(45) CHARACTER SET utf8 NOT NULL,
  `Motivo` varchar(55) CHARACTER SET utf8 NOT NULL,
  `Enero` int(11) DEFAULT 0,
  `Febrero` int(11) DEFAULT 0,
  `Marzo` int(11) DEFAULT 0,
  `Abril` int(11) DEFAULT 0,
  `Mayo` int(11) DEFAULT 0,
  `Junio` int(11) DEFAULT 0,
  `Julio` int(11) DEFAULT 0,
  `Agosto` int(11) DEFAULT 0,
  `Septiembre` int(11) DEFAULT 0,
  `Octubre` int(11) DEFAULT 0,
  `Noviembre` int(11) DEFAULT 0,
  `Diciembre` int(11) DEFAULT 0,
  `Total` int(11) DEFAULT 0,
  PRIMARY KEY (`Provincia`,`Anyo`,`Acto`,`Motivo`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
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
-- Temporary view structure for view `relacionado_con`
--

DROP TABLE IF EXISTS `relacionado_con`;
/*!50001 DROP VIEW IF EXISTS `relacionado_con`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `relacionado_con` AS SELECT 
 1 AS `idKey`,
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `T_Relations`,
 1 AS `Type`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `Anyo`,
 1 AS `Mes`,
 1 AS `Dia`*/;
SET character_set_client = @saved_cs_client;

--
-- Temporary view structure for view `relaciones_de`
--

DROP TABLE IF EXISTS `relaciones_de`;
/*!50001 DROP VIEW IF EXISTS `relaciones_de`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `relaciones_de` AS SELECT 
 1 AS `idKey`,
 1 AS `_key`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `T_Relations`,
 1 AS `Type`,
 1 AS `Motivo`,
 1 AS `Cargo`,
 1 AS `Activo`,
 1 AS `Anyo`,
 1 AS `Mes`,
 1 AS `Dia`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'bbdd_kaos155_borme'
--
/*!50003 DROP FUNCTION IF EXISTS `lastIndex` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `lastIndex`(_str nvarchar(255), _key nvarchar(10) ) RETURNS int(11)
    DETERMINISTIC
BEGIN

RETURN IF(LOCATE(_key, _str )>0,LENGTH(_str) - LOCATE(_key, REVERSE(_str))-(LENGTH(_key)-1),-1);
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
/*!50003 DROP PROCEDURE IF EXISTS `GetRelations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRelations`(
	IN _type int,
    IN _Id VARCHAR(36),
    IN _IdParent VARCHAR(36)
)
BEGIN
	IF _type= 0 THEN 
		SELECT DISTINCT _key,Nombre,Motivo,CArgo,Anyo,mes,dia,type,activo,T_Relations FROM bbdd_kaos155_borme.relaciones_de _rel where idkey= _Id AND _key<>_IdParent ;
    ELSE    

		SELECT DISTINCT _key,Nombre,Motivo,CArgo,Anyo,mes,dia,type,activo,T_Relations FROM bbdd_kaos155_borme.relacionado_con _rel where idkey= _Id AND _key<>_IdParent;

	END IF;
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
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Auditor`(_NAME  nvarchar(250), _iKey  nvarchar(55),_provincia nvarchar(25),_BOLETIN nvarchar(20), _ID INT,_empresa INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
	IF @repeat = 0 THEN	
    
		SET @Directivo = IF( ( lastIndex(_NAME,'SA')=length(_Name)-1 OR lastIndex(_NAME,'SL')=length(_Name)-1 OR lastIndex(_NAME,'SLP') =length(_Name)-2 OR lastIndex(_NAME,'SRC')=length(_Name)-2),0,1);
		SET @Empresa = if(@Directivo=1,0,1);
        
		SET @Financiera = 0;
		SET @Auditor= 1;
		SET @Sicav = 0;
		
		IF INSTR(UPPER(_NAME),'BANCO ')>0 OR INSTR(UPPER(_NAME),'CAJA ')>0 OR INSTR(UPPER(_NAME),'CAIXA ')>0 OR INSTR(UPPER(_NAME),'SEGUROS ')>0 OR INSTR(UPPER(_NAME),'CAJAS')>0 THEN
			SET @Financiera = 1;
			SET @Directivo = 0;
			SET @Empresa = 1;
		END IF;
	 
		SET @Sicav = 0;
		IF INSTR(UPPER(_NAME),' SICAV ')>0 OR INSTR(UPPER(_NAME),' SICAV.')>0 THEN
			SET @Sicav = 1;
			SET @Directivo = 0;
			SET @Empresa = 1;
		END IF;
        
		IF @Empresa=1 THEN
			SET _NAME= UCASE(_NAME);
        END IF;

		INSERT INTO borme_keys (_key, Nombre, _Empresa,_Directivo, _Auditor, _Financiera, _Sicav) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius;
        		
        IF @Empresa=1  THEN
			INSERT INTO borme_empresas (_id,_key,Nombre,provincia) VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia);
		END IF;
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius;
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
    IN _Empresa_key nvarchar(36),
    IN _Relacion_Id int,
    IN _Relacion_key nvarchar(36),
    IN _T_Relacion INT,
    IN _Activo int,
    IN _type nvarchar(100), 
    IN _key nvarchar(100),
    IN _value text,
    IN _DatosRegistrales nvarchar(100)
    
)
BEGIN
	DECLARE _counter int;
    DECLARE _counterA int;
    DECLARE _counterB int;

	IF _Empresa_Id>0 AND _Relacion_Id>0 THEN
		
        SET _counter = (SELECT Count(*) FROM borme_relaciones WHERE Empresa_key = _Empresa_key AND Relation_key = _Relacion_key);
		if _counter=0 THEN	           
            SET @s = CONCAT('UPDATE borme_keys SET T_Relations =T_Relations + 1 WHERE _key ="',_Empresa_key,'" OR _key = "',_Relacion_key ,'";');
            SELECT (@s) as pp ,_Empresa_key,_Relacion_key;
            PREPARE stmt1 FROM @s;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1;
            
        END IF;
        
		INSERT IGNORE INTO borme_relaciones (Empresa_key,Type,Relation_key,Motivo,Cargo,Activo,Anyo,Mes,Dia,DatosRegistrales)
						  VALUES (_Empresa_key,_T_Relacion,_Relacion_key,_type,_key,_Activo,_Anyo,_Mes,_Dia,_DatosRegistrales); 
	
	else
			INSERT IGNORE INTO borme_actos (Empresa_key,Acto,Motivo,Texto,Anyo,Mes,Dia,BOLETIN,_ID,DatosRegistrales)
								  VALUES (_Empresa_key,_type,_key,_value,_Anyo,_Mes,_Dia,_BOLETIN,_BOLETIN_ID,_DatosRegistrales); 		
    

    END IF;  
    
    IF _Mes=1 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Enero,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Enero=Enero + 1,Total=Total+1;
    END IF;
    IF _Mes=2 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Febrero,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Febrero=Febrero + 1,Total=Total+1;    
    END IF;
    IF _Mes=3 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Marzo,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Marzo=Marzo + 1,Total=Total+1;  
    END IF;
    IF _Mes=4 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Abril,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Abril=Abril + 1,Total=Total+1;    
    END IF;
    IF _Mes=5 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Mayo,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Mayo=Mayo + 1,Total=Total+1;
    END IF;
    IF _Mes=6 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Junio,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Junio=Junio + 1,Total=Total+1;  
    END IF;
    IF _Mes=7 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Julio,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Julio=Julio + 1,Total=Total+1;  
    END IF;
    IF _Mes=8 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Agosto,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Agosto=Agosto + 1,Total=Total+1;  
    END IF;
    IF _Mes=9 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Septiembre,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Septiembre=Septiembre + 1,Total=Total+1;  
    END IF;
    IF _Mes=10 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Octubre,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Octubre=Octubre + 1,Total=Total+1;  
    END IF;
    IF _Mes=11 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Noviembre,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Noviembre=Noviembre + 1,Total=Total+1;  
    END IF;
    IF _Mes=12 THEN
		INSERT INTO borme_stadistics (Provincia, Acto,Motivo,Anyo,Diciembre,Total) values(_Provincia,_type,_key,_Anyo,1,1) on duplicate key update Diciembre=Diciembre + 1,Total=Total+1;  
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
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Directivo`(IN _NAME  nvarchar(250) , IN _ikey  nvarchar(55),IN _provincia nvarchar(25),IN _BOLETIN nvarchar(20), IN _ID INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
	IF @repeat = 0 THEN
		SET @Directivo = 1;
		SET @Empresa = 0;
		SET @Financiera = 0;
		SET @Auditor= 0;
		IF INSTR(UPPER(_NAME),'BANCO ')>0 OR INSTR(UPPER(_NAME),'CAJA ')>0 OR INSTR(UPPER(_NAME),'CAIXA ')>0 OR INSTR(UPPER(_NAME),'SEGUROS ')>0 OR INSTR(UPPER(_NAME),'CAJAS')>0 THEN
			SET @Financiera = 1;
			SET @Directivo = 0;
			SET @Empresa = 1;
		END IF;
	 
		SET @Sicav = 0;
		IF INSTR(UPPER(_NAME),' SICAV ')>0 OR INSTR(UPPER(_NAME),' SICAV.')>0 THEN
			SET @Sicav = 1;
			SET @Directivo = 0;
			SET @Empresa = 1;
		END IF;
		
		IF INSTR(UPPER(_NAME),'AUDITOR')>0 THEN
			SET @Auditor= 1;
			SET @Directivo = IF( (  lastIndex(_NAME,'SA')=length(_Name)-1 OR lastIndex(_NAME,'SL')=length(_Name)-1 OR lastIndex(_NAME,'SLP') =length(_Name)-2 OR lastIndex(_NAME,'SRC')=length(_Name)-2),0,1);
			SET @Empresa = if(@Directivo=1,0,1);
		END IF;
		
		IF @Empresa=1 THEN
			SET _NAME= UCASE(_NAME);
        END IF;
        
		INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius;
        
        IF @Empresa=1  THEN
			INSERT INTO borme_empresas (_id,_key,Nombre,provincia) VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia);
		END IF;
        
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Empresa`(IN _NAME  nvarchar(250), _iKey  nvarchar(55), _provincia nvarchar(25), _BOLETIN nvarchar(20), _ID INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
	IF @repeat = 0 THEN
		SET @Directivo = 0;
		SET @Empresa = 1;
		SET @Financiera = 0;
		SET @Auditor=0;
		SET @Sicav = 0;

		
		IF INSTR(UPPER(_NAME),'BANCO ')>0 OR INSTR(UPPER(_NAME),'CAJA ')>0 OR INSTR(UPPER(_NAME),'CAIXA ')>0 OR INSTR(UPPER(_NAME),'SEGUROS ')>0 OR INSTR(UPPER(_NAME),'CAJAS')>0 THEN
			SET @Financiera = 1;
		END IF;
	 
		
		IF INSTR(UPPER(_NAME),' SICAV ')>0 THEN
			SET @Sicav = 1;
		END IF;

		IF INSTR(UPPER(_NAME),'AUDITOR')>0 THEN
			SET @Auditor= 1;
		END IF;
        
		
        
		INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius;
        
        INSERT INTO borme_empresas (_id,_key,Nombre,provincia) VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia);
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius;
    END IF;
    
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
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_IA_seguimiento`(_dkey VARCHAR(36),_idrel int, _minrel int)
BEGIN
	DECLARE _ekey VARCHAR(36);
    DECLARE _id INT;
    
    DECLARE fin INTEGER DEFAULT 0;
    DECLARE runners_cursor CURSOR FOR 
		SELECT borme_keys.id,borme_relaciones.Empresa_key FROM borme_relaciones JOIN borme_keys on borme_relaciones.Empresa_key=borme_keys._key WHERE borme_relaciones.Relation_key=_dkey AND NOT borme_keys.ia_suspicius;
        
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
    SET @Counter = (SELECT T_Relations FROM borme_keys where id=_idrel AND T_Relations>_minrel AND _Directivo AND NOT _Auditor AND NOT _Financiera AND NOT _sicav);
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
		
        UPDATE borme_keys SET ia_suspicius=1 WHERE id = _idrel ;
		CLOSE runners_cursor;   
	END IF;
    SELECT @Counter as counter;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `RelacionadoCON`
--

/*!50001 DROP VIEW IF EXISTS `RelacionadoCON`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `RelacionadoCON` AS select 1 AS `_key`,1 AS `Nombre`,1 AS `_Empresa`,1 AS `_Directivo`,1 AS `_Auditor`,1 AS `_Financiera`,1 AS `Type`,1 AS `Motivo`,1 AS `Cargo`,1 AS `Activo`,1 AS `Anyo`,1 AS `Mes`,1 AS `Dia` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Relacionadocon`
--

/*!50001 DROP VIEW IF EXISTS `Relacionadocon`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Relacionadocon` AS select 1 AS `_key`,1 AS `Nombre`,1 AS `_Empresa`,1 AS `_Directivo`,1 AS `_Auditor`,1 AS `_Financiera`,1 AS `Type`,1 AS `Motivo`,1 AS `Cargo`,1 AS `Activo`,1 AS `Anyo`,1 AS `Mes`,1 AS `Dia` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `RelacionesDE`
--

/*!50001 DROP VIEW IF EXISTS `RelacionesDE`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `RelacionesDE` AS select 1 AS `_key`,1 AS `Nombre`,1 AS `_Empresa`,1 AS `_Directivo`,1 AS `_Auditor`,1 AS `_Financiera`,1 AS `Type`,1 AS `Motivo`,1 AS `Cargo`,1 AS `Activo`,1 AS `Anyo`,1 AS `Mes`,1 AS `Dia` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `Relacionesde`
--

/*!50001 DROP VIEW IF EXISTS `Relacionesde`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `Relacionesde` AS select 1 AS `_key`,1 AS `Nombre`,1 AS `_Empresa`,1 AS `_Directivo`,1 AS `_Auditor`,1 AS `_Financiera`,1 AS `Type`,1 AS `Motivo`,1 AS `Cargo`,1 AS `Activo`,1 AS `Anyo`,1 AS `Mes`,1 AS `Dia` */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

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
/*!50001 VIEW `relacionado_con` AS select 1 AS `idKey`,1 AS `_key`,1 AS `Nombre`,1 AS `_Empresa`,1 AS `_Directivo`,1 AS `_Auditor`,1 AS `_Financiera`,1 AS `T_Relations`,1 AS `Type`,1 AS `Motivo`,1 AS `Cargo`,1 AS `Activo`,1 AS `Anyo`,1 AS `Mes`,1 AS `Dia` */;
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
/*!50001 VIEW `relaciones_de` AS select 1 AS `idKey`,1 AS `_key`,1 AS `Nombre`,1 AS `_Empresa`,1 AS `_Directivo`,1 AS `_Auditor`,1 AS `_Financiera`,1 AS `T_Relations`,1 AS `Type`,1 AS `Motivo`,1 AS `Cargo`,1 AS `Activo`,1 AS `Anyo`,1 AS `Mes`,1 AS `Dia` */;
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

-- Dump completed on 2019-03-12 22:49:43
