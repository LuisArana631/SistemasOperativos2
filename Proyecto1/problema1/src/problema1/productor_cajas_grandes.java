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
public class productor_cajas_grandes extends Thread{
    public lista_cajas lista_cajas;
     
     public productor_cajas_grandes(lista_cajas lista_cajas){
        this.lista_cajas = lista_cajas;
    }
    
    public void producir() throws InterruptedException{
        Thread.sleep(2000);
        int i = lista_cajas.addTwo();
        //System.out.println("Produzco caja grande: " + i);
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
