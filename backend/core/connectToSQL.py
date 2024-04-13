import mysql.connector

connect=mysql.connector.connect(
    host="172.17.0.2",
    user="root",
    password="mypass",
    database="mydb"
)

if connect.is_connected():
    print("connected to mysql")
else:
    print("faild to connect to mysql")