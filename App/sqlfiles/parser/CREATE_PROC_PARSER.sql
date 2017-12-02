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
            RETURN NULL;
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

	IN _Lst_empresas text,
	IN _Importe text,
    
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
/*!50003 DROP PROCEDURE IF EXISTS `Insert_Data_BORME_Auditor` */;
/*!50003 SET @saved_cs_client      = @@character_set_client */ ;
/*!50003 SET @saved_cs_results     = @@character_set_results */ ;
/*!50003 SET @saved_col_connection = @@collation_connection */ ;
/*!50003 SET character_set_client  = utf8 */ ;
/*!50003 SET character_set_results = utf8 */ ;
/*!50003 SET collation_connection  = utf8_general_ci */ ;
/*!50003 SET @saved_sql_mode       = @@sql_mode */ ;
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Auditor`(IN _Name  nvarchar(250), _iKey  nvarchar(15))
BEGIN
	DECLARE _counter int;
    
    SET _counter= (SELECT count(*) FROM borme_auditor WHERE _key = _iKey);
    IF _counter = 0 THEN
		BEGIN          
   			INSERT INTO borme_auditor (Name, _key) VALUES (_Name,_iKey);
        END;
	END IF;
    
    SELECT Id,Name,_key FROM borme_auditor WHERE _key = _iKey;
    
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Diario`(
	IN _BOLETIN nvarchar(20) ,
    IN _BOLETIN_ID int,
    IN _Dia INT,
    IN _Mes INT,
    IN _Anyo INT,
    IN _Provincia nvarchar(50),
    IN _Empresa_Id int,
    IN _Empresa_key char(7),
    IN _Relacion_Id int,
    IN _Relacion_key char(7),
    IN _T_Relacion INT,
    IN _Activo int,
    IN _type nvarchar(100), 
    IN _key nvarchar(100),
    IN _value text
    
)
BEGIN
	DECLARE _counter int;
    DECLARE _IdDiario INT;
		
    INSERT INTO borme_diario (BOLETIN,BOLETIN_Id,Dia,Mes,Anyo,Provincia,Empresa_key, Relation_key,T_Relation,Type,_key,_value) 
            VALUES ( _BOLETIN,_BOLETIN_ID,_Dia,_Mes,_Anyo,_Provincia,_Empresa_key,_Relacion_key,_T_Relacion,_type,_key,_value);
	SET _IdDiario = (SELECT last_insert_id() as Id );
            
	IF _Empresa_Id>0 AND _Relacion_Id>0 THEN
		SET _counter = (SELECT count(*) FROM borme_relaciones WHERE Diario_Id= _IdDiario);
		IF _counter=0 THEN
			INSERT INTO borme_relaciones (Diario_Id,Empresa_key,Type,Relation_key,Motivo,Cargo,Activo,Anyo)
								  VALUES (_IdDiario,_Empresa_key,_T_Relacion,_Relacion_key,_type,_key,_Activo,_Anyo); 
            IF _T_Relacion = 0 then
				UPDATE borme_empresa SET ERelations=ERelations+1 , TRelations = TRelations + 1 WHERE id = _Relacion_Id;
            ELSE 
				IF _T_Relacion = 1 then
					UPDATE borme_directivo SET TRelations = TRelations + 1 WHERE id = _Relacion_Id;
                ELSE
					UPDATE borme_auditor SET TRelations = TRelations + 1 WHERE id = _Relacion_Id;
                END IF;
            END IF;

        END IF;
        
        IF _T_Relacion = 0 then
			UPDATE borme_empresa SET ERelations=ERelations + 1 , TRelations = TRelations + 1 WHERE id = _Empresa_Id;
		else
			IF _T_Relacion = 1 then
				UPDATE borme_empresa SET DRelations=DRelations + 1 ,TRelations = TRelations + 1 WHERE id = _Empresa_Id;
			ELSE
				UPDATE borme_empresa SET ARelations=ARelations + 1 ,TRelations = TRelations + 1 WHERE id = _Empresa_Id;
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Directivo`(IN _Name  nvarchar(250) , IN _ikey  nvarchar(7))
BEGIN
	DECLARE _counter int;
    
    SET _counter=(SELECT count(*) FROM borme_directivo where _key = _ikey);
    IF _counter = 0 THEN
		BEGIN
			INSERT INTO borme_directivo  ( Name, _key) VALUES (_Name, _ikey);
        END;
	END IF;
	SELECT Id , Name, _key FROM borme_directivo WHERE _key = _ikey;
    
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
/*!50003 SET sql_mode              = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_AUTO_CREATE_USER,NO_ENGINE_SUBSTITUTION' */ ;
DELIMITER ;;
CREATE DEFINER=`root`@`localhost` PROCEDURE `Insert_Data_BORME_Empresa`(IN _Name  nvarchar(250), _iKey  nvarchar(15))
BEGIN
	DECLARE _counter int;
    
    SET _counter= (SELECT count(*) FROM borme_empresa WHERE _key = _iKey);
    IF _counter = 0 THEN
		BEGIN          
   			INSERT INTO borme_empresa (Name, _key) VALUES (_Name,_iKey);
        END;
	END IF;
    
    SELECT Id,Name,_key FROM borme_empresa WHERE _key = _iKey;
    
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

-- Dump completed on 2017-12-02  0:27:39
