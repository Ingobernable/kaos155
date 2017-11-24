Estructura de las bases de datos

DB de almacenamiento de Textos
detalles correspondientes : https://github.com/Ingobernable/kaos155/blob/master/app/sqlfiles/CREATE_DB_SCRAP.sql
tablas donde almacenamos datos generales del parseo
```
# mysql> SHOW TABLES FROM bbdd_kaos155_text WHERE Tables_in_bbdd_kaos155_text NOT ' at line 1
# mysql> +-----------------------------+
#     -> | Tables_in_bbdd_kaos155_text |
#     -> +-----------------------------+
#     -> | anyosread                   |
#     -> | errores                     |
#     -> | lastread                    |
#     -> | sumarios                    |
#     -> +-----------------------------+
#     -> 4 rows in set (0.00 sec)
```
estas tablas se iran creando a medida que vamos SCRAPEANDO años y contienen los TEXTOS en bruto de los boletines
```
# mysql> SHOW TABLES FROM bbdd_kaos155_text WHERE Tables_in_bbdd_kaos155_text REGEXP  '_';                                                                        +-----------------------------+
# | Tables_in_bbdd_kaos155_text |
# +-----------------------------+
# | _bocm_text_2010             |
# | _bocm_text_2011             |
# | _bocm_text_2012             |
# | _bocm_text_2013             |
# | _bocm_text_2014             |
# | _bocm_text_2015             |
# | _bocm_text_2017             |
# | _boe_text_2001              |
# | _boe_text_2002              |
# | _boe_text_2003              |
# | _boe_text_2004              |
# | _boe_text_2006              |
# | _boe_text_2007              |
# | _boe_text_2008              |
# | _boe_text_2009              |
# | _boe_text_2010              |
# | _boe_text_2011              |
# | _boe_text_2012              |
# | _boe_text_2013              |
# | _boe_text_2014              |
# | _boe_text_2015              |
# | _boe_text_2016              |
# | _boe_text_2017              |
# | _borme_text_2009            |
# | _borme_text_2010            |
# | _borme_text_2011            |
# | _borme_text_2012            |
# | _borme_text_2013            |
# | _borme_text_2014            |
# | _borme_text_2015            |
# | _borme_text_2016            |
# | _borme_text_2017            |
# +-----------------------------+
# 32 rows in set (0.00 sec)
```
tabla donde se guardan los años ESCRAPEADOS
```
# mysql> use bbdd_kaos155_text
# Database changed
# mysql> SHOW COLUMNS FROM anyosread;
# +--------+------------+------+-----+---------+-------+
# | Field  | Type       | Null | Key | Default | Extra |
# +--------+------------+------+-----+---------+-------+
# | Type   | varchar(5) | NO   | PRI | NULL    |       |
# | Anyo   | int(11)    | NO   | PRI | NULL    |       |
# | scrap  | tinyint(4) | YES  |     | 0       |       |
# | parser | tinyint(4) | YES  |     | 0       |       |
# +--------+------------+------+-----+---------+-------+
# 4 rows in set (0.00 sec)
```
tabla donde se guardan los SUMARIOS y BOLETINES, asi como los cheks de control
```
# mysql> SHOW COLUMNS FROM sumarios;
# +----------+-------------+------+-----+---------+-------+
# | Field    | Type        | Null | Key | Default | Extra |
# +----------+-------------+------+-----+---------+-------+
# | _counter | int(11)     | YES  |     | NULL    |       |
# | Type     | varchar(6)  | YES  | MUL | NULL    |       |
# | Anyo     | varchar(4)  | NO   |     | NULL    |       |
# | SUMARIO  | varchar(16) | NO   |     | NULL    |       |
# | BOLETIN  | varchar(20) | NO   | PRI | NULL    |       |
# | Contrato | tinyint(4)  | YES  |     | 0       |       |
# | parser   | tinyint(4)  | YES  |     | 0       |       |
# | scrap    | tinyint(4)  | YES  |     | 0       |       |
# +----------+-------------+------+-----+---------+-------+
# 8 rows in set (0.00 sec)
```
tabla con el último SCRAP realizado
```
# mysql> SHOW COLUMNS FROM lastread;
# +---------------+--------------+------+-----+---------+----------------+
# | Field         | Type         | Null | Key | Default | Extra          |
# +---------------+--------------+------+-----+---------+----------------+
# | _id           | int(11)      | NO   | PRI | NULL    | auto_increment |
# | Type          | varchar(6)   | NO   |     | NULL    |                |
# | Anyo          | varchar(4)   | NO   |     | NULL    |                |
# | SUMARIO_LAST  | varchar(16)  | YES  |     | NULL    |                |
# | SUMARIO_NEXT  | varchar(16)  | YES  |     | NULL    |                |
# | ID_LAST       | varchar(145) | YES  |     | NULL    |                |
# | Read_Complete | bit(1)       | YES  |     | b'0'    |                |
# +---------------+--------------+------+-----+---------+----------------+
# 7 rows in set (0.00 sec)
```
tabla para capturar errores
```
# mysql> SHOW COLUMNS FROM errores;
# +------------+-------------+------+-----+---------+-------+
# | Field      | Type        | Null | Key | Default | Extra |
# +------------+-------------+------+-----+---------+-------+
# | BOLETIN    | varchar(20) | NO   | PRI | NULL    |       |
# | SqlMensaje | text        | YES  |     | NULL    |       |
# | SqlError   | text        | YES  |     | NULL    |       |
# +------------+-------------+------+-----+---------+-------+
# 3 rows in set (0.00 sec)
```
para ayudar a la db se han creado unos procedimientos almacenados
```
# mysql> SHOW PROCEDURE STATUS
#     -> WHERE Db = DATABASE() AND Type = 'PROCEDURE';
# +-------------------+---------------------+-----------+----------------+---------------------+---------------------+---------------+---------+----------------------+----------------------+--------------------+
# | Db                | Name                | Type      | Definer        | Modified            | Created             | Security_type | Comment | character_set_client | collation_connection | Database Collation |
# +-------------------+---------------------+-----------+----------------+---------------------+---------------------+---------------+---------+----------------------+----------------------+--------------------+
# | bbdd_kaos155_text | DropTextFromYear    | PROCEDURE | root@localhost | 2017-11-23 02:31:50 | 2017-11-23 02:31:50 | DEFINER       |         | utf8                 | utf8_general_ci      | utf8_general_ci    |
# | bbdd_kaos155_text | GetNextTextParser   | PROCEDURE | root@localhost | 2017-11-23 16:11:44 | 2017-11-23 16:11:44 | DEFINER       |         | utf8                 | utf8_general_ci      | utf8_general_ci    |
# | bbdd_kaos155_text | InsertAnyo          | PROCEDURE | root@localhost | 2017-11-23 15:38:13 | 2017-11-23 15:38:13 | DEFINER       |         | utf8                 | utf8_general_ci      | utf8_general_ci    |
# | bbdd_kaos155_text | Insert_Text_BOLETIN | PROCEDURE | root@localhost | 2017-11-23 02:31:55 | 2017-11-23 02:31:55 | DEFINER       |         | utf8                 | utf8_general_ci      | utf8_general_ci    |
# | bbdd_kaos155_text | listBorme_prov      | PROCEDURE | root@localhost | 2017-11-23 02:31:57 | 2017-11-23 02:31:57 | DEFINER       |         | utf8                 | utf8_general_ci      | utf8_general_ci    |
# +-------------------+---------------------+-----------+----------------+---------------------+---------------------+---------------+---------+----------------------+----------------------+--------------------+
# 5 rows in set (0.00 sec)
```
para ayudar a la db se han creado unos procedimientos almacenados

DropTextFromYear   : borrar los datos de años especificos
GetNextTextParser  : obtener el siguiente elemento a PARSEAR
InsertAnyo	       : inserta un nuevo año y crea la tabla correspondiente
Insert_Text_BOLETIN: rutina única para escojer textos
listBorme_prov	   : listado con la cuenta de elementos del BORME (movimientos de empresas) por provincia y año
```
tambien tenemos una funcion
```
# mysql SHOW FUNCTION STATUS  WHERE Db = DATABASE() AND Type = 'FUNCTION';
# mysql+-------------------+-----------+----------+----------------+---------------------+---------------------+---------------+---------+----------------------+----------------------+--------------------+
# mysql| Db                | Name      | Type     | Definer        | Modified            | Created             | Security_type | Comment | character_set_client | collation_connection | Database Collation |
# mysql+-------------------+-----------+----------+----------------+---------------------+---------------------+---------------+---------+----------------------+----------------------+--------------------+
# mysql| bbdd_kaos155_text | SPLIT_STR | FUNCTION | root@localhost | 2017-11-23 02:31:49 | 2017-11-23 02:31:49 | DEFINER       |         | utf8                 | utf8_general_ci      | utf8_general_ci    |
# mysql+-------------------+-----------+----------+----------------+---------------------+---------------------+---------------+---------+----------------------+----------------------+--------------------+
# mysql1 row in set (0.00 sec)
```
SPLIT_STR : permite extraer de una cadena un elemento de una lista con los elementos separados por un caracter determinado 

