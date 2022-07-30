const http = require('http')

// Token Generation
const key = '3588f0e6653448a5b1c2be1e77bef2d7'
const secret = '041dfc2528904178a3d9a19dff5cb8a0'
const token = Buffer.from(`${key}:${secret}`).toString('base64')

// Performing Request
const protocol = 'http:' // 'http:' | 'https:'
const host = '127.0.0.1' // '127.0.0.1' | 'api.sisterra.com.br'
const path = '/v1/company/53/product' // '/v1/company' | '/v1/company/{companyId}/product'
const queryString = '?limit=5&offset=0';
const port = 8080 // '8080' | '80' | '443'
http.request(
    {
        protocol: protocol,
        host: host,
        path: `${path}${queryString}`,
        port: port,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Basic ${token}`
        }
    },
    (response) => {
        response.on('data', (data) => process.stdout.write(data))
    }
).end()