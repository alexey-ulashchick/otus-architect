-- Setup replication.
STOP SLAVE;
RESET SLAVE ALL;

CHANGE MASTER TO MASTER_HOST='mysql-master', MASTER_PORT=3306, master_user='repl', master_password='dockerinternal';
start slave;
