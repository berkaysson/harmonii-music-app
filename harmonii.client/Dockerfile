# 1. Aşama: Derleme (Build)
FROM node:20-alpine AS build
WORKDIR /app

# Bağımlılıkları kopyala ve yükle
COPY package*.json ./
RUN npm install

# Kaynak kodları kopyala ve derle
COPY . .
# API URL'sini derleme anında (build-time) içeri gömmek için
ARG VITE_API_URL=http://localhost:8080/api
ENV VITE_API_URL=$VITE_API_URL

RUN npm run build

# 2. Aşama: Sunum (Serve)
FROM nginx:stable-alpine
# Nginx konfigürasyonunu kopyala (Aşağıdaki 2. adımı incele)
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Derlenen dosyaları Nginx'in yayın klasörüne kopyala
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]