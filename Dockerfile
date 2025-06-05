# Partie 1: Construction de l'application Angular
# Utilise l'image Node.js pour la phase de construction.
FROM node:18 AS build
# Définir le répertoire de travail dans le conteneur
WORKDIR /employeemanagerapp
# Copier les fichiers package.json et package-lock.json dans le répertoire de travail
COPY package.json package-lock.json ./
# Installer toutes les dépendances définies dans package.json (--force pour contourner le conflit de dépendances)
RUN npm install --force
# Copier tout le contenu du répertoire employeemanagerapp vers le répertoire de travail dans le conteneur
COPY . .
# Construire l'application Angular en mode production. Le résultat de la construction sera placé dans le répertoire dist.
RUN npm run build --prod

# Partie 2: Création de l'image de production avec Nginx
# Utilise l'image de Nginx basée sur Alpine Linux comme image de base pour la phase de production.
FROM nginx:alpine
# Copier les fichiers construits de l'étape précédente vers le répertoire /usr/share/nginx/html de l'image Nginx.
# COPY --from=build /employeemanagerapp/dist /usr/share/nginx/html
COPY --from=build employeemanagerapp/dist/employeemanagerapp/* /usr/share/nginx/html
# ligne ajouté
COPY nginx.conf /etc/nginx/conf.d/default.conf  
# Exposer le port 80 pour permettre l'accès HTTP
EXPOSE 80
# Commande pour démarrer Nginx en mode non-déterminé (daemon off)
CMD ["nginx", "-g", "daemon off;"]