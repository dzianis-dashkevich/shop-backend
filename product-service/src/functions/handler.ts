import { APIGatewayProxyEvent, APIGatewayProxyResult } from 'aws-lambda';
import { Client } from 'pg';
import { Product } from '../types/api-types';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

interface CreateProductFunctionOptions {
    getQueryString: (event: APIGatewayProxyEvent) => string,
    getApiGatewayProxyResult: (productList: Product[]) => APIGatewayProxyResult,
    validateInput?: (event: APIGatewayProxyEvent) => boolean
}

export default function createProductFunction ({
    getQueryString,
    getApiGatewayProxyResult,
    validateInput = () => true,
}: CreateProductFunctionOptions) {
    return async function productServiceFunction (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> {
        console.log('incoming request: ', event);

        if (!validateInput(event)) {
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

            const queryString = getQueryString(event);

            const { rows } = await client.query<Product>(queryString);

            return getApiGatewayProxyResult(rows);
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
}
