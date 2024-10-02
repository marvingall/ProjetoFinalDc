'use client';
import BigCard from "@/components/BigCard/BigCard";
import RoomModalContent from "@/components/RoomModalContent/RoomModalContent";
import ScreenModal from "@/components/ScreenModal/ScreenModal";
import SmallCard from "@/components/SmallCard/SmallCard";
import { getRooms } from "@/services/roomServices";
import { useEffect, useState } from "react";
import {Input} from "postcss";
import InputLabel from "@/components/InputLabel/InputLabel";

export default function Home() {
  return (
      <main className="flex min-h-screen gap-4 flex-grow flex-col items-center justify-center p-6">
        <InputLabel label={"Email"} />
        <InputLabel label={"Password"} />
      </main>
  );
}
