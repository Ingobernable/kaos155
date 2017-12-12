CREATE DATABASE  IF NOT EXISTS `bbdd_kaos155_text` /*!40100 DEFAULT CHARACTER SET utf8 */;
USE `bbdd_kaos155_text`;

DROP TABLE IF EXISTS `anyosread`;
DROP TABLE IF EXISTS `errores`;
DROP TABLE IF EXISTS `lastread`;
DROP TABLE IF EXISTS `sumarios`;



DROP FUNCTION IF EXISTS `SPLIT_STR`;
DROP PROCEDURE IF EXISTS `DropTextFromYear`;
DROP PROCEDURE IF EXISTS `GetNextTextParser`;
DROP PROCEDURE IF EXISTS `InsertAnyo`;
DROP PROCEDURE IF EXISTS `Insert_Text_BOLETIN`;
DROP PROCEDURE IF EXISTS `listBorme_prov`;

-- en version COSPEDAL no se hace scrap -> contrato. son fases distintas
-- PROCEDURE IF EXISTS `Insert_Text_BOLETIN_Contrato`;
