import { Client } from 'pg';
import ProductService from '@services/productService';

import getProductsListFunctionFactory from './getProductsList';
import getProductByIdFunctionFactory from './getProductById';
import createProductFunctionFactory from './createProduct';

const { PG_HOST, PG_PORT, PG_DATABASE, PG_USERNAME, PG_PASSWORD } = process.env;

const postgresClient = new Client({
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

const productService = new ProductService(postgresClient, console);

export const getProductById = getProductByIdFunctionFactory(productService);
export const getProductsList = getProductsListFunctionFactory(productService);
export const createProduct = createProductFunctionFactory(productService);

