import { connectDB, getDB } from "../config/db";

const RoomController = {
    registerRoom: async (req, res) => {
        await connectDB();

        const db = await getDB();
        
        db.collection('rooms').insertOne({
            name: 'Sala 1',
            description: 'Sala para reuniões',
            capacity: 10,
            resources: ['Projetor', 'TV', 'Ar condicionado'],
        });

        res.send('Criando uma sala');
    }
}

export default RoomController;