create table CLIENTE(
	CODICE INTEGER auto_increment PRIMARY KEY,
	CODICE_FISCALE varchar (20) UNIQUE,
	CITTA VARCHAR(20),
	INDIRIZZO VARCHAR(30),
	TELEFONO VARCHAR(10),
	N_SITI INTEGER default 0,
	SPESA_TOTALE INTEGER default 0
)Engine='InnoDB';


create table SVILUPPATORE(
	PIVA VARCHAR(10) PRIMARY KEY,
    NOME VARCHAR(15),
    COGNOME VARCHAR(15),
    TELEFONO VARCHAR(15)
)Engine='InnoDB';

create table LAYOUT(
	ID INTEGER auto_increment PRIMARY KEY,
    COSTO_TOTALE INTEGER default 0,
    SVILUPPATORE VARCHAR(10),
    INDEX new_sviluppatore(SVILUPPATORE),
    FOREIGN KEY (SVILUPPATORE) REFERENCES SVILUPPATORE(PIVA)
)Engine='InnoDB';


create table SITO_WEB(
	CODICE INTEGER AUTO_INCREMENT PRIMARY KEY,
    URL VARCHAR(50),
    DATA_PUBBLICAZIONE date,
    CLIENTE INTEGER,
    LAYOUT INTEGER,
    INDEX new_cliente(CLIENTE),
    INDEX new_layout(LAYOUT),
    FOREIGN KEY (CLIENTE) REFERENCES CLIENTE(CODICE),
    FOREIGN KEY (LAYOUT) REFERENCES LAYOUT(ID)
)Engine='InnoDB';


create table VISITATORE(
	IP VARCHAR(15),
    DATA DATE,
    PRIMARY KEY (IP,DATA) 
)Engine='InnoDB';

create table VISITA(
	IP VARCHAR(15),
    DATA DATE,
    SITO INTEGER,
    INDEX new_sito1(SITO),
	INDEX new_visitatore(IP,data),
    FOREIGN KEY (SITO) REFERENCES SITO_WEB(CODICE),
    FOREIGN KEY (IP,DATA) REFERENCES VISITATORE(IP,DATA),
    PRIMARY KEY(IP,DATA,SITO)
)Engine='InnoDB';

create table MODULO(
	ID INTEGER auto_increment PRIMARY KEY,
    NOME VARCHAR(20),
    FUNZIONE VARCHAR(100),
    COSTO INTEGER
)Engine='InnoDB';


create table COMPONENTE(
	ID_LAYOUT INTEGER,
    ID_MODULO INTEGER,
    INDEX new_id_layout (ID_LAYOUT),
    INDEX new_id_modulo (ID_MODULO),
    FOREIGN KEY (ID_LAYOUT) REFERENCES LAYOUT(ID),
    FOREIGN KEY (ID_MODULO) REFERENCES MODULO(ID),
    PRIMARY KEY(ID_LAYOUT,ID_MODULO)
)Engine='InnoDB';


create table UTENTE(
    ID_UTENTE INTEGER AUTO_INCREMENT PRIMARY KEY,
    USERNAME varchar(100),
    PASSWORD varchar(128),
    NOME varchar(20),
    COGNOME varchar(20),
    TYPE varchar(20)
)Engine='InnoDB';
    
    
delimiter //
create trigger add_componente
after insert
on COMPONENTE
for each row
begin
    update LAYOUT
    set COSTO_TOTALE=COSTO_TOTALE + (select COSTO from MODULO where MODULO.ID=NEW.ID_MODULO)
    where ID=NEW.ID_LAYOUT;
end //

delimiter //

create trigger delete_componente
after delete
on COMPONENTE
for each row
begin
    update LAYOUT
    set COSTO_TOTALE=COSTO_TOTALE - (select COSTO from MODULO where MODULO.ID=OLD.ID_MODULO)
    where ID=OLD.ID_LAYOUT;
end //

delimiter //
create trigger add_sito
after insert
on SITO_WEB
for each row
begin
    update CLIENTE
    set N_SITI=N_SITI+1, SPESA_TOTALE= SPESA_TOTALE + (SELECT COSTO_TOTALE from LAYOUT WHERE ID=NEW.LAYOUT)
    where CODICE=NEW.CLIENTE;
end //

delimiter //
create trigger remove_sito
after delete
on SITO_WEB
for each row
begin
    update CLIENTE
    set N_SITI=N_SITI-1, SPESA_TOTALE= SPESA_TOTALE - (SELECT COSTO_TOTALE from LAYOUT WHERE ID=OLD.LAYOUT)
    where CODICE=OLD.CLIENTE;
end //

delimiter ;

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
    
    
    
    
    
    
    
    
    
    


insert into UTENTE (USERNAME, PASSWORD, NOME, COGNOME, TYPE) values ("alex", "83d97b71499bee6b9d42dee9d3a6e5d00ecc8c891346d25d1909b3aac9abaa0ad4864fe4eacf159cd3f4a0ad764178d014ac378dfffc5e4023f6dbcfb0992648", "Alex", "Pitrolo", "admin");

insert into UTENTE (USERNAME, PASSWORD, NOME, COGNOME, TYPE) values ("giovanni", "83833733fa80970ed63971615324b93fdc2161a339f727eb6c8b59cb173c932e253479cebfdcd063af50f9a7e95515fe8846252278e24c11b67de3ff6a5ea880", "Giovanni", "Storti", "developer");

insert into UTENTE (USERNAME, PASSWORD, NOME, COGNOME, TYPE) values ("flavio", "130fd4b2b4e99a66f00a277c40c9997694d8d366800441015297f73a61c4292564232edacce6d78aa98532055557077781480f501752b070a823c485a68104b9", "Flavio", "Romano", "cliente");


insert into CLIENTE (CODICE_FISCALE, CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("SCLFPP74L08L219T","Torino","Via Monteleone 99","3669382463",0,0);

insert into CLIENTE (CODICE_FISCALE,CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("DVIDNS64S02H501O","Acate","Via Duca degli Abruzzi 99","3669382463",0,0);

insert into CLIENTE (CODICE_FISCALE,CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("RMNFLV76D19D612Q","Bologna","Via Fasulla 666","3328965471",0,0);

insert into CLIENTE (CODICE_FISCALE,CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("ZTINLN68H20D969D","Roma","Via Genova 47","3946729551",0,0);


insert into SVILUPPATORE(PIVA, NOME, COGNOME, TELEFONO) values ("1234567890", "Giuseppe", "Bella", "3345678911");

insert into SVILUPPATORE(PIVA, NOME, COGNOME, TELEFONO) values ("1234567891", "Angelo", "Cassano", "3382751678");

insert into SVILUPPATORE(PIVA, NOME, COGNOME, TELEFONO) values ("1234567892", "Marco", "Loggia", "3314567999");


insert into LAYOUT (COSTO_TOTALE, SVILUPPATORE) values (0, 1234567890);

insert into LAYOUT (COSTO_TOTALE, SVILUPPATORE) values (0, 1234567891);

insert into LAYOUT (COSTO_TOTALE, SVILUPPATORE) values (0, 1234567891);


insert into MODULO (NOME, FUNZIONE, COSTO) values ("Scroll bar", "Semplice scrollbar", 10);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Carrello", "Modulo Carrello", 15);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Log in", "Modulo di Login", 7);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Register form", "Modulo di registrazione", 14);


insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (1,1);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (1,2);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (1,4);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (2,1);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (2,2);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (2,3);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (2,4);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (3,1);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (3,2);

insert into COMPONENTE(ID_LAYOUT, ID_MODULO) values (3,4);


insert into SITO_WEB (CODICE, URL, DATA_PUBBLICAZIONE, CLIENTE, LAYOUT) values (6, "www.misticanza.com", "2013-12-31", 3, 2);

insert into SITO_WEB (CODICE, URL, DATA_PUBBLICAZIONE, CLIENTE, LAYOUT) values (9, "www.techtipscom", "2013-10-08", 4, 1);

insert into SITO_WEB (CODICE, URL, DATA_PUBBLICAZIONE, CLIENTE, LAYOUT) values (10, "www.larosadeldeserto.it", "2013-11-14", 4, 1);

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


