/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema1;

import java.util.Random;

/**
 *
 * @author Dianita
 */

public class productor_cajas_peques extends Thread{
     public lista_cajas lista_cajas;
     public int velocidad = 2000;

    public int getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(int velocidad) {
        this.velocidad = velocidad;
    }
     
     public productor_cajas_peques(lista_cajas lista_cajas){
        this.lista_cajas = lista_cajas;
    }
    
    public void producir() throws InterruptedException{
        int random=new Random().nextInt(this.velocidad);
        Thread.sleep(random);
        int i = lista_cajas.add();
    }
    
    @Override
    public void run(){
        while (true)
        {
           try
           {
              producir();
           } 
           catch (InterruptedException ex)
           {
              ex.printStackTrace();
           }
        }
    }
    
}
