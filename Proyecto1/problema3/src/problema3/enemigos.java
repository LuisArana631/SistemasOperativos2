/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema3;

import java.awt.Point;
import java.awt.Rectangle;
import java.util.Random;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

/**
 *
 * @author Dianita
 */
public class enemigos extends Thread{
    int posX, posY, vidas=2;
    JLabel lbl_enemigo, lbl_nave1,lbl_nave2;
    JPanel panel;
    int naves_perdidas=0, enemigos_escapados=0;
    public lista_enemigos lista_enemigos;
    public static int vidas_naves_escapadas=6,vidas_n1=3,vidas_n2=3;
    
    public enemigos(JPanel panel, lista_enemigos lista_enemigos, JLabel nave1, JLabel nave2) {
        this.panel=panel;
        this.lista_enemigos=lista_enemigos;
        this.lbl_nave1=nave1;
        this.lbl_nave2=nave2;
        this.lbl_enemigo=new JLabel();
        this.posX=new Random().nextInt(this.panel.getWidth()-125);
        this.posY=0;
        this.lbl_enemigo.setBounds(this.posX,this.posY,140,80);
        this.lbl_enemigo.setIcon(new ImageIcon(this.getClass().getResource("/interfaz/nave_enemiga8.png")));
        this.panel.add(lbl_enemigo);
        this.panel.repaint();
    }

    public void generarEnemigos() throws InterruptedException{
        //this.posX=50;
        this.posY+=10;
        this.lbl_enemigo.setLocation(this.posX,this.posY);
        this.panel.repaint();
        validarVidas();
        Thread.sleep(200);
    }
    
    public void validarVidas(){
        //validando choque de enemigos con naves amigas nave 1
        if(validarChoque(lbl_enemigo,lbl_nave1)){
            vidas_n1--;
            System.out.println("Vidas nave1 "+vidas_n1);
            if(vidas_n1 == 0){
                
                this.panel.remove(this.lbl_nave1);
                this.panel.repaint();
               
            }
            this.panel.remove(this.lbl_enemigo);
            this.panel.repaint();
            stop();
        }
        
        //validando choque de enemigos con naves amigas nave 2
        if(validarChoque(lbl_enemigo,lbl_nave2)){
            vidas_n2--;
            System.out.println("Vidas nave2 "+vidas_n2);
            if(vidas_n2==0){
                this.panel.remove(this.lbl_nave2);
                this.panel.repaint();
               
            }
            this.panel.remove(this.lbl_enemigo);
            this.panel.repaint();
            stop();
        }
        
        //valido que ninguna nave enemiga haya escapado
        Point posEnemigo=this.lbl_enemigo.getLocation();
        if(posEnemigo.y == 480){// si pasa esta posicion ya F
            vidas_n1--;
            vidas_n2--;
            this.panel.remove(this.lbl_enemigo);
            this.panel.repaint();
            stop();
            if(vidas_n1 == 0){
                this.panel.remove(this.lbl_nave1);
                this.panel.repaint();
            }else if(vidas_n2 == 0){
                this.panel.remove(this.lbl_nave2);
                this.panel.repaint();
            }
        }
        
        if(vidas_n1 <= 0 && vidas_n2 <= 0){
                finalizarPartida();
        }
    }
    
    public void finalizarPartida(){
        System.out.println("Entro metodo finalizar partida");
        //this.panel.remove(this.lbl_enemigo);   
        //stop();
    }
    
    public boolean validarChoque(JLabel lbl1, JLabel lbl2){
        Rectangle rectB = lbl2.getBounds();
        Rectangle result = SwingUtilities.computeIntersection(lbl1.getX(), lbl1.getY(), lbl1.getWidth(), lbl1.getHeight(), rectB);
        return (result.getWidth() > 0 && result.getHeight() > 0);
    }
    
    @Override
    public void run(){
        while (true)
        {
           try
           {
              generarEnemigos();
           } 
           catch (InterruptedException ex)
           {
              ex.printStackTrace();
           }
        }
    }
    
}
