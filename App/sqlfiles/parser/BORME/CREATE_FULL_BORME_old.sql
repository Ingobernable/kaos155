CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_borme` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bbdd_kaos155_borme`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 51.75.95.139    Database: bbdd_kaos155_borme
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
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8;
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
  `_date_activacion` date DEFAULT current_timestamp(),
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
) ENGINE=InnoDB AUTO_INCREMENT=2259 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_relaciones`
--

DROP TABLE IF EXISTS `borme_relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_relaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Empresa_key` char(36) NOT NULL,
  `Relation_key` char(36) NOT NULL,
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
) ENGINE=InnoDB AUTO_INCREMENT=1500 DEFAULT CHARSET=utf8;
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
  PRIMARY KEY (`Provincia`,`Anyo`,`Acto`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_stadistics_keys`
--

DROP TABLE IF EXISTS `borme_stadistics_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_stadistics_keys` (
  `_provincia` varchar(45) CHARACTER SET utf8 NOT NULL,
  `_mes` int(11) NOT NULL,
  `_anyo` int(11) NOT NULL,
  `add_empresas` int(11) DEFAULT 0,
  `add_financieras` int(11) DEFAULT 0,
  `add_sicav` int(11) DEFAULT 0,
  `add_auditor` int(11) DEFAULT 0,
  `sup_empresas` int(11) DEFAULT 0,
  `sup_financieras` int(11) DEFAULT 0,
  `sup_sicav` int(11) DEFAULT 0,
  `sup_auditor` int(11) DEFAULT 0,
  PRIMARY KEY (`_mes`,`_provincia`,`_anyo`)
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
-- Table structure for table `ia_data_unique`
--

DROP TABLE IF EXISTS `ia_data_unique`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `ia_data_unique` (
  `Empresa_key` char(36) NOT NULL,
  `Relation_key` char(36) NOT NULL,
  PRIMARY KEY (`Empresa_key`,`Relation_key`)
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
 1 AS `Empresa`,
 1 AS `_Ekey`,
 1 AS `_DKey`,
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
 1 AS `Directivo`,
 1 AS `_DKey`,
 1 AS `_Ekey`,
 1 AS `Nombre`,
 1 AS `_Empresa`,
 1 AS `_Directivo`,
 1 AS `_Auditor`,
 1 AS `_Financiera`,
 1 AS `_Sicav`,
 1 AS `_Slp`,
 1 AS `_E_T_Relations`,
 1 AS `_E.ia_suspicius`,
 1 AS `_D_T_Relations`,
 1 AS `_D_ia_suspicius`*/;
SET character_set_client = @saved_cs_client;

--
-- Dumping routines for database 'bbdd_kaos155_borme'
--
/*!50003 DROP FUNCTION IF EXISTS `IS _RegExp` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `IS _RegExp`( cadena nvarchar(255), search nvarchar(25)) RETURNS int(11)
    DETERMINISTIC
BEGIN

RETURN (SELECT cadena REGEXP search);
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
		SELECT DISTINCT _key,Nombre,Motivo,CArgo,Anyo,mes,dia,type,activo,T_Relations FROM bbdd_kaos155_borme.relaciones_de where idkey= _Id AND _key<>_IdParent ;
    ELSE    

		SELECT DISTINCT _key,Nombre,Motivo,CArgo,Anyo,mes,dia,type,activo,T_Relations FROM bbdd_kaos155_borme.relacionado_con where idkey= _Id AND _key<>_IdParent;

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
		UPDATE borme_keys SET T_Relations =T_Relations + 1 WHERE id = _Empresa_Id OR id = _Relacion_Id;
         -- END IF;
        
		 INSERT IGNORE INTO borme_relaciones (Empresa_key,Type,Relation_key,Motivo,Cargo,Activo,Anyo,Mes,Dia,DatosRegistrales)
			VALUES (_Empresa_key,_T_Relacion,_Relacion_key,_type,_key,_Activo,_Anyo,_Mes,_Dia,_DatosRegistrales); 
		
         INSERT IGNORE INTO ia_data_unique (Empresa_key,Relation_key) 
		     VALUES (_Empresa_key,_Relacion_key);
        
        -- SET _counter = (SELECT Count(*) FROM ia_data_unique WHERE Relation_key = _Relacion_key);
		 
         SET @counter = (SELECT T_Relations FROM borme_keys WHERE id = _Relacion_Id);      
         IF @counter >= _minRel THEN
			call Insert_Data_IA_seguimiento(_Relacion_key , _MinRel);
			-- SELECT @counter;
		 END IF;	
		
    
    else
		INSERT IGNORE INTO borme_actos (Empresa_key,Acto,Motivo,Texto,Anyo,Mes,Dia,BOLETIN,_ID,DatosRegistrales)
								  VALUES (_Empresa_key,_type,_key,_value,_Anyo,_Mes,_Dia,_BOLETIN,_BOLETIN_ID,_DatosRegistrales); 		



		CALL  Insert_Data_IA_movimiento(
											_Empresa_key,
                                            _Empresa_Id ,
											_type ,
											_Dia ,
											_Mes , 
											_Anyo , 
											_Provincia , 
											
											_Empresa ,    
											_Financiera ,
											_Auditor ,
											_Sicav ,
											
											_key,
											_value 
										); 


		
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
/*!50001 VIEW `relacionado_con` AS select `_Empresa`.`Nombre` AS `Empresa`,`ia_data_unique`.`Empresa_key` AS `_Ekey`,`ia_data_unique`.`Relation_key` AS `_DKey`,`_directivo`.`Nombre` AS `Nombre`,`_directivo`.`_Empresa` AS `_Empresa`,`_directivo`.`_Directivo` AS `_Directivo`,`_directivo`.`_Auditor` AS `_Auditor`,`_directivo`.`_Financiera` AS `_Financiera`,`_directivo`.`_Sicav` AS `_Sicav`,`_directivo`.`_Slp` AS `_Slp`,`_directivo`.`T_Relations` AS `T_Relations`,`_directivo`.`ia_suspicius` AS `ia_suspicius` from ((`ia_data_unique` left join `borme_keys` `_Empresa` on(`ia_data_unique`.`Empresa_key` = `_Empresa`.`_key`)) left join `borme_keys` `_directivo` on(`ia_data_unique`.`Relation_key` = `_directivo`.`_key`)) */;
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
/*!50001 VIEW `relaciones_de` AS select `_directivo`.`Nombre` AS `Directivo`,`ia_data_unique`.`Relation_key` AS `_DKey`,`ia_data_unique`.`Empresa_key` AS `_Ekey`,`_Empresa`.`Nombre` AS `Nombre`,`_Empresa`.`_Empresa` AS `_Empresa`,`_Empresa`.`_Directivo` AS `_Directivo`,`_Empresa`.`_Auditor` AS `_Auditor`,`_Empresa`.`_Financiera` AS `_Financiera`,`_Empresa`.`_Sicav` AS `_Sicav`,`_Empresa`.`_Slp` AS `_Slp`,`_Empresa`.`T_Relations` AS `_E_T_Relations`,`_Empresa`.`ia_suspicius` AS `_E.ia_suspicius`,`_directivo`.`T_Relations` AS `_D_T_Relations`,`_directivo`.`ia_suspicius` AS `_D_ia_suspicius` from ((`ia_data_unique` left join `borme_keys` `_Empresa` on(`ia_data_unique`.`Empresa_key` = `_Empresa`.`_key`)) left join `borme_keys` `_directivo` on(`ia_data_unique`.`Relation_key` = `_directivo`.`_key`)) order by `ia_data_unique`.`Relation_key` */;
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

-- Dump completed on 2019-03-23  9:50:37