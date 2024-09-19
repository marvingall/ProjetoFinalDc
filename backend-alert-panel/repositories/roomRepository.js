import { ROOMS_COLLECTION } from "../utils/constants/collections.js";
import { ObjectId } from 'bson';

const RoomRepository = {
    async createRoom(db, room) {
        await db.collection(ROOMS_COLLECTION).insertOne(room);
    },
    async getRooms(db) {
        return await db.collection(ROOMS_COLLECTION).find().toArray();
    },
    async getRoomById(db, id) {
        const idAsObjectId = ObjectId.createFromHexString(id);

        return await db.collection(ROOMS_COLLECTION).findOne({ _id: idAsObjectId });
    },
    async updateRoom(db, id, room) {
        const idAsObjectId = ObjectId.createFromHexString(id);

        await db.collection(ROOMS_COLLECTION).updateOne({ _id: idAsObjectId }, { $set: room });
    },
    async deleteRoom(db, id) {
        const idAsObjectId = ObjectId.createFromHexString(id);

        await db.collection(ROOMS_COLLECTION).deleteOne({ _id: idAsObjectId });
    },
    async repairRoom(db, id) {
        const idAsObjectId = ObjectId.createFromHexString(id);

        await db.collection(ROOMS_COLLECTION).updateOne({ _id: idAsObjectId}, 
            { $set: { redirect: null, inoperatedResources: [] } });
    },
    async redirectRoom(db, id, redirect) {
        const idAsObjectId = ObjectId.createFromHexString(id);
        const redirectAsObjectId = ObjectId.createFromHexString(redirect.to);

        await db.collection(ROOMS_COLLECTION).updateOne({ _id: idAsObjectId},
            { $set: { redirect: {
                to: redirectAsObjectId,
                expirationDate: redirect.expirationDate
            }}});
    },
    async submitIssueRoom(db, id, inoperatedResources) {
        const idAsObjectId = ObjectId.createFromHexString(id);

        await db.collection(ROOMS_COLLECTION).updateOne({ _id: idAsObjectId},
            { $set: { inoperatedResources } });
    }
}

export default RoomRepository;