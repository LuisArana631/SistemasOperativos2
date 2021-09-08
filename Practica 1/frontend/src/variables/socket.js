import io from "socket.io-client";

let socket = io('//localhost:5000/socket.io/');

export default socket;