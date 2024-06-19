# Dockerizacion
Programa de concecionaria de autos, frontend en nextjs, backend en nodejs y base de datos mysql

Backend: ./Auto  

Frontend: ./ejercicio_auto  



Para crear los contenedores para este proyecto primero se debe crear los Dockerfile dentro del backend y frontend.
a continuacion se presenta el formato que deben llevar estos archivos:  


# DOCKER FILE BACKEND	

#Imagen base  

FROM node:20  


#direccion del proyecto  

WORKDIR /app  


#Copiar dependencias y librerias del proyecto
COPY package*.json ./	

#Instalar las dependencias y librerias
RUN npm install	

#Copiar los archivos del proyecto al contenedor
COPY . . 	

#Exponer el puerto 8006
EXPOSE 3006	

#Comando para iniciar el proyecto
CMD [ "npm", "start" ]


# DOCKER FILE FRONTEND**
#Imagen base
FROM node:20

#direccion del proyecto
WORKDIR /app

#Copiar dependencias y librerias del proyecto
COPY package*.json ./

#Instalar las dependencias y librerias
RUN npm install

#Copiar los archivos del proyecto al contenedor
COPY . . 

#Exponer el puerto 8006
EXPOSE 3000

#Comando para iniciar el proyecto
CMD [ "npm", "start" ]

Luego se crea el archivo docker-compose.yml, este se lo crea en la raiz de la carpeta './',aqui tambien se agrega un servicio para la base de datos en este caso MySQL 

# DOCKER COMPOSE	
services:	
  frontend:	
    build:	
      context: ./ejercicio_auto# Dockerizacion
Programa de concecionaria de autos, frontend en nextjs, backend en nodejs y base de datos mysql

Backend: ./Auto  

Frontend: ./ejercicio_auto  



Para crear los contenedores para este proyecto primero se debe crear los Dockerfile dentro del backend y frontend.
a continuacion se presenta el formato que deben llevar estos archivos:  


# DOCKER FILE BACKEND

#Imagen base  

FROM node:20  


#direccion del proyecto  

WORKDIR /app  


#Copiar dependencias y librerias del proyecto
COPY package*.json ./

#Instalar las dependencias y librerias
RUN npm install

#Copiar los archivos del proyecto al contenedor
COPY . . 

#Exponer el puerto 8006
EXPOSE 3006

#Comando para iniciar el proyecto
CMD [ "npm", "start" ]


# DOCKER FILE FRONTEND**
#Imagen base
FROM node:20

#direccion del proyecto
WORKDIR /app

#Copiar dependencias y librerias del proyecto
COPY package*.json ./

#Instalar las dependencias y librerias
RUN npm install

#Copiar los archivos del proyecto al contenedor
COPY . . 

#Exponer el puerto 8006
EXPOSE 3000

#Comando para iniciar el proyecto
CMD [ "npm", "start" ]

Luego se crea el archivo docker-compose.yml, este se lo crea en la raiz de la carpeta './',aqui tambien se agrega un servicio para la base de datos en este caso MySQL 

#DOCKER COMPOSE
services:
  frontend:
    build:
      context: ./ejercicio_auto
      dockerfile: Dockerfile	
    ports:	
      - "3000:3000"	
    volumes:	  
      - ./ejercicio_auto:/app	
  backend:	
    build:	
      context: ./auto
      dockerfile: Dockerfile
    ports:
      - "3006:3006"
    volumes:  
      - ./auto:/app
    depends_on:
      - db
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: "1120"
      MYSQL_DATABASE: "bdAutos"
      MYSQL_USER: "desarrollo"
      MYSQL_PASSWORD: "desarrollo"
    ports:
      - '3306:3306'
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:


  Finalmente luego de crear el docker compose se puede levantar el proyecto mediante los comandos:

-comando para levantar el proyecto: sudo docker-compose up --build

  url backend: http://localhost:3006/api
  url frontend: http://localhost:3000/sesion

**COMANDO PARA INICIALIZAR LA BD:**
para inicializar la base de datos es necesario dirigirse a la siguiente ruta: localhost:3006/privado/POU-9865-VHKTUY			
      dockerfile: Dockerfile
    ports:
      - "3000:3000"
    volumes:  
      - ./ejercicio_auto:/app
  backend:
    build:
      context: ./auto
      dockerfile: Dockerfile
    ports:
      - "3006:3006"
    volumes:  
      - ./auto:/app
    depends_on:
      - db
  db:
    image: mysql
    restart: always
    environment:
      MYSQL_ROOT_PASSWORD: "1120"
      MYSQL_DATABASE: "bdAutos"
      MYSQL_USER: "desarrollo"
      MYSQL_PASSWORD: "desarrollo"
    ports:
      - '3306:3306'
    volumes:
      - db-data:/var/lib/mysql
volumes:
  db-data:


  Finalmente luego de crear el docker compose se puede levantar el proyecto mediante los comandos:

-comando para levantar el proyecto: sudo docker-compose up --build

  url backend: http://localhost:3006/api
  url frontend: http://localhost:3000/sesion

**COMANDO PARA INICIALIZAR LA BD:**
para inicializar la base de datos es necesario dirigirse a la siguiente ruta: localhost:3006/privado/POU-9865-VHKTUY




