const express = require('express');
const bodyParser = require('body-parser');
const {sequelize} = require('./models');
const cors = require('cors');
const morgan = require('morgan');
const config = require('./config/config');
const ExecuteShellCommand = require('./utils/ExecuteShellCommand');
const kafkaService = require('./services/kafka/KafkaService');

const app = express();

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use(require('./router/routes'));
app.use(express.static('public'));


if(config.app.env.toLowerCase() === 'prod') {
	sequelize.sync()
		.then(() => {
			console.log("Starting the server..")
			app.listen(config.app.port || 3000)
			console.log(`Server started on port: ${config.app.port}`)
		});
}else{
	sequelize.sync({force: true})
		.then(() => {
			ExecuteShellCommand.executeCommand("cd src && sequelize db:seed:all");
			console.log("Database seeded successfully");
		})
		.then(() => {
			console.log("Starting the server..")
			app.listen(config.app.port || 3000)
			console.log(`Server started on port: ${config.app.port}`)
		});
}

kafkaService.connectToKafka();
