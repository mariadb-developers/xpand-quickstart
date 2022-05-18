const mariadb = require("mariadb");
const fs = require("fs");

async function main() {
	var serverCert = [fs.readFileSync("/path/to/skysql_chain.pem", "utf8")];

	let connection;
	try {
		connection = await mariadb.createConnection({
			host: "quickstart.mdbxxxxxxx.db.skysql.net",
			port: "5046",
			database: "quickstart",
			user: "DBXXXXXXX",
			password: "xxxxxxxxxx",
			ssl: { ca: serverCert }
		});

		// deleting data
		await connection.query("TRUNCATE programming_language");

		// inserting data
		var values = [
			["JavaScript", 10],
			["Java", 9],
			["Python", 8],
			["C++", 7],
			["C#", 6],
			["Go", 5],
			["Rust", 4],
			["PHP", 3],
		];

		await connection.batch(
			"INSERT INTO programming_language(name, rating) VALUES(?, ?)",
			values
		);

		// retrieving data
		let rows = await connection.query(
			"SELECT name, rating FROM programming_language ORDER BY rating DESC");
		rows.forEach(row => {
			console.log(`${row.name}: ${row.rating}`);
		});

	} catch (err) {
		console.log(err);
	} finally {
		if (connection) await connection.close();
	}
}

main();
