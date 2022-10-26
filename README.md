## Testar 3 endpoints: 

Para rodar a API execute `docker-compose up`. O servidor vai rodar no em `http://localhost:3000`


### Login

Fazer uma request para o endpoint `/login` com método post, passando "login" e "password" no body, que é tipo json. As credenciais são `login: lulu`, `senha: 1234`. 

### GET cidades

Fazer uma request tipo GET para o endpoint `/locations`. A rota é protegida, então você deve informar o token (obtido na requisição anterior) no header 'authorization' da requisição. O token é do tipo Bearer token.

Esse endpoint aceita 3 possíveis **queries** (teste as 3, inclusive juntas): `orderBy` que aceita os valores "city" ou "country", `limit` que limita o número de resultados e `page` que pagina os valores caso usado junto com limit. Seria legal passar essas queries direto na url sem usar algum "facilitador" do postman.

### GET uma cidade

Para retornar uma cidade somente, acrescente o id da cidade como parametro da url `/locations/{id}` 