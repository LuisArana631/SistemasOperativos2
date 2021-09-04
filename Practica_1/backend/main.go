package main

import (
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"

	socketio "github.com/googollee/go-socket.io"
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

/* Configuración del servidor */
func main() {
	server := socketio.NewServer(nil)

	server.OnConnect("/socket", func(s socketio.Conn) error {
		s.SetContext("")
		fmt.Println("conectado: ", s.ID())
		return nil
	})

	http.Handle("/", server)
	fmt.Println("Se levanto el servidor en el puerto 5000")
	log.Fatal(http.ListenAndServe(":5000", nil))
}
