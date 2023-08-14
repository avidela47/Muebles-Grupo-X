import dotenv from 'dotenv';
import Server from "./models/server";

// Configuramos dotenv
dotenv.config();

// Configuramos server
const server = new Server();
