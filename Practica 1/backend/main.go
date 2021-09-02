package main

import (
	"fmt"
	"log"
	"net/http"

	socketio "github.com/googollee/go-socket.io"
)

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
