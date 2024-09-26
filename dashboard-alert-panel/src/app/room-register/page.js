'use client';

import InputLabel from "@/components/InputLabel/InputLabel"
import RoundedButton from "@/components/RoundedButton/RoundedButton";
import { createRoom } from "@/services/roomServices";
import { CheckCircle, Pen, PlusCircle, Trash } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function RoomRegister(){
    const [roomNumber, setRoomNumber] = useState("");
    const [roomFloor, setRoomFloor] = useState("");
    const [roomCapacity, setRoomCapacity] = useState("");

    const [roomFields, setRoomFields] = useState([]);

    async function onSubmit(){
        await createRoom({
            floor: roomFloor,
            number: roomNumber,
            studentsCapacity: roomCapacity,
            resources: roomFields.map(field => field.value)
        })
    }

    function switchEditable(fieldIdx){
        const newRoomFields = roomFields.map((field, idx) => {
            const isEmpty = field.value === "";

            if(idx === fieldIdx){
                return {
                    ...field,
                    editable: !isEmpty ? !field.editable : field.editable
                }
            } else {
                return {
                    ...field,
                    editable: false
                }
            }
        });

        setRoomFields(newRoomFields);  
    }

    function addField(){
        if (roomFields.every(field => !field.editable) && roomFields.every(field => field.value !== "")){
            setRoomFields([...roomFields, {editable: true, value: ""}]);
        }
    }

    function onChangeField(e){
        const newRoomFields = roomFields.map((field, fieldIdx) => {
            if(fieldIdx === Number(e.target.id)){
                return {
                    ...field,
                    value: e.target.value
                }
            }
            return field;
        });

        setRoomFields(newRoomFields);
    }

    function deleteField(e){
        const newRoomFields = roomFields.filter((field, idx) => idx !== Number(e.target.id));

        setRoomFields(newRoomFields);
    }


    return <main className="flex min-h-screen gap-4 flex-grow flex-col items-start justify-start p-6">
        <h1 className="text-2xl font-bold">Registrar Sala</h1>
        <div className="flex gap-2">
            <InputLabel label="Número da sala" onChange={(e) => setRoomNumber(e.target.value)}  />
            <InputLabel label="Andar da sala" onChange={(e) => setRoomFloor(e.target.value)} />
            <InputLabel label="Capacidade de alunos" onChange={(e) => setRoomCapacity(e.target.value)} />
        </div>
        <div className="flex gap-2">
            <p>Checklist</p>
            <PlusCircle onClick={addField} size={20} className="text-emerald-800 cursor-pointer" />
        </div>
        {roomFields.map((field, fieldIdx) => (
            <div className="flex gap-2" key={fieldIdx}>
                <input id={fieldIdx} value={field.value} onChange={onChangeField} className="rounded disabled:bg-gray-300" disabled={!field.editable} />
                {field.editable ? <CheckCircle weight="fill" size={20} className="text-emerald-800 cursor-pointer" onClick={() => switchEditable(fieldIdx)} /> : <Pen size={20} className="text-emerald-800 cursor-pointer" onClick={() => switchEditable(fieldIdx)} />}
                <Trash id={fieldIdx} onClick={deleteField} size={20} className="text-emerald-800 cursor-pointer" />
            </div>
        ))} 

        <RoundedButton text="Registrar Sala" onClick={onSubmit} />
     </main>
}