FROM mysql:5.7
ENV MYSQL_DATABASE=bbdd_kaos155_text
ADD ./App/sqlfiles/CREATE_PROC_SCRAP.sql /docker-entrypoint-initdb.d/20_CREATE_PROC_SCRAP.sql
ADD ./App/sqlfiles/CREATE_FULL_SCRAP.sql /docker-entrypoint-initdb.d/10_CREATE_FULL_SCRAP.sql
