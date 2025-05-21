# Dockerfile (Frontend)
FROM node:18-alpine

# Créer le répertoire de l'application
WORKDIR /app

# Copier le package.json et installer les dépendances
COPY package.json ./
RUN npm install

# Copier le reste du code
COPY . .

# Construire l'application
RUN npm run build

# Exposer le port
EXPOSE 3000

# Commande de démarrage
CMD ["npm", "start"]

