import { Client } from 'pg';
import { Product } from '@models/product';

// This repository should be the only point to communicate with DB -
// thus there is no sense to expose those interfaces outside.
enum Table {
    Product = 'product',
    Stock = 'stocks'
}

interface DbProduct {
    description: string;
    id: string;
    price: number;
    title: string;
}

interface DbStock {
    product_id: string;
    count: number;
}

export interface ProductRepository {
    getProductById (productId: string): Promise<Product | null>,
    getProducts (): Promise<Product[]>,
    createProduct (product: Product): Promise<Product>
}

export default class ProductService implements ProductRepository {
    private readonly connection: Promise<void>;

    // TODO: databaseClient should be abstract, it should not depends on rely on postgres.
    public constructor(private readonly databaseClient: Client, private readonly logger: Console) {
        this.connection = this.databaseClient.connect();
    }

    public async getProductById (productId: string): Promise<Product | null> {
        try {
            await this.connection;

            const text = `
                    SELECT p.*, s.count
                    FROM ${Table.Product} p
                    INNER JOIN ${Table.Stock} s ON p.id = s.product_id
                    WHERE p.id = $1
                    `;

            const { rows } = await this.databaseClient.query<Product>({ text, values: [productId] });
            const [product = null] = rows;

            return product;
        } catch (e) {
            this.logger.error('productRepository.getProductById failed: ', e);
            throw e;
        } finally {
            // TODO: implement correct end of connection
            // await this.databaseClient.end();
        }
    }

    public async getProducts (): Promise<Product[]> {
        try {
            await this.connection;

            const text = `
                    SELECT p.*, s.count 
                    FROM ${Table.Product} p 
                    JOIN ${Table.Stock} s on p.id = s.product_id
                    `;

            const { rows } = await this.databaseClient.query<Product>({ text });

            return rows;
        } catch (e) {
            this.logger.error('productRepository.getProducts failed: ', e);
            throw e;
        } finally {
            // TODO: implement correct end of connection
            // await this.databaseClient.end();
        }
    }

    public async createProduct (product: Product): Promise<Product> {
        try {
            await this.connection;

            await this.databaseClient.query('BEGIN');

            const productResult = await this.databaseClient.query<DbProduct>({
                text: `
                    INSERT INTO ${Table.Product} (title, description, price) 
                    VALUES($1, $2, $3) RETURNING *`,
                values: [product.title, product.description, product.price],
            });

            const [dbProduct] = productResult.rows;

            const stockResult = await this.databaseClient.query<DbStock>({
                text: `
                    INSERT INTO ${Table.Stock} (product_id, count) 
                    VALUES ($1, $2) RETURNING *`,
                values: [dbProduct?.id, product.count],
            });

            const [dbStock] = stockResult.rows;

            await this.databaseClient.query('COMMIT');

            return { ...dbProduct, count: dbStock.count };
        } catch (e) {
            this.logger.error('productRepository.createProduct failed: ', e);
            await this.databaseClient.query('ROLLBACK');
            throw e;
        } finally {
            // TODO: implement correct end of connection
            // await this.databaseClient.end();
        }
    }
}
