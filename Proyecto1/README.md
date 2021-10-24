<h1> <b> Proyecto #1 - Sistemas Operativos 2 </b> </h1>

<h2> <b> Manual de Usuario </b> </h2>

![Github All Releases](https://img.shields.io/badge/Version-1.0-green)
![Github All Releases](https://img.shields.io/badge/Curso-Sistemas%20Operativos%202-blue)
![Github All Releases](https://img.shields.io/badge/Grupo-23-red)
![Github All Releases](https://img.shields.io/badge/Proyecto-1-orange)
![Java](https://img.shields.io/badge/Java-gray?style=flat-square&logo=java)

## **Descripción**

En los grupos establecidos del laboratorio, se les solicita a los estudiantes desarrollar las 
siguientes aplicaciones y resolver los siguientes problemas utilizando el lenguaje de 
programación Java; y, sobre todo, aplicando de forma correcta los conocimientos vistos en 
el laboratorio sobre programación concurrente y desarrollo de software con múltiples hilos. 
Deberá analizar cada uno de los problemas y desarrollar los algoritmos necesarios para su 
solución. 
Todos los problemas deberán contar con una interfaz gráfica o forma de visualizar el 
comportamiento de los mismos y cómo las operaciones con múltiples procesos influyen en 
ellos. Solamente se podrán utilizar las herramientas vistas en el laboratorio tales como: 
Thread Pools, Synchronized, ReentrantLock, etc. No se podrán utilizar otro tipo de 
estructuras concurrentes built-in en el lenguaje, se deberán desarrollar las propias. El uso 
de cualquier otra herramienta no vista en el laboratorio deberá ser consultado previo a su 
implementación para asegurar que se sigan cumpliendo los objetivos de la practica.

---

## **Contenido**

> * [Descripción de problemas](#Descripción-de-problemas)
>   * [Problema 1](#Problema-1)
>   * [Problema 2](#Problema-2)
>   * [Problema 3](#Problema-3)
> * [Análisis de problemas](#Análisis-de-problemas)
>   * [Problema 1](#Problema-1)
>   * [Problema 2](#Problema-2)
>   * [Problema 3](#Problema-3)
> * [¿Cómo utilizar cada aplicación?](#¿Cómo-utilizar-cada-aplicación?)
>   * [Problema 1](#Problema-1)
>   * [Problema 3](#Problema-3)
> * [Enlaces de herramientas utilizadas](#Enlazes-de-herramientas-utilizadas)
> * [Integrantes Grupo 23](#Integrantes-Grupo-23)

---

## **Descripción de problemas**

### **Problema 1**
#### *Centro Acopio*

Se tiene un centro en el cual se reciben y se entregan cajas con productos, el centro tiene una 
estantería con una capacidad máxima de 20 espacios. Existen dos puertas grandes: una para 
las personas que llegan a dejar su respectiva caja (cada persona lleva 1 caja) y la otra para las 
que llegan a retirar (cada persona puede retirar 1 caja). 

Las cajas pueden ser pequeñas o grandes. Las pequeñas ocupan 1 espacio, y las grandes 
ocupan 2 espacios de la estantería. No existe una distinción de prioridad entre los tipos de 
cajas y su derecho a la estantería.

Múltiples personas pueden llegar al mismo tiempo al centro de acopio y pueden 
simultáneamente colocar cada una de ellas su caja en los lugares vacíos de la estantería, si la 
estantería está llena no pueden entregar sus cajas y deben esperar a que lleguen personas a 
recoger para que existan espacios vacíos para colocar la caja que llevan. De una forma similar, 
múltiples personas pueden llegar al centro y simultáneamente retirar cada una de ellas una 
caja de la estantería, si la estantería está vacía deben esperar a que lleguen personas a dejar 
cajas para entonces retirar. 

Se debe modelar y desarrollar un sistema capaz de representar este comportamiento con las 
restricciones del negocio que sean obvias y lógicas, algunos ejemplos de estas son: 

* Múltiples personas no pueden colocar su caja en el mismo espacio de la estantería.
* Múltiples personas no pueden retirar la misma caja de la estantería.
* Las personas deben colocar su caja en cualquier espacio disponible, no esperar a que un 
lugar especifico de la estantería se desocupe.
* Las personas deben retirar una caja de cualquier espacio disponible, no esperar a que un 
lugar especifico reciba una caja.

Además de modelar todas las interacciones, la aplicación deberá mostrar:

* Numero de espacios ocupados actualmente.
* Numero de cajas pequeñas colocadas.
* Numero de cajas grandes colocadas.
* Numero de cajas pequeñas retiradas.
* Numero de cajas grandes retiradas.

Parámetros modificables durante ejecución:

* Frecuencia de llegadas de productores de cajas pequeñas.
* Frecuencia de llegadas de productores de cajas grandes.
* Frecuencia de llegadas de consumidores de cajas pequeñas.
* Frecuencia de llegadas de consumidores de cajas grandes

### **Problema 2**
#### *El barbero Dormilón*
Existe una barbería en donde el barbero que la atiende corta el cabello a los clientes que 
llegan y cuando no hay ninguno, se pone a dormir. El barbero tiene una silla para cortar el 
cabello a donde atiende a un cliente y una sala de espera con 20 sillas en donde pueden
sentarse los clientes que llegan mientras esperan. Cuando el barbero termina de cortar el 
cabello a un cliente, regresa a la sala de espera a ver si hay personas esperando, si las hay 
trae consigo a una persona para cortarle el cabello. Si no hay clientes esperando, se pone a 
dormir en la silla para cortar cabello. 

Cada cliente que llega a la barbería observa lo que el barbero está haciendo. Si el barbero se 
encuentra durmiendo, el cliente lo despierta y se sienta en la silla para cortar el cabello. Si el 
barbero está cortando el pelo a alguien, entonces el cliente se coloca en una silla de la sala 
de espera. Si no hay sillas disponibles, entonces el cliente se va del lugar.

Se deberá desarrollar el software que modele el problema e implementar los algoritmos 
necesarios para solucionar los posibles problemas que puedan existir al ejecutarse múltiples 
procesos. 

Además de modelar todas las interacciones, la aplicación deberá mostrar:

* Conteo de clientes que han visitado la barbería.
* Conteo de clientes que visitaron la barbería y se fueron sin esperar.
* Conteo de clientes que han completado su corte de cabello.
* Conteo de clientes actuales en la sala de espera.

Parámetros modificables durante ejecución:

* Frecuencia de llegadas de clientes.
* Tiempo que el barbero se toma para cortar el cabello de un cliente.

### **Problema 3**
#### *Space Invaders*
Se deberá desarrollar un video juego similar al clásico “Space Invaders” de 1978, pero en 
esta ocasión será para 2 jugadores, se aconseja ver videos, referencias o directamente jugar 
un poco con el videojuego en internet para tener una mejor idea de lo que se solicita. 

Básicamente se tendrá una pantalla en la cual en la parte superior irán apareciendo naves 
enemigas que irán descendiendo por la pantalla, cada una de ellas con “2 puntos de vida”, 
estas deberán ir apareciendo de forma aleatoria en la parte superior de la pantalla y cada 25 
segundos irán apareciendo con más frecuencia. En la parte inferior se tendrán 2 naves, las 
cuales son aliadas y controladas por los jugadores, estas naves solamente se podrán mover 
de forma horizontal. Los comandos serán las siguientes teclas, para la primera nave: “A” -
Izquierda, “S” - Disparar, “D” - Derecha; para la segunda nave: “J” - Izquierda, “K” - Disparar,
“L” - Derecha. 

Al momento de disparar se lanza un rayo de la nave y al impactar con un enemigo, se 
descuenta 1 punto de vida de este, al impactar por segunda vez, la nave enemiga desaparece. 
Las naves aliadas tendrán 3 puntos de vida cada una, se pierde una vida si un enemigo impacta 
en una nave o si un enemigo no es destruido y escapa en la parte inferior de la pantalla. Si un 
jugador pierde todas sus vidas desaparece de la pantalla, pero su compañero puede 
continuar.

Las naves de los jugadores pueden moverse a cualquier distancia de forma horizontal, pero 
no pueden traslaparse, ni pasar una encima de la otra al moverse de forma horizontal, es 
decir no pueden colisionar y se restringen entre ellas el área en la cual pueden moverse.

---

## **Análisis de problemas**

### **Problema 1**

### **Problema 2**



### **Problema 3**

---

## **¿Cómo utilizar cada aplicación?**

### **Problema 1**

### **Problema 3**

--- 

## **Enlaces de herramientas utilizadas**

- [Java](https://www.java.com/es/)
- [Apache Netbeans](https://netbeans.apache.org)
- [Hilos Java](https://jarroba.com/multitarea-e-hilos-en-java-con-ejemplos-thread-runnable/)


---

## **Integrantes Grupo 23**

| Nombre Completo | Carnet |
| :----: | :----: |
| Diana Cecilia Menéndez Castillo | 201700324 |
| Luis Fernando Arana Arias | 201700988 |
