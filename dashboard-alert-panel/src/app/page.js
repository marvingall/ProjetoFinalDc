import BigCard from "@/components/BigCard/BigCard";
import SmallCard from "@/components/SmallCard/SmallCard";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen gap-4 flex-grow flex-col items-center justify-center p-6">
      <div className="flex-shrink gap-4 flex justify-between min-w-full">
        <BigCard />
        <BigCard variant="orange" />
        <BigCard />
      </div>
      <div className="flex-grow gap-x-3 flex-wrap flex items-start min-w-full">
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
        <SmallCard />
      </div>
    </main>
  );
}
