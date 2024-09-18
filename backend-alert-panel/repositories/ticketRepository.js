import { TICKETS_COLLECTION } from "../utils/constants/collections";

const TicketRepository = {
    getTickets: async () => {
        return await db.collection(TICKETS_COLLECTION).find().toArray();
    },
    getTicketById: async (id) => {
        return await db.collection(TICKETS_COLLECTION).findOne({ _id: id });
    },
    createTicket: async (ticket) => {
        await db.collection(TICKETS_COLLECTION).insertOne(ticket);
    },
    updateTicket: async (id, ticket) => {
        await db.collection(TICKETS_COLLECTION).updateOne({ _id: id }, { $set: ticket });
    },
    deleteTicket: async (id) => {
        await db.collection(TICKETS_COLLECTION).deleteOne({ _id: id });
    }
}

export default TicketRepository;