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
import interfaz.interfaz;
import java.awt.Image;
import java.util.LinkedList;
/**
 *
 * @author Dianita
 */
public class enemigos extends Thread{
    int posX, posY, vidas=2;
    JLabel lbl_enemigo, lbl_nave1,lbl_nave2;
    JPanel panel;
    int naves_perdidas=0, enemigos_escapados=0;
    public LinkedList<enemigos> lista_enemigos=new LinkedList<>();
    public static int vidas_naves_escapadas=6,vidas_n1=3,vidas_n2=3, tiempo=0, velocidad=4000;
    
    public enemigos(JPanel panel, LinkedList<enemigos> lista_enemigos, JLabel nave1, JLabel nave2) {
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
        
        this.posY+=10;
        this.lbl_enemigo.setLocation(this.posX,this.posY);
        this.panel.repaint();
        validarVidas();
        tiempo++;
        if (tiempo == 25){
            System.out.println("Mas rapido :v");
            velocidad-=1000;
            tiempo=0;
        }
        System.out.println("tiempo en seg -> "+tiempo);
        Thread.sleep(velocidad);
    }
    
    public void validarVidas(){
        //validando choque de enemigos con naves amigas nave 1
        if(validarChoque(lbl_enemigo,lbl_nave1)){
            vidas_n1--;
            System.out.println("Vidas nave1 "+vidas_n1);
            if(vidas_n1 == 0){
                //cuando borro la nave la mando fuera de la pantalla
                this.lbl_nave1.setLocation(posX, 950);
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
                //cuando borro la nave la mando fuera de la pantalla
                this.lbl_nave2.setLocation(posX, 950);
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
        interfaz.pausa=true;
        JLabel gameover=new JLabel();
        gameover.setBounds(225,30,500,500);
        gameover.setIcon(resize("/interfaz/game_over.gif",gameover));
        this.panel.add(gameover);
        for (enemigos object : lista_enemigos) {
            this.panel.remove(object.lbl_enemigo);
        }
        this.panel.remove(this.lbl_nave1);
        this.panel.remove(this.lbl_nave2);
        this.panel.repaint();
    }
    
    public ImageIcon resize(String ruta, JLabel label){
        ImageIcon imagen = new ImageIcon(getClass().getResource(ruta));
        ImageIcon icono = new ImageIcon(imagen.getImage().getScaledInstance(label.getWidth(), label.getHeight(),Image.SCALE_DEFAULT));
        return icono;
    }
    
    public boolean validarChoque(JLabel lbl1, JLabel lbl2){
        Rectangle rectB = lbl2.getBounds();
        Rectangle result = SwingUtilities.computeIntersection(lbl1.getX(), lbl1.getY(), lbl1.getWidth(), lbl1.getHeight(), rectB);
        return (result.getWidth() > 0 && result.getHeight() > 0);
    }
    
     public void reanudar(){
        for (enemigos object : lista_enemigos) {
            System.out.println("reanudo ");
            object.resume();
        }
        resume();
    }
    
    @Override
    public void run(){
        while (!interfaz.pausa)
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
