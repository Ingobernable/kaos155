CREATE DATABASE  IF NOT EXISTS `bbdd_borme` /*!40100 DEFAULT CHARACTER SET latin1 */;
USE `bbdd_borme`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: vps440527.ovh.net    Database: bbdd_borme
-- ------------------------------------------------------
-- Server version	5.7.19

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
-- Table structure for table `borme`
--

DROP TABLE IF EXISTS `borme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `SUMARIO` varchar(16) NOT NULL,
  `BORME` varchar(22) NOT NULL,
  `Anyo` int(11) DEFAULT NULL,
  `Provincia` varchar(22) DEFAULT NULL,
  `PDF` varchar(70) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `_borme` (`BORME`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `diario`
--

DROP TABLE IF EXISTS `diario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `diario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BORME` varchar(22) NOT NULL,
  `BORME_Id` int(11) DEFAULT NULL,
  `Dia` int(11) DEFAULT NULL,
  `Mes` int(11) DEFAULT NULL,
  `Anyo` int(11) DEFAULT NULL,
  `Provincia` varchar(45) DEFAULT NULL,
  `Empresa_Id` int(11) DEFAULT NULL,
  `Directivo_Id` int(11) DEFAULT NULL,
  `type` varchar(22) DEFAULT NULL,
  `_key` varchar(55) DEFAULT NULL,
  `_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Empresa_Id` (`Empresa_Id`),
  KEY `Directivo_id` (`Directivo_Id`),
  FULLTEXT KEY `_keys` (`_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `directivo`
--

DROP TABLE IF EXISTS `directivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `directivo` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Name` tinytext NOT NULL,
  `ActiveRelations` int(11) NOT NULL DEFAULT '0',
  `Nodes` json DEFAULT NULL,
  `JuridicId` bigint(20) DEFAULT '0',
  `Mark` tinyint(4) DEFAULT '0',
  `_l` int(10) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `directivo_relations`
--

DROP TABLE IF EXISTS `directivo_relations`;
/*!50001 DROP VIEW IF EXISTS `directivo_relations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `directivo_relations` AS SELECT 
 1 AS `Directivo_id`,
 1 AS `id`,
 1 AS `Name`,
 1 AS `Type`,
 1 AS `PersonId`,
 1 AS `CompanyId`,
 1 AS `Active`,
 1 AS `Cargo`,
 1 AS `ActiveRelations`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `empresa`
--

DROP TABLE IF EXISTS `empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `empresa` (
  `Id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `Name` varchar(250) NOT NULL,
  `ActiveRelations` int(11) unsigned NOT NULL DEFAULT '0',
  `Nodes` json DEFAULT NULL,
  `JuridicId` bigint(20) unsigned DEFAULT '0',
  `Mark` tinyint(4) unsigned DEFAULT '0',
  `nBOE` int(11) unsigned DEFAULT '0',
  `nBOCM` int(11) unsigned DEFAULT '0',
  `coorp` int(11) unsigned DEFAULT '0',
  `_l` int(10) NOT NULL DEFAULT '-1',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Name_UNIQUE` (`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Temporary view structure for view `empresa_relations`
--

DROP TABLE IF EXISTS `empresa_relations`;
/*!50001 DROP VIEW IF EXISTS `empresa_relations`*/;
SET @saved_cs_client     = @@character_set_client;
SET character_set_client = utf8;
/*!50001 CREATE VIEW `empresa_relations` AS SELECT 
 1 AS `_ID`,
 1 AS `id`,
 1 AS `_Name`,
 1 AS `Name`,
 1 AS `Type`,
 1 AS `CompanyId`,
 1 AS `PersonId`,
 1 AS `Active`,
 1 AS `Cargo`,
 1 AS `ActiveRelations`*/;
SET character_set_client = @saved_cs_client;

--
-- Table structure for table `errores`
--

DROP TABLE IF EXISTS `errores`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `errores` (
  `table` varchar(25) NOT NULL,
  `text` text,
  PRIMARY KEY (`table`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `lastread`
--

DROP TABLE IF EXISTS `lastread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lastread` (
  `SUMARIO_LAST` varchar(16) DEFAULT NULL,
  `SUMARIO_NEXT` varchar(16) NOT NULL,
  `ID_LAST` varchar(55) DEFAULT '1',
  PRIMARY KEY (`SUMARIO_NEXT`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `relaciones`
--

DROP TABLE IF EXISTS `relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `relaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Diario_Id` bigint(20) NOT NULL,
  `Empresa_id` bigint(20) unsigned NOT NULL,
  `Directivo_id` bigint(20) unsigned NOT NULL,
  `Motivo` varchar(45) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `Activo` bit(1) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  `_l` bit(1) DEFAULT NULL,
  PRIMARY KEY (`Diario_Id`,`Empresa_id`,`Directivo_id`,`Cargo`,`Motivo`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `Diario_Id_UNIQUE` (`Diario_Id`),
  KEY `Empresa` (`Empresa_id`),
  KEY `Directivo` (`Directivo_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `strings`
--

DROP TABLE IF EXISTS `strings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BORME_Id` int(11) DEFAULT NULL,
  `Empresa_Id` int(11) DEFAULT NULL,
  `BORME` varchar(25) DEFAULT NULL,
  `Empresa` varchar(254) DEFAULT NULL,
  `Original` text,
  `_l` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `_keys` (`Empresa`),
  KEY `_borme` (`BORME`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sumarios_borme`
--

DROP TABLE IF EXISTS `sumarios_borme`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sumarios_borme` (
  `BORME` varchar(22) NOT NULL,
  `SUMARIO_NEXT` varchar(16) NOT NULL,
  PRIMARY KEY (`BORME`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bbdd_borme'
--
/*!50003 DROP FUNCTION IF EXISTS `ACTIVERELATIONS` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `ACTIVERELATIONS`(
 _id Int,
 _Type int
 ) RETURNS int(11)
BEGIN
	DECLARE Contador Int;
    IF _Type=1 THEN
		SET Contador = (SELECT COUNT(*) FROM relaciones WHERE Empresa_Id= _id);
	END IF;
    IF _Type=2 THEN
		SET Contador = (SELECT COUNT(*) FROM relaciones WHERE Directivo_Id= _id);
	END IF;
RETURN Contador;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `getId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `getId`(
 _Type int,
 _cargo nvarchar(25),
 _IDEmpresa BIGINT,
 _IDDirectivo bigInt
 
 ) RETURNS bigint(20)
BEGIN
	DECLARE Contador Int;
	IF SUBSTR(_cargo,1, 3) = 'Aud' THEN
		IF _Type = 1 THEN
			SET Contador = _IDEmpresa;
		ELSE
			SET Contador = 0;
		END IF;
    ELSE
		IF _Type = 2 THEN
			SET Contador = _IDDirectivo;
		ELSE
			SET Contador = 0;
		END IF;
	END IF;
RETURN Contador;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `GETNAME` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `GETNAME`(
 _Type int,
 _cargo nvarchar(25),
 _NameDirectivo varchar(255),
 _NameEmpresa varchar(255)
 
 ) RETURNS varchar(255) CHARSET utf8
BEGIN
	DECLARE _Name nvarchar(255);
	IF SUBSTR(_cargo,1 , 3) = 'Aud' THEN
			SET _Name = _NameEmpresa;
    ELSE
		IF _Type = 2 THEN
			SET _Name = _NameDirectivo ;
		ELSE
			SET _Name = _NameEmpresa;
		END IF;
	END IF;
RETURN _Name;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP FUNCTION IF EXISTS `JuridicId` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `JuridicId`(
 _id Int

 ) RETURNS int(11)
BEGIN
	DECLARE Contador Int;

		SET Contador = (SELECT Count(*) from diario WHERE diario.Directivo_ID=_id and diario._key like 'Aud%');
	IF Contador>0 THEN
		SET Contador = 1;
	END IF;
RETURN Contador;
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
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
/*!50003 DROP PROCEDURE IF EXISTS `GetRelations` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`192.99.58.60` PROCEDURE `GetRelations`(
	IN _type nvarchar(15),
    IN _Id bigint
)
BEGIN

	if _type='Empresa' then
		SELECT  
			directivo.id, 
			directivo.Name , 
			relaciones.cargo,
			(SELECT count(*) from relaciones WHERE empresa.Id = relaciones.Empresa_id) as ActiveRalations
		FROM empresa INNER JOIN
		  relaciones ON empresa.Id = relaciones.Empresa_Id INNER JOIN
		  directivo ON relaciones.Directivo_Id = directivo.Id

		WHERE empresa.id = _id;
	END IF;

	if _type='Directivo' then
		SELECT  
			empresa.Id, 
			empresa.Name , 
			(SELECT count(*) from relaciones WHERE directivo.Id = relaciones.Directivo_id) as ActiveRelations
		FROM empresa INNER JOIN
			relaciones ON empresa.Id = relaciones.Empresa_Id INNER JOIN
			directivo ON relaciones.Directivo_Id = directivo.Id
							
		WHERE directivo.id = _id;
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
/*!50003 SET sql_mode              = 'NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSearchLst`(
	IN _search nvarchar(255)
)
BEGIN
	SELECT  Id,name, ActiveRelations(id,1) as ActiveRelations, JuridicId(id) as JuridicId		
        FROM empresa WHERE Name Like (SELECT CONCAT( UCASE(_search) , '%') ) LIMIT 10;
        
    SELECT  Id,name, ActiveRelations(id,2) as ActiveRelations FROM directivo WHERE Name Like  (SELECT CONCAT('%' , UC_Words(_search) , '%')) LIMIT 10;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertEmpresa` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'IGNORE_SPACE,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertEmpresa`(IN _Name  nvarchar(250), i INT )
BEGIN
	DECLARE _counter int;
    SET _counter=(SELECT count(*) FROM empresa where Name = _Name);
    
    IF _counter = 0 THEN
		BEGIN
			INSERT INTO empresa  (Name) VALUES (_Name);
			SELECT last_insert_id() as Id , i as i , _Name as Name;
        END;
	ELSE 
		SELECT Id , Name, i as i FROM empresa WHERE Name=_Name;
	END IF;
	
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;

--
-- Final view structure for view `directivo_relations`
--

/*!50001 DROP VIEW IF EXISTS `directivo_relations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `directivo_relations` AS select `relaciones`.`Directivo_id` AS `Directivo_id`,`empresa`.`Id` AS `id`,`empresa`.`Name` AS `Name`,1 AS `Type`,0 AS `PersonId`,`empresa`.`Id` AS `CompanyId`,`relaciones`.`Activo` AS `Active`,`relaciones`.`Cargo` AS `Cargo`,`ACTIVERELATIONS`(`empresa`.`Id`,1) AS `ActiveRelations` from ((`empresa` join `relaciones` on((`empresa`.`Id` = `relaciones`.`Empresa_id`))) join `directivo` on((`relaciones`.`Directivo_id` = `directivo`.`Id`))) */;
/*!50001 SET character_set_client      = @saved_cs_client */;
/*!50001 SET character_set_results     = @saved_cs_results */;
/*!50001 SET collation_connection      = @saved_col_connection */;

--
-- Final view structure for view `empresa_relations`
--

/*!50001 DROP VIEW IF EXISTS `empresa_relations`*/;
/*!50001 SET @saved_cs_client          = @@character_set_client */;
/*!50001 SET @saved_cs_results         = @@character_set_results */;
/*!50001 SET @saved_col_connection     = @@collation_connection */;
/*!50001 SET character_set_client      = utf8 */;
/*!50001 SET character_set_results     = utf8 */;
/*!50001 SET collation_connection      = utf8_general_ci */;
/*!50001 CREATE ALGORITHM=UNDEFINED */
/*!50013 DEFINER=`root`@`localhost` SQL SECURITY DEFINER */
/*!50001 VIEW `empresa_relations` AS select `relaciones`.`Empresa_id` AS `_ID`,`relaciones`.`Directivo_id` AS `id`,`directivo`.`Name` AS `_Name`,`empresa`.`Name` AS `Name`,if((substr(`relaciones`.`Cargo`,1,3) = 'Aud'),3,1) AS `Type`,if((substr(`relaciones`.`Cargo`,1,3) = 'Aud'),`relaciones`.`Directivo_id`,`relaciones`.`Empresa_id`) AS `CompanyId`,0 AS `PersonId`,`relaciones`.`Activo` AS `Active`,`relaciones`.`Cargo` AS `Cargo`,`ACTIVERELATIONS`(`empresa`.`Id`,2) AS `ActiveRelations` from ((`empresa` join `relaciones` on((`empresa`.`Id` = `relaciones`.`Empresa_id`))) join `directivo` on((`relaciones`.`Directivo_id` = `directivo`.`Id`))) */;
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

-- Dump completed on 2017-10-16 13:11:10
