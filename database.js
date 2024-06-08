import mysql from 'mysql2/promise';
import 'dotenv/config';

// Create the connection to database
const connection = await mysql.createConnection({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASSWORD,
	database: process.env.MYSQL_DATABASE,
});

export async function getAllProducts() {
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

export async function getProduct(productId) {
	let results = [];
	try {
		[results] = await connection.query(
			`SELECT *
			FROM products
			WHERE product_id = ?`,
			[productId]
		);
	} catch (err) {
		console.log(err);
	}
	return results;
}

export async function createProduct(name, quantity, price) {
	let results = [];
	try {
		[results] = await connection.query(
			`INSERT INTO products (name, quantity_in_stock, unit_price)
			VALUES (?, ?, ?)`,
			[name, quantity, price]
		);
	} catch (err) {
		console.log(err);
	}
	return getProduct(results.insertId);
}

export async function deleteProduct(productId) {
	let results = [];
	try {
		[results] = await connection.query(
			`DELETE
			FROM products
			WHERE product_id = ?`,
			[productId]
		);
	} catch (err) {
		console.log(err);
	}
	return results;
}
