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

Para aplicar el monitoreo de la aplicacion en kubernetes utilizamos *prometheus* para almacenar los datos y metricas como series temporales y *grafana* para la visualizacion y formato de los mismos. Para poder integrarlo a la aplicacion utilizamos *servicios* y *deploys* a traves de configuraciones con archivos *.yml*. 

### **Prometheus**

Para poder llevar a cabo la configuracion de las metricas utilizamos *Node Exporter* los cuales son una serie de programas que permiten obtener una serie de metricas y brindarlas en un formato en el que Prometheus pueda leer. Para poder aplicarlo realizamos un deploy a traves del archivo ```node-exporter-deploy.yml``` el cual contiene los siguientes comandos:

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: nodeexporter
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      role: nodeexporter
  template:
    metadata:
      labels:
        role: nodeexporter
    spec:
      containers:
      - name: nodeexporter
        image: prom/node-exporter
        ports:
        - containerPort: 9090
```

Adicionalmente, para poder acceder al deploy creado se utilizo un servicio en el cual se expone el puerto del contenedor que apunta al deploy creado para el *Node Exporter* a traves del archivo ```node-exporter-service.yml``` el cual contiene todas las instrucciones siguientes:

```yml
apiVersion: v1
kind: Service
metadata:
  name: nodeexporter-service
  namespace: default
spec:
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9100
      name: http
  selector:
    role: nodeexporter

```

Para poder desplegar *Prometheus* haciendo uso de las configuraciones del *Node Exporter* fue necesario crear un archivo de configuraciones ```prometheus-configmap.yml``` el cual es un objeto que la API utiliza para almacenar datos no confidenciales de tipo clave-valor. En este caso se utilizaron se definieron variables globales, ficheros de configuracion, alertmanagers, entre otros. Este archivo se muestra a continuacion:

```yml
apiVersion: v1
kind: ConfigMap
metadata:
  name: prometheus-server-conf
  labels:
    name: prometheus-server-conf
  namespace: default
data:
  prometheus.rules: |-
    groups:
    - name: devopscube demo alert
      rules:
      - alert: High Pod Memory
        expr: sum(container_memory_usage_bytes) > 1
        for: 1m
        labels:
          severity: critical
        annotations:
          summary: High Memory Usage
  prometheus.yml: |-
    global:
      scrape_interval: 5s
      evaluation_interval: 5s
    rule_files:
      - /etc/prometheus/prometheus.rules
    alerting:
      alertmanagers:
      - scheme: http
        static_configs:
        - targets:
          - "alertmanager.monitoring.svc:9093"

    scrape_configs:
      - job_name: 'node-exporter'

        static_configs:
          - targets: ['10.44.10.44:80']

      - job_name: 'kubernetes-apiservers'

        kubernetes_sd_configs:
        - role: endpoints
        scheme: https

        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        relabel_configs:
        - source_labels: [__meta_kubernetes_namespace, __meta_kubernetes_service_name, __meta_kubernetes_endpoint_port_name]
          action: keep
          regex: default;kubernetes;https

      - job_name: 'kubernetes-nodes'

        scheme: https

        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:
        - role: node

        relabel_configs:
        - action: labelmap
          regex: __meta_kubernetes_node_label_(.+)
        - target_label: __address__
          replacement: kubernetes.default.svc:443
        - source_labels: [__meta_kubernetes_node_name]
          regex: (.+)
          target_label: __metrics_path__
          replacement: /api/v1/nodes/${1}/proxy/metrics

      
      - job_name: 'kubernetes-pods'

        kubernetes_sd_configs:
        - role: pod

        relabel_configs:
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_pod_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_pod_annotation_prometheus_io_port]
          action: replace
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
          target_label: __address__
        - action: labelmap
          regex: __meta_kubernetes_pod_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_pod_name]
          action: replace
          target_label: kubernetes_pod_name

      - job_name: 'kubernetes-cadvisor'

        scheme: https

        tls_config:
          ca_file: /var/run/secrets/kubernetes.io/serviceaccount/ca.crt
        bearer_token_file: /var/run/secrets/kubernetes.io/serviceaccount/token

        kubernetes_sd_configs:
        - role: node

        relabel_configs:
        - action: labelmap
          regex: __meta_kubernetes_node_label_(.+)
        - target_label: __address__
          replacement: kubernetes.default.svc:443
        - source_labels: [__meta_kubernetes_node_name]
          regex: (.+)
          target_label: __metrics_path__
          replacement: /api/v1/nodes/${1}/proxy/metrics/cadvisor
      
      - job_name: 'kubernetes-service-endpoints'

        kubernetes_sd_configs:
        - role: endpoints

        relabel_configs:
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scrape]
          action: keep
          regex: true
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_scheme]
          action: replace
          target_label: __scheme__
          regex: (https?)
        - source_labels: [__meta_kubernetes_service_annotation_prometheus_io_path]
          action: replace
          target_label: __metrics_path__
          regex: (.+)
        - source_labels: [__address__, __meta_kubernetes_service_annotation_prometheus_io_port]
          action: replace
          target_label: __address__
          regex: ([^:]+)(?::\d+)?;(\d+)
          replacement: $1:$2
        - action: labelmap
          regex: __meta_kubernetes_service_label_(.+)
        - source_labels: [__meta_kubernetes_namespace]
          action: replace
          target_label: kubernetes_namespace
        - source_labels: [__meta_kubernetes_service_name]
          action: replace
          target_label: kubernetes_name
```

Para poder desplegar la aplicacion de *Prometheus* y las configuraciones anteriormente aplicadas, se utilizo el archivo de ```prometheus-deploy.yml``` con las siguientes instrucciones:

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: prometheus-deployment
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      app: prometheus-server
  template:
    metadata:
      labels:
        app: prometheus-server
    spec:
      containers:
        - name: prometheus
          image: prom/prometheus
          args:
            - "--config.file=/etc/prometheus/prometheus.yml"
            - "--storage.tsdb.path=/prometheus/"
          ports:
            - containerPort: 9090
          volumeMounts:
            - name: prometheus-config-volume
              mountPath: /etc/prometheus/
            - name: prometheus-storage-volume
              mountPath: /prometheus/
      volumes:
        - name: prometheus-config-volume
          configMap:
            defaultMode: 420
            name: prometheus-server-conf
  
        - name: prometheus-storage-volume
          emptyDir: {}
```

Finalmente, para poder visualizar las configuraciones y las metricas que se necesitaban se utilizo el archivo ```prometheus-service.yml``` en el cual se define un servicio de tipo *Load Balancer* para poder acceder de forma externa al mismo, ya que al hacer uso de *Grafana* este solicita accceso a la IP donde se encuentra instalado *Prometheus*, como se detalla a continuacion:

```yml
apiVersion: v1
kind: Service
metadata:
  name: prometheus-service
  namespace: default
spec:
  selector: 
    app: prometheus-server
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 9090
      name: http
```

### **Grafana**

Para poder visualizar y monitorear los datos solicitados se utilizo este software, debido a que las configuraciones de metricas se realizan directamente en *Prometheus* unicamente se realizo el respectivo deploy y servicio. Para el deploy se utilizo el archivo ```grafana-deploy.yml``` en el cual se tienen las siguientes instrucciones:

```yml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: grafana
  namespace: default
spec:
  replicas: 1
  selector:
    matchLabels:
      role: grafana
  template:
    metadata:
      labels:
        role: grafana
    spec:
      containers:
      - name: grafana
        image: grafana/grafana
        ports:
        - containerPort: 3000
```

Finalmente, se realizo un archivo ```grafana-service.yml``` para poder visualizar el monitoreo de la aplicacion:

```yml
apiVersion: v1
kind: Service
metadata:
  name: grafana-service
  namespace: default
spec:
  type: LoadBalancer
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000
      name: http
  selector:
    role: grafana
```

---

## **Enlaces de herramientas utilizadas**

- [React](https://es.reactjs.org/)
- [Kubernetes](https://kubernetes.io/es/docs/concepts/workloads/controllers/deployment/)
- [Grafana](https://grafana.com/)
- [Prometheus](https://prometheus.io/)

---

## **Integrantes Grupo 23**

| Nombre Completo | Carnet |
| :----: | :----: |
| Diana Cecilia Menéndez Castillo | 201700324 |
| Luis Fernando Arana Arias | 201700988 |
