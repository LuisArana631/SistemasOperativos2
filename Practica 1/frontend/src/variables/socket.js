import React, { useState, useEffect } from "react";
import io from "socket.io-client";

function Socket() {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:5000/ram/`);
    setSocket(newSocket);
   
    return () => newSocket.close();
  }, [setSocket]);
  return (
    <h1 >{}
    </h1>
  );
}

export default Socket;