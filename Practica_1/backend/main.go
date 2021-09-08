package main

import (
	"encoding/json"
	"fmt" // Ayuda a escribir en la respuesta
	"io/ioutil"
	"log" //Loguear si algo sale mal
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
)

/* Struct de Respuestas del servidor para el front */
type Message struct {
	Body   string `json:"data"`
	Status int    `json:"status"`
}

/* Función para terminar procesos */
func kill_process(res http.ResponseWriter, req *http.Request) {
	var respuesta Message

	vars := mux.Vars(req)
	processId, err := strconv.Atoi(vars["id"])
	if err != nil {
		fmt.Println("Error al obtener el body")
	}

	fmt.Println("Terminando proceso " + strconv.Itoa(processId))
	process, err := os.FindProcess(processId)
	if err != nil {
		fmt.Println("Error al terminar proceso: " + err.Error())
	} else {
		err = process.Kill()
		if err != nil {
			fmt.Println("Error al terminar proceso: " + err.Error())
		} else {
			fmt.Println("Proceso terminado correctamente")
		}
	}

	respuesta = Message{
		Body:   "Comando ejecutado",
		Status: 200,
	}

	json.NewEncoder(res).Encode(respuesta)
}

/* LECTURA DE LA MEMORIA RAM */
func getRAM() (dataRAM string) {
	data, err := ioutil.ReadFile("/proc/mem_grupo23")
	if err != nil {
		fmt.Println("Error al leer el archivo: ", err)
		return ""
	}
	return string(data)
}

func homePage(w http.ResponseWriter, r *http.Request) {
	var respuesta2 Message
	(w).Header().Set("Access-Control-Allow-Origin", "*")
	(w).Header().Set("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
	(w).Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")

	fmt.Fprintf(w, "Conectado")
	fmt.Println("Estamos en el /")

	respuesta2 = Message{
		Body:   "Comando ejecutado",
		Status: 200,
	}
	json.NewEncoder(w).Encode(respuesta2)
}

/* Configuración del servidor */
func main() {

	http.HandleFunc("/", homePage)
	direccion := ":5000"
	fmt.Println("Servidor listo escuchando en " + direccion)
	log.Fatal(http.ListenAndServe(direccion, nil))
	/*c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})

	server := socketio.NewServer(nil)

	server.OnConnect("/conectar", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("conectado: ", s.ID())
		return nil
	})

	server.OnDisconnect("/", func(s socketio.Conn, reason string) {
		fmt.Println("desconectado: ", reason)
	})

	go server.Serve()
	defer server.Close()
	http.Handle("/", c.Handler(server))
	//http.Handle("/", server)
	fmt.Println("Se levanto el servidor en el puerto 5000")
	log.Fatal(http.ListenAndServe(":5000", nil))*/
}
