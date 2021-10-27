<h1> <b> Proyecto #1 - Sistemas Operativos 2 </b> </h1>

<h2> <b> Manual de Técnico </b> </h2>

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
> * [Hardware](#Hardware)
> * [Software](#Software)
> * [Análisis de problemas](#Análisis-de-problemas)
>   * [Problema 1](#Problema-1)
>   * [Problema 2](#Problema-2)
>   * [Problema 3](#Problema-3)
> * [¿Cómo utilizar cada aplicación?](#¿Cómo-utilizar-cada-aplicación?)
>   * [Problema 1](#Problema-1)
>   * [Problema 3](#Problema-3)
> * [Código](#Código)
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

## **Hardware**

* Espacio disponible 20GB mínimo
* 8GB memoria RAM
* Procesador Intel Core i5-9300h

---

## **Software**

* Sistema operativo a discreción 
* Java Versión 8
* Apache Netbeans 12.5

---

## **Análisis de problemas**

### **Problema 1**

Los *recursos compartidos* para el problema 1, se determinó que los espacio disponibles en la estantería es uno de dichos recursos, al igual que las cantidades de cajas que se dejan y se extraen.

*Deadlock* es el problema que se puede presentar en la ejecución, como bien sabemos que deadlock es cuando 2 o más hilos se bloquean mutuamente, en un ambiente concurrente. Al momento de no tener espacio en la estantería se bloquena los hilos con los procesos producir y consumir.

Para poder solucionar dicho problema debemos bloquear el acceso a ciertos atributos para que un hilo pueda terminar el proceso y que no se genere el problema del deadlock. 

Las clases que analizamos para generar la solución son las siguientes, donde 4 clases son hilos:

* Consumidor Caja Grande
* Consumidor Caja Pequeña
* Productor Caja Grande
* Productore Caja Pequeña

![ClasesProblema1](https://i.ibb.co/Rp4QSff/imagen-2021-10-25-005619.png)

Para ejemplificar el flujo que llevan los hilos en dicha solución se puede visualizar en el siguiente diagrama de flujo:

![FlujoProblema1](https://i.ibb.co/D1NSk1F/imagen-2021-10-26-205859.png)

![Flujo2Problema1](https://i.ibb.co/fkLfkcw/imagen-2021-10-26-210024.png)

Podemos ver el proceso que se maneja en cada hilo. Ahora para poder sincronizar los diferentes hilos que componen nuestra solución, en nuestra clase lista_cajas, el cuál maneja toda la lógica de la aplicación tiene los siguientes atributos:

```java
    ReentrantLock lock = new ReentrantLock();
    Condition notFull = lock.newCondition();
    Condition notEmpty = lock.newCondition();
```

Que nos sirve para bloquear los espacios, ya que son los atributos que se comparten entre los hilos.

Para agregar una caja a la estantería se utiliza el siguiente método:

```java
    try{
            this.lock.lock();
            while(this.lista.size() == maxSize){
                this.notFull.await();
            }
            i = this.lista.size() + 1;
            this.lista.add(i);
            this.notEmpty.signalAll();
        }catch(Exception e){
            
        }finally{
            this.lock.unlock();
            pintar();
            this.cant_peques_prod++;
            this.lbl_peques_colocadas.setText(String.valueOf(this.cant_peques_prod));
            this.espacios_ocupados++;
            this.lbl_espacios.setText(String.valueOf(this.espacios_ocupados));
            return i;
        }      
```

Donde podemos ver la parte más importante que hace un lock para poder agregar la caja a la estantería, y así evitar el error mencionado anteriormente, para realizar la extracción es un método parecido, solo que en lugar de agregar, elimina de la lista.

```java
    try{
            this.lock.lock();
            while(this.lista.size() == 0){
                this.notEmpty.await();
            }
            i = this.lista.removeLast();
            this.notFull.signalAll();
            
        }catch(Exception e){
            
        }finally{
            this.lock.unlock();
            pintar();
            this.cant_peques_cons++;
            this.lbl_peques_retiradas.setText(String.valueOf(this.cant_peques_cons));
            this.espacios_ocupados--;
            this.lbl_espacios.setText(String.valueOf(this.espacios_ocupados));
            return i;
        } 
```

### **Problema 2**

El barbero es un *recurso compartido*, ya que es la persona que atiende a los clientes. Y como los clientes pueden ir llegando de forma aleatoria con el mismo objetivo, dando como resultado una condición de carrera.

*Condición de carrera*, se puede presentar cuando muchos clientes quieren ser atendidos por el barbero, cuando el barbero solo puede atender un cliente a la vez.

Debemos realizar la *exclusión mutua* que surge con el barbero cuando los clientes llegan por un corte de cabello.

Para poder solucionar los problemas mencionados, podemos utilizar estados, banderas o variables. Un estado que simboliza la silla del barbero (libre, ocupado), un contador para la cantidad de clientes en la sala de espera, un estado para simbolizar las sillas de espera (libre, ocupado), también necesitamos de un contador de sillas libres en el área de espera, podemos detectar que la solución se divide en dos clases, los clientes y el barbero, con sus respectivas funciones. La función *syncronized()* nos ayudará a bloquear la lista de clientes actuales en la barbería para que no pueda ser accedida por otro hilo hasta que termine el proceso, y así evitar la condición de carrera.

El orden para que el barbero pueda realizar su trabajo es el siguiente: 

* Esperar un hilo cliente para poder despertar y trabajar
* Extrae a un cliente de la sala de espera aumentando la cantidad de sillas disponibles en la sala y cambiando de estado a ocupado.
* Desbloquear aacceso a las sillas libres.
* Corta el cabello del cliente y vuelve a revisar la sala de espera, si hay un cliente se duerme y sino realizar lo mismo del paso dos.

El orden para que los clientes sean atendidos por el barbero es el siguiente:

* Esperar a que el número de sillas libres sea mayor a 0
* Si hay sillas libres, toma asiento y si es el único cliente despierta al barbero, sino espera su turno.
* Si no hay sillas libres, desbloquear el acceso a la cantidad de sillas libres.

Las relaciones entre las clases que se proponen para dar solución al problema se describen en el siguiente diagrama:

![ClasesProblema2](https://i.ibb.co/02X2JH8/imagen-2021-10-25-000912.png)

Sabemos que el barbero estará chequeando la creación de algún hilo cliente para poder empezar a trabajar, realizando el metodo cortar_cabello, sino ejecuta el método dormir para cambiar su estado. 

Ahora para ejemplificar de mejor manera el flujo de los hilos se muestra el siguiente diagrama:

![FlujoProblema2](https://i.ibb.co/XzpTvMb/imagen-2021-10-25-002246.png)

![Flujo2Problema2](https://i.ibb.co/b706d5J/imagen-2021-10-25-002619.png)

Podemos ver el proceso que manejaría cada hilo para poder dar solución al problema.

### **Problema 3**

Los *hilos* que se detectaron para poder desarrollar el problema fueron los siguientes: hilo para manejar el tiempo, hilo para los jugadores, el hilo de cada disparo y por ultimo el hilo de cada enemigo. En el siguiente diagrama de clases podemos ver las clases generadas para la implementación. 

![ClasesProblema3](https://i.ibb.co/gVw2kr7/imagen-2021-10-26-235506.png)

En el diagram podemos ver como todas las clases son abstracciones hacia la clase listaEnemigo que es la controladora de la lógica del juego.

Como *recursos compartidos* Los enemigos ya que ambos usuarios pueden disparar al mismo enemigo y también el tiempo es un recurso compartido por todos los hilos de la aplicación.

A continuación vemos el diagrama de flujo de los diferentes sucesos del juego:

![FlujoProblema3](https://i.ibb.co/9V32NH7/imagen-2021-10-27-002223.png)

![Flujo2Problema3](https://i.ibb.co/wc6qqpW/imagen-2021-10-27-002427.png)

![Flujo3Problema3](https://i.ibb.co/9NKncmM/imagen-2021-10-27-005423.png)

![Flujo4Problema3](https://i.ibb.co/TBfqXSP/imagen-2021-10-27-004334.png)

Los problemas que se pueden presentar a la hora de utilizar hilos son los siguientes, la *inconsistencia de los datos* cuando no se sincronizan de forma correcta todos los hilos de nuestra aplicación modificando algún valor en un tiempo incorrecto. También entre los errores se puede llegar a presentar una *condición de carrera* como el del barbero esta vez en la generación de enemigos y la de balas. Para poder solucionar dichos problemas y también realizar la sincronización de todo el sistema se utilizaron los siguientes metodos:

```java
    public void generarEnemigos() throws InterruptedException{    
        this.posY+=10;
        this.lbl_enemigo.setLocation(this.posX,this.posY);
        this.panel.repaint();
        validarVidas();
        Thread.sleep(400);
    }
```

El código anterior nos sirve para poder generar un enemigo en una posición aleatoria para poder después dormir dicho hilo y generar un nuevo enemigo. 

```java
    public void generarBalitas() throws InterruptedException{
        this.posY-=10;
        this.lbl_bala.setLocation(this.posX,this.posY);
        this.panel.repaint();
        colision();
        Thread.sleep(300);
    }
```

Para generar balas es igual el código que se utiliza donde se genera la imagen de la bala y se duerme el hilo.



---

## **¿Cómo utilizar cada aplicación?**

### **Problema 1**

![InterfazProblema1](https://i.ibb.co/SnrjphQ/imagen-2021-10-26-211547.png)

La aplicación es bastante intuitiva, en la imágen anterior podemos observar la estantería representada por una barra café, y las cafas que van llegando, se dibuja una caja cuando es pequeña y dos cuando es grande.

El enunciado nos dice que se van creando los hilos de ambos tipos, consumidores y productores, y si no encuentran la acción a realizar, deben esperar hasta tener una caja o espacio disponible.

En la parte inferior tenemos un HUD donde nos muestra como ha estado reaccionando nuestra aplicación, mostrando el total de cajas colocadas y extraídas, de ambos tamaños. También tenemos el botón de pausar y reanudar la ejecución del programa.

En la parte derecha de la aplicación tenemos un formulario donde podemos cambiar el valor de las variables, con un botón de modificar, para cambiar la frecuencia en que se producen los hilos.

### **Problema 3**

![InterfazProblema3](https://i.ibb.co/j4TmfDn/imagen-2021-10-27-014036.png)

El juego space invaders es muy entretenido, al igual que es muy sencillo el manejo de las naves, siendo ASD para controlar al jugador de la izquierda y JKL para el jugador de la derecha, A y J para mover al jugador a la izquierda, D y L para mover al jugador a la derecha y por último K y S para dispararle a los enemigos, la mecánica del juego es destruir todas las naves y no permitir que choquen contigo o que lleguen al suelo. 

Para poder pausar el juego puedes presionar la tecla p y para reanudar la tecla r, el juego termina cuando pierden 3 vidas.

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
