/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema1;

/**
 *
 * @author Dianita
 */
public class consumidor_cajas_grandes extends Thread {
    public lista_cajas lista_cajas;
    public int velocidad = 5000;

    public int getVelocidad() {
        return velocidad;
    }

    public void setVelocidad(int velocidad) {
        this.velocidad = velocidad;
    }
    
    public consumidor_cajas_grandes(lista_cajas lista_cajas){
        this.lista_cajas = lista_cajas;
    }
    
    public void consumir() throws InterruptedException{
        Thread.sleep(this.velocidad);
        int i = lista_cajas.getTwo();
    }
    
    
    
    @Override
    public void run(){
        while (true)
        {
           try
           {
              consumir();
           } 
           catch (InterruptedException ex)
           {
              ex.printStackTrace();
           }
        }
    }
    
}
