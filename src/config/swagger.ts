import swaggerJSDoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Hollow Chat API',
            version: '1.0.0',
            description: 'API documentation for Hollow Chat',
        },
        servers: [
            {
                url: 'http://localhost:3000', // Replace with your server URL
            },
        ],
    },
    apis: ['./src/routes/*.ts', './src/controllers/*.ts'], // Paths to files containing OpenAPI definitions
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;