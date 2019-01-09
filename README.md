# userAccount

set up database (MySQL):

After installation MySQL:

$ export PATH=${PATH}:/usr/local/mysql/bin

$ mysql -u root -p

enter password: (empty)

mysql>  create database test;

mysql> use test;

mysql> create table if not exist account (id int not null auto_increment,
username varchar(100) not null,
password varchar(100) not null,
email varchar(100) not null,
primary key (id)
);


If there is still connection errer:

mysql> alter user 'user'@'localhost' indentified with mysql_native_password by '';
