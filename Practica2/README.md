<h1> <b> Práctica #2 - Sistemas Operativos 2 </b> </h1>

<h2> <b> Manual de Tecnico </b> </h2>

![Github All Releases](https://img.shields.io/badge/Version-1.0-green)
![Github All Releases](https://img.shields.io/badge/Curso-Sistemas%20Operativos%202-blue)
![Github All Releases](https://img.shields.io/badge/Grupo-23-red)
![Github All Releases](https://img.shields.io/badge/Practica-2-orange)
![React](https://img.shields.io/badge/React-gray?style=flat-square&logo=react)
![Javascript](https://img.shields.io/badge/Javascript-gray?style=flat-square&logo=javascript)
![Express](https://img.shields.io/badge/Express-gray?style=flat-square&logo=express)
![Mongo DB Atlas](https://img.shields.io/badge/Mongo_DB_Atlas-gray?style=flat-square&logo=mongoDB)
![Kubernetes](https://img.shields.io/badge/Kubernetes-gray?style=flat-square&logo=kubernetes)
![Docker](https://img.shields.io/badge/Docker-gray?style=flat-square&logo=docker)
![GCP](https://img.shields.io/badge/Google_Cloud-gray?style=flat-square&logo=googlecloud)

## **Descripción**

Se debe desplegar una pequeña aplicación web. Haciendo uso de tecnologías como Docker y 
Kubernetes, se busca agilizar el escalamiento y despliegue de la aplicación. Adicionalmente, se 
busca implementar tecnologías de monitorización para tener un panorama claro del estado de 
los recursos que consume nuestra aplicación.

---

## **Contenido**

> * [Descripción](#Descripción)
> * [Despliegue Frontend](#Despliegue-Frontend)
> * [Despliegue Backend](#Despliegue-Backend)
> * [Enlaces de herramientas utilizadas](#Enlaces-de-herramientas-utilizadas)
> * [Monitoreo con prometheus y grafana](#Monitoreo-con-prometheus-y-grafana)
> * [Comandos generales utilizados en Kubernetes](#Comandos-generales-utilizados-en-Kubernetes)
> * [Integrantes Grupo 4](#Integrantes-Grupo-4)

---

## **Despliegue Frontend**

Para conocer más información sobre el despliegue del [frontend](https://github.com/LuisArana631/SistemasOperativos2/tree/master/Practica2/frontend) dirigete a la carpeta.

---

## **Despliegue Backend**

Para conocer más información sobre el despliegue del [backend](https://github.com/LuisArana631/SistemasOperativos2/tree/master/Practica2/backend) dirigete a la carpeta.

---

## **Comandos generales utilizados en Kubernetes**

Para poder visualizar todos los *pods* que se encuentran en nuestro cluster de Kubernetes utilizamos el siguiente comando:

```
    $ kubectl get pods
```

Para visualizar todos los *servicios* que se han desplegado en nuestro cluster de Kubernetes utilizamos el siguiente comando:

```
    $ kubectl get services
```

Para visualizar todos los *deploys* realizados en nuestro cluster de Kubernetes utilizamos el siguiente comando:

```
    $ kubectl get deployments
```

Para visualizar los *namespaces* en nuestro cluster de Kubernetes utilizamos el comando:

```
    $ kubectl get namespaces
```

Para crear un *namespace* en nuestro cluster de Kubernetes utilizamos el comando:

```
    $ kubectl create namespace [name]
```

Para desplegar el replica set de nuestro cluster de Kubernetes ejecutamos:

```
    $ kubectl get rs
```
---

## **Monitoreo con prometheus y grafana**



---

## **Enlaces de herramientas utilizadas**

- [React](https://es.reactjs.org/)
- [Kubernetes](https://kubernetes.io/es/docs/concepts/workloads/controllers/deployment/)

---

## **Integrantes Grupo 23**

| Nombre Completo | Carnet |
| :----: | :----: |
| Diana Cecilia Menéndez Castillo | 201700324 |
| Luis Fernando Arana Arias | 201700988 |
