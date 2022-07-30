# Identificação e Autorização
O objetivo do processo de Autenticação é **identificar** e **autorizar** as requisições recebidas pela API do SisTerra
> **Identificar** nesse contexto significa que no processo de Autenticação a API do SisTerra será capaz de identificar de qual **Merchant** se trata a requisição

> **Autorizar** nesse contexto significa que o **Merchant** tem o poder de permitir que determinado **Integrador** tenha acesso aos seus dados na API do SisTerra

É importe notar que todos os **Merchants** que utilizam o ERP da SisTerra irão usar a mesma API, logo é necessário haver um processo de identificação

O **Merchant** pode gerenciar as **chaves de acesso** que estão ativas (caso o **Merchant** encerre a parceria com algum **Integrador**, ele pode revogar a **chave de acesso** fornecida anteriormente à ele e com isso encerrar sua autorização, por exemplo). Por isso, certifique-se que a **chave de acesso** que você possui está ativa (verifique isso junto ao **Merchant**)

# Chave de Acesso
**Chave de Acesso** é a composição de uma **key** e um **secret**
```
key: 462003c5bf764809b1fb009364568e06
secret: 09296be46bd9409ca5fa406574f7f770
```

O **Merchant** irá fornecer essa **Chave de Acesso** ao **Integrador** 

Essa chave de acesso será utilizada pelo **Integrador** para gerar o **Token**

# Token
Texto montado pelo **Integrador**, utilizando como base a **Chave de Acesso** fornecida pelo **Merchant**

Texto que deve ser enviado no [Header HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers) do tipo [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) em todas as requisições que o **Integrador** faz para a API do SisTerra

## Como gerar o Token
O token é um encode de [base64](https://developer.mozilla.org/en-US/docs/Glossary/Base64) da concatenação de **key** + `:` +  **secret**
```javascript
const key = '462003c5bf764809b1fb009364568e06'
const secret = '09296be46bd9409ca5fa406574f7f770'
const token = Buffer.from(key + ':' + secret).toString('base64')

console.log(token);
// NDYyMDAzYzViZjc2NDgwOWIxZmIwMDkzNjQ1NjhlMDY6MDkyOTZiZTQ2YmQ5NDA5Y2E1ZmE0MDY1NzRmN2Y3NzA=
```

# Header Authorization
> O [Authentication Schema](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication#authentication_schemes) utilizado pela API do SisTerra é o **Basic**
```
Authorization: Basic NDYyMDAzYzViZjc2NDgwOWIxZmIwMDkzNjQ1NjhlMDY6MDkyOTZiZTQ2YmQ5NDA5Y2E1ZmE0MDY1NzRmN2Y3NzA=
```

## Exemplo
> Como realizar uma request com **Header Authorization** utilizando [NodeJS](https://nodejs.org/en/docs/):

```javascript
const http = require('http')

// Token Generation
const key = '3588f0e6653448a5b1c2be1e77bef2d7'
const secret = '041dfc2528904178a3d9a19dff5cb8a0'
const token = Buffer.from(`${key}:${secret}`).toString('base64')

// Performing Request
const protocol = 'https:'
const host = 'api.sisterra.com.br'
const path = '/v1/company'
const port = 443
http.request(
    {
        protocol: protocol,
        host: host,
        path: path,
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
```

Essa request deve produzir uma resposta parecida com:
```json
{
    "result": [
        {
            "id": "10",
            "name": "Rodrigo e Antonio Pães e Doces ME",
            "business_name": "Pães e Doces Ki Delícia",
            "address": {
                "city": "Guarapuava",
                "number": 801,
                "public_place": "Rua São Mateus do Sul",
                "state": "PR",
                "zipcode": "85020110"
            },
            "phone": "4226369267",
            "email": "contabil@rodrigoeantoniopaesedocesme.com.br",
            "document": "42880501000150",
            "state_registration": "8205596063"
        },
        {
            "id": "20",
            "name": "Esther e Carlos Eduardo Entregas Expressas Ltda",
            "business_name": "Jato Express",
            "address": {
                "city": "Esperança Nova",
                "number": 738,
                "public_place": "Praça Manoel Alvino de Oliveira 260",
                "state": "PR",
                "zipcode": "87545970"
            },
            "phone": "4426392964",
            "email": "posvenda@estherecarloseduardoentregasexpressasltda.com.br",
            "document": "70422940000154",
            "state_registration": "5052100005"
        }
    ],
    "paging": {
        "total": 2,
        "limit": 100,
        "offset": 0,
        "size": 2
    }
}
```
