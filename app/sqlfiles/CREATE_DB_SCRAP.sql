-- MySQL dump 10.13  Distrib 5.7.17, for Win64 (x86_64)
--
-- Host: localhost    Database: bbdd_kaos155_text
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
-- Table structure for table `anyosread`
--

DROP TABLE IF EXISTS `anyosread`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `anyosread` (
  `Type` varchar(5) NOT NULL,
  `Anyo` int(11) NOT NULL,
  `scrap` tinyint(4) DEFAULT '0',
  `parser` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`Type`,`Anyo`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
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
  `SUMARIO_NEXT` varchar(16) CHARACTER SET utf8 DEFAULT NULL,
  `ID_LAST` varchar(145) DEFAULT NULL,
  `Read_Complete` bit(1) DEFAULT b'0',
  UNIQUE KEY `_id_UNIQUE` (`_id`)
) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Table structure for table `sumarios`
--

DROP TABLE IF EXISTS `sumarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sumarios` (
  `_counter` int(11) DEFAULT NULL,
  `Type` varchar(6) CHARACTER SET utf8 DEFAULT NULL,
  `Anyo` varchar(4) NOT NULL,
  `SUMARIO` varchar(16) CHARACTER SET utf8 NOT NULL,
  `BOLETIN` varchar(20) CHARACTER SET utf8 NOT NULL,
  `Contrato` tinyint(4) DEFAULT '0',
  `parser` tinyint(4) DEFAULT '0',
  `scrap` tinyint(4) DEFAULT '0',
  PRIMARY KEY (`BOLETIN`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping routines for database 'bbdd_kaos155_text'
--
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
/*!50003 DROP PROCEDURE IF EXISTS `GetNextTextParser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNextTextParser`(_type nvarchar(5) )
BEGIN
	IF _type='BOE' THEN
		SELECT 
			`_boe_text`.`id` AS `id`,
			`_boe_text`.`BOLETIN` AS `BOLETIN`,
			`_boe_text`.`texto` AS `texto`,
			`_boe_text`.`analisis` AS `analisis`
		FROM
			(`sumarios`
			JOIN `_boe_text` ON ((`sumarios`.`BOLETIN` = `_boe_text`.`BOLETIN`)))
		WHERE
			(`sumarios`.`parser` = 0 )
		ORDER BY `_boe_text`.`id` LIMIT 1;
    END IF;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `InsertAnyo` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertAnyo`(_type nvarchar(5), _anyo int)
BEGIN
	DECLARE _counter int;
    DECLARE _cmp nvarchar(255);
    
    SET _counter = (SELECT Count(*) FROM anyosread WHERE Type=_type AND Anyo=_anyo );
    IF _counter=0 THEN
		IF _type='BOE' THEN
			SET _cmp = "`analisis` mediumtext,`importe` varchar(45) DEFAULT NULL, `_p` int(11) DEFAULT NULL,";
		END IF;

		IF _type='BORME' THEN
			SET _cmp = "`ID_BORME` int(11) DEFAULT '0', `provincia` varchar(55) DEFAULT NULL,";
        END IF;

		IF _type='BOCM' THEN
          
			SET _cmp = "`analisis` mediumtext, `_p` int(11) DEFAULT NULL,";
        END IF;

		SET @s= CONCAT('CREATE TABLE IF NOT EXISTS `_', LOWER(_type) ,'_text_' , _anyo ,'` ( `id` int(11) NOT NULL AUTO_INCREMENT, `dia` varchar(2) DEFAULT NULL, `mes` varchar(2) DEFAULT NULL, `anyo` varchar(4) DEFAULT NULL,`BOLETIN` varchar(22) DEFAULT NULL,`texto` mediumtext,', _cmp ,' `_err` VARCHAR(25), PRIMARY KEY (`id`) ) ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;');

		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;
    
		INSERT INTO anyosread (Type,Anyo) VALUES (_type,_anyo);
    END IF;
    SELECT scrap, parser FROM anyosread WHERE Type=_type AND Anyo=_anyo;
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Text_BOLETIN` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'NO_AUTO_VALUE_ON_ZERO' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Text_BOLETIN`(

	IN _COUNT_LINES INT,
    IN _Type nvarchar(6),
    IN _Dia CHAR(2),
    IN _Mes CHAR(2),
    IN _Anyo CHAR(4),
	IN _BOLETIN nvarchar(22),
    
	IN _TEXTO MEDIUMTEXT,
	IN _analisis MEDIUMTEXT,
    IN _importe MEDIUMTEXT,
	IN _error nvarchar(55)
)
BEGIN
	DECLARE _counter INT;
    DECLARE _LINE nvarchar(1024);
    DECLARE _ID_Borme int;
    
    SET @CountLines = _COUNT_LINES;
    SET @Type = _Type;
    SET @Dia = _Dia;
    SET @Mes = _Mes;
    SET @Anyo = _Anyo;
    
    SET @BOLETIN = _BOLETIN ;
    
	SET @TEXTO = _TEXTO;
	SET @analisis = _analisis;
    SET @importe = _importe; 
    SET @err = _error;
    
    SET @s = CONCAT("SET @counter= ( SELECT count(*) FROM _", LOWER(_Type) ,"_text_",_Anyo ," WHERE BOLETIN ='", _BOLETIN ,"' );");
    PREPARE stmt1 FROM @s;
	EXECUTE stmt1;  
	DEALLOCATE PREPARE stmt1;
    
	IF _Type='BOE' THEN
		IF _COUNT_LINES=0 THEN
			INSERT INTO errores (BOLETIN,SqlError) VALUES(_BOLETIN,'CONTENIDO NO STANDART');
		END IF;
		IF @counter=0 THEN
			SET @s = CONCAT('INSERT INTO _', LOWER(_Type) ,'_text_', _Anyo , ' (_p,BOLETIN,dia,mes,anyo,TEXTO,analisis,importe,_err) VALUES (@CountLines,@BOLETIN,@Dia,@Mes,@Anyo, @TEXTO, @analisis,@importe,@err);'); 
			PREPARE stmt1 FROM @s;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1;            
		END IF;
		
    END IF;
	IF _Type='BOCM' THEN
    
    	IF @counter=0 THEN
			SET @s = CONCAT('INSERT INTO _', LOWER(_Type) ,'_text_', _Anyo , ' (BOLETIN,dia,mes,anyo,TEXTO,analisis,_err) VALUES (@BOLETIN,@Dia,@Mes,@Anyo, @TEXTO, @analisis,@err);'); 
			PREPARE stmt1 FROM @s;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1;            
		END IF;
    
    END IF;
    
    IF _Type='BORME' THEN
        SET _counter = 0;    
		while _counter < _COUNT_LINES do
			SET @LINE = (SELECT SPLIT_STR( _TEXTO, '#', _counter+1));
            SET @ID_Borme= (SELECT SPLIT_STR( _importe, '#', _counter+1) * 1 );

			IF @counter=0 THEN
				SET @s = CONCAT('INSERT INTO _', LOWER(_Type) ,'_text_', _Anyo , ' (BOLETIN,dia,mes,anyo,TEXTO,provincia,ID_Borme,_err) VALUES (@BOLETIN,@Dia,@Mes,@Anyo,@LINE,@analisis,@ID_Borme,@err);'); 
				PREPARE stmt1 FROM @s;
				EXECUTE stmt1;  
				DEALLOCATE PREPARE stmt1;            
			END IF; 
			SET _counter = _counter+ 1;
		 END WHILE;

    END IF;
    SELECT last_insert_id() as ID;
    UPDATE sumarios SET Contrato=1, scrap=1 WHERE BOLETIN=_BOLETIN;
    UPDATE lastread SET ID_LAST = _BOLETIN WHERE Type= _Type AND Anyo=_Anyo;
    
    
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

-- Dump completed on 2017-11-18 14:25:11
