import { Gauge, MapPinned } from "lucide-react";
import type { SidebarElement } from "../interfaces/sidebar";

export const SIDEBAR_ELEMENTS: SidebarElement[] = [
  {
    icon: Gauge,
    name: "Dashboard",
    path: "/",
  },
  {
    icon: MapPinned,
    name: "Map",
    path: "/map",
  },
];
