/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema3;

import java.awt.Image;
import java.awt.Rectangle;
import java.util.LinkedList;
import javax.swing.ImageIcon;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.SwingUtilities;

/**
 *
 * @author Dianita
 */
public class disparo extends Thread{
    JPanel panel;
   // public lista_enemigos lista_enemigos;
    LinkedList<enemigos> lista = new LinkedList<>();
    JLabel lbl_bala;
    public int posX, posY;

    public disparo(JPanel panel, LinkedList<enemigos> lista_enemigos, int x) {
        this.panel = panel;
        this.lista = lista_enemigos;
        this.posX=x;
        this.posY=this.panel.getHeight() - 130;
        this.lbl_bala=new JLabel();
        this.lbl_bala.setBounds(this.posX,this.posY,20,40);
        this.lbl_bala.setIcon(resize("/interfaz/balita.png",this.lbl_bala));
        this.panel.add(lbl_bala);
        this.panel.repaint();
    }
    
    public void colision(){
        for (enemigos object : lista) {
            if(object.vidas!=0 && !interfaz.interfaz.pausa){
                if(validarChoque(object.lbl_enemigo,this.lbl_bala)){
                    object.vidas-=1;
                    if(object.vidas == 0){
                        this.panel.remove(object.lbl_enemigo);
                        object.stop();
                    }
                    this.panel.remove(this.lbl_bala);
                    this.panel.repaint();
                    stop();
                }
            }
        }
    }
    
    public boolean validarChoque(JLabel lbl1, JLabel lbl2){
        Rectangle rectB = lbl2.getBounds();
        Rectangle result = SwingUtilities.computeIntersection(lbl1.getX(), lbl1.getY(), lbl1.getWidth(), lbl1.getHeight(), rectB);
        return (result.getWidth() > 0 && result.getHeight() > 0);
    }
    
    
    public ImageIcon resize(String ruta, JLabel label){
        ImageIcon imagen = new ImageIcon(getClass().getResource(ruta));
        ImageIcon icono = new ImageIcon(imagen.getImage().getScaledInstance(label.getWidth(), label.getHeight(),Image.SCALE_DEFAULT));
        return icono;
    }
    
    public void generarBalitas() throws InterruptedException{
        //this.posX=50;
        this.posY-=10;
        this.lbl_bala.setLocation(this.posX,this.posY);
        this.panel.repaint();
        colision();
        Thread.sleep(300);
    }
    
    @Override
    public void run(){
        while (!interfaz.interfaz.pausa)
        {
           try
           {
              generarBalitas();
           } 
           catch (InterruptedException ex)
           {
              ex.printStackTrace();
           }
        }
    }
    
    
}
