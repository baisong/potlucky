const { MongoClient } = require('mongodb');
import { VITE_MONGO_USER, VITE_MONGO_PASS, VITE_MONGO_URL } from '$env/static/private';

async function main() {
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/drivers/node/ for more details
     */
    const uri = `mongodb+srv://${VITE_MONGO_USER}:${VITE_MONGO_PASS}@${VITE_MONGO_URL}/?retryWrites=true&w=majority`;

    /**
     * The Mongo Client you will use to interact with your database
     * See https://mongodb.github.io/node-mongodb-native/3.6/api/MongoClient.html for more details
     * In case: '[MONGODB DRIVER] Warning: Current Server Discovery and Monitoring engine is deprecated...'
     * pass option { useUnifiedTopology: true } to the MongoClient constructor.
     * const client =  new MongoClient(uri, {useUnifiedTopology: true})
     */
    const client = new MongoClient(uri);

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await monitorListingsUsingEventEmitter(client);
    } finally {
        // Close the connection to the MongoDB cluster
        await client.close();
    }
}

main().catch(console.error);

function closeChangeStream(timeInMs = 60000, changeStream) {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log('Closing the change stream');
            resolve(changeStream.close());
        }, timeInMs);
    });
}

async function monitorListingsUsingEventEmitter(client, timeInMs = 60000, pipeline = []) {
    const collection = client.db('sample_airbnb').collection('listingsAndReviews');
    const changeStream = collection.watch(pipeline);
    changeStream.on('change', (next) => {
        console.log(next);  
   });
   await closeChangeStream(timeInMs, changeStream);
}
