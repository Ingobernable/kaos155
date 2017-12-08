FROM node
RUN mkdir -p /src \
  && cd /opt \
  && wget http://www.xpdfreader.com/dl/xpdf-tools-linux-4.00.tar.gz \
  && tar xfvz xpdf-tools-linux-4.00.tar.gz \
  && cd xpdf-tools-linux-4.00 \
  && cp -pRv bin64/* /usr/local/bin/ \
  && mkdir -p /usr/local/man/man1 /usr/local/man/man5 \
  && cp -pRv doc/*.1 /usr/local/man/man1/ \
  && cp -pRv doc/*.5 /usr/local/man/man5/ \
  && cd .. \
  && rm -r xpdf-tools-linux-4.00.tar.gz xpdf-tools-linux-4.00

ENV KAOS_COMMIT="master"

RUN git clone -b ${KAOS_COMMIT} https://github.com/Ingobernable/kaos155 /src
WORKDIR /src/App
RUN npm install

ENV KAOS_MYSQL_SCRAP_PASS="password" \
    KAOS_MYSQL_SCRAP_USER="kaos" \
    KAOS_MYSQL_SCRAP_HOST="kaos_db" \
    KAOS_MYSQL_SCRAP_DB="bbdd_kaos155_text"


CMD node app.js SCRAP BOE 2011
