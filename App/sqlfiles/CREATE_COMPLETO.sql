-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
-- 
-- Host: localhost    Database: bbdd_kaos155
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
-- Table structure for table `_adjudicador_aux`
--

DROP TABLE IF EXISTS `_adjudicador_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_ambito_geografico_aux`
--

DROP TABLE IF EXISTS `_ambito_geografico_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_cargo_adjudicador_aux`
--

DROP TABLE IF EXISTS `_cargo_adjudicador_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_materias_aux`
--

DROP TABLE IF EXISTS `_materias_aux`;
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

DROP TABLE IF EXISTS `_respons_adjudicador_aux`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `_respons_adjudicador_aux` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `codigo` varchar(6) DEFAULT NULL,
  `descripcion` varchar(255) DEFAULT NULL,
  `longitud` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tabla_precio_contrato_aux`
--

DROP TABLE IF EXISTS `_tabla_precio_contrato_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_contrato_aux`
--

DROP TABLE IF EXISTS `_tipo_contrato_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_modalidad_aux`
--

DROP TABLE IF EXISTS `_tipo_modalidad_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_procedimiento_aux`
--

DROP TABLE IF EXISTS `_tipo_procedimiento_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `_tipo_tramitacion_aux`
--

DROP TABLE IF EXISTS `_tipo_tramitacion_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin`
--

DROP TABLE IF EXISTS `boletin`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_aux`
--

DROP TABLE IF EXISTS `boletin_aux`;
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
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
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
  `Id_Empresa` int(11) DEFAULT NULL,
  `Empresa` varchar(254) NOT NULL,
  `importe` decimal(12,2) DEFAULT '0.00',
  PRIMARY KEY (`id`),
  KEY `BOLETIN` (`BOLETIN`)
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
-- Table structure for table `boletin_textos`
--

DROP TABLE IF EXISTS `boletin_textos`;
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
-- Table structure for table `borme_diario`
--

DROP TABLE IF EXISTS `borme_diario`;
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
  `Empresa_Id` int(11) DEFAULT NULL,
  `T_relation` int(11) DEFAULT '1',
  `Relation_Id` int(11) DEFAULT NULL,
  `type` varchar(22) DEFAULT NULL,
  `_key` varchar(55) DEFAULT NULL,
  `_value` text,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  KEY `Empresa_Id` (`Empresa_Id`),
  KEY `Directivo_id` (`Relation_Id`),
  FULLTEXT KEY `_keys` (`_key`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_directivo`
--

DROP TABLE IF EXISTS `borme_directivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_directivo` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` int(11) DEFAULT '1',
  `Name` tinytext NOT NULL,
  `ActiveRelations` int(11) NOT NULL DEFAULT '0',
  `JuridicId` bigint(20) DEFAULT '0',
  `Mark` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Id_UNIQUE` (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_empresa`
--

DROP TABLE IF EXISTS `borme_empresa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_empresa` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Type` int(11) NOT NULL DEFAULT '0',
  `Name` varchar(232) CHARACTER SET utf8 NOT NULL,
  `ActiveRelations` int(11) DEFAULT NULL,
  `nBOE` int(11) DEFAULT NULL,
  `nBOCM` int(11) DEFAULT NULL,
  `coorp` int(11) DEFAULT NULL,
  `Mark` varchar(1) DEFAULT NULL,
  `_l` int(11) DEFAULT NULL,
  `JuridicId` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `borme_relaciones`
--

DROP TABLE IF EXISTS `borme_relaciones`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `borme_relaciones` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `Diario_Id` bigint(20) NOT NULL,
  `Empresa_id` bigint(20) unsigned NOT NULL,
  `Type` int(11) DEFAULT '1',
  `Relation_id` bigint(20) unsigned NOT NULL,
  `Motivo` varchar(45) NOT NULL,
  `Cargo` varchar(45) NOT NULL,
  `Activo` bit(1) NOT NULL,
  `Anyo` int(10) unsigned NOT NULL,
  `_l` bit(1) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  UNIQUE KEY `Diario_Id_UNIQUE` (`Diario_Id`),
  KEY `Empresa` (`Empresa_id`),
  KEY `Directivo` (`Relation_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;
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
  `SUMARIO_NEXT` varchar(16) CHARACTER SET utf8 NOT NULL,
  `ID_LAST` varchar(145) DEFAULT NULL,
  `Read_Complete` bit(1) DEFAULT b'0',
  PRIMARY KEY (`SUMARIO_NEXT`,`Type`,`Anyo`),
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `strings`
--

DROP TABLE IF EXISTS `strings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `strings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `BOLETIN` varchar(17) CHARACTER SET utf8 NOT NULL,
  `_keys` text,
  `Importes` text,
  `Type` varchar(6) DEFAULT NULL,
  PRIMARY KEY (`BOLETIN`),
  UNIQUE KEY `id_UNIQUE` (`id`),
  FULLTEXT KEY `_keys` (`_keys`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sumarios`
--

DROP TABLE IF EXISTS `sumarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sumarios` (
  `Type` varchar(6) CHARACTER SET utf8 DEFAULT NULL,
  `BOLETIN` varchar(20) CHARACTER SET utf8 NOT NULL,
  `SUMARIO_NEXT` varchar(16) CHARACTER SET utf8 NOT NULL,
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bbdd_kaos155'
--
/*!50003 DROP FUNCTION IF EXISTS `SPLIT_STR` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` FUNCTION `SPLIT_STR`( s VARCHAR(1024) , del CHAR(1) , i INT) RETURNS varchar(1024) CHARSET utf8
    DETERMINISTIC
BEGIN

        DECLARE n INT ;

        -- get max number of items
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
/*!50003 DROP PROCEDURE IF EXISTS `insertInTable_Aux` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `insertInTable_Aux`(
	IN _type nvarchar(24),
	IN _Code nvarchar(18),
	IN _Descripcion nvarchar(255)  
)
BEGIN
	DECLARE _counter int;
    IF _type <2 THEN
		SET _counter=( SELECT count(*) FROM _materias_aux where codigo = _Code );
		IF _counter = 0 THEN
			INSERT INTO _materias_aux (codigo, descripcion) VALUES (_Code, TRIM(_Descripcion) );    
		END IF;
    END IF;
    
    IF _type=2 THEN
		SET _counter= ( SELECT count(*) FROM _ambito_geografico_aux where descripcion = _Descripcion);
        IF _counter=0 THEN
			INSERT INTO _ambito_geografico_aux (descripcion) values (_Descripcion);
            set _counter = last_insert_id();
			UPDATE _ambito_geografico_aux SET codigo = CONCAT(REPEAT('0',2 - LENGTH( CAST(_counter as CHAR(2) ))) ,_counter) where id=_counter;
			SELECT * FROM _ambito_geografico_aux WHERE id=_counter;
        END IF;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data`(
	
    IN _COUNT_CONTRATISTAS INT,
    IN _COUNT_MATERIAS INT,
    IN _Type nvarchar(18),
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
	IN _SUMARIO nvarchar(18),
	IN _BOLETIN nvarchar(18), 
    IN _Tipo_BOLETIN nvarchar(255),
	IN _Tipo_TRAMITE nvarchar(255),
    IN _Objeto TEXT, 
	IN _PDF nvarchar(255), 
	IN _TEXTO TEXT,

	IN _Lst_empresas nvarchar(255),
	IN _Importe FLOAT,
    
	IN _modalidad nvarchar(255),
	IN _tipo nvarchar(255),
	IN _tramitacion nvarchar(255),
	IN _procedimiento nvarchar(255),
	IN _precio nvarchar(255),
	IN _timporte nvarchar(255),
	IN _ambito_geografico nvarchar(255),
	IN _materias nvarchar(255),
	IN _materias_cpv nvarchar(255),
	IN _observaciones nvarchar(255),
	IN _adjudicador  nvarchar(255)   
    
    
)
BEGIN
	DECLARE _Contador int;
    DECLARE _Empresa nvarchar(255);
    DECLARE _ID_EMPRESA bigint;
    DECLARE _UTE int;
    DECLARE _Materia nvarchar(10);
	DECLARE _counter int;
    DECLARE code_geografico nvarchar(2);
    DECLARE code_adjudicador nvarchar(4);
    DECLARE code_tipo_contrato nvarchar(3);
    DECLARE code_tabla_precio_contrato_aux nvarchar(2);
    DECLARE code_procedimiento_contrato nvarchar(3);
    DECLARE code_tramitacion_contrato nvarchar(3);
    DECLARE code_modalidad_contrato nvarchar(3);
    
	DECLARE L_adjudicador int;
	DECLARE L_ambito_geografico int;
 	DECLARE L_precio int;
	DECLARE L_tipo int;
	DECLARE L_modalidad int;
 	DECLARE L_Tipo_TRAMITE int;
	DECLARE L_procedimiento int;
    
    SET L_adjudicador = LENGTH(_adjudicador);
    SET L_ambito_geografico= LENGTH(_ambito_geografico);    
    SET L_precio= LENGTH(_precio);     
    SET L_tipo= LENGTH(_tipo);    
    SET L_modalidad= LENGTH(_modalidad);
    SET L_Tipo_TRAMITE= LENGTH(_Tipo_TRAMITE);      
    SET L_procedimiento= LENGTH(_procedimiento);
    

	IF LENGTH(_adjudicador)>0 THEN
		SET _counter= ( SELECT count(*) FROM _adjudicador_aux where descripcion = _adjudicador);
		IF _counter=0 THEN
			INSERT INTO _adjudicador_aux (descripcion,longitud) values (_adjudicador,L_adjudicador);
			set _counter = last_insert_id();
			UPDATE _adjudicador_aux SET codigo = CONCAT(REPEAT('0',4 - LENGTH( CAST(_counter as CHAR(4) ))) ,_counter) where id=_counter;
			SELECT * FROM _adjudicador_aux WHERE id=_counter;
	   END IF;
	   SET code_adjudicador = (SELECT codigo FROM _adjudicador_aux where Descripcion = _adjudicador);
   END IF;
   
   IF LENGTH(_ambito_geografico)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _ambito_geografico_aux where descripcion = _ambito_geografico);
	   IF _counter=0 THEN
			INSERT INTO _ambito_geografico_aux (descripcion,longitud) values (_ambito_geografico,L_ambito_geografico);
			set _counter = last_insert_id();
			UPDATE _ambito_geografico_aux SET codigo = CONCAT(REPEAT('0',2 - LENGTH( CAST(_counter as CHAR(2) ))) ,_counter) where id=_counter;
			SELECT * FROM _ambito_geografico_aux WHERE id=_counter;
	   END IF;
	   SET code_geografico = (SELECT codigo FROM _ambito_geografico_aux where Descripcion = _ambito_geografico);
   END IF;
   
   IF LENGTH(_precio)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _tabla_precio_contrato_aux where descripcion = _precio);
	   IF _counter=0 THEN
			INSERT INTO _tabla_precio_contrato_aux (descripcion,longitud) values (_precio,L_precio);
			set _counter = last_insert_id();
			UPDATE _tabla_precio_contrato_aux SET codigo = CONCAT(REPEAT('0',2 - LENGTH( CAST(_counter as CHAR(2) ))) ,_counter) where id=_counter;
			SELECT * FROM _tabla_precio_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_tabla_precio_contrato_aux = (SELECT codigo FROM _tabla_precio_contrato_aux where Descripcion = _precio);
	END IF;
	
   IF LENGTH(_Tipo_BOLETIN)>0 THEN 
	   SET _counter= ( SELECT count(*) FROM _tipo_contrato_aux where descripcion = _Tipo_BOLETIN);
	   IF _counter=0 THEN
			INSERT INTO _tipo_contrato_aux (descripcion,longitud) values (_tipo,L_tipo);
			set _counter = last_insert_id();
			UPDATE _tipo_contrato_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _tipo_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_tipo_contrato = (SELECT codigo FROM _tipo_contrato_aux where Descripcion = _Tipo_BOLETIN);
	END IF;
	
	IF LENGTH(_modalidad)>0 THEN 
	   SET _counter= ( SELECT count(*) FROM _tipo_modalidad_aux where descripcion = _modalidad);
	   IF _counter=0 THEN
			INSERT INTO _tipo_modalidad_aux (descripcion,longitud) values (_modalidad,L_modalidad);
			set _counter = last_insert_id();
			UPDATE _tipo_modalidad_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _tipo_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_modalidad_contrato = (SELECT codigo FROM _tipo_modalidad_aux where Descripcion = _modalidad);
	END IF;
        
	  IF LENGTH(_Tipo_TRAMITE)>0 THEN   
		  SET _counter= ( SELECT count(*) FROM _tipo_tramitacion_aux where descripcion = _Tipo_TRAMITE);
		   IF _counter=0 THEN
				INSERT INTO _tipo_tramitacion_aux (descripcion,longitud) values (_Tipo_TRAMITE,L_Tipo_TRAMITE);
				set _counter = last_insert_id();
				UPDATE _tipo_tramitacion_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_tramitacion_aux WHERE id=_counter;
		   END IF;
		   SET code_tramitacion_contrato = (SELECT codigo FROM _tipo_tramitacion_aux where Descripcion = _Tipo_TRAMITE);
		END IF;
        
		IF LENGTH(_procedimiento)>0 THEN  
		  SET _counter= ( SELECT count(*) FROM _tipo_procedimiento_aux where descripcion = _procedimiento);
		   IF _counter=0 THEN
				INSERT INTO _tipo_procedimiento_aux (descripcion,longitud) values (_procedimiento,L_procedimiento);
				set _counter = last_insert_id();
				UPDATE _tipo_procedimiento_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_procedimiento_aux WHERE id=_counter;
		   END IF;
		   SET code_procedimiento_contrato = (SELECT codigo FROM _tipo_procedimiento_aux where Descripcion = _procedimiento);
		END IF;



    SET _Contador = 0;    
    while _Contador < _COUNT_CONTRATISTAS do
    
		SET _UTE = (SELECT LOCATE("UTE",_Lst_empresas));
        IF _UTE > 0 THEN
			SET _Empresa = (SELECT SPLIT_STR(_Lst_empresas, ';', _Contador+1));
        ELSE
			SET _Empresa = (SELECT _Lst_empresas);
        END IF;
        SET _Contador = _Contador + 1;
        
        SET _counter=( SELECT count(*) FROM boletin_contratos where BOLETIN = _BOLETIN AND Empresa = _Empresa);
		IF _counter = 0 THEN
			INSERT INTO boletin_contratos (
				Empresa, 
				BOLETIN,
				counter,
				importe) VALUES ( 
				_Empresa ,
				_BOLETIN, 
				_Contador,
				_importe); 
		END IF;

    END WHILE;
    
	SET _Contador = 0;    
	while _Contador < _COUNT_MATERIAS do	
		SET _Materia = (SELECT SPLIT_STR(_materias, ';', _Contador+1));
		INSERT INTO boletin_materias (BOLETIN,COD_Materia) VALUES(_BOLETIN,_Materia);
		SET _Contador = _Contador + 1;
	END WHILE;   
        
	SET _counter=( SELECT count(*) FROM strings where BOLETIN = _BOLETIN );
	IF _counter = 0 THEN
		INSERT INTO strings (BOLETIN, _keys, Importes) VALUES (_BOLETIN, _Empresa, _Importe)	; 
	END IF;


	UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type='BOE';

	SET _counter=( SELECT count(*) FROM boletin where BOLETIN = _BOLETIN ); 
	IF _counter = 0 THEN
			INSERT INTO boletin ( Type,
			SUMARIO, 
			BOLETIN, 
			Tipo_BOLETIN, 
			Tipo_TRAMITE,
			Tipo_ADJUDICADOR,
			COD_Ambito_Geografico,
			COD_Tabla_Precio, 
			Objeto_Contrato,
			dia,
			mes,
			anyo, 
			PDF, 
			TEXTO) VALUES ( 
			_Type,
			_SUMARIO, 
			_BOLETIN, 
			code_tipo_contrato, 
			code_tramitacion_contrato,
			code_adjudicador,
			code_geografico,
			code_tabla_precio_contrato_aux,
			_objeto,
			_Dia,
			_Mes,
			_Anyo, 
			_PDF, 
			_TEXTO)	;
            SELECT last_insert_id() as ID;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BOCM` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BOCM`(	
	
    IN _COUNT_CONTRATISTAS INT,
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
    IN _SUMARIO nvarchar(18),
	IN _BOLETIN nvarchar(18), 
	IN _Tipo_TRAMITE nvarchar(255), 
	IN _PDF nvarchar(255), 
	IN _TEXTO TEXT,

	IN _Lst_empresas nvarchar(255),
	IN _Importe nvarchar(255) )
BEGIN
	DECLARE _Contador int;
    DECLARE _Empresa nvarchar(255);
    DECLARE _ID_EMPRESA bigint;
    DECLARE _UTE int;

	DECLARE _counter int;
    DECLARE __IMPORTE float;


    DECLARE code_tramitacion_contrato nvarchar(3);

    
    SET _counter=( SELECT count(*) FROM boletin where BOLETIN = _BOCM AND Type='BOCM');
     
    IF _counter = 0 THEN
		IF LENGTH(_Tipo_TRAMITE)>0 THEN   
		  SET _counter= ( SELECT count(*) FROM _tipo_tramitacion_aux where descripcion = _Tipo_TRAMITE);
		   IF _counter=0 THEN
				INSERT INTO _tipo_tramitacion_aux (descripcion,longitud) values (_Tipo_TRAMITE,L_Tipo_TRAMITE);
				set _counter = last_insert_id();
				UPDATE _tipo_tramitacion_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_tramitacion_aux WHERE id=_counter;
		   END IF;
		   SET code_tramitacion_contrato = (SELECT codigo FROM _tipo_tramitacion_aux where Descripcion = _Tipo_TRAMITE);
		END IF;
	END IF;

    SET _Contador = 0;    
    while _Contador < _COUNT_CONTRATISTAS do
    
		SET _UTE = (SELECT LOCATE("UTE",_Lst_empresas));
        IF _UTE>0 THEN
			SET _UTE = 1;
            SET _Lst_empresas = REPLACE(_Lst_empresas,'UTE','');
        END IF;    
        IF LOCATE(";",_Lst_Empresas) > 0 THEN
			SET _Empresa = (SELECT SPLIT_STR(_Lst_empresas, ';', _Contador+1));
            IF LOCATE(";",_importe) > 0 THEN
				SET __IMPORTE = (SELECT SPLIT_STR(_importe, ';', _Contador+1));
			ELSE
				SET __IMPORTE = _importe ;
            END IF;
        ELSE
			SET _Empresa = (SELECT _Lst_empresas);
            SET __IMPORTE = _importe ;
        END IF;
        SET _Contador = _Contador + 1;
        
        SET _counter=( SELECT count(*) FROM boletin_contratos where BOLETIN = _BOLETIN AND Empresa = _Empresa);
		IF _counter = 0 THEN
/*			SET _ID_EMPRESA = (SELECT ID From borme_empresa WHERE Name= _Empresa );
            IF NOT ISNULL(_ID_EMPRESA) THEN
				UPDATE borme_empresa SET nBOE = nBOE + 1 WHERE Id =_ID_EMPRESA;  
            END IF;
*/            
			INSERT INTO boletin_contratos (
				Id_Empresa,
				Empresa, 
				BOLETIN,
				counter,
				importe) VALUES (_ID_EMPRESA, 
				_Empresa ,
				_BOLETIN, 
				_Contador,
				CAST(__IMPORTE as DECIMAL(12,2)) ); 
		END IF;

    END WHILE;

	UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type='BOE' AND Anyo=_Anyo;

	SET _counter=( SELECT count(*) FROM boletin where BOLETIN = _BOLETIN ); 
	IF _counter = 0 THEN
			INSERT INTO boletin_textos (BOLETIN,PDF,Objeto_Contrato,TEXTO,observaciones) VALUES (_BOLETIN,_PDF,_objeto,_TEXTO,_observaciones);
            
			INSERT INTO boletin ( Type,
			SUMARIO, 
			BOLETIN, 
            UTE,
            _P,

			dia,
			mes,
			anyo) VALUES ( 
			_Type,
			_SUMARIO, 
			_BOLETIN, 
            _UTE,
            _COUNT_PARRAFOS,

			
			_Dia,
			_Mes,
			_Anyo)	;
            
            SET _counter= last_insert_id() ;
            
            INSERT INTO boletin_aux (BOLETIN,

				Tipo_TRAMITE) VALUES (_BOLETIN,

				code_tramitacion_contrato);  
            
            SELECT _counter as ID;	
	END IF;
 /*   
    SET _counter=( SELECT count(*) FROM strings where BOLETIN = _BOCM );
    IF _counter = 0 THEN
		INSERT INTO strings (Type, BOLETIN, _keys, Importes) VALUES ('BOCM', _BOCM, _Empresa, _Importe)	;    
	END IF;
    UPDATE lastread SET ID_LAST = _BOCM WHERE Type= 'BOCM';
*/
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BOE` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BOE`(
	
    IN _COUNT_PARRAFOS INT,
    IN _COUNT_CONTRATISTAS INT,
    IN _COUNT_MATERIAS INT,
    IN _Type nvarchar(18),
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
	IN _SUMARIO nvarchar(18),
	IN _BOLETIN nvarchar(18), 
    IN _Tipo_BOLETIN nvarchar(255),
	IN _Tipo_TRAMITE nvarchar(255),
    IN _Objeto TEXT, 
	IN _PDF nvarchar(255), 
	IN _TEXTO TEXT,

	IN _Lst_empresas nvarchar(255),
	IN _Importe nvarchar(255),
    
	IN _modalidad nvarchar(255),
	IN _tipo nvarchar(255),
	IN _tramitacion nvarchar(255),
	IN _procedimiento nvarchar(255),
	IN _precio nvarchar(255),
	IN _timporte nvarchar(255),
	IN _ambito_geografico nvarchar(255),
	IN _materias nvarchar(255),
	IN _materias_cpv nvarchar(255),
	IN _observaciones nvarchar(255),
	IN _adjudicador  nvarchar(255),   
    IN _cargo nvarchar(255),
    IN _responsable nvarchar(255)
    
)
BEGIN
	DECLARE _Contador int;
    DECLARE _Empresa nvarchar(255);
    DECLARE _ID_EMPRESA bigint;
    DECLARE _UTE int;
    DECLARE _Materia nvarchar(10);
	DECLARE _counter int;
    DECLARE __IMPORTE float;
    DECLARE code_geografico nvarchar(3);
    
    DECLARE code_adjudicador nvarchar(5);
    DECLARE code_cargo nvarchar(6);
    DECLARE code_responsable nvarchar(6);
    
    DECLARE code_tipo_contrato nvarchar(3);
    DECLARE code_tabla_precio_contrato_aux nvarchar(2);
    DECLARE code_procedimiento_contrato nvarchar(3);
    DECLARE code_tramitacion_contrato nvarchar(3);
    DECLARE code_modalidad_contrato nvarchar(3);
    
	DECLARE L_cargo int;
    DECLARE L_responsable int;
	DECLARE L_adjudicador int;
    
	DECLARE L_ambito_geografico int;
 	DECLARE L_precio int;
	DECLARE L_tipo int;
	DECLARE L_modalidad int;
 	DECLARE L_Tipo_TRAMITE int;
	DECLARE L_procedimiento int;
    
    SET L_cargo = LENGTH(_cargo);
    SET L_responsable = LENGTH(_responsable);
    SET L_adjudicador = LENGTH(_adjudicador);
    SET L_ambito_geografico= LENGTH(_ambito_geografico);    
    SET L_precio= LENGTH(_precio);     
    SET L_tipo= LENGTH(_tipo);    
    SET L_modalidad= LENGTH(_modalidad);
    SET L_Tipo_TRAMITE= LENGTH(_Tipo_TRAMITE);      
    SET L_procedimiento= LENGTH(_procedimiento);
    

	IF LENGTH(_responsable)>0 THEN
		SET _counter= ( SELECT count(*) FROM _respons_adjudicador_aux where descripcion = _responsable);
		IF _counter=0 THEN
			INSERT INTO _respons_adjudicador_aux (descripcion,longitud) values (UC_Words(_responsable),L_responsable);
			set _counter = last_insert_id();
			UPDATE _respons_adjudicador_aux SET codigo = CONCAT(REPEAT('0',6 - LENGTH( CAST(_counter as CHAR(6) ))) ,_counter) where id=_counter;
			SELECT * FROM _respons_adjudicador_aux WHERE id=_counter;
	   END IF;
	   SET code_responsable = (SELECT codigo FROM _respons_adjudicador_aux where Descripcion = _responsable);
   END IF;


	IF LENGTH(_cargo)>0 THEN
		SET _counter= ( SELECT count(*) FROM _cargo_adjudicador_aux where descripcion = _cargo);
		IF _counter=0 THEN
			INSERT INTO _cargo_adjudicador_aux (descripcion,longitud) values (UC_Words(_cargo),L_cargo);
			set _counter = last_insert_id();
			UPDATE _cargo_adjudicador_aux SET codigo = CONCAT(REPEAT('0',6- LENGTH( CAST(_counter as CHAR(6) ))) ,_counter) where id=_counter;
			SELECT * FROM _cargo_adjudicador_aux WHERE id=_counter;
	   END IF;
	   SET code_cargo = (SELECT codigo FROM _cargo_adjudicador_aux where Descripcion = _cargo);
   END IF;
 
 	IF LENGTH(_adjudicador)>0 THEN
		SET _counter= ( SELECT count(*) FROM _adjudicador_aux where descripcion = _adjudicador);
		IF _counter=0 THEN
			INSERT INTO _adjudicador_aux (descripcion,longitud) values (UC_Words(_adjudicador),L_adjudicador);
			set _counter = last_insert_id();
			UPDATE _adjudicador_aux SET codigo = CONCAT(REPEAT('0',5 - LENGTH( CAST(_counter as CHAR(5) ))) ,_counter) where id=_counter;
			SELECT * FROM _adjudicador_aux WHERE id=_counter;
	   END IF;
	   SET code_adjudicador = (SELECT codigo FROM _adjudicador_aux where Descripcion = _adjudicador);
   END IF;
 
 
 
   IF LENGTH(_ambito_geografico)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _ambito_geografico_aux where descripcion = _ambito_geografico);
	   IF _counter=0 THEN
			INSERT INTO _ambito_geografico_aux (descripcion,longitud,_type) values (_ambito_geografico,L_ambito_geografico,"BOE");			set _counter = last_insert_id();
			UPDATE _ambito_geografico_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _ambito_geografico_aux WHERE id=_counter;
	   END IF;
	   SET code_geografico = (SELECT codigo FROM _ambito_geografico_aux where Descripcion = _ambito_geografico);
   END IF;
   
   IF LENGTH(_precio)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _tabla_precio_contrato_aux where descripcion = _precio);
	   IF _counter=0 THEN
			INSERT INTO _tabla_precio_contrato_aux (descripcion,longitud) values (_precio,L_precio);
			set _counter = last_insert_id();
			UPDATE _tabla_precio_contrato_aux SET codigo = CONCAT(REPEAT('0',2 - LENGTH( CAST(_counter as CHAR(2) ))) ,_counter) where id=_counter;
			SELECT * FROM _tabla_precio_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_tabla_precio_contrato_aux = (SELECT codigo FROM _tabla_precio_contrato_aux where Descripcion = _precio);
	END IF;
	
   IF LENGTH(_Tipo_BOLETIN)>0 THEN 
	   SET _counter= ( SELECT count(*) FROM _tipo_contrato_aux where descripcion = _Tipo_BOLETIN);
	   IF _counter=0 THEN
			INSERT INTO _tipo_contrato_aux (descripcion,longitud) values (_tipo,L_tipo);
			set _counter = last_insert_id();
			UPDATE _tipo_contrato_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _tipo_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_tipo_contrato = (SELECT codigo FROM _tipo_contrato_aux where Descripcion = _Tipo_BOLETIN);
	END IF;
	
	IF LENGTH(_modalidad)>0 THEN 
	   SET _counter= ( SELECT count(*) FROM _tipo_modalidad_aux where descripcion = _modalidad);
	   IF _counter=0 THEN
			INSERT INTO _tipo_modalidad_aux (descripcion,longitud) values (_modalidad,L_modalidad);
			set _counter = last_insert_id();
			UPDATE _tipo_modalidad_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _tipo_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_modalidad_contrato = (SELECT codigo FROM _tipo_modalidad_aux where Descripcion = _modalidad);
	END IF;
        
	  IF LENGTH(_Tipo_TRAMITE)>0 THEN   
		  SET _counter= ( SELECT count(*) FROM _tipo_tramitacion_aux where descripcion = _Tipo_TRAMITE);
		   IF _counter=0 THEN
				INSERT INTO _tipo_tramitacion_aux (descripcion,longitud) values (_Tipo_TRAMITE,L_Tipo_TRAMITE);
				set _counter = last_insert_id();
				UPDATE _tipo_tramitacion_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_tramitacion_aux WHERE id=_counter;
		   END IF;
		   SET code_tramitacion_contrato = (SELECT codigo FROM _tipo_tramitacion_aux where Descripcion = _Tipo_TRAMITE);
		END IF;
        
		IF LENGTH(_procedimiento)>0 THEN  
		  SET _counter= ( SELECT count(*) FROM _tipo_procedimiento_aux where descripcion = _procedimiento);
		   IF _counter=0 THEN
				INSERT INTO _tipo_procedimiento_aux (descripcion,longitud) values (_procedimiento,L_procedimiento);
				set _counter = last_insert_id();
				UPDATE _tipo_procedimiento_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_procedimiento_aux WHERE id=_counter;
		   END IF;
		   SET code_procedimiento_contrato = (SELECT codigo FROM _tipo_procedimiento_aux where Descripcion = _procedimiento);
		END IF;



    SET _Contador = 0;    
    while _Contador < _COUNT_CONTRATISTAS do
    
		SET _UTE = (SELECT LOCATE("UTE",_Lst_empresas));
        IF _UTE>0 THEN
			SET _UTE = 1;
            SET _Lst_empresas = REPLACE(_Lst_empresas,'UTE','');
        END IF;    
        IF LOCATE(";",_Lst_Empresas) > 0 THEN
			SET _Empresa = (SELECT SPLIT_STR(_Lst_empresas, ';', _Contador+1));
            IF LOCATE(";",_importe) > 0 THEN
				SET __IMPORTE = (SELECT SPLIT_STR(_importe, ';', _Contador+1));
			ELSE
				SET __IMPORTE = _importe ;
            END IF;
        ELSE
			SET _Empresa = (SELECT _Lst_empresas);
            SET __IMPORTE = _importe ;
        END IF;
        SET _Contador = _Contador + 1;
        
        SET _counter=( SELECT count(*) FROM boletin_contratos where BOLETIN = _BOLETIN AND Empresa = _Empresa);
		IF _counter = 0 THEN
/*			SET _ID_EMPRESA = (SELECT ID From borme_empresa WHERE Name= _Empresa );
            IF NOT ISNULL(_ID_EMPRESA) THEN
				UPDATE borme_empresa SET nBOE = nBOE + 1 WHERE Id =_ID_EMPRESA;  
            END IF;
*/            
			INSERT INTO boletin_contratos (
				Id_Empresa,
				Empresa, 
				BOLETIN,
				counter,
				importe) VALUES (_ID_EMPRESA, 
				_Empresa ,
				_BOLETIN, 
				_Contador,
				CAST(__IMPORTE as DECIMAL(12,2)) ); 
		END IF;

    END WHILE;
    
	SET _Contador = 0;    
	while _Contador < _COUNT_MATERIAS do	
		SET _Materia = (SELECT SPLIT_STR(_materias, ';', _Contador+1));
		INSERT INTO boletin_materias (BOLETIN,COD_Materia) VALUES(_BOLETIN,_Materia);
		SET _Contador = _Contador + 1;
	END WHILE;   
/*        
	SET _counter=( SELECT count(*) FROM strings where BOLETIN = _BOLETIN );
	IF _counter = 0 THEN
		INSERT INTO strings (Type, BOLETIN, _keys, Importes) VALUES ('BOE', _BOLETIN, _Empresa, _Importe)	; 
	END IF;
*/    
    
	UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type='BOE' AND Anyo=_Anyo;

	SET _counter=( SELECT count(*) FROM boletin where BOLETIN = _BOLETIN ); 
	IF _counter = 0 THEN
			INSERT INTO boletin_textos (BOLETIN,PDF,Objeto_Contrato,TEXTO,observaciones) VALUES (_BOLETIN,_PDF,_objeto,_TEXTO,_observaciones);
            
			INSERT INTO boletin ( Type,
			SUMARIO, 
			BOLETIN, 
            UTE,
            _P,

			dia,
			mes,
			anyo) VALUES ( 
			_Type,
			_SUMARIO, 
			_BOLETIN, 
            _UTE,
            _COUNT_PARRAFOS,

			
			_Dia,
			_Mes,
			_Anyo)	;
            
            SET _counter= last_insert_id() ;
            
            INSERT INTO boletin_aux (BOLETIN,
				Tipo_BOLETIN, 
				Tipo_TRAMITE,
                Tipo_PROCEDIMIENTO,
				Tipo_ADJUDICADOR,
				
				Code_ADJUDICADOR,
				Responsable_ADJUDICADOR,
				
				COD_Ambito_Geografico,
				COD_Tabla_Precio) VALUES (_BOLETIN,
                
				code_tipo_contrato, 
				code_tramitacion_contrato,
				code_procedimiento_contrato,
                
				code_adjudicador,
				code_cargo,
				code_responsable,
				
				code_geografico,
				code_tabla_precio_contrato_aux               
			);  
            
            SELECT _counter as ID;
	END IF;        
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BORME` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME`(
	
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
    IN _Type nvarchar(10),
	IN _SUMARIO nvarchar(18),
	IN _BOLETIN nvarchar(18),
    IN _ambito_geografico nvarchar(255),
	IN _PDF nvarchar(255) 
	   
)
BEGIN

	DECLARE _counter int;
    DECLARE code_geografico nvarchar(3);
	DECLARE L_ambito_geografico int;
    
    SET L_ambito_geografico= LENGTH(_ambito_geografico);    
    
   IF LENGTH(_ambito_geografico)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _ambito_geografico_aux where descripcion = _ambito_geografico);
	   IF _counter=0 THEN
			INSERT INTO _ambito_geografico_aux (descripcion,longitud,_type) values (_ambito_geografico,L_ambito_geografico,"BORME");
			set _counter = last_insert_id();
			UPDATE _ambito_geografico_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _ambito_geografico_aux WHERE id=_counter;
	   END IF;
	   SET code_geografico = (SELECT codigo FROM _ambito_geografico_aux where Descripcion = _ambito_geografico);
   END IF;

	/*UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type='BORME' AND Anyo=_Anyo;*/
    

	SET _counter=( SELECT count(*) FROM boletin_textos where BOLETIN = _BOLETIN );
	IF _counter = 0 THEN
		INSERT INTO boletin_textos (BOLETIN,PDF) VALUES (_BOLETIN,_PDF);
	End If;
            
	SET _counter=( SELECT count(*) FROM boletin where BOLETIN = _BOLETIN ); 
	IF _counter = 0 THEN
			INSERT INTO boletin ( 
            Type,
			SUMARIO, 
			BOLETIN, 
			dia,
			mes,
			anyo ) VALUES ( 
			_Type,
			_SUMARIO, 
			_BOLETIN, 
			_Dia,
			_Mes,
			_Anyo );
            
            SET _counter= last_insert_id() ;
            
            INSERT INTO boletin_aux (BOLETIN,
				COD_Ambito_Geografico
				) VALUES (_BOLETIN,
                
			
				
				code_geografico        
			); 
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
    IN _Empresa_Id INT,
    IN _Relacion_Id INT,
    IN _T_Relacion INT,
    IN _Activo int,
    IN _type nvarchar(100), 
    IN _key nvarchar(100),
    IN _value text
    
)
BEGIN
	DECLARE _counter int;
    DECLARE _IdDiario INT;
		
    INSERT INTO borme_diario (BOLETIN,BOLETIN_Id,Dia,Mes,Anyo,Provincia,Empresa_Id, Relation_Id,T_Relation,Type,_key,_value) 
            VALUES ( _BOLETIN,_BOLETIN_ID,_Dia,_Mes,_Anyo,_Provincia,_Empresa_Id,_Relacion_Id,_T_Relacion,_type,_key,_value);
	SET _IdDiario = (SELECT last_insert_id() as Id );
            
	IF _Empresa_Id>0 AND _Relacion_Id>0 THEN
		SET _counter = (SELECT count(*) FROM borme_relaciones WHERE Diario_Id= _IdDiario);
		IF _counter=0 THEN
			INSERT INTO borme_relaciones (Diario_Id,Empresa_Id,Type,Relation_id,Motivo,Cargo,Activo,Anyo)
			VALUES (_IdDiario,_Empresa_Id,_T_Relacion,_Relacion_Id,_type,_key,_Activo,_Anyo);
            UPDATE borme_empresa SET ActiveRelations = ActiveRelations+1 WHERE id = _Empresa_Id;
            IF _T_Relacion = 0 then
                IF _key = 'Auditor' THEN
					UPDATE borme_empresa SET ActiveRelations = ActiveRelations+1, JuridicId=1  WHERE id = _Relacion_Id;
                ELSE
					UPDATE borme_empresa SET ActiveRelations = ActiveRelations+1 WHERE id = _Relacion_Id;
                END IF;
			ELSE 
				IF _key = 'Auditor' THEN
					UPDATE borme_directivo SET ActiveRelations = ActiveRelations+1, JuridicId=1 WHERE id = _Relacion_Id;
                ELSE
					UPDATE borme_directivo SET ActiveRelations = ActiveRelations+1 WHERE id = _Relacion_Id;
                END IF;
            END IF;
		END IF;
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
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Directivo`(IN _Name  nvarchar(250), i INT )
BEGIN
	DECLARE _counter int;
    SET _counter=(SELECT count(*) FROM borme_directivo where Name = _Name);
    
    IF _counter = 0 THEN
		BEGIN
			INSERT INTO borme_directivo  (Name) VALUES (_Name);
			SELECT last_insert_id() as Id , i as i , _Name as Name;
        END;
	ELSE 
		SELECT Id , Name, i as i FROM borme_directivo WHERE Name=_Name;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Empresa`(IN _Name  nvarchar(250), i INT )
BEGIN
	DECLARE _counter int;
    DECLARE _xBOE  INT;
    DECLARE _xBOCM  INT;
    DECLARE ID_empresa INT;
    
    SET _counter=(SELECT count(*) FROM borme_empresa where Name = _Name);
    
    IF _counter = 0 THEN
		BEGIN
			INSERT INTO borme_empresa  (Name) VALUES (_Name);
			SELECT last_insert_id() as Id , i as i , _Name as Name;
            SET ID_empresa= last_insert_id();
            
            SET _xBOE = (SELECT Count(*) FROM boletin_contratos INNER JOIN boletin ON boletin_contratos.BOLETIN=boletin.BOLETIN WHERE boletin_contratos.Empresa = _Name AND boletin.Type='BOE');
			SET _xBOCM = (SELECT Count(*) FROM boletin_contratos INNER JOIN boletin ON boletin_contratos.BOLETIN=boletin.BOLETIN WHERE boletin_contratos.Empresa = _Name AND boletin.Type='BOCM');
			
			UPDATE boletin_contratos SET Id_Empresa = ID_empresa WHERE Empresa = _Name;
			UPDATE borme_empresa SET nBOE =_xBOE, nBOCM=_xBOCM WHERE Id=ID_empresa;
        END;
	ELSE 
		SET ID_empresa= (SELECT Id FROM borme_empresa WHERE Name=_Name);
	END IF;
    

    
    SELECT Id , Name, i as i FROM borme_empresa WHERE Id=ID_empresa;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_xxxxxxxxxxxxx` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_xxxxxxxxxxxxx`(
	
    IN _COUNT_CONTRATISTAS INT,
    IN _COUNT_MATERIAS INT,
    IN _Type nvarchar(18),
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
	IN _SUMARIO nvarchar(18),
	IN _BOLETIN nvarchar(18), 
    IN _Tipo_BOLETIN nvarchar(255),
	IN _Tipo_TRAMITE nvarchar(255),
    IN _Objeto TEXT, 
	IN _PDF nvarchar(255), 
	IN _TEXTO TEXT,

	IN _Lst_empresas nvarchar(255),
	IN _Importe FLOAT,
    
	IN _modalidad nvarchar(255),
	IN _tipo nvarchar(255),
	IN _tramitacion nvarchar(255),
	IN _procedimiento nvarchar(255),
	IN _precio nvarchar(255),
	IN _timporte nvarchar(255),
	IN _ambito_geografico nvarchar(255),
	IN _materias nvarchar(255),
	IN _materias_cpv nvarchar(255),
	IN _observaciones nvarchar(255),
	IN _adjudicador  nvarchar(255)   
    
    
)
BEGIN
	DECLARE _Contador int;
    DECLARE _Empresa nvarchar(255);
    DECLARE _ID_EMPRESA bigint;
    DECLARE _UTE int;
    DECLARE _Materia nvarchar(10);
	DECLARE _counter int;
    DECLARE code_geografico nvarchar(2);
    DECLARE code_adjudicador nvarchar(4);
    DECLARE code_tipo_contrato nvarchar(3);
    DECLARE code_tabla_precio_contrato_aux nvarchar(2);
    DECLARE code_procedimiento_contrato nvarchar(3);
    DECLARE code_tramitacion_contrato nvarchar(3);
    DECLARE code_modalidad_contrato nvarchar(3);
    
	DECLARE L_adjudicador int;
	DECLARE L_ambito_geografico int;
 	DECLARE L_precio int;
	DECLARE L_tipo int;
	DECLARE L_modalidad int;
 	DECLARE L_Tipo_TRAMITE int;
	DECLARE L_procedimiento int;
    
    SET L_adjudicador = LENGTH(_adjudicador);
    SET L_ambito_geografico= LENGTH(_ambito_geografico);    
    SET L_precio= LENGTH(_precio);     
    SET L_tipo= LENGTH(_tipo);    
    SET L_modalidad= LENGTH(_modalidad);
    SET L_Tipo_TRAMITE= LENGTH(_Tipo_TRAMITE);      
    SET L_procedimiento= LENGTH(_procedimiento);
    

	IF LENGTH(_adjudicador)>0 THEN
		SET _counter= ( SELECT count(*) FROM _adjudicador_aux where descripcion = _adjudicador);
		IF _counter=0 THEN
			INSERT INTO _adjudicador_aux (descripcion,longitud) values (_adjudicador,L_adjudicador);
			set _counter = last_insert_id();
			UPDATE _adjudicador_aux SET codigo = CONCAT(REPEAT('0',4 - LENGTH( CAST(_counter as CHAR(4) ))) ,_counter) where id=_counter;
			SELECT * FROM _adjudicador_aux WHERE id=_counter;
	   END IF;
	   SET code_adjudicador = (SELECT codigo FROM _adjudicador_aux where Descripcion = _adjudicador);
   END IF;
   
   IF LENGTH(_ambito_geografico)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _ambito_geografico_aux where descripcion = _ambito_geografico);
	   IF _counter=0 THEN
			INSERT INTO _ambito_geografico_aux (descripcion,longitud) values (_ambito_geografico,L_ambito_geografico);
			set _counter = last_insert_id();
			UPDATE _ambito_geografico_aux SET codigo = CONCAT(REPEAT('0',2 - LENGTH( CAST(_counter as CHAR(2) ))) ,_counter) where id=_counter;
			SELECT * FROM _ambito_geografico_aux WHERE id=_counter;
	   END IF;
	   SET code_geografico = (SELECT codigo FROM _ambito_geografico_aux where Descripcion = _ambito_geografico);
   END IF;
   
   IF LENGTH(_precio)>0 THEN
	   SET _counter= ( SELECT count(*) FROM _tabla_precio_contrato_aux where descripcion = _precio);
	   IF _counter=0 THEN
			INSERT INTO _tabla_precio_contrato_aux (descripcion,longitud) values (_precio,L_precio);
			set _counter = last_insert_id();
			UPDATE _tabla_precio_contrato_aux SET codigo = CONCAT(REPEAT('0',2 - LENGTH( CAST(_counter as CHAR(2) ))) ,_counter) where id=_counter;
			SELECT * FROM _tabla_precio_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_tabla_precio_contrato_aux = (SELECT codigo FROM _tabla_precio_contrato_aux where Descripcion = _precio);
	END IF;
	
   IF LENGTH(_Tipo_BOLETIN)>0 THEN 
	   SET _counter= ( SELECT count(*) FROM _tipo_contrato_aux where descripcion = _Tipo_BOLETIN);
	   IF _counter=0 THEN
			INSERT INTO _tipo_contrato_aux (descripcion,longitud) values (_tipo,L_tipo);
			set _counter = last_insert_id();
			UPDATE _tipo_contrato_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _tipo_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_tipo_contrato = (SELECT codigo FROM _tipo_contrato_aux where Descripcion = _Tipo_BOLETIN);
	END IF;
	
	IF LENGTH(_modalidad)>0 THEN 
	   SET _counter= ( SELECT count(*) FROM _tipo_modalidad_aux where descripcion = _modalidad);
	   IF _counter=0 THEN
			INSERT INTO _tipo_modalidad_aux (descripcion,longitud) values (_modalidad,L_modalidad);
			set _counter = last_insert_id();
			UPDATE _tipo_modalidad_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
			SELECT * FROM _tipo_contrato_aux WHERE id=_counter;
	   END IF;
	   SET code_modalidad_contrato = (SELECT codigo FROM _tipo_modalidad_aux where Descripcion = _modalidad);
	END IF;
        
	  IF LENGTH(_Tipo_TRAMITE)>0 THEN   
		  SET _counter= ( SELECT count(*) FROM _tipo_tramitacion_aux where descripcion = _Tipo_TRAMITE);
		   IF _counter=0 THEN
				INSERT INTO _tipo_tramitacion_aux (descripcion,longitud) values (_Tipo_TRAMITE,L_Tipo_TRAMITE);
				set _counter = last_insert_id();
				UPDATE _tipo_tramitacion_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_tramitacion_aux WHERE id=_counter;
		   END IF;
		   SET code_tramitacion_contrato = (SELECT codigo FROM _tipo_tramitacion_aux where Descripcion = _Tipo_TRAMITE);
		END IF;
        
		IF LENGTH(_procedimiento)>0 THEN  
		  SET _counter= ( SELECT count(*) FROM _tipo_procedimiento_aux where descripcion = _procedimiento);
		   IF _counter=0 THEN
				INSERT INTO _tipo_procedimiento_aux (descripcion,longitud) values (_procedimiento,L_procedimiento);
				set _counter = last_insert_id();
				UPDATE _tipo_procedimiento_aux SET codigo = CONCAT(REPEAT('0',3 - LENGTH( CAST(_counter as CHAR(3) ))) ,_counter) where id=_counter;
				SELECT * FROM _tipo_procedimiento_aux WHERE id=_counter;
		   END IF;
		   SET code_procedimiento_contrato = (SELECT codigo FROM _tipo_procedimiento_aux where Descripcion = _procedimiento);
		END IF;



    SET _Contador = 0;    
    while _Contador < _COUNT_CONTRATISTAS do
    
		SET _UTE = (SELECT LOCATE("UTE",_Lst_empresas));
        IF _UTE > 0 THEN
			SET _Empresa = (SELECT SPLIT_STR(_Lst_empresas, ';', _Contador+1));
        ELSE
			SET _Empresa = (SELECT _Lst_empresas);
        END IF;
        SET _Contador = _Contador + 1;
        
        SET _counter=( SELECT count(*) FROM boletin_contratos where BOLETIN = _BOLETIN AND Empresa = _Empresa);
		IF _counter = 0 THEN
			INSERT INTO boletin_contratos (
				Empresa, 
				BOLETIN,
				counter,
				importe) VALUES ( 
				_Empresa ,
				_BOLETIN, 
				_Contador,
				_importe); 
		END IF;

    END WHILE;
    
	SET _Contador = 0;    
	while _Contador < _COUNT_MATERIAS do	
		SET _Materia = (SELECT SPLIT_STR(_materias, ';', _Contador+1));
		INSERT INTO boletin_materias (BOLETIN,COD_Materia) VALUES(_BOLETIN,_Materia);
		SET _Contador = _Contador + 1;
	END WHILE;   
        
	SET _counter=( SELECT count(*) FROM strings where BOLETIN = _BOLETIN );
	IF _counter = 0 THEN
		INSERT INTO strings (BOLETIN, _keys, Importes) VALUES (_BOLETIN, _Empresa, _Importe)	; 
	END IF;


	UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type='BOE';

	SET _counter=( SELECT count(*) FROM boletin where BOLETIN = _BOLETIN ); 
	IF _counter = 0 THEN
			INSERT INTO boletin ( Type,
			SUMARIO, 
			BOLETIN, 
			Tipo_BOLETIN, 
			Tipo_TRAMITE,
			Tipo_ADJUDICADOR,
			COD_Ambito_Geografico,
			COD_Tabla_Precio, 
			Objeto_Contrato,
			dia,
			mes,
			anyo, 
			PDF, 
			TEXTO) VALUES ( 
			_Type,
			_SUMARIO, 
			_BOLETIN, 
			code_tipo_contrato, 
			code_tramitacion_contrato,
			code_adjudicador,
			code_geografico,
			code_tabla_precio_contrato_aux,
			_objeto,
			_Dia,
			_Mes,
			_Anyo, 
			_PDF, 
			_TEXTO)	;
            SELECT last_insert_id() as ID;
	END IF;        
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

-- Dump completed on 2017-11-09  9:53:38
