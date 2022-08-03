import { APIGatewayProxyResult } from 'aws-lambda';

enum StatusCode {
    Success = 200,
    NotFound = 404,
    InvalidRequest = 400,
    ServerError = 500
}

const responseBuilder = (statusCode: number) => (data: unknown): APIGatewayProxyResult => ({
    statusCode,
    body: JSON.stringify(data),
    headers: {
        'Content-Type': 'application/json; charset=utf-8',
    },
});

export const buildSuccessResponse = responseBuilder(StatusCode.Success);
export const buildNotFoundResponse = responseBuilder(StatusCode.NotFound);
export const buildInvalidRequestResponse = responseBuilder(StatusCode.InvalidRequest);
export const buildServerErrorResponse = responseBuilder(StatusCode.ServerError);


