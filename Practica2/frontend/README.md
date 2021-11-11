<h1> <b> Práctica #2 - Sistemas Operativos 2 </b> </h1>

<h2> <b> Frontend </b> </h2>

![Github All Releases](https://img.shields.io/badge/Version-1.0-green)
![Github All Releases](https://img.shields.io/badge/Curso-Sistemas%20Operativos%202-blue)
![Github All Releases](https://img.shields.io/badge/Grupo-23-red)
![Github All Releases](https://img.shields.io/badge/Practica-2-orange)
![Javascript](https://img.shields.io/badge/Javascript-gray?style=flat-square&logo=javascript)
![Express](https://img.shields.io/badge/Express-gray?style=flat-square&logo=express)
![Mongo DB Atlas](https://img.shields.io/badge/Mongo_DB_Atlas-gray?style=flat-square&logo=mongoDB)
![Kubernetes](https://img.shields.io/badge/Kubernetes-gray?style=flat-square&logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-gray?style=flat-square&logo=docker)
![GCP](https://img.shields.io/badge/Google_Cloud-gray?style=flat-square&logo=googlecloud)

---

## **Contenido**

> * [Despliegue](#Despliegue)
>   * [Archivos para desplegar aplicación](#Archivos-para-desplegar-aplicación)
>   * [Comandos para desplegar aplicación](#Comandos-para-desplegar-aplicación)
> * [Getting Started with Create React App](#Getting-Started-with-Create-React-App)

---

## **Despliegue**

### **Archivos para desplegar aplicación**

Para desplegar la nuestro Frontend en Kubernetes se utilizó un archivo dockerfile, un deploy.yml y un service.yml para poder levantarlo en un cluster.

Nuestro ```Dockerfile``` se compone de la siguiente forma:

```dockerfile
    FROM node:14 as build
    WORKDIR /usr/local/app
    COPY ./ /usr/local/app/
    RUN npm install
    RUN npm run build

    FROM nginx:latest
    WORKDIR /usr/share/nginx/html
    COPY --from=build /usr/local/app/build .
    COPY ./nginx.conf /etc/nginx/conf.d/default.conf
    EXPOSE 80
```

Con el *FROM* extraemos una versión de node para generar el build de nuestra aplicación para posteriormente levantar un servidor nginx y montar nuestra app y exponerla desde ese servidor. Necesitamos el archivo nginx.conf para poder realizar la configuración de nuestro server, el cual es el siguiente:

```conf
    server {
        listen 80;
        location / {
            root /usr/share/nginx/html;
            index index.html index.htm;
            try_files $uri $uri/ /index.html =404;
        }
    }
```

Nuestro archivo ```deploy.yml``` sirve para levantar nuestros pods del frontend, teniendo la siguiente estructura:

```yml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
        name: frontend
    spec:
        replicas: 2
        selector:
            matchLabels:
                role: frontend
        minReadySeconds: 20
        strategy:
            rollingUpdate:
                maxSurge: 1
                maxUnavailable: 0
            type: RollingUpdate
        template:
            metadata:
                labels:
                    role: frontend
            spec:
                containers:
                - name: frontend
                    image: dianmz22/frontend:[version]
                    ports:
                    - containerPort: 80
```

El archivo nos muestra la versión que le queremos asignar a nuestro deployment y el tipo de archivo yaml/yml que deseamos utilizar, en este caso será un tipo Deployment, le colocamos la cantidad de replicas que necesitamos en este caso serán 2, y le agregamos la estrategia RollingUpdate que nos permite actualizar el sistema Kubernetes con solo un efecto menor en el rendimiento y sin tiempo de inactividad. En esta estrategia, la implementación selecciona un Pod con la programación anterior, lo desactiva y crea un Pod actualizado para reemplazarlo. 

Para finalizar los archivos necesitamos el archivo del ```service.yml``` para poder generar nuestro balanceador de cargas de los pods generados con el archivo deploy. La estructura del archivo es el siguiente:

```yml
    apiVersion: v1
    kind: Service
    metadata:
        name: frontend-lb
    spec:
        type: LoadBalancer
        ports:
            - protocol: TCP
            port: 80
            targetPort: 80
            name: http
        selector:
            role: frontend
```

La diferencia con el archivo anterior es que acá el tipo a levantar es un servicio, y el servicio es de tipo LoadBalancer.

### **Comandos para desplegar aplicación**

Los comandos necesarios para levantar nuestra aplicación en Kubernetes son los siguientes:

* Primero debemos crear nuestra imágen de docker con el archivo Dockerfile:

    ```$ docker build -t [docker_hub_user]/frontend .```

* Ahora debemos subir nuestra imágen a Docker HUB:

    ```$ docker push [docker_hub_user]/frontend```

* Debemos seleccionar el namespace en el que queremos realizar el despliegue de nuestra aplicación:

    ```$ kubectl config set-context --current --namespace=[name]```

* Realizamos el deploy de nuestros pods con el siguiente comando:

    ```$ kubectl apply -f deploy.yml```

* Debemos esperar a que nuestros pods se levanten correctamente y posteriormente levantamos nuestro servicio con el siguiente comando:

    ```$ kubectl apply -f service.yml```

* Y listo ya hemos levantado nuestro frontend en kubernetes

* Para cambiar imágen de nuestro frontend lo único que debemos hacer es ejecutar el siguiente comando:

    ```$ kubectl set image deployment/frontend frontend=[nueva imagen]```

* Para regresar a una versión anterior de nuestro frontend utilizamos el siguiente comando:

    ```$ kubectl rollout undo deployment/frontend```

* Para eliminar un deployment se utiliza el siguiente comando:

    ```$ kubectl delete deployment frontend```

* Para eliminar un service se utiliza el siguiente comando:

    ```$ kubectl delete service frontend-lb```

---

## **Getting Started with Create React App**

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
