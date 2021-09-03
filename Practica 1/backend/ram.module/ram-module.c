    /* Luis Fernando Arana Arias - 201700988 */
    /* Diana Cecilia Menendez Castillo - 201700324 */
    /* Librerias para crear el modulo lector del estado de la memoria RAM */

    #include <linux/module.h>
    #include <linux/proc_fs.h>
    #include <linux/fs.h>
    #include <linux/sysinfo.h>
    #include <linux/seq_file.h>
    #include <linux/mm.h>
    #include <linux/kernel.h>
    #include <linux/cpufreq.h>
    #include <linux/cpumask.h>

    /* Obtener ram info */
    static int my_proc_show(struct seq_file *m, void *v)
    {
        struct sysinfo i;
        int32_t totalRam, freeRam, usedRam, sharedRam, bufferRam, porcentaje;

        si_meminfo(&i);
        totalRam = (i.totalram * i.mem_unit)/(1024*1024);
        freeRam = (i.freeram * i.mem_unit)/(1024*1024);
        sharedRam = (i.sharedram * i.mem_unit)/(1024*1024);
        bufferRam = (i.bufferram * i.mem_unit)/(1024*1024);
        usedRam = totalRam - freeRam - sharedRam - bufferRam; 
        porcentaje = (usedRam * 100)/totalRam;

        /* Información a mostrar { Total, Usado/Cache, Libre, Shared, Buffer, Porcentaje } */
        seq_printf(m, "{\"totalRam\":%d,\"usedRam\":%d,\"freeRam\":%d,\"sharedRam\":%d,\"bufferRam\":%d,\"porcentaje\":%d}", totalRam, usedRam, freeRam, sharedRam, bufferRam, porcentaje);

        return 0;
    }

    /* Escribir proc file */
    static ssize_t my_proc_write(struct file *file, const char __user *buffer, size_t count, loff_t *f_pos)
    {
        return 0;
    }

    /* Abrir proc file */
    static int my_proc_open(struct inode *inode, struct file *file)
    {
        return single_open(file, my_proc_show, NULL);
    }

    /* Struct para funciones del archivo */
    static struct file_operations my_fops = {
        .owner = THIS_MODULE,
        .open = my_proc_open,
        .release = single_release,
        .read = seq_read,
        .llseek = seq_lseek,
        .write = my_proc_write
    };

    /* Método para ejecutar cuando se inicia el modulo */
    static int __init test_init(void)
    {
        struct proc_dir_entry *entry;
        entry = proc_create("mem_grupo23", 0777, NULL, &my_fops);
        if (!entry)
        {
            return -1;
        }
        else
        {
            printk(KERN_INFO "\n\nHola mundo, somos el grupo 23 y este es el monitor de memoria\n\n");
        }
        return 0;
    }


    /* Metodo a ejecutar al salir del modulo */
    static void __exit test_exit(void)
    {
        remove_proc_entry("mem_grupo23", NULL);
        printk(KERN_INFO "\n\nSayonara mundo, somos el grupo 23 y este fue el monitor de memoria\n\n");
    }

    /* Funciones del módulo */
    module_init(test_init);
    module_exit(test_exit);

    /* Descripción del módulo */
    MODULE_LICENSE("GPL");
    MODULE_AUTHOR("Luis Arana - 201700988");
    MODULE_AUTHOR("Diana Menendez - 201700324");
    MODULE_DESCRIPTION("Modulo que muestra la información de la RAM");
    MODULE_VERSION("0.01");