import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create the connection to database
const connection = await mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

async function getAllProducts() {
	let results = [];
	try {
		[results] = await connection.query(
			`SELECT *
			FROM products`
		);
	} catch (err) {
		console.log(err);
	}
	return results;
}

async function getHighDemandProucts(quantity, price) {
	let results = [];
	try {
		[results] = await connection.query(
			`SELECT *
			FROM
				products
			WHERE
				quantity_in_stock < ? AND
				unit_price > ?`,
			[quantity, price]
		);
	} catch (err) {
		console.log(err);
	}
	return results;
}

// const allPoducts = await getAllProducts();
// console.log(allPoducts);

const products = await getHighDemandProucts(20, 5);
console.log(products);
