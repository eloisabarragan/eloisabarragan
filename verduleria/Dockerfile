# Imagen para publicar la tienda en cualquier hosting que acepte Docker.
FROM node:22-slim
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
# La base de datos y las fotos subidas viven en /data: montar ahí un disco persistente.
ENV NODE_ENV=production DATA_DIR=/data PORT=3000
VOLUME /data
EXPOSE 3000
CMD ["node", "server.js"]
