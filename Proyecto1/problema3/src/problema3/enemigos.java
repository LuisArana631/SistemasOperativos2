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
    int vidas_n1=3,vidas_n2=3;
    JLabel lbl_enemigo, lbl_nave1,lbl_nave2;
    JPanel panel;
    int naves_perdidas=0, enemigos_escapados=0;
    public lista_enemigos lista_enemigos;
    
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
        
        Thread.sleep(400);
    }
    
    public void validarVidas(){
        if(validarChoque(this.lbl_enemigo,this.lbl_nave1)){//enemigo choca con nave1
            this.vidas_n1--;
            if(this.vidas_n1 == 0){
                System.out.println("choco 1 con nave enemiga "+this.vidas_n1+"  naves amigas eliminadas: ");
                this.panel.remove(this.lbl_nave1);
                this.naves_perdidas++;
                if(this.naves_perdidas == 2){//Terminamos la partida
                    System.out.println("FIN PARTIDA :'c  ");
        
                 }
                this.panel.repaint();
            }
        }
        if(validarChoque(this.lbl_enemigo,this.lbl_nave2)){//enemigo choca con nave1
            this.vidas_n2--;
            
            if(this.vidas_n2 == 0){
                this.panel.remove(this.lbl_nave2);
                this.naves_perdidas++;
                System.out.println("choco 2 con nave enemiga "+this.vidas_n2+"  naves amigas eliminadas: ");
                if(this.naves_perdidas == 2){//Terminamos la partida
                    System.out.println("FIN PARTIDA :'c  ");
        
                }
                this.panel.repaint();
            }
        }
        
        Point posEnemigo=this.lbl_enemigo.getLocation();
        if(posEnemigo.y > 510){
            this.enemigos_escapados++;
            System.out.println("enemigos escapados  "+this.enemigos_escapados);
            if(enemigos_escapados == 3){
                 System.out.println("FIN PARTIDA :'c  por escape de naves enemigas");
                 finalizarPartida();
            }
        }
    }
    
    public void finalizarPartida(){
        System.out.println("Entro metodo finalizar partida");
        this.panel.remove(this.lbl_enemigo);
                      
        stop();
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
