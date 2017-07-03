create table CLIENTE(
	CODICE INTEGER auto_increment PRIMARY KEY,
	CODICE_FISCALE varchar (20) UNIQUE,
	CITTA VARCHAR(20),
	INDIRIZZO VARCHAR(30),
	TELEFONO VARCHAR(10),
	N_SITI INTEGER,
	SPESA_TOTALE INTEGER
)Engine='InnoDB';


create table SVILUPPATORE(
	PIVA VARCHAR(10) PRIMARY KEY,
    NOME VARCHAR(15),
    COGNOME VARCHAR(15),
    TELEFONO VARCHAR(15)
)Engine='InnoDB';

create table LAYOUT(
	ID INTEGER auto_increment PRIMARY KEY,
    COSTO_TOTALE INTEGER,
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
    TYPE varchar(20)
)Engine='InnoDB';
    

insert into UTENTE (USERNAME, PASSWORD, TYPE) values ("alex", "83d97b71499bee6b9d42dee9d3a6e5d00ecc8c891346d25d1909b3aac9abaa0ad4864fe4eacf159cd3f4a0ad764178d014ac378dfffc5e4023f6dbcfb0992648", "admin");

insert into CLIENTE (CODICE_FISCALE, CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("SCLFPP74L08L219T","Torino","Via Monteleone 99","3669382463",0,0);

insert into CLIENTE (CODICE_FISCALE,CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("DVIDNS64S02H501O","Acate","Via Duca degli Abruzzi 99","3669382463",0,0);

insert into CLIENTE (CODICE_FISCALE,CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("RMNFLV76D19D612Q","Bologna","Via Fasulla 666","3328965471",0,0);

insert into CLIENTE (CODICE_FISCALE,CITTA, INDIRIZZO, TELEFONO, N_SITI, SPESA_TOTALE) VALUES ("ZTINLN68H20D969D","Roma","Via Genova 47","3946729551",0,0);

insert into LAYOUT (COSTO_TOTALE) values (0);

insert into LAYOUT (COSTO_TOTALE) values (0);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Scroll bar", "Semplice scrollbar", 10);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Carrello", "Modulo Carrello", 15);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Log in", "Modulo di Login", 7);

insert into MODULO (NOME, FUNZIONE, COSTO) values ("Register form", "Modulo di registrazione", 14);

insert into SVILUPPATORE(PIVA, NOME, COGNOME, TELEFONO) values ("1234567890", "Giuseppe", "Bella", "3345678911");

insert into SVILUPPATORE(PIVA, NOME, COGNOME, TELEFONO) values ("1234567891", "Angelo", "Cassano", "3382751678");

insert into SVILUPPATORE(PIVA, NOME, COGNOME, TELEFONO) values ("1234567892", "Marco", "Loggia", "3314567999");


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
    set N_SITI=N_SITI+1
    where CODICE=NEW.CLIENTE;
end //

delimiter //
create trigger add_sito
after delete
on SITO_WEB
for each row
begin
    update CLIENTE
    set N_SITI=N_SITI-1
    where CODICE=OLD.CLIENTE;
end //

delimiter ;


