CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_borme` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `bbdd_kaos155_borme`;
-- MySQL dump 10.13  Distrib 8.0.15, for Win64 (x86_64)
--
-- Host: 54.36.112.100    Database: bbdd_kaos155_borme
-- ------------------------------------------------------
-- Server version	8.0.16

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
 SET NAMES utf8 ;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `_parser_errors`
--

DROP TABLE IF EXISTS `_parser_errors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `_parser_errors` (
  `code` char(45) DEFAULT NULL,
  `errno` int(11) NOT NULL,
  `sql` text
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_empresas`
--

DROP TABLE IF EXISTS `borme_empresas`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `borme_empresas` (
  `_id` int(11) unsigned DEFAULT NULL,
  `_key` char(32) NOT NULL,
  `Nombre` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `provincia` varchar(45) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `SA` bit(1) DEFAULT b'0',
  `SL` bit(1) DEFAULT b'0',
  `SLP` bit(1) DEFAULT b'0',
  `SLL` bit(1) DEFAULT b'0',
  `_Auditor` bit(1) DEFAULT b'0',
  `_Financiera` bit(1) DEFAULT b'0',
  `_sicav` bit(1) DEFAULT b'0',
  `_ute` bit(1) DEFAULT b'0',
  `Actos` json DEFAULT NULL,
  PRIMARY KEY (`_key`),
  UNIQUE KEY `id` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_keys`
--

DROP TABLE IF EXISTS `borme_keys`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `borme_keys` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `_key` char(32) NOT NULL,
  `Nombre` varchar(250) CHARACTER SET utf8 COLLATE utf8_general_ci DEFAULT NULL,
  `_type` int(11) DEFAULT NULL,
  `_Empresa` bit(1) DEFAULT b'0',
  `_Directivo` bit(1) DEFAULT b'0',
  `_Auditor` bit(1) DEFAULT b'0',
  `_Financiera` bit(1) DEFAULT b'0',
  `_Sicav` bit(1) DEFAULT b'0',
  `_Slp` bit(1) DEFAULT b'0',
  `T_Relations` int(11) unsigned DEFAULT '0',
  `ia_suspicius` bit(1) DEFAULT b'0',
  `Nodes` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `T_Relaciones` (`T_Relations`),
  KEY `_estado` (`_Empresa`,`_Directivo`,`_Auditor`,`_Financiera`,`_Sicav`,`_Slp`),
  KEY `_key` (`_key`),
  FULLTEXT KEY `Name` (`Nombre`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_relaciones`
--

DROP TABLE IF EXISTS `borme_relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
 SET character_set_client = utf8mb4 ;
CREATE TABLE `borme_relaciones` (
  `Empresa_id` int(11) NOT NULL,
  `Relation_id` int(11) NOT NULL,
  `Cargos` json DEFAULT NULL,
  PRIMARY KEY (`Empresa_id`,`Relation_id`),
  UNIQUE KEY `revert` (`Relation_id`,`Empresa_id`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `relacionado_con`
--

DROP TABLE IF EXISTS `relacionado_con`;
/*!50001 DROP VIEW IF EXISTS `relacionado_con`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `relacionado_con` AS SELECT 
 1 AS `_Did`,
 1 AS `_Eid`,
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
SET character_set_client = utf8mb4;
/*!50001 CREATE VIEW `relaciones_de` AS SELECT 
 1 AS `_Eid`,
 1 AS `_Did`,
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `count_str`( haystack TEXT,  needle char(32)) RETURNS int(11)
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
/*!50003 SET sql_mode              = 'NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_namespath`(_path nvarchar(256), _key nvarchar(32)) RETURNS text CHARSET latin1
    DETERMINISTIC
BEGIN
	DECLARE _TNombre nvarchar(55);
    DECLARE _fin int;
    SET @path = CONCAT(_path , _key,'#');
    SET @counter = count_str( @path ,'#');
	SET @str = '/'; 
    SET @e=1;
    
    
	while @e<=@counter DO
		begin
			DECLARE _keys CURSOR FOR 
				SELECT SUBSTR(Nombre,1,55) FROM borme_keys WHERE _key= SPLIT_STR(@path,'#',@e+1);


			DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin=1;    
			OPEN _keys;
			get_keys: LOOP
				FETCH _keys INTO _TNombre;
				
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `_type`( Empresa int, Directivo int, Auditor int, Financiera int, Sicav int) RETURNS int(11)
    DETERMINISTIC
BEGIN  
  DECLARE _r int; 
  IF Sicav>0 THEN
	SET _r = 3;
  ELSE
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
	END IF;
  RETURN _r;  
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_PARSER_Auditor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_PARSER_Auditor`(_mes int, _anyo int, _NAME  nvarchar(250), _iKey  nvarchar(55),_provincia nvarchar(25),_BOLETIN nvarchar(20), _ID INT,_empresa INT)
BEGIN
	SET @repeat = (SELECT count(*) FROM borme_keys WHERE _key = _iKey);
		
    
	SET @Directivo =  NOT _NAME REGEXP '.+( SA| SL| SLP| SRC)$'; 
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
		INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav, _type , Nodes) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav,_type( @Empresa,@Directivo,@Auditor,@Financiera,@Sicav ) ,JSON_ARRAY() );

		-- INSERT INTO borme_keys (_key, Nombre, _Empresa,_Directivo, _Auditor, _Financiera, _Sicav) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
        		
        IF @Empresa=1  THEN
			INSERT INTO borme_empresas (_id,_key,Nombre,provincia,SA,SL,SLL,SLP,_Auditor,_Financiera, _Sicav,_ute,Actos) 
			VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia,_NAME REGEXP 'SA$',
																	_NAME REGEXP 'SL$',
																	_NAME REGEXP 'SLL$',
																	_NAME REGEXP 'SLP$',@Auditor,@Financiera,@Sicav,@UTE,JSON_ARRAY());
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
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_PARSER_Diario` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_PARSER_Diario`(
	IN _BOLETIN nvarchar(20) ,
    IN _BOLETIN_ID int,
    IN _Dia INT,
    IN _Mes INT,
    IN _Anyo INT,
    IN _Provincia nvarchar(50),
    IN _Empresa_Id int,
    -- IN _Empresa_key char(32),
    IN _Relacion_Id int,
    -- IN _Relacion_key char(32),
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

	DECLARE _Tx JSON;
	DECLARE _Ex JSON;
    DECLARE _Rx JSON;

	DECLARE _xTRelations INTEGER DEFAULT 0;
	DECLARE _xType int;
	DECLARE _xNombre nvarchar(255);
	DECLARE _xid int;
    
	DECLARE runners_cursor CURSOR FOR 
		SELECT id,Nombre,T_Relations,borme_keys._type FROM borme_keys  WHERE id=_Relacion_Id;
            
    -- SET @vox = (SELECT CONCAT(_BOLETIN,"/",_BOLETIN_ID)) ;
    -- SELECT _key FROM borme_empresas Where _id=_Empresa_id;
    IF _Empresa_Id>0 AND _Relacion_Id>0 THEN
    
		SET _Tx = (SELECT JSON_OBJECT('_b', CONCAT(_BOLETIN,"/",_BOLETIN_ID) ,"Acto",_type,"texto",_key,"Anyo",_Anyo,"Mes",_Mes));

		-- INSERT IGNORE INTO borme_relaciones (BOLETIN,Empresa_key,Type,Relation_key,Motivo,Cargo,Activo,Anyo,Mes,Dia,DatosRegistrales)
		-- 	VALUES (_BOLETIN,_Empresa_key,_T_Relacion,_Relacion_key,_type,_key,_Activo,_Anyo,_Mes,_Dia,_DatosRegistrales); 
		-- SELECT _Empresa_Id,_Relacion_Id,JSON_ARRAY_APPEND(Actos,'$',_Tx ) FROM borme_empresas Where _id=_Empresa_id;
		 SET @Counter = (SELECT COUNT(*) from borme_relaciones WHERE Empresa_id=_Empresa_Id and Relation_id=_Relacion_Id );
         INSERT INTO borme_relaciones (Empresa_id,Relation_id,Cargos) 
		     VALUES (_Empresa_id,_Relacion_id,JSON_ARRAY(_Tx)) ON DUPLICATE KEY UPDATE Cargos = JSON_ARRAY_APPEND(Cargos,'$',_Tx ) ;
             
        IF  @Counter=0 THEN
        	SET _Ex = _Empresa_id; -- (SELECT JSON_OBJECT('id', id ,"_N", Nombre, "_t", 0 ,"_T",T_Relations, "type", borme_keys._type , 'ia',borme_keys.ia_suspicius)
					-- From borme_keys WHERE id=_Empresa_id);

			SET _Rx = _Relacion_id; -- (SELECT JSON_OBJECT('id', id ,"_N", Nombre, "_t", 1 ,"_T",T_Relations, "type", borme_keys._type , 'ia',borme_keys.ia_suspicius)
						 -- From borme_keys WHERE id=_Relacion_id);
			-- SELECT JSON_ARRAY_APPEND( Nodes, '$', IF( id =_Empresa_Id,_Ex,_Rx) ) FROM borme_keys WHERE id = _Empresa_Id OR id = _Relacion_Id;
			UPDATE borme_keys SET T_Relations =T_Relations + 1, Nodes = JSON_ARRAY_APPEND( Nodes, '$', IF( id =_Empresa_Id,_Rx,_Ex) ) WHERE id = _Empresa_Id OR id = _Relacion_Id;
		
		END IF;  
        
		OPEN runners_cursor;
		FETCH runners_cursor INTO _xid,_xNombre, _xTRelations,_xType;
		-- SET _xType = (SELECT CONCAT(IF(_Empresa,'1','0'),IF(_Directivo ,'1','0'),IF(_Financiera ,'1','0'),IF(_Auditor ,'1','0'),IF(_Sicav ,'1','0'),IF(ia_suspicius ,'1','0'))  FROM borme_keys  WHERE id=_xid);
		
        SELECT _xNombre,_xTRelations,_xType,_xid;
		IF _xTRelations >= _minRel AND _xType=1 THEN	                   
			UPDATE borme_keys SET ia_suspicius=1 WHERE ((id IN (
					SELECT Empresa_id from borme_relaciones WHERE Relation_id=_Relacion_Id )) or id=_Relacion_Id) and not ia_suspicius	;
		END IF;            
		CLOSE runners_cursor;
		
    else
		SET _Tx = (SELECT JSON_OBJECT('_b',CONCAT(_BOLETIN,"/",_BOLETIN_ID),"Motivo",_type,"Cargo",_key,"Anyo",_Anyo,"Mes",_Mes));
		UPDATE borme_empresas SET Actos = JSON_ARRAY_APPEND(Actos,'$',_Tx ) Where _id=_Empresa_id ;  
        
        -- INSERT IGNORE INTO borme_actos (Empresa_key,Acto,Motivo,Texto,Anyo,Mes,Dia,BOLETIN,_ID,DatosRegistrales)
		--     VALUES (_Empresa_key,_type,_key,_value,_Anyo,_Mes,_Dia,_BOLETIN,_BOLETIN_ID,_DatosRegistrales); 		
        -- SELECT * FROM borme_keys WHERE id = _Empresa_Id;
    END IF;
    

    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_PARSER_Directivo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_PARSER_Directivo`(_mes int, _anyo int, IN _NAME  nvarchar(250) , IN _ikey  nvarchar(55),IN _provincia nvarchar(25),IN _BOLETIN nvarchar(20), IN _ID INT)
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
INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ,_type , nodes) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav,_type( @Empresa,@Directivo,@Auditor,@Financiera,@Sicav ), JSON_ARRAY() );
		-- INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav);
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
        
        IF @Empresa=1  THEN
			INSERT INTO borme_empresas (_id,_key,Nombre,provincia,SA,SL,SLL,SLP,_Auditor,_Financiera, _Sicav,_ute,Actos) 
				VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia,_NAME REGEXP 'SA$',
																		_NAME REGEXP 'SL$',
																		_NAME REGEXP 'SLL$',
																		_NAME REGEXP 'SLP$',@Auditor,@Financiera,@Sicav,@UTE, JSON_ARRAY());
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
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_PARSER_Empresa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_PARSER_Empresa`(_mes int, _anyo int, IN _NAME  nvarchar(250), _iKey  nvarchar(55), _provincia nvarchar(25), _BOLETIN nvarchar(20), _ID INT)
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
	

         
		INSERT INTO borme_keys (_key,Nombre,_Empresa,_Directivo,_Auditor,_Financiera, _Sicav ,_type , nodes) VALUES(_iKey,_NAME,@Empresa,@Directivo,@Auditor,@Financiera,@Sicav,_type( @Empresa,@Directivo,@Auditor,@Financiera,@Sicav ), JSON_ARRAY() );
		SELECT 1 as _add, _iKey as _key, LAST_INSERT_ID()  as Id, 0 as ia_suspicius,@Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav;
        
        INSERT INTO borme_empresas (_id,_key,Nombre,provincia,SA,SL,SLL,SLP,_Auditor,_Financiera, _Sicav,_ute,Actos) 
        VALUES (LAST_INSERT_ID(),_iKey, _NAME ,_provincia,_NAME REGEXP 'SA$',
														_NAME REGEXP 'SL$',
														_NAME REGEXP 'SLL$',
														_NAME REGEXP 'SLP$',@Auditor,@Financiera,@Sicav,@UTE,JSON_ARRAY());
    ELSE
		SELECT 0 as _add, _iKey as _key, (SELECT id FROM borme_keys WHERE _key=_iKey) as Id, (SELECT ia_suspicius FROM borme_keys WHERE _key=_iKey) as ia_suspicius, @Empresa as _Empresa,@Directivo as _Directivo,@Financiera as _Financiera,@Auditor as _Auditor,@Sicav as _Sicav ;
    END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_PARSER_suspicius` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8mb4 */ ;
/*!50003 SET character_set_results = utf8mb4 */ ;
/*!50003 SET collation_connection  = utf8mb4_0900_ai_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_PARSER_suspicius`(_did int, _minrel int)
BEGIN

    DECLARE _id INT;
    
    DECLARE fin INTEGER DEFAULT 0;
    DECLARE runners_cursor CURSOR FOR 
		SELECT borme_keys.id FROM borme_relaciones JOIN borme_keys on borme_relaciones.Empresa_id=borme_keys._id WHERE borme_relations.Relation_id=_did AND NOT borme_keys.ia_suspicius;
        
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET fin=1;
    SET @Counter = (SELECT T_Relations FROM borme_keys where _id=_did AND T_Relations>_minrel AND _Directivo AND NOT _Auditor AND NOT _Financiera AND NOT _sicav);
    IF @Counter>0 THEN
		OPEN runners_cursor;
		get_cursor: LOOP
			FETCH runners_cursor INTO _id;
			IF fin = 1 THEN
			   LEAVE get_cursor;
			END IF;
            UPDATE borme_keys SET ia_suspicius=1 WHERE id = _id;
			
		END LOOP get_cursor;
		
		UPDATE borme_keys SET ia_suspicius=1 WHERE _id = _did ;
		CLOSE runners_cursor;   
	END IF;
    SELECT @Counter as counter;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `_namespath`(_path nvarchar(256), _key nvarchar(32))
BEGIN
	DECLARE _TNombre nvarchar(55);
    DECLARE _fin int DEFAULT 0;
    
    SET @path = CONCAT(_path , _key,'#');
    SET @counter = count_str( @path ,'#');
	SET @str = '/'; 
    SET @e=1;
    
    
	while @e<=@counter DO
		SET @key = SPLIT_STR(@path,'#',@e+1);
		
		begin
			DECLARE _keys CURSOR FOR 
				SELECT SUBSTR(Nombre,1,55) FROM borme_keys WHERE _key= @key;


			DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin=1; 
            
            
			OPEN _keys;
			get_keys: LOOP
				FETCH _keys INTO _TNombre;
				
				SET @str = concat(@str, _TNombre, "/");
				IF _fin = 1 THEN
					LEAVE get_keys;
				END IF;
				
								
			END LOOP get_keys;
			CLOSE _keys; 
		end;
        SET @e = @e+1;
        
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
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `relacionado_con` AS select `borme_relaciones`.`Relation_id` AS `_Did`,`borme_relaciones`.`Empresa_id` AS `_Eid`,`_Empresa`.`Nombre` AS `Nombre`,`_Empresa`.`_Empresa` AS `_Empresa`,`_Empresa`.`_Directivo` AS `_Directivo`,`_Empresa`.`_Auditor` AS `_Auditor`,`_Empresa`.`_Financiera` AS `_Financiera`,`_Empresa`.`_Sicav` AS `_Sicav`,`_Empresa`.`_Slp` AS `_Slp`,`_Empresa`.`T_Relations` AS `T_Relations`,`_Empresa`.`ia_suspicius` AS `ia_suspicius` from ((`borme_relaciones` left join `borme_keys` `_Empresa` on((convert(`borme_relaciones`.`Empresa_id` using utf8) = `_Empresa`.`id`))) left join `borme_keys` `_directivo` on((convert(`borme_relaciones`.`Relation_id` using utf8) = `_directivo`.`id`))) */;
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
/*!50001 SET character_set_client      = utf8mb4 */;
/*!50001 SET character_set_results     = utf8mb4 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`%` SQL SECURITY DEFINER */
/*!50001 VIEW `relaciones_de` AS select `borme_relaciones`.`Empresa_id` AS `_Eid`,`borme_relaciones`.`Relation_id` AS `_Did`,`_directivo`.`Nombre` AS `Nombre`,`_directivo`.`_Empresa` AS `_Empresa`,`_directivo`.`_Directivo` AS `_Directivo`,`_directivo`.`_Auditor` AS `_Auditor`,`_directivo`.`_Financiera` AS `_Financiera`,`_directivo`.`_Sicav` AS `_Sicav`,`_directivo`.`_Slp` AS `_Slp`,`_directivo`.`T_Relations` AS `T_Relations`,`_directivo`.`ia_suspicius` AS `ia_suspicius` from ((`borme_relaciones` left join `borme_keys` `_Empresa` on((convert(`borme_relaciones`.`Empresa_id` using utf8) = `_Empresa`.`id`))) left join `borme_keys` `_directivo` on((convert(`borme_relaciones`.`Relation_id` using utf8) = `_directivo`.`id`))) order by `borme_relaciones`.`Relation_id` */;
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

-- Dump completed on 2019-05-01  0:26:01
