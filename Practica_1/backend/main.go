package main

import (
	"encoding/json"
	"fmt"       // Ayuda a escribir en la respuesta
	"io/ioutil" //Loguear si algo sale mal
	"log"
	"net/http"
	"os"
	"strconv"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
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

/* LECTURA DE PROCESOS */
func getProcesos() (dataRAM string) {
	data, err := ioutil.ReadFile("/proc/proc_grupo23")
	if err != nil {
		fmt.Println("Error al leer el archivo: ", err)
		return ""
	}
	return string(data)
}

/* Endpoint para enviar RAM */
func send_ram(res http.ResponseWriter, req *http.Request) {
	ram_info := "{\"bufferRam\":55,\"freeRam\":168,\"porcentajeUsed\":77,\"sharedRam\":0,\"totalRam\":978,\"usedRam\":755}"
	var result map[string]interface{}
	json.Unmarshal([]byte(ram_info), &result)
	json.NewEncoder(res).Encode(ram_info)
}

/* Endpoint para enviar Procesos */
func send_proc(res http.ResponseWriter, req *http.Request) {
	proc_info := getProcesos()
	var result map[string]interface{}
	json.Unmarshal([]byte(proc_info), &result)
	json.NewEncoder(res).Encode(result)
}

func home(wri http.ResponseWriter, req *http.Request) {
	string_home := "{ \"saludo\": \"HOME\" }"
	var result map[string]interface{}
	json.Unmarshal([]byte(string_home), &result)
	json.NewEncoder(wri).Encode(result)
}

/* Configuración del servidor */
func main() {
	fmt.Println("Inicio de server en puerto 8080")
	router := mux.NewRouter().StrictSlash(true)

	router.HandleFunc("/", home).Methods("GET")
	router.HandleFunc("/ram", send_ram).Methods("GET")
	router.HandleFunc("/proc", send_proc).Methods("GET")
	router.HandleFunc("/kill/{id}", kill_process).Methods("GET")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowCredentials: true,
	})

	handler := c.Handler(router)
	log.Fatal(http.ListenAndServe(":8080", handler))
}
