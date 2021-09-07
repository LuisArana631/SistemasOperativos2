/* Luis Fernando Arana Arias - 201700988 */
/* Diana Cecilia Menendez Castillo - 201700324 */
/* Librerias para crear el modulo lector del estado de los procesos */

#include <linux/fs.h>
#include <linux/hugetlb.h>
#include <linux/init.h>
#include <linux/kernel.h>
#include <linux/sched.h>
#include <linux/fs_struct.h>
#include <linux/module.h>
#include <linux/seq_file.h>
#include <linux/proc_fs.h>
#include <linux/mm.h>
#include <linux/mman.h>
#include <linux/cred.h>
#include <linux/mmzone.h>
#include <linux/list.h>
#include <linux/swap.h>
#include <linux/vmstat.h>
#include <linux/atomic.h>
#include <asm/page.h>
#include <asm/pgtable.h>
#include <linux/cpumask.h>
#include <linux/interrupt.h>
#include <linux/kernel_stat.h>
#include <linux/slab.h>
#include <linux/time.h>
#include <linux/irqnr.h>
#include <linux/tick.h>
#include <asm/apic.h>
#include <linux/smp.h>
#include <linux/timex.h>
#include <linux/string.h>
#include <linux/sched/task.h> 
#include <linux/sched/signal.h>
#include <linux/cpufreq.h>
#include <linux/delay.h>    
#include <asm/uaccess.h>

#ifdef pr_fmt
#undef pr_fmt
#endif
#define pr_fmt(fmt) KBUILD_MODNAME ": " fmt

#ifndef CONFIG_MMU
    pr_err("No MMU, cannot calculate RSS.\n");
#endif

#define next_task(p)    list_entry((p)->tasks.next, struct task_struct, tasks)

extern struct task_struct init_task;

#define for_each_process(p) \
        for (p = &init_task ; (p = next_task(p)) != &init_task ; )

/* Obtener procesos info */
static int my_proc_show(struct seq_file *m, void *v)
{
        /* Variables a utilizar en la estructura del json */
        struct task_struct *task;
        struct task_struct *task_child;
        struct list_head *list; 
        unsigned long rss;
        struct file *f;
        mm_segment_t fs;
        
        f = filp_open("/etc/passwd", O_RDONLY, 0);

        if (f == NULL){
            printk(KERN_ALERT "filp_open error!!\n");
        }else{
            fs = get_fs();

            if ( fs == NULL){
                
            }else{
                printk(KERN_ALERT "fs no tiene nada!!\n");
            }
        }

        filp_close(f, NULL);

        /* Recorrer a grandes rasgos los procesos */
		seq_printf(m, "{\"procesos\": [\n");
        for_each_process(task) {
            get_task_struct(task);
            /* Extraer memoria utiliza en bytes */

            if (task->mm) {
                rss = get_mm_rss(task->mm) << PAGE_SHIFT;
                seq_printf(m, "{\"name\": \"%s\", \"pid\":%d, \"state\":%lu, \"father\":%d, \"usedCpu\": \"%d\", \"usedRAM\": \"%lu\", \"codeSize\": \"%lu\", \"usuario\": \"%d\"},\n",task->comm , task->pid, task->state, task->parent->pid, task->recent_used_cpu, rss, task->mm->end_code - task->mm->start_code, task->cred->uid.val);
            }else{
                seq_printf(m, "{\"name\": \"%s\", \"pid\":%d, \"state\":%lu, \"father\":%d, \"usedCpu\": \"%d\", \"usedRAM\": \"%d\", \"codeSize\": \"%d\", \"usuario\": \"%d\"},\n",task->comm , task->pid, task->state, task->parent->pid, task->recent_used_cpu, 0, 0, task->cred->uid.val);
            }
            /* Recorrer los procesos hijos */
            list_for_each(list, &task->children){
                task_child = list_entry( list, struct task_struct, sibling );
                get_task_struct(task_child);
                if (task_child->mm) {
                    rss = get_mm_rss(task_child->mm) << PAGE_SHIFT;
                    seq_printf(m, "{\"name\": \"%s\", \"pid\":%d, \"state\":%lu, \"father\":%d, \"usedCpu\": \"%d\", \"usedRAM\": \"%lu\", \"codeSize\": \"%lu\", \"usuario\": \"%d\"},\n",task_child->comm , task_child->pid, task_child->state, task_child->parent->pid, task_child->recent_used_cpu, rss, task->mm->end_code - task->mm->start_code, task->cred->uid.val);
                }else{
                    seq_printf(m, "{\"name\": \"%s\", \"pid\":%d, \"state\":%lu, \"father\":%d, \"usedCpu\": \"%d\", \"usedRAM\": \"%d\", \"codeSize\": \"%d\", \"usuario\": \"%d\"},\n",task_child->comm , task_child->pid, task_child->state, task_child->parent->pid, task_child->recent_used_cpu, 0, 0, task->cred->uid.val);
                }
                put_task_struct(task_child);            
            }
            put_task_struct(task);            
        }
        seq_printf(m, "{\"name\": \"fin\", \"pid\":\"fin\", \"state\":\"fin\", \"father\":\"fin\"}\n");
		seq_printf(m, "]}");
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
    entry = proc_create("proc_grupo23", 0777, NULL, &my_fops);
    if (!entry)
    {
        return -1;
    }
    else
    {
        printk(KERN_INFO "\n\nHola mundo, somos el grupo 23 y este es el monitor de procesos\n\n");
    }
    return 0;
}

/* Metodo a ejecutar al salir del modulo */
static void __exit test_exit(void)
{
    remove_proc_entry("proc_grupo23", NULL);
    printk(KERN_INFO "\n\nSayonara mundo, somos el grupo 23 y este fue el monitor de procesos\n\n");
}

/* Funciones del módulo */
module_init(test_init);
module_exit(test_exit);

/* Descripción del módulo */
MODULE_LICENSE("GPL");
MODULE_AUTHOR("Luis Arana - 201700988");
MODULE_AUTHOR("Diana Menendez - 201700324");
MODULE_DESCRIPTION("Modulo que muestra la información de los procesos");
MODULE_VERSION("0.01");