# Use a imagem oficial do Node.js como base
FROM node:18-alpine

# Crie o diretório de trabalho na imagem
WORKDIR /usr/src/app

# Copie os arquivos do aplicativo para o diretório de trabalho
COPY . .

# Instale as dependências
RUN npm install

# Exponha a porta em que a aplicação Express irá rodar
EXPOSE 3000

# Comando para iniciar a aplicação quando o contêiner for iniciado
CMD ["npm", "run", "start"]