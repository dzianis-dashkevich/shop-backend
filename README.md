## Front-end:
https://cloud-x-training.dzianis-dashkevich.com

## Services

### product-service

- Stages:
  - dev: 
    - service: https://cloud-x-training-dev-api.dzianis-dashkevich.com/product-service
    - swagger: https://cloud-x-training-dev-api.dzianis-dashkevich.com/product-service/swagger
    - cors (allowed origin): http://localhost:3000
  - prod: 
    - service: https://cloud-x-training-api.dzianis-dashkevich.com/product-service
    - swagger: https://cloud-x-training-api.dzianis-dashkevich.com/product-service/swagger
    - cors (allowed origin): https://cloud-x-training.dzianis-dashkevich.com
- Endpoints:
  - Get All Products: `GET /products`
    - Url Examples:
      - dev stage: https://cloud-x-training-dev-api.dzianis-dashkevich.com/product-service/products
      - prod stage: https://cloud-x-training-api.dzianis-dashkevich.com/product-service/products
  - Get Product By Id: `GET /products/{productId}`
    - Url Examples:
      - dev stage: https://cloud-x-training-dev-api.dzianis-dashkevich.com/product-service/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa
      - prod stage: https://cloud-x-training-api.dzianis-dashkevich.com/product-service/products/7567ec4b-b10c-48c5-9345-fc73c48a80aa
  - Create Product `POST /products`
    - Url Examples:
        - dev stage: https://cloud-x-training-dev-api.dzianis-dashkevich.com/product-service/products
        - prod stage: https://cloud-x-training-api.dzianis-dashkevich.com/product-service/products

### import-service

- Stages:
    - dev:
        - service: https://cloud-x-training-dev-api.dzianis-dashkevich.com/import-service
        - swagger: https://cloud-x-training-dev-api.dzianis-dashkevich.com/import-service/swagger
        - cors (allowed origin): http://localhost:3000
    - prod:
        - service: https://cloud-x-training-api.dzianis-dashkevich.com/import-service
        - swagger: https://cloud-x-training-api.dzianis-dashkevich.com/import-service/swagger
        - cors (allowed origin): https://cloud-x-training.dzianis-dashkevich.com
- Endpoints:
    - Get signed url for file: `GET /import?name={fileName.csv}`
        - Url Examples:
            - dev stage: https://cloud-x-training-dev-api.dzianis-dashkevich.com/import-service/import?products.csv
            - prod stage: https://cloud-x-training-api.dzianis-dashkevich.com/import-service/import?products.csv
