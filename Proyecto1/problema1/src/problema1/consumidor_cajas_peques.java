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
public class consumidor_cajas_peques extends Thread{
    public lista_cajas lista_cajas;
    
    public consumidor_cajas_peques(lista_cajas lista_cajas){
        this.lista_cajas = lista_cajas;
    }
    
    public void consumir() throws InterruptedException{
        Thread.sleep(10000);
        int i = lista_cajas.get();
        //System.out.println("Consumo caja peque: " + i);
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
