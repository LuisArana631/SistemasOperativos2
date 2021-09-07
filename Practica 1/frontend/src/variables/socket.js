import React, { useState, useEffect } from "react";
import io from "socket.io-client";
const ENDPOINT = "http://localhost:5000";

function Socket() {
    const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:5000`);
    setSocket(newSocket);
   
    return () => newSocket.close();
  }, [setSocket]);
  console.log(socket);
  return (
    <h1 >Socket
    </h1>
  );
}

export default Socket;