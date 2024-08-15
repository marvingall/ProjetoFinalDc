'use client';

import InputLabel from "@/components/InputLabel/InputLabel"
import { Pen, PlusCircle, Trash } from "@phosphor-icons/react/dist/ssr";
import { useState } from "react";

export default function RoomRegister(){

    const [roomFields, setRoomFields] = useState([
        {
            editable: false,
            value: ""
        }
    ]);

    function switchEditable(fieldIdx){
        const newRoomFields = roomFields.map((field, idx) => {
            if(idx === fieldIdx){
                return {
                    ...field,
                    editable: !field.editable
                }
            }
            return field;
        });

        setRoomFields(newRoomFields);  
    }

    function addField(){
        if (roomFields.every(field => !field.editable)){
            setRoomFields([...roomFields, {editable: false, value: ""}]);
        }
    }


    return <main className="flex min-h-screen gap-4 flex-grow flex-col items-start justify-start p-6">
        <h1 className="text-2xl font-bold">Registrar Sala</h1>
        <div className="flex gap-2">
            <InputLabel label="Número da sala" />
            <InputLabel label="Andar da sala" />
            <InputLabel label="Capacidade de alunos" />
        </div>
        <div className="flex gap-2">
            <p>Checklist</p>
            <PlusCircle onClick={addField} size={20} className="text-emerald-800 cursor-pointer" />
        </div>
        {roomFields.map((field, fieldIdx) => (
            <div className="flex gap-2" key={fieldIdx}>
                <input className="rounded disabled:bg-gray-300" disabled={!field.editable} />
                <Pen onClick={() => switchEditable(fieldIdx)} size={20} className="text-emerald-800 cursor-pointer" />
                <Trash size={20} className="text-emerald-800 cursor-pointer" />
            </div>
        ))}
    </main>
}