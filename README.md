Para que possamos rodar o front-end, é preciso que siga as seguintes instruções:

O projeto foi feito em react, desta forma, será necessário instalar o node.

Foi utilizado alguns Bibliotecas e FrameWorks para desenvolvimento: Axios, chakra-ui e entre outras. 

- Para iniciarmos a aplicação, precisamos instalar todas as dependências do projeto. Para isto, basta rodar o "npm install" ou como eu utilizei "yarn install"

- Para rodar a aplicação, devemos rodar o seguinte comando "yarn dev" ou "npm run dev".



API Externa:
Neste projeto, estamos com uma integração com API externa e totalmente gratuita com o "https://viacep.com.br/". Nele nos temos um endpoint onde o usuário passará o CEP e seu retorno será do endereço referente ao CEP passado.

URL: viacep.com.br/ws/{CEP}/json/

retorno: 
{
    "cep": "01001-000",
    "logradouro": "Praça da Sé",
    "complemento": "lado ímpar",
    "bairro": "Sé",
    "localidade": "São Paulo",
    "uf": "SP",
    "ibge": "3550308",
    "gia": "1004",
    "ddd": "11",
    "siafi": "7107"
}
