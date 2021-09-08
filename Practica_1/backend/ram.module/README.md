# Modulo de RAM

Modulo programado en lenguaje C que se almacena en el kernel ```/proc``` y que revisa el estado de la memoria RAM.

## Herramientas utilizadas

1. C
2. Distro linux

## Implementación

```NOTA: Al alterar el kernel, corres el riesgo de perder datos y dañar el sistema. Si tienes alguna falla, bloqueará todo el sistema```

1. Debemos instalar la siguiente librería para poder ejecutar ciertos comandos.

    ```
    $ apt-get install build-essential
    $ apt-get install linux-headers-$(uname-r)
    $ sudo apt-get install flex
    $ sudo apt-get install bison
    ```

2. Después de configurar los archivos ```Makefile``` y ```ram-module.c``` debemos ejecutar el comando para compilar.

    ```
    $ sudo make 
    ```

3. Esto genera una serie de archivos, la salida al ejecutar ```$ ls``` debe parecerses a la siguinte:

    ```
    Makefile        built-in.a     ram-module.c   ram-module.mod    ram-module.mod.o
    Module.symvers  modules.order  ram-module.ko  ram-module.mod.c  ram-module.o
    ```

4. Ahora ejecutamos el comando para iniciar el modulo:

    ```
    $ sudo insmod ram-module.ko
    ```

5. Verificamos que el modulo se inicio con el comando:

    ```
    $ dmesg
    ```

    Debe mostrar el mensaje que colocamos en el inicio del modulo.

6. Nos vamos al directorio ```$ cd /proc``` para poder ver el archivo ```mem_grupo23``` el cual al aplicarle el comando cat podemos ver su contenido.

7. Para terminar con un modulo el comando es el siguiente:

    ```
    $ sudo rmmod ram-module
    ```