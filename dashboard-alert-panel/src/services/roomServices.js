import { URL_API } from "@/utils/constants/constants";

async function createRoom(room){
    return await fetch(`${URL_API}/room`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    })
}

async function getRooms(){
    return await fetch(`${URL_API}/room`)
}

async function getRoomById(id){
    return await fetch(`${URL_API}/room/${id}`)
}

async function updateRoom(id, room){
    return await fetch(`${URL_API}/room/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(room)
    })
}

async function deleteRoom(id){
    return await fetch(`${URL_API}/room/${id}`, {
        method: 'DELETE'
    })
}

export {createRoom, getRooms, getRoomById, updateRoom, deleteRoom}