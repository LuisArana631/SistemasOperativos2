/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema3;
import java.awt.Point;
import java.util.LinkedList;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import javax.swing.*;
/**
 *
 * @author Dianita
 */
public class lista_enemigos extends Thread{
    
    LinkedList<enemigos> lista = new LinkedList<enemigos>();
    JPanel panel;
    JLabel lbl_nave1,lbl_nave2;

    public lista_enemigos( LinkedList<enemigos> lista, JPanel panel,JLabel nave1, JLabel nave2) {
        this.lista=lista;
        this.panel=panel;
        this.lbl_nave1=nave1;
        this.lbl_nave2=nave2;
    }
    
    @Override
    public void run(){
        try{
            while(true){
                enemigos e=new enemigos(this.panel,this,this.lbl_nave1,this.lbl_nave2);
                e.start();
                lista.add(e);
                Thread.sleep(5000);
            }
            
        }catch(InterruptedException ex){
            ex.printStackTrace();
        }
    }
    
}
