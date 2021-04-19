const { Kafka, logLevel } = require("kafkajs")
 // const io = require('socket.io');

const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "test_topic" // test_topic

module.exports = function(io) { 
const kafka = new Kafka({
	clientId,
	brokers,
  //ssl: true,
	// logCreator: customLogger,
	logLevel: logLevel.DEBUG,
})


// is yet to receive
const consumer = kafka.consumer({
	groupId: clientId,
	minBytes: 5,
	maxBytes: 1e6,
	// wait for at most 3 seconds before receiving new data
	maxWaitTimeInMs: 3000,
})
var socketIo  = null;
 io.on('connection', (socket) => {
	socketIo = socket
});

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: true })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received messageeeeeeeeeeeeeeeeeeeee: ${message.value}`)
			  
//io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */
	//console.log('new client connected');
	if(socketIo){
	 // socketIo.emit('connection',  message.value.toString())
	  socketIo.emit('broadcast', message.value.toString());
}
 // });
		},
	})
}

return consume;
}
// module.exports = consume;