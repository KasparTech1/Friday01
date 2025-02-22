import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import DealerList from "@/components/dealers/DealerList";
import DealerMap from "@/components/dealers/DealerMap";
import DealerProfile from "@/components/dealers/DealerProfile";
import StatusTiles from "@/components/dashboard/StatusTiles";
import { MapIcon, ListIcon } from "lucide-react";

interface Dealer {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  pendingOrders: number;
  address: string;
  city: string;
  state: string;
  zip: string;
}

const defaultDealers: Dealer[] = [
  {
    id: "1",
    name: "Western Saddle Co",
    location: "Dallas, TX",
    address: "123 Main St",
    city: "Dallas",
    state: "TX",
    zip: "75001",
    phone: "(555) 123-4567",
    email: "contact@westernsaddle.com",
    status: "active",
    pendingOrders: 3,
  },
  {
    id: "2",
    name: "Frontier Equestrian",
    location: "Houston, TX",
    address: "456 Ranch Rd",
    city: "Houston",
    state: "TX",
    zip: "77001",
    phone: "(555) 234-5678",
    email: "sales@frontier.com",
    status: "active",
    pendingOrders: 1,
  },
  {
    id: "3",
    name: "Ranch Supply Outlet",
    location: "Austin, TX",
    address: "789 Horse Trail",
    city: "Austin",
    state: "TX",
    zip: "78701",
    phone: "(555) 345-6789",
    email: "info@ranchsupply.com",
    status: "inactive",
    pendingOrders: 0,
  },
];

const SalesRepDashboard = () => {
  const [selectedDealer, setSelectedDealer] = useState<Dealer | null>(null);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");

  const handleDealerSelect = (dealer: Dealer) => {
    setSelectedDealer(dealer);
  };

  return (
    <div className="h-screen bg-gray-100 flex flex-col">
      <div className="p-6">
        <StatusTiles pendingCount={8} activeCount={15} historyCount={42} />
      </div>

      <div className="flex-1 p-6 flex gap-6 min-h-0">
        <Card className="w-96 flex flex-col bg-white">
          <div className="p-4 border-b flex justify-between items-center">
            <h2 className="text-lg font-semibold">Dealers</h2>
            <div className="flex gap-2">
              <Button
                variant={viewMode === "list" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("list")}
              >
                <ListIcon className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "map" ? "default" : "outline"}
                size="icon"
                onClick={() => setViewMode("map")}
              >
                <MapIcon className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {viewMode === "list" ? (
            <DealerList
              dealers={defaultDealers}
              onDealerSelect={handleDealerSelect}
              selectedDealerId={selectedDealer?.id}
            />
          ) : (
            <div className="p-4">
              <DealerMap
                dealers={defaultDealers.map((d) => ({
                  id: d.id,
                  name: d.name,
                  address: `${d.address}, ${d.city}, ${d.state} ${d.zip}`,
                  lat: Math.random() * 10 + 30, // Placeholder coordinates
                  lng: Math.random() * -10 - 90,
                  status: d.status === "active" ? "active" : "inactive",
                }))}
                onDealerSelect={(id) => {
                  const dealer = defaultDealers.find((d) => d.id === id);
                  if (dealer) handleDealerSelect(dealer);
                }}
              />
            </div>
          )}
        </Card>

        <div className="flex-1">
          {selectedDealer ? (
            <DealerProfile
              dealer={{
                ...selectedDealer,
                avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedDealer.id}`,
                orders: [
                  {
                    id: "O1",
                    status: "active",
                    date: "2024-03-15",
                    total: 2500,
                    items: 3,
                  },
                  {
                    id: "O2",
                    status: "pending_review",
                    date: "2024-03-14",
                    total: 1800,
                    items: 2,
                  },
                  {
                    id: "O3",
                    status: "delivered",
                    date: "2024-03-10",
                    total: 3200,
                    items: 4,
                  },
                ],
              }}
            />
          ) : (
            <Card className="h-full flex items-center justify-center text-gray-500 bg-white">
              Select a dealer to view details
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesRepDashboard;
