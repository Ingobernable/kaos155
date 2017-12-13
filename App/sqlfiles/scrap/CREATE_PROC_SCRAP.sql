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
/*!50003 DROP PROCEDURE IF EXISTS `DropTextFromYear` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `DropTextFromYear`(_from_year int,_to_year int,_type nvarchar(7))
BEGIN

DECLARE _counter int DEFAULT _from_year;
DECLARE _last int DEFAULT _to_year;
 
 if _last<_from_year THEN
	SET _last  = YEAR(CURDATE());
 END IF;
  if _last>YEAR(CURDATE()) THEN
	SET _last  = YEAR(CURDATE());
 END IF;
 
 my_loop: LOOP

		SET @vol = CONCAT(_type,"-",_counter);
		SET @s= CONCAT('DROP TABLE IF EXISTS `_', LOWER(_type) ,'_text_' , _counter ,'`;' );

		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;
        
		DELETE FROM sumarios where Type=_type AND Anyo=_counter;
		DELETE FROM lastread WHERE Type = _type AND Anyo=_counter;
		DELETE FROM errores  WHERE INSTR(BOLETIN,@vol) >0;
		DELETE FROM anyosread where Anyo=_counter;
        
        IF _counter>_last THEN
            LEAVE my_loop;
		else
			SET _counter = _counter + 1;
            SELECT _counter;
		END IF;
        
 END LOOP my_loop;
 
END ;;
DELIMITER ;
/*!50003 SET sql_mode              = @saved_sql_mode */ ;
/*!50003 SET character_set_client  = @saved_cs_client */ ;
/*!50003 SET character_set_results = @saved_cs_results */ ;
/*!50003 SET collation_connection  = @saved_col_connection */ ;
/*!50003 DROP PROCEDURE IF EXISTS `GetNextTextParser` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `GetNextTextParser`(_type nvarchar(5) , _anyo int)
BEGIN

		IF _type='BORME' THEN 
			SET @s= CONCAT( 'SELECT * FROM `_', LOWER(_type) ,'_text_' , _anyo ,'` WHERE ( `parser` = 0 ) ORDER BY `id` LIMIT 1;');
			PREPARE stmt1 FROM @s;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1;
		ELSE 
        	SET @s= CONCAT( 'SELECT * FROM `_', LOWER(_type) ,'_text_' , _anyo ,'` WHERE ( `parser` = 0 and LENGTH(_err)=0 ) ORDER BY `id` LIMIT 1;');
			PREPARE stmt1 FROM @s;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `InsertAnyo`(_type nvarchar(5), _anyo int)
BEGIN
	DECLARE _counter int;
    DECLARE _cmp nvarchar(255);
    DECLARE _kprovincia nvarchar(255) DEFAULT '';
    DECLARE _ki nvarchar(255) DEFAULT '';
    
    SET _counter = (SELECT Count(*) FROM anyosread WHERE Type=_type AND Anyo=_anyo );
    IF _counter=0 THEN
		IF _type='BOE' THEN
			SET _cmp = "`analisis` JSON,`importe` varchar(45) DEFAULT NULL, `_p` int(11) DEFAULT NULL , `parser` int DEFAULT 0,";
		END IF;
		IF _type='BORME' THEN
			SET _cmp = "`ID_BORME` int(11) DEFAULT '0', `provincia` varchar(55) DEFAULT NULL, `parser` int DEFAULT 0,";
            SET _ki = ',KEY `prov` (`provincia`),KEY `prov_mes` (`provincia`,`mes`) ';
        END IF;

		IF _type='BOCM' THEN
          
			SET _cmp = "`analisis` JSON, `_p` int(11) DEFAULT NULL, `parser` int DEFAULT 0,";
        END IF;

		SET @s= CONCAT('CREATE TABLE IF NOT EXISTS `_', LOWER(_type) ,'_text_' , _anyo ,'` ( `id` int(11) NOT NULL AUTO_INCREMENT, `dia` varchar(2) DEFAULT NULL, `mes` varchar(2) DEFAULT NULL,`BOLETIN` varchar(22) DEFAULT NULL,`texto` mediumtext,', _cmp ,' `_err` VARCHAR(25), PRIMARY KEY (`id`),KEY `parser` (`parser`)' , _ki ,') ENGINE=InnoDB AUTO_INCREMENT=0 DEFAULT CHARSET=utf8;');


		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;
    
		INSERT INTO anyosread (Type,Anyo) VALUES (_type,_anyo);
    END IF;
    SELECT scrap, parser,anyo FROM anyosread WHERE Type=_type AND Anyo=_anyo;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost`  PROCEDURE `Insert_Error_Boletin`(IN _Boletin nvarchar(2), IN _SqlMensaje mediumtext, IN _SqlError mediumtext)
BEGIN
	INSERT INTO errores (BOLETIN, SqlMensaje, SqlError) VALUES (_Boletin,_SqlMensaje,_SqlError);
    UPDATE sumarios SET scrap = 0, _error=1 WHERE BOLETIN = _Boletin;
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
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
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
			SET @s = CONCAT('INSERT INTO _', LOWER(_Type) ,'_text_', _Anyo , ' (_p,BOLETIN,dia,mes,TEXTO,analisis,importe,_err) VALUES (@CountLines,@BOLETIN,@Dia,@Mes, @TEXTO, @analisis,@importe,@err);'); 
			PREPARE stmt1 FROM @s;
			EXECUTE stmt1;  
			DEALLOCATE PREPARE stmt1;            
		END IF;
		
    END IF;
	IF _Type='BOCM' THEN
    
    	IF @counter=0 THEN
			SET @s = CONCAT('INSERT INTO _', LOWER(_Type) ,'_text_', _Anyo , ' (_p,BOLETIN,dia,mes,TEXTO,analisis,_err) VALUES (@CountLines,@BOLETIN,@Dia,@Mes, @TEXTO, @analisis,@err);'); 
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
				SET @s = CONCAT('INSERT INTO _', LOWER(_Type) ,'_text_', _Anyo , ' (BOLETIN,dia,mes,TEXTO,provincia,ID_Borme,_err) VALUES (@BOLETIN,@Dia,@Mes,@LINE,@analisis,@ID_Borme,@err);'); 
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
/*!50003 DROP PROCEDURE IF EXISTS `listBorme_prov` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'STRICT_TRANS_TABLES,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `listBorme_prov`(_anyo INT)
BEGIN
		DECLARE _TABLE nvarchar(55) DEFAULT CONCAT('`_borme_text_' , _anyo ,'`');
		SET @s= CONCAT( 'SELECT DISTINCT provincia as pr,mes as m,(SELECT count(*) FROM ' , _TABLE , ' WHERE pr=',_TABLE,'.provincia and m=', _TABLE,'.mes) as counter FROM ',_TABLE );

		PREPARE stmt1 FROM @s;
		EXECUTE stmt1;  
		DEALLOCATE PREPARE stmt1;
        
		
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

-- Dump completed on 2017-11-22  8:50:32
