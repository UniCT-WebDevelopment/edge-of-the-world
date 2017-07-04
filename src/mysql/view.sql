create view NUMERO_UTILIZZO_MODULO as
select MODULO.ID, MODULO.NOME, count(*) as NUMERO_UTILIZZO
    from MODULO join COMPONENTE 
    on(MODULO.ID=COMPONENTE.ID_MODULO)
    group by MODULO.ID;

    
create view NUMERO_UTILIZZO_LAYOUT as
    select LAYOUT.ID, count(*) as NUMERO_UTILIZZO
    from LAYOUT join COMPONENTE 
    on(LAYOUT.ID=COMPONENTE.ID_LAYOUT)
    group by LAYOUT.ID;

    
    
create view NUMERO_VISITE_PER_SITO as
    select SITO_WEB.CODICE, SITO_WEB.URL, count(*) as NUMERO_VISITE_PER_SITO
    from SITO_WEB join VISITA
    on(SITO_WEB.CODICE=VISITA.SITO)
    group by SITO_WEB.CODICE;


insert into VISITATORE (IP, DATA) values ("107.89.105.68", "2015-02-08");

insert into VISITATORE (IP, DATA) values ("95.178.248.1", "2016-10-02");

insert into VISITATORE (IP, DATA) values ("157.132.68.12", "2016-08-04");

insert into VISITATORE (IP, DATA) values ("67.10.189.65", "2017-04-03");

insert into VISITATORE (IP, DATA) values ("110.68.79.34", "2015-02-08");

insert into VISITATORE (IP, DATA) values ("102.4.132.5", "2014-10-02");

insert into VISITATORE (IP, DATA) values ("55.132.56.78", "2016-02-15");

insert into VISITATORE (IP, DATA) values ("123.67.3.4", "2014-02-04");

insert into VISITATORE (IP, DATA) values ("102.4.10.32", "2016-01-01");

insert into VISITATORE (IP, DATA) values ("131.54.123.33", "2017-02-04");

insert into VISITATORE (IP, DATA) values ("134.55.67.123", "2017-06-20");

insert into VISITATORE (IP, DATA) values ("67.89.123.2", "2017-06-30");

insert into VISITATORE (IP, DATA) values ("115.21.32.123", "2017-06-29");


insert into VISITA (IP, DATA, SITO) values ("107.89.105.68", "2015-02-08", 6);

insert into VISITA (IP, DATA, SITO) values ("95.178.248.1", "2016-10-02", 6);

insert into VISITA (IP, DATA, SITO) values ("157.132.68.12", "2016-08-04", 6);

insert into VISITA (IP, DATA, SITO) values ("67.10.189.65", "2017-04-03", 6);

insert into VISITA (IP, DATA, SITO) values ("110.68.79.34", "2015-02-08", 6);

insert into VISITA (IP, DATA, SITO) values ("102.4.132.5", "2014-10-02", 9);

insert into VISITA (IP, DATA, SITO) values ("55.132.56.78", "2016-02-15", 9);

insert into VISITA (IP, DATA, SITO) values ("123.67.3.4", "2014-02-04", 10);

insert into VISITA (IP, DATA, SITO) values ("102.4.10.32", "2016-01-01", 10);

insert into VISITA (IP, DATA, SITO) values ("131.54.123.33", "2017-02-04", 10);

insert into VISITA (IP, DATA , SITO) values ("134.55.67.123", "2017-06-20", 6);

insert into VISITA (IP, DATA ,SITO) values ("67.89.123.2", "2017-06-30", 10);

insert into VISITA (IP, DATA,SITO) values ("115.21.32.123", "2017-06-29", 9);
