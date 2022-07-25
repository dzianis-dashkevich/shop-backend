import * as Joi from 'joi';
import { v4 } from 'uuid';
import { Product } from '../types/api-types';
import { Client } from 'pg';
import { APIGatewayProxyEvent } from 'aws-lambda';

const productSchema = Joi.object<Product>({
    description: Joi.string(),
    price: Joi.number().required(),
    title: Joi.string().required(),
    count: Joi.number().required(),
});

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const createProduct = async (event: APIGatewayProxyEvent) => {
    console.log('incoming request: ', event);

    let rawProduct: Product;

    try {
        rawProduct = JSON.parse(event.body) as Product;

        const { error } = productSchema.validate(rawProduct);

        if (error) {
            return {
                statusCode: 400,
                body: JSON.stringify({ error: 'invalid input' }),
            };
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: 'invalid input' }),
        };
    }

    const client = new Client({
        host: PG_HOST,
        port: +PG_PORT,
        database: PG_DATABASE,
        user: PG_USERNAME,
        password: PG_PASSWORD,
        ssl: {
            rejectUnauthorized: false,
        },
        connectionTimeoutMillis: 5000,
    });

    try {
        await client.connect();

        await client.query('begin');

        const id = v4();

        await client.query(`
            insert into product (id, title, description, price)
            values ('${id}','${rawProduct.title}', '${rawProduct.description}', ${rawProduct.price})`)
            .catch((e) => console.error('Error during product insertion: ', e));

        await client.query(`
            insert into stocks (product_id, count)
            values ('${id}', ${rawProduct.count})`)
            .catch((e) => console.error('Error during stock insertion: ', e));

        await client.query('rollback');

        return { statusCode: 200, body: JSON.stringify({ success: true }) };
    } catch (e) {
        console.error('Error during database connection or request execution: ', e);

        return {
            statusCode: 500,
            body: JSON.stringify({ error: 'Error during database connection or request execution.' }),
        };
    } finally {
        await client.end();
    }
};

export default createProduct;

