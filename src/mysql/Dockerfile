FROM mysql

ENV MYSQL_DATABASE sito_web
ENV MYSQL_ROOT_PASSWORD toor
ENV MYSQL_USER alex
ENV MYSQL_PASSWORD password
ENV MYSQL_ROOT_HOST=%
COPY ./sito_web.sql /docker-entrypoint-initdb.d/sito_web.sql
COPY my.cnf /etc/mysql/my.cnf
RUN /entrypoint.sh mysqld & sleep 30 
RUN rm /docker-entrypoint-initdb.d/sito_web.sql
