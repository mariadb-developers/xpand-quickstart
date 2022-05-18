import mariadb

connection = mariadb.connect(
    host="quickstart.mdbxxxxxxx.db.skysql.net",
    database="quickstart",
    user="DBXXXXXXX",
    port=5046,
    password="xxxxxxxxxx",
    ssl_ca="/path/to/skysql_chain.pem")

cursor = connection.cursor()

# deleting data
cursor.execute("TRUNCATE programming_language")

# inserting data
values = [
    ("Python", 10),
    ("Java", 9),
    ("C++", 8),
    ("JavaScript", 7),
    ("C#", 6),
    ("Go", 5),
    ("Rust", 4),
    ("PHP", 3)
]

cursor.executemany(
    "INSERT INTO programming_language(name, rating) VALUES(?, ?)", values)

# retrieving data
cursor.execute(
    "SELECT name, rating FROM programming_language ORDER BY rating DESC")

for name, rating in cursor:
    print(f"{name}: {rating}")

connection.close()
