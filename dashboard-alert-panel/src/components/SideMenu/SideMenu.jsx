import { ClipboardText, Pen, Users } from "@phosphor-icons/react/dist/ssr";
import SideMenuItem from "../SideMenuItem/SideMenuItem";

export default function SideMenu() {
    return <div className="flex flex-col p-6 border-r border-r-gray-400 gap-3 min-w-60">
        <SideMenuItem title="Check-list de sala" icon={ClipboardText} />
        <SideMenuItem title="Registro de sala" icon={Pen} />
        <SideMenuItem title="Colaboradores" icon={Users} />
  </div>;
}