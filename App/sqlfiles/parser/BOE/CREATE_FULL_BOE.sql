CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_contratos` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bbdd_kaos155_contratos`;
-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: bbdd_kaos155_contratos
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
  `_BOLETIN` varchar(32) CHARACTER SET utf8 DEFAULT NULL,
  `_TRAMITE` varchar(25) DEFAULT NULL,
  `_FORMA` varchar(25) DEFAULT NULL,
  `_ADJUDICADOR` char(6) DEFAULT NULL,
  `UTE` tinyint(4) NOT NULL DEFAULT '0',
  `Lotes` int(11) DEFAULT '0',
  `Objeto_Contrato` text,
  `PDF` varchar(255) NOT NULL,
  `JSON` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `boletin` (`BOLETIN`)
) ENGINE=InnoDB AUTO_INCREMENT=462 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_adjudicador`
--

DROP TABLE IF EXISTS `boletin_adjudicador`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_adjudicador` (
  `_key` varchar(6) NOT NULL,
  `_area` varchar(25) DEFAULT NULL,
  `Nombre` varchar(255) DEFAULT NULL,
  `_l` int(11) DEFAULT NULL,
  PRIMARY KEY (`_key`)
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
  `_type` varchar(5) DEFAULT NULL,
  `BOLETIN` varchar(25) NOT NULL,
  `counter` int(11) NOT NULL DEFAULT '1',
  `_key` varchar(36) DEFAULT NULL,
  `Empresa` varchar(254) NOT NULL,
  `importe` decimal(13,2) DEFAULT '0.00',
  `_acron` varchar(55) DEFAULT NULL,
  `_nif` varchar(9) DEFAULT NULL,
  `_BormeSuggestEmpresa` varchar(254) DEFAULT NULL,
  `anyo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `Bol_UNIQUE` (`BOLETIN`,`counter`),
  KEY `BOLETIN` (`BOLETIN`),
  KEY `_key` (`_key`),
  FULLTEXT KEY `Empresa` (`Empresa`)
) ENGINE=InnoDB AUTO_INCREMENT=419 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `boletin_totales`
--

DROP TABLE IF EXISTS `boletin_totales`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `boletin_totales` (
  `_key` varchar(6) NOT NULL,
  `_type` varchar(5) NOT NULL,
  `Counter_2001` int(11) NOT NULL DEFAULT '0',
  `Importe_2001` decimal(13,2) NOT NULL DEFAULT '0.00',
  `Counter_2002` int(11) NOT NULL DEFAULT '0',
  `Importe_2002` decimal(13,2) NOT NULL DEFAULT '0.00',
  PRIMARY KEY (`_key`,`_type`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bbdd_kaos155_contratos'
--
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
CREATE DEFINER=`root`@`localhost` FUNCTION `UC_Words`( str VARCHAR(255) ) RETURNS  varchar(255) CHARSET utf8 DETERMINISTIC
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` FUNCTION `_codeaux`(
	
	_Type char(3),
	_Descripcion nvarchar(255),
    _extra nvarchar(255)
    
) RETURNS varchar(8) CHARSET utf8 DETERMINISTIC
BEGIN

	DECLARE _counter INT;
    DECLARE _IDReg nvarchar(6);
	DECLARE _Ret nvarchar(8);
    DECLARE _DESC nvarchar(255);
    
    SET _DESC = UC_Words(_Descripcion);
    
	IF LENGTH(_Descripcion)>0 THEN
    
        IF _Type = 'ADJ' THEN
			SET _counter= ( SELECT count(*) FROM boletin_adjudicador where  Nombre = _DESC );
			IF _counter=0 THEN
				SET _IDReg= (SELECT LPAD( (_key*1)+1,6,0) FROM boletin_adjudicador order by _key desc LIMIT 1 );
				IF _IDReg IS NULL THEN
					SET _IDReg = '000001';
                END IF;    
                INSERT INTO boletin_adjudicador (_key, _area, Nombre,_l) values ( _IDReg, _extra, _DESC, LENGTH(_DESC));
				SET _Ret = _IDReg;
			ELSE 
				SET _Ret = (SELECT _key FROM boletin_adjudicador where Nombre = _DESC );
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
CREATE DEFINER=`root`@`localhost` FUNCTION `_type`( Empresa int, Directivo int, Auditor int, Financiera int) RETURNS int(11) DETERMINISTIC
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
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
    
	IN _Tipo_TRAMITE nvarchar(25),
    IN _Tipo_FORMA nvarchar(25),
    IN _AREA nvarchar(25),
    
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

    /*DECLARE code_Tipo_BOLETIN nvarchar(22); */   
    DECLARE code_Tipo_adjudicador nvarchar(26);
    
    /* SET code_Tipo_BOLETIN = _codeaux('BOL',_Tipo_BOLETIN, ""); */
    SET code_Tipo_adjudicador = _codeaux('ADJ', _Tipo_adjudicador,_AREA);
 
	/*			PREPARAR CAMPOS SUMATORIOS ANUALES EN TABLA AUXILIAR                */ 
    SET @postFieldA = '_type';
	SET @postFieldB = 'Counter_2001';

	SET @FieldA = CONCAT('Counter_' ,_anyo);
	SET @FieldB = CONCAT('Importe_' ,_anyo);
	IF _anyo>2001 THEN
		SET @postFieldA = CONCAT('Importe_',_anyo - 1 );
		SET @postFieldB = @FieldA;
	END IF;
    
	set _counter = (SELECT count(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'bbdd_kaos155' AND TABLE_NAME = 'boletin_totales' and COLUMN_NAME LIKE CONCAT('%',_anyo));
	if _counter = 0 THEN
		SET @s= 'ALTER TABLE `bbdd_kaos155`.`boletin_totales`'; 
		SET @s= CONCAT(@s, ' ADD COLUMN ',@FieldA ,' INT NOT NULL DEFAULT 0 AFTER ' , @postFieldA ,',');
		SET @s= CONCAT(@s,' ADD COLUMN ', @FieldB ,' decimal(13,2) NOT NULL DEFAULT 0 AFTER ', @postFieldB);
		
		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;   
	END IF;
 
	/*
	set _counter = (SELECT count(*) FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'bbdd_kaos155' AND TABLE_NAME = 'boletin_counter' and COLUMN_NAME LIKE CONCAT('%',_anyo));
	if _counter = 0 THEN
		SET @s= 'ALTER TABLE `bbdd_kaos155`.`boletin_counter`'; 
		SET @s= CONCAT(@s, ' ADD COLUMN ',@FieldA ,' INT NOT NULL DEFAULT 0 AFTER ' , @postFieldA ,',');
		SET @s= CONCAT(@s,' ADD COLUMN ', @FieldB ,' decimal(13,2) NOT NULL DEFAULT 0 AFTER ', @postFieldB);
		
		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;    
	END IF;

 
 
	/*			ALTA DE MATERIAS DE BOLETIN                  
    
	SET _Contador = 0;    
	while _Contador < _counterMaterias do	
		INSERT IGNORE INTO boletin_materias (BOLETIN,COD_Materia) VALUES (_BOLETIN, (SELECT SPLIT_STR(_Materias, ';', _Contador+1)) );
		SET _Contador = _Contador + 1;
	END WHILE;
	
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
    _FORMA,
    
	_ADJUDICADOR,
    
     PDF,Objeto_Contrato,JSON) VALUES ( 
	_Type,
	_BOLETIN, 
	_UTE,
    _LOTES,
	_Dia,
	_Mes,
	_Anyo,
	
	_Tipo_BOLETIN, 
	_Tipo_TRAMITE,
	_Tipo_FORMA,

    
	code_Tipo_adjudicador,
    _PDF,_objeto,_JSON);
	
	SET _counter= last_insert_id() ;
	SELECT _counter as ID;
	

            

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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `Insert_Data_BOLETIN_Contrato`(_area nvarchar(25), _anyo int, _type nvarchar(5),_BOLETIN nvarchar(20), _keyEmpresa nvarchar(254), _Empresa text , _Importe nvarchar(14) , _key nvarchar(36), _acron nvarchar(55), _nif nvarchar(9), _counter int)
BEGIN

    DECLARE _suma decimal(13,2);
    

	SET @FieldA = CONCAT('Counter_' ,_anyo);
	SET @FieldB = CONCAT('Importe_' ,_anyo);
	IF _anyo>2001 THEN
		SET @postFieldA = CONCAT('Importe_',_anyo - 1 );
		SET @postFieldB = @FieldA;
	END IF;
     
	INSERT boletin_contratos (_type,BOLETIN,_BormeSuggestEmpresa,Empresa,importe,_key,_acron,_nif, counter, anyo) VALUES (_type,_BOLETIN,_keyEmpresa,_Empresa,_Importe,_key,_acron,_nif,_counter,_anyo);
    
    SELECT _key;
    
    if length(_key)>0 THEN
		/*if LENGTH(TRIM(_key))>0 THEN	
			INSERT ignore boletin_counter (_type,_key,Nombre ) values ( _type,_key, _Empresa );
	/*		INSERT ignore boletin_counter (_type,_key ) values ( _type,_area );					
			
			SET @p= CONCAT('UPDATE boletin_counter SET ', @FieldA ,'=' , @FieldA ,'+1,', @FieldB ,'=', @FieldB,'+', _Importe ,' WHERE _type="', _type , '" AND _key ="', _key ,'";');
			PREPARE stmt1 FROM @p;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1; 
			
	/*		SET @p= CONCAT('UPDATE boletin_counter SET ', @FieldA ,'=' , @FieldA ,'+1,', @FieldB ,'=', @FieldB,'+', _Importe ,' WHERE _type="', _type , '" AND _key ="', _area ,'";');
			PREPARE stmt1 FROM @p;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1; 	
            
		END IF;
		_key ="', @_ADJUDICADOR ,' AND Type="', _type, '" */
        
		set @_ADJUDICADOR =(SELECT _ADJUDICADOR FROM boletin WHERE BOLETIN = _BOLETIN);	
		SET @p= CONCAT('INSERT INTO boletin_totales (_key,_type,',@FieldA,',', @FieldB ,') VALUES ("', @_ADJUDICADOR, '","', _type ,'", 1 ,', _Importe, ') ON DUPLICATE KEY UPDATE ', @FieldA ,'=' , @FieldA ,'+1,', @FieldB ,'=', @FieldB,'+', _Importe ,';');
		
        SELECT @p;
        
        PREPARE stmt1 FROM @p;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;    
	END IF;
    
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `sum_KeyTotales` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`%` PROCEDURE `sum_KeyTotales`(_Key nvarchar(35),_LstTypes nvarchar(255))
BEGIN

  DECLARE v_type nVARCHAR(5);
        DECLARE v_name VARCHAR(120);
		DECLARE _fin INTEGER DEFAULT 0;
		DECLARE fields_cursor CURSOR FOR 
			SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = 'bbdd_kaos155_contratos' AND TABLE_NAME = 'boletin_totales' and COLUMN_NAME regexp CONCAT('[0-9]') ;

		DECLARE CONTINUE HANDLER FOR NOT FOUND SET _fin=1;


  SET @nTypes = length(_LstTypes)-length(replace(_LstTypes,',',''))+1;
  set @pType=1;

	
    
            

      



		  SET @c='';
		  SET @t='';
			SET @f='';
			SET @p='';
        
		OPEN fields_cursor;
		get_fields: LOOP
			FETCH fields_cursor INTO v_name;
				IF _fin = 1 THEN
					LEAVE get_fields;
				END IF;

		    -- SELECT v_name, substr(v_name,1,7);
			IF substr(v_name,1,7)='Counter' THEN
				SET @c= CONCAT(@c,IF(length(@c)>0,'+',''),v_name); -- CONCAT('UPDATE boletin_counter SET ', @FieldA ,'=' , @FieldA ,'+1,', @FieldB ,'=', @FieldB,'+', _Importe ,' WHERE _type="', _type , '" AND _key ="', _key ,'";');
			ELSE
				SET @t= CONCAT(@t,IF(length(@t)>0,'+',''),v_name);
			END IF;


		  END LOOP get_fields;
          if length(@c)+length(@t)>0 THEN 
            WHILE @pType <= @nTypes DO
				  SET v_type = (SELECT SPLIT_STR(_LstTypes,',',@pType));
				  
				  -- select @nTypes,v_type,_LstTypes,@pType;
				  SET @pType = @pType+1;
				  -- SELECT @c;
				  SET @cox= CONCAT(" (SELECT ", @c," FROM boletin_totales WHERE _key='",_key,"' AND _type='",v_type,"') as _COUNTER ");
				  SET @tox= CONCAT(" (SELECT ", @t," FROM boletin_totales WHERE _key='",_key,"' AND _type='",v_type,"') as _IMPORTE ");
				  -- SET @tox= CONCAT(' (SELECT ', @t,' FROM boletin_totales WHERE _key="',_key,'" AND _type="',v_type,'") as _IMPORTE ');
				  -- SET @t= CONCAT(' (SELECT ', @t,' FROM boletin_totales WHERE _key="',_key,'") as ',v_type,'_IMPORTE ');
				  -- SET @t= CONCAT(@t,' as ',v_type,'_IMPORTE');
				  SET @f= CONCAT( @f, IF(length(@f)>0,',',''), @cox, IF(length(@tox)>0,',',''), @tox);
				  
                  
				  SET @p= CONCAT('SELECT "',_key ,'" as _key,"', v_type ,'" as type', IF(length(@f)>0,',','') , @f );
				  -- SELECT @p,@f,@cox,@tox;
                  SET @f="";
		 
				 PREPARE stmt1 FROM @p;
				 EXECUTE stmt1;  
				 DEALLOCATE PREPARE stmt1; 				
			end while;

        
        end if;
        

     
	  -- SELECT @p;
     

    

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

-- Dump completed on 2019-03-09 19:57:50
