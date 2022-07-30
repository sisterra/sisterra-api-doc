# Company
Esse recurso disponibiliza todos os registros de **Companies** vinculadas ao **Merchant** 

Uma **Company** é uma **empresa** dentro do ERP SisTerra. Isso significa que esse recurso disponibiliza todas as **empresas** que o **Merchant** têm cadastradas dentro do ERP SisTerra

Uma **Company** pode ser uma **empresa matriz** ou **empresas filiais**, pertencentes ou não ao mesmo grupo empresarial (geralmente são)

Vários outros recursos, como de **Produtos** e **Pessoas**, estão vinculados à **companies** específicas. Isso porque, no caso de produtos por exemplo, cada empresa têm seus registros de acordo com a respectiva quantidade em estoque. Por isso, certifique-se que as requisições sempre levem em consideração a **Company** desejada

## Listar Companies Ativas

### Endpoints
| Verbo HTTP | URL                                    |
| ---------- | -------------------------------------- |
| GET        | https://api.sisterra.com.br/v1/company |

### Payload de Retorno
| Campo               | Tipo    | Nullable | Descrição                |
| ------------------- | ------- | -------- | ------------------------ |
| id                  | integer | false    | Identificação única      |
| name                | string  | false    | Razão Social             |
| business_name       | string  | false    | Nome Fantasia            |
| address             | object  | false    | Endereço                 |
| phone               | string  | false    | Telefone                 |
| email               | string  | false    | Email                    |
| document            | string  | false    | CNPJ                     |
| state_registration  | string  | true     | Inscrição Estadual       |

> Address

| Campo               | Tipo    | Nullable | Descrição                            |
| ------------------- | ------- | -------- | ------------------------------------ |
| city                | string  | false    | Cidade                               |
| number              | integer | false    | Número                               |
| public_place        | string  | false    | Logradouro (rua/avenida/etc)         |
| state               | string  | false    | Código da UF (ISO 3166-2:BR)         |
| zipcode             | string  | false    | Código de Endereçamento Postal (CEP) |

### Exemplo
> Request

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

> Response
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