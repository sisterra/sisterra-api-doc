# Introdução
Todos os **Recursos** fornecidos pela API do SisTerra respondem às requisições com resultados **paginados**. Isso significa que você pode não obter todos os registros de um determinado recurso com apenas uma requisição

Imagine que você esteja fazendo uma requisição para listar todos os produtos ativos de determinado **Merchant**. Como essa coleção de produtos pode ter uma quantidade massiva de registros, o retorno da API será feito em partes (100 registros por vez, por exemplo)

Você pode configurar a quantidade de registros que um recurso deve retornar, assim como a partir de qual posição na coleção de registros a API deve iniciar seu retorno. Essa configuração é feita via [Parâmetros Query String](#query-string), disponível para todos os **Recursos** da API. **Caso esses valores não sejam informados no momento da requisição a API do SisTerra irá operar com valor default**.

# Query String
| Parâmetro | Default      | Descrição |
| --------- | ------------ | --------- | 
| limit     | 50           | Quantidade máxima de registros que serão retornados |
| offset    | 0            | Posição (começando em `0`) inicial na coleção de registros a serem retornados |

## Exemplos
### Default
> Buscar as companies (matriz e filiais) de um determinado Merchant, **com valores default para limit e offset**:
```
GET https://api.sisterra.com.br/v1/company
```
### Personalizado
> Buscar as companies (matriz e filiais) de um determinado Merchant, **iniciando com o primeiro registro da coleção e com limite de 10 companies**:
```
GET https://api.sisterra.com.br/v1/company?limit=10&offset=0
```

> Buscar as companies (matriz e filiais) de um determinado Merchant, **iniciando com o décimo registro da coleção e com limite de 10 companies**:
```
GET https://api.sisterra.com.br/v1/company?limit=10&offset=10
```

# Retornos

Todos os retornos da API do SisTerra seguem basicamente o seguinte padrão:
```json
{
    "result": [],
    "paging": {
        "total": "??",
        "limit": "??",
        "offset": "??",
        "size": "??"
    }
}
```

## Campos do item `paging`
- **total**: quantidade total de registros disponível para esse recurso. Por exemplo, se um **Merchant** têm 15 *companies* (matriz + filiais) então uma requisição para o recurso de company irá retornar um **total: 15**

- **limit**: quantidade máxima de registros que a API do SisTerra considerou para essa requisição. Caso a requisição feita tenha sido configurada com o **parâmetro limit da query string**, então este valor será o mesmo da requisição, caso contratário será o valor default da API do SisTerra

- **offset**: posição inicial na coleção desse recurso. Por exemplo, se um **Merchant** tem 10.000 produtos ativos e você pediu 100 produtos, começando pelo produto 500º da coleção o valor será **offset: 500**.  Caso a requisição feita tenha sido configurada com o **parâmetro offset da query string**, então este valor será o mesmo da requisição, caso contratário será o valor default da API do SisTerra

- **size**: quantidade retornada nesta resposta
    - Caso o valor de size seja igual ao valor de **limit**, significa que você precisará fazer outra requisição pedindo mais regristros
    - Caso o valor de size seja menor que o valor de limit, significa que você chegou ao fim da coleção. Neste caso você não deve fazer requisições para esse recurso pedindo mais registros
