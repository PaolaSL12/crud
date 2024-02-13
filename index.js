require("dotenv").config();
const express = require('express');
const { connect } = require("./src/config/db");
const characterRouter = require("./src/api/routes/character");
const locationRouter = require("./src/api/routes/Location");




connect();
const PORT = 3000;
const server = express();
server.use(express.json());

server.use("/characters", characterRouter);
server.use("/location", locationRouter)


server.use('*', (req, res, next) => {
	const error = new Error('Route not found'); 
	error.status = 404;
	next(error); 
  });

  
   
  server.listen(PORT, () => {
	console.log(`Server running in http://localhost:${PORT}`);
  });