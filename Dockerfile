FROM node:22-alpine

# Bonne pratique pour Node.js en prod
ENV NODE_ENV=production

WORKDIR /app

# 1. Mise en cache des dépendances (uniquement de production)
COPY package*.json ./
RUN npm ci --omit=dev

# 2. Copie du code source
COPY . .

# 3. Sécurité : exécution sous l'utilisateur non-root 'node' fourni par l'image Alpine
USER node

# Le port sur lequel ton Express écoute (ex: 3000 ou 5000)
EXPOSE 3000

# Commande de démarrage (adapte si ton point d'entrée est server.js ou app.js)
CMD ["node", "./bin/www"]