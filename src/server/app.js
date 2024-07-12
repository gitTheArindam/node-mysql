import express from 'express';
import helmet from 'helmet';
import {
	getAllProducts,
	getProduct,
	createProduct,
	deleteProduct,
} from './database.js';

const app = express();
app.use(helmet());
app.use(express.json());

app.get('/products', async (req, res) => {
	const allProducts = await getAllProducts();
	res.send(allProducts);
});

app.get('/products/:id', async (req, res) => {
	const id = req.params.id;
	const product = await getProduct(id);
	res.send(product);
});

app.post('/products', async (req, res) => {
	const { name, quantity, price } = req.body;
	const product = await createProduct(name, quantity, price);
	res.status(201).send(product);
});

app.delete('/products/:id', async (req, res) => {
	const id = req.params.id;
	const product = await deleteProduct(id);
	res.status(204).send();
});

app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Something broke!');
});

const port = process.env.SERVER_PORT || 3000;
app.listen(port, () => {
	console.log(`Listening to PORT ${port}...`);
});
