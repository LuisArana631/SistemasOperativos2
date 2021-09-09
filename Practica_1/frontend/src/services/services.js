import { useEffect, useState } from "react";

export function get_ram(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isOnline, setIsOnline] = useState(null);

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let var_interval;

    const conectar = () => {
        var_interval = setInterval(() => {
            fetch('http://3.14.79.8:8080/ram', requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )  
        }, 3000);
    }

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }   
    
        conectar(handleStatusChange);    
    
        return function cleanup() {
            desconectar(handleStatusChange);
        };
      }, []);
    
      const desconectar = () => {
        clearInterval(var_interval);
      }
    
      
      if (isOnline === null) {
        if(error){
            return [];
          }else if(!isLoaded){
            return [];
          }else{   
            return items;
          }
      }
}

export function get_proc(){
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setItems] = useState([]);
    const [isOnline, setIsOnline] = useState(null);

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    };

    let var_interval;

    const conectar = () => {
        var_interval = setInterval(() => {
            fetch('http://3.14.79.8:8080/proc', requestOptions)
            .then(res => res.json())
            .then(
            (result) => {
                setIsLoaded(true);
                setItems(result);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            }
            )  
        }, 3000);
    }

    useEffect(() => {
        function handleStatusChange(status) {
            setIsOnline(status.isOnline);
        }   
    
        conectar(handleStatusChange);    
    
        return function cleanup() {
            desconectar(handleStatusChange);
        };
      }, []);
    
      const desconectar = () => {
        clearInterval(var_interval);
      }
    
      
      if (isOnline === null) {
        if(error){
            return [];
          }else if(!isLoaded){
            return [];
          }else{   
            return items;
          }
      }
}