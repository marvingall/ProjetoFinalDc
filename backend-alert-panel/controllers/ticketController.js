import TicketRepository from "../repositories/ticketRepository.js";

const TicketController = {
    async createTicket(req, res) {
        const { roomId, createdAt, description, createdBy, inoperatedItems } = req.body;

        if (!roomId || !createdAt || !description || !createdBy || !inoperatedItems) {
            return res.status(400).send('Invalid data');
        }

        const db = await getDB();

        const roomExists = await RoomRepository.getRoomById(db, roomId);

        if (!roomExists) {
            return res.status(404).send('Room not found');
        }

        await TicketRepository.createTicket(db, {
            roomId,
            createdAt,
            description,
            createdBy, 
            inoperatedItems
        });

        res.status(201).send('Ticket registered successfully');
    }
}