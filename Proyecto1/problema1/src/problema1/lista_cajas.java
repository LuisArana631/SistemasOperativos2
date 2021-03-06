/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package problema1;
import java.util.LinkedList;
import java.util.concurrent.locks.Condition;
import java.util.concurrent.locks.ReentrantLock;
import javax.swing.*;
/**
 *
 * @author Dianita
 */
public class lista_cajas {
    LinkedList<Integer> lista = new LinkedList<Integer>();
    int maxSize;
    
     public static final char[] EXTENDED = { 0x00C7, 0x00FC, 0x00E9, 0x00E2,
            0x00E4, 0x00E0, 0x00E5, 0x00E7, 0x00EA, 0x00EB, 0x00E8, 0x00EF,
            0x00EE, 0x00EC, 0x00C4, 0x00C5, 0x00C9, 0x00E6, 0x00C6, 0x00F4,
            0x00F6, 0x00F2, 0x00FB, 0x00F9, 0x00FF, 0x00D6, 0x00DC, 0x00A2,
            0x00A3, 0x00A5, 0x20A7, 0x0192, 0x00E1, 0x00ED, 0x00F3, 0x00FA,
            0x00F1, 0x00D1, 0x00AA, 0x00BA, 0x00BF, 0x2310, 0x00AC, 0x00BD,
            0x00BC, 0x00A1, 0x00AB, 0x00BB, 0x2591, 0x2592, 0x2593, 0x2502,
            0x2524, 0x2561, 0x2562, 0x2556, 0x2555, 0x2563, 0x2551, 0x2557,
            0x255D, 0x255C, 0x255B, 0x2510, 0x2514, 0x2534, 0x252C, 0x251C,
            0x2500, 0x253C, 0x255E, 0x255F, 0x255A, 0x2554, 0x2569, 0x2566,
            0x2560, 0x2550, 0x256C, 0x2567, 0x2568, 0x2564, 0x2565, 0x2559,
            0x2558, 0x2552, 0x2553, 0x256B, 0x256A, 0x2518, 0x250C, 0x2588,
            0x2584, 0x258C, 0x2590, 0x2580, 0x03B1, 0x00DF, 0x0393, 0x03C0,
            0x03A3, 0x03C3, 0x00B5, 0x03C4, 0x03A6, 0x0398, 0x03A9, 0x03B4,
            0x221E, 0x03C6, 0x03B5, 0x2229, 0x2261, 0x00B1, 0x2265, 0x2264,
            0x2320, 0x2321, 0x00F7, 0x2248, 0x00B0, 0x2219, 0x00B7, 0x221A,
            0x207F, 0x00B2, 0x25A0, 0x00A0 };
    
    ReentrantLock lock = new ReentrantLock();
    Condition notFull = lock.newCondition();
    Condition notEmpty = lock.newCondition();
    
    int cant_peques_prod=0;
    int cant_grandes_prod=0;
    int cant_peques_cons=0;
    int cant_grandes_cons=0;
    int espacios_ocupados=0;
    
    JLabel jtext,lbl_peques_colocadas,lbl_peques_retiradas,lbl_grandes_colocadas,lbl_grandes_retiradas, lbl_espacios;
    
    public lista_cajas(int maxSize, JLabel txt, JLabel peques_col, JLabel peques_ret, JLabel grandes_col, JLabel grandes_ret, JLabel lbl_espacios){
        this.maxSize = maxSize;
        this.jtext=txt;
        this.lbl_peques_colocadas=peques_col;
        this.lbl_peques_retiradas=peques_ret;
        this.lbl_grandes_colocadas=grandes_col;
        this.lbl_grandes_retiradas=grandes_ret;
        this.lbl_espacios=lbl_espacios;
    }
    
    public void pintar(){
        this.jtext.setText("");
        String txt="";
        for (int i = 0; i < this.lista.size(); i++) {
            txt+=String.valueOf(getAscii(220));
        }
        this.jtext.setText(txt);
        System.out.println(txt);
        System.out.println(this.lista.size());
    }
    
    public int addTwo(){
        int i = -1;
        try{
            this.lock.lock();
            while(!(maxSize - this.lista.size() > 1)){
                this.notFull.await();
            }
            
            i = this.lista.size() + 1;
            this.lista.add(i);
            i = this.lista.size() + 1;
            this.lista.add(i);
            this.notEmpty.signalAll();
        }catch(Exception e){
            
        }finally{
            this.lock.unlock();
            pintar();
            this.cant_grandes_prod++;
            this.lbl_grandes_colocadas.setText(String.valueOf(this.cant_grandes_prod));
            this.espacios_ocupados+=2;
            this.lbl_espacios.setText(String.valueOf(this.espacios_ocupados));
            System.out.println("Agregando2");
            return i;
        }      
    
    }
    
    public int add(){
        int i = -1;
        try{
            this.lock.lock();
            while(this.lista.size() == maxSize){
                //System.out.println("Producer waiting");
                this.notFull.await();
                
            }
            i = this.lista.size() + 1;
            this.lista.add(i);
            this.notEmpty.signalAll();
        }catch(Exception e){
            
        }finally{
            this.lock.unlock();
            pintar();
            this.cant_peques_prod++;
            this.lbl_peques_colocadas.setText(String.valueOf(this.cant_peques_prod));
            this.espacios_ocupados++;
            this.lbl_espacios.setText(String.valueOf(this.espacios_ocupados));
            System.out.println("Agregando1");
            //Aqui sumo y resto para mostrar en la interfaz
            return i;
        }      
    }
    
    public int get(){
        int i = -1;
        try{
            this.lock.lock();
            while(this.lista.size() == 0){
               // System.out.println("Consumer waiting");
                this.notEmpty.await();
            }
            i = this.lista.removeLast();
            this.notFull.signalAll();
            
        }catch(Exception e){
            
        }finally{
            this.lock.unlock();
            pintar();
            this.cant_peques_cons++;
            this.lbl_peques_retiradas.setText(String.valueOf(this.cant_peques_cons));
            this.espacios_ocupados--;
            this.lbl_espacios.setText(String.valueOf(this.espacios_ocupados));
            System.out.println("quitando1");
            return i;
        } 
    }
    
    public int getTwo(){
        int i = -1;
        try{
            this.lock.lock();
            while(!(this.lista.size() > 2)){
               // System.out.println("Consumer waiting");
                this.notEmpty.await();
            }
            i = this.lista.removeLast();
            i = this.lista.removeLast();
            this.notFull.signalAll();
            
        }catch(Exception e){
            
        }finally{
            this.lock.unlock();
            pintar();
            this.cant_grandes_cons++;
            this.lbl_grandes_retiradas.setText(String.valueOf(this.cant_grandes_cons));
            this.espacios_ocupados-=2;
            this.lbl_espacios.setText(String.valueOf(this.espacios_ocupados));
            System.out.println("quitando2");
            return i;
        } 
    }
    
    public static final char getAscii(int code) {
        if (code >= 0x80 && code <= 0xFF) {
            return EXTENDED[code - 0x7F];
        }
        return (char) code;
    }
    
}
