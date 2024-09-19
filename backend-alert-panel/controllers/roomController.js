import { parse, sub } from "date-fns";
import { getDB } from "../config/db.js";
import RoomRepository from "../repositories/roomRepository.js";

const RoomController = {
    registerRoom: async (req, res) => {
        const {floor, number, studentsCapacity, resources} = req.body;

        if (!floor || !number || !studentsCapacity) {
            return res.status(400).send('Invalid data');
        }

        const db = await getDB();
        
        RoomRepository.createRoom(db, {
            floor,
            number,
            studentsCapacity,
            resources,
            redirect: null,
            inoperatedResources: []
        });

        res.status(201).send('Room registered successfully');
    },
    getRooms: async (req, res) => {
        const db = await getDB();
        const rooms = await RoomRepository.getRooms(db);

        res.send(rooms);
    },
    getRoomById: async (req, res) => {
        const { id } = req.params;
        const db = await getDB();
        const room = await RoomRepository.getRoomById(db, id);

        if (!room) {
            return res.status(404).send('Room not found');
        }

        res.send(room);
    },
    updateRoom: async (req, res) => {
        const { id } = req.params;
        const { floor, number, studentsCapacity, resources } = req.body;

        if (!floor || !number || !studentsCapacity) {
            return res.status(400).send('Invalid data');
        }

        const db = await getDB();
        const room = await RoomRepository.getRoomById(db, id);

        if (!room) {
            return res.status(404).send('Room not found');
        }

        await RoomRepository.updateRoom(db, id, {
            floor,
            number,
            studentsCapacity,
            resources
        });

        res.send('Room updated successfully');
    },
    deleteRoom: async (req, res) => {
        const { id } = req.params;
        const db = await getDB();
        const room = await RoomRepository.getRoomById(db, id);

        if (!room) {
            return res.status(404).send('Room not found');
        }

        await RoomRepository.deleteRoom(db, id);

        res.send('Room deleted successfully');
    },
    repairRoom: async (req, res) => {
        const { id } = req.params;
        const db = await getDB();
        const room = await RoomRepository.getRoomById(db, id);

        if (!room) {
            return res.status(404).send('Room not found');
        }

        await RoomRepository.repairRoom(db, id);

        res.send('Room repaired successfully');
    },
    redirectRoom: async (req, res) => {
        const { id } = req.params;
        const { redirect } = req.body;

        if (!redirect) {
            return res.status(400).send('Invalid data');
        }

        const {to, expirationDate} = redirect;

        if (!to || !expirationDate) {
            return res.status(400).send('Invalid data');
        }

        const expirationDateParsed = parse(expirationDate, "dd/MM/yyyy-HH:mm", new Date());


        const db = await getDB();
        const room = await RoomRepository.getRoomById(db, id);
        const roomTo = await RoomRepository.getRoomById(db, to);

        if (!room || !roomTo) {
            return res.status(404).send(
                `Room${!room ? '' : ' to'} redirect not found: ${!room ? id : to}`);
        }

        await RoomRepository.redirectRoom(db, id, {
            to,
            expirationDate: expirationDateParsed
        });

        res.send('Room redirected successfully');
    },
    submitIssueRoom: async (req, res) => {
        const { id } = req.params;
        const { inoperatedResources } = req.body;

        if (!inoperatedResources) {
            return res.status(400).send('Invalid data');
        }

        const db = await getDB();
        const room = await RoomRepository.getRoomById(db, id);

        if (!room) {
            return res.status(404).send('Room not found');
        }

        if(inoperatedResources.length === 0) {
            return res.status(400).send('No inoperated resources provided');
        }
        

        if(inoperatedResources.
            map(ino => ino.toLowerCase()).
            some(resource => !room.resources.
                map(r => r.toLowerCase()).
                includes(resource))) {
            return res.status(400).send('Invalid inoperated resources');
        }

        await RoomRepository.submitIssueRoom(db, id, inoperatedResources);

        res.send('Issue submitted successfully');
    }
}

export default RoomController;