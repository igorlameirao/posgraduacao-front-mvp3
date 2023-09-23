# Use uma imagem base do Node.js
FROM node:18

# Defina o diretório de trabalho no contêiner
WORKDIR /app

# Copie o arquivo package.json e package-lock.json para o contêiner
COPY package*.json ./

# Instale as dependências do projeto
RUN npm install

# Copie o restante dos arquivos do projeto para o contêiner
COPY . .

# Build do projeto React
RUN npm run build

# Expõe a porta 3333 no contêiner
EXPOSE 3333

# Comando para iniciar a aplicação quando o contêiner for executado
CMD ["npm", "run", "dev"]