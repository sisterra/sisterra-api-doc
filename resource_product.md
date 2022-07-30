# Product
Esse recurso disponibiliza todos os registros de **Products** vinculadas à determinada [Company](resource_company.md)

Esse recurso lista todos os dados cadastrais (como nome, unidade de medida, composição, etc) e dados de estoque (que são resultado de múltiplas interações dentro do ERP SisTerra)

## Listar Produtos Ativos

### Endpoints
| Verbo HTTP | URL                                                         |
| ---------- | ----------------------------------------------------------- |
| GET        | https://api.sisterra.com.br/v1/company/{companyId}/product  |

### Payload de Retorno
| Campo              | Tipo         | Nullable | Descrição                                        |
| ------------------ | ------------ | -------- | ------------------------------------------------ |
| reference          | string       | false    | Referência do Produto                            |
| name               | string       | false    | Descrição                                        |
| size               | string       | false    | Tamanho (grade)                                  |
| color              | object       | false    | Cor                                              |
| long_description   | string       | true     | Descrição longa                                  |
| status             | string       | false    | active / inactive                                |
| attributes         | object array | false    | Informações de classificação (grupo/coleção/etc) |
| price              | object       | false    | Preço                                            |
| available_quantity | integer      | false    | Quantidade disponível em estoque                 |
| unity_measure      | string       | false    | Unidade de Medida (PC/MT/KG/etc)                 |
| ncm                | string       | false    | Nomenclatura Comum do Mercosul                   |
| weight             | object array | false    | Peso                                             |


> Color

| Campo        | Tipo   | Nullable | Descrição            |
| ------------ | ------ | -------- | -------------------- |
| id           | string | false    | Identificação da cor |
| abbreviation | string | true     | Abreviação da cor    |
| name         | string | false    | Descrição da cor     |

> Attribute

| Campo | Tipo   | Nullable | Descrição                                                     |
| ----- | ------ | -------- | ------------------------------------------------------------- |
| type  | string | false    | Tipo da classificação (group / collection / brand / subgroup) |
| id    | string | true     | Identificação da classificação                                |
| value | string | true     | Descrição da classificação                                    |

> Price

| Campo     | Tipo   | Nullable | Descrição                                |
| ------    | ------ | -------- | ---------------------------------------- |
| currency  | string | false    | Código 'ISO 4217 Currency Code' da moeda |
| amount    | float  | false    | Valor monetário (duas casas decimais)    |

> Weight

| Campo | Tipo   | Nullable | Descrição                                |
| ----- | ------ | -------- | ---------------------------------------- |
| type  | string | false    | Peso Bruto (gross) ou Peso Líquido (net) |
| value | float  | false    | Quantidade                               |


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
const queryString = '?limit=5&offset=0';
const port = 443
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
```

> Response
```json
{
    "result": [
        {
            "reference": "1000",
            "name": "BLUSA FLAME 2022/2022",
            "size": "1",
            "color": {
                "id": 1,
                "abbreviation": "ND",
                "name": "NUDI"
            },
            "long_description": null,
            "status": "active",
            "attributes": [
                {
                    "type": "group",
                    "id": null,
                    "value": null
                },
                {
                    "type": "collection",
                    "id": null,
                    "value": null
                },
                {
                    "type": "brand",
                    "id": null,
                    "value": null
                },
                {
                    "type": "subgroup",
                    "id": null,
                    "value": null
                }
            ],
            "price": {
                "currency": "brl",
                "amount": 129.9
            },
            "available_quantity": 0,
            "unity_measure": "PC",
            "ncm": "61062000",
            "weight": [
                {
                    "type": "gross",
                    "value": 0
                },
                {
                    "type": "net",
                    "value": 0
                }
            ]
        },
        {
            "reference": "1001",
            "name": "BLUSA FLAME 2022/2022",
            "size": "1",
            "color": {
                "id": 1,
                "abbreviation": "ND",
                "name": "NUDI"
            },
            "long_description": null,
            "status": "active",
            "attributes": [
                {
                    "type": "group",
                    "id": 2,
                    "value": "BLUSA"
                },
                {
                    "type": "collection",
                    "id": null,
                    "value": null
                },
                {
                    "type": "brand",
                    "id": null,
                    "value": null
                },
                {
                    "type": "subgroup",
                    "id": 2,
                    "value": "FEMININO"
                }
            ],
            "price": {
                "currency": "brl",
                "amount": 129.9
            },
            "available_quantity": 0,
            "unity_measure": "UN",
            "ncm": "",
            "weight": [
                {
                    "type": "gross",
                    "value": 0
                },
                {
                    "type": "net",
                    "value": 0
                }
            ]
        },
        {
            "reference": "1002",
            "name": "BLUSA FLAME 2022/2022",
            "size": "1",
            "color": {
                "id": 1,
                "abbreviation": "ND",
                "name": "NUDI"
            },
            "long_description": null,
            "status": "active",
            "attributes": [
                {
                    "type": "group",
                    "id": 2,
                    "value": "BLUSA"
                },
                {
                    "type": "collection",
                    "id": null,
                    "value": null
                },
                {
                    "type": "brand",
                    "id": null,
                    "value": null
                },
                {
                    "type": "subgroup",
                    "id": 2,
                    "value": "FEMININO"
                }
            ],
            "price": {
                "currency": "brl",
                "amount": 129.9
            },
            "available_quantity": 0,
            "unity_measure": "UN",
            "ncm": "",
            "weight": [
                {
                    "type": "gross",
                    "value": 0
                },
                {
                    "type": "net",
                    "value": 0
                }
            ]
        },
        {
            "reference": "1004",
            "name": "CONJUNTO SAIA MEIA ESTACAO 2022/2022",
            "size": "1",
            "color": {
                "id": 1,
                "abbreviation": "ND",
                "name": "NUDI"
            },
            "long_description": null,
            "status": "active",
            "attributes": [
                {
                    "type": "group",
                    "id": 2,
                    "value": "BLUSA"
                },
                {
                    "type": "collection",
                    "id": null,
                    "value": null
                },
                {
                    "type": "brand",
                    "id": null,
                    "value": null
                },
                {
                    "type": "subgroup",
                    "id": 2,
                    "value": "FEMININO"
                }
            ],
            "price": {
                "currency": "brl",
                "amount": 198.9
            },
            "available_quantity": 8,
            "unity_measure": "UN",
            "ncm": "",
            "weight": [
                {
                    "type": "gross",
                    "value": 0
                },
                {
                    "type": "net",
                    "value": 0
                }
            ]
        },
        {
            "reference": "1005",
            "name": "CAMISA MEIA ESTACAO 2022/2022",
            "size": "1",
            "color": {
                "id": 1,
                "abbreviation": "ND",
                "name": "NUDI"
            },
            "long_description": null,
            "status": "active",
            "attributes": [
                {
                    "type": "group",
                    "id": 2,
                    "value": "BLUSA"
                },
                {
                    "type": "collection",
                    "id": null,
                    "value": null
                },
                {
                    "type": "brand",
                    "id": null,
                    "value": null
                },
                {
                    "type": "subgroup",
                    "id": 2,
                    "value": "FEMININO"
                }
            ],
            "price": {
                "currency": "brl",
                "amount": 129.9
            },
            "available_quantity": 4,
            "unity_measure": "UN",
            "ncm": "",
            "weight": [
                {
                    "type": "gross",
                    "value": 0
                },
                {
                    "type": "net",
                    "value": 0
                }
            ]
        }
    ],
    "paging": {
        "total": 865,
        "limit": 5,
        "offset": 0,
        "size": 5
    }
}
```