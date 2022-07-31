import * as Joi from 'joi';
import { ProductRepository } from '@services//productService';
import { APIGatewayProxyEvent } from 'aws-lambda';
import { Product } from '@models/product';
import {
    buildInvalidRequestResponse,
    buildServerErrorResponse,
    buildSuccessResponse,
} from '@libs/handler';

const productSchema = Joi.object<Product>({
    description: Joi.string(),
    price: Joi.number().required(),
    title: Joi.string().required(),
    count: Joi.number().required(),
});

export default (productRepository: ProductRepository, logger: Console) => async (event: APIGatewayProxyEvent) => {
    logger.log('Incoming request: ', event);

    let rawProduct: unknown;

    try {
        rawProduct = JSON.parse(event.body);
    } catch (e) {
        rawProduct = {};
    }

    const { error, value } = productSchema.validate(rawProduct);

    if (error) {
        return buildInvalidRequestResponse({ error: 'invalid product schema provided' });
    }

    try {
        const product = await productRepository.createProduct(value);

        return buildSuccessResponse(product);
    } catch (e) {
        return buildServerErrorResponse({ error: 'unexpected error during database query execution' });
    }
};



