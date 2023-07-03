import { MongoClient } from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const getinfo = async (req)=>{
    try {
        const filter = {
        'major': 'BA (Hons) Chinese'
        };

        const query = { runtime: { $lt: 15 } };

        const client = await MongoClient.connect(
            process.env.CONNECTION_STRING,
        { useNewUrlParser: true, useUnifiedTopology: true }
        );
        const coll = client.db('website').collection('jupas');
        const cursor = coll.find({},{
            projection:{_id:0}
        });
        const result = await cursor.toArray();
        await client.close();
        return result
    } catch (err) {
        console.log(err);
        process.exit(1);
        
    }
}

export default getinfo;
