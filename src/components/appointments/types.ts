export interface Appointment {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  store: string;
  productName?: string;
  createdAt: string;
}

export const MOCK_APPOINTMENTS: Appointment[] = [
  {
    id: "1",
    name: "Priya Sharma",
    phone: "+91 98765 43210",
    email: "priya.sharma@email.com",
    date: "2024-12-20",
    time: "10:30 AM",
    store: "Zaveri Bazaar, Mumbai",
    productName: "Royal Diamond Necklace",
    createdAt: "2024-12-15"
  },
  {
    id: "2",
    name: "Amit Patel",
    phone: "+91 98765 43211",
    email: "amit.patel@email.com",
    date: "2024-12-18",
    time: "2:00 PM",
    store: "Bandra West, Mumbai",
    productName: "Gold Wedding Ring",
    createdAt: "2024-12-10"
  },
  {
    id: "3",
    name: "Kavita Reddy",
    phone: "+91 98765 43212",
    email: "kavita.reddy@email.com",
    date: "2024-12-25",
    time: "11:00 AM",
    store: "Zaveri Bazaar, Mumbai",
    productName: "Pearl Earrings Set",
    createdAt: "2024-12-12"
  },
  {
    id: "4",
    name: "Rahul Singh",
    phone: "+91 98765 43213",
    email: "rahul.singh@email.com",
    date: "2024-11-15",
    time: "3:30 PM",
    store: "Bandra West, Mumbai",
    productName: "Silver Bracelet",
    createdAt: "2024-11-10"
  },
  {
    id: "5",
    name: "Neha Gupta",
    phone: "+91 98765 43214",
    email: "neha.gupta@email.com",
    date: "2024-10-20",
    time: "1:00 PM",
    store: "Zaveri Bazaar, Mumbai",
    productName: "Diamond Earrings",
    createdAt: "2024-10-15"
  }
];
