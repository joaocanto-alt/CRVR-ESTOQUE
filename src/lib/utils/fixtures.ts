export type DeliveryStatus = "CONFIRMADO";

export interface RecentDelivery {
  id: string;
  employeeName: string;
  itemsSummary: string;
  time: string;
  status: DeliveryStatus;
}

export const recentDeliveries: RecentDelivery[] = [
  {
    id: "1",
    employeeName: "Vitor Schonardie",
    itemsSummary: "2× Luva Látex G9 · 1× Óculos · 1× Botina 42",
    time: "Hoje, 14:32",
    status: "CONFIRMADO",
  },
  {
    id: "2",
    employeeName: "Marcelo Souza",
    itemsSummary: "4× Luva Nitrílica G9",
    time: "Hoje, 11:05",
    status: "CONFIRMADO",
  },
  {
    id: "3",
    employeeName: "Ana Beatriz Lima",
    itemsSummary: "1× Botina 42 · 1× Óculos Transparente",
    time: "Ontem, 16:47",
    status: "CONFIRMADO",
  },
];