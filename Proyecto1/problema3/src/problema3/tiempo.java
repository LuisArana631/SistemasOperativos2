/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema3;

/**
 *
 * @author Dianita
 */
public class tiempo extends Thread{
    
    public static int tiempo=0, velocidad=3000;

    public tiempo() {
        
    }
    
    
    public static int validarTiempo(){
        tiempo++;
        if (tiempo == 25){
            if(velocidad == 500){
                velocidad = 500;
                tiempo=0;
                return velocidad;
            }else{
                velocidad-=500;
                tiempo=0;
                return velocidad;
            }
           
        }
        return velocidad;
    
    }
    
    
    @Override
    public void run(){
        try{
            while(!interfaz.interfaz.pausa){
               
                validarTiempo();
                Thread.sleep(1000);
            }
            
        }catch(InterruptedException ex){
            ex.printStackTrace();
        }
    }
    
}
