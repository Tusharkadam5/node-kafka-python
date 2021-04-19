const { Kafka, logLevel } = require("kafkajs")
const io = require('socket.io');

const clientId = "my-app"
const brokers = ["localhost:9092"]
const topic = "test_topic" // test_topic

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

const consume = async () => {
	// first, we wait for the client to connect and subscribe to the given topic
	await consumer.connect()
	await consumer.subscribe({ topic, fromBeginning: true })
	await consumer.run({
		// this function is called every time the consumer gets a new message
		eachMessage: ({ message }) => {
			// here, we just log the message to the standard output
			console.log(`received messageeeeeeeeeeeeeeeeeeeee: ${message.value}`)
			  
io.on('connection', (socket) => { /* socket object may be used to send specific messages to the new connected client */

	socket.emit('broadcast', message.value);
  });
		},
	})
}

module.exports = consume;