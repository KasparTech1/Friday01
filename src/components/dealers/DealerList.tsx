import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Phone, Mail } from "lucide-react";

interface Dealer {
  id: string;
  name: string;
  location: string;
  phone: string;
  email: string;
  status: "active" | "inactive";
  pendingOrders: number;
}

interface DealerListProps {
  dealers?: Dealer[];
  onDealerSelect?: (dealer: Dealer) => void;
  selectedDealerId?: string;
}

const defaultDealers: Dealer[] = [
  {
    id: "1",
    name: "Western Saddle Co",
    location: "Dallas, TX",
    phone: "(555) 123-4567",
    email: "contact@westernsaddle.com",
    status: "active",
    pendingOrders: 3,
  },
  {
    id: "2",
    name: "Frontier Equestrian",
    location: "Houston, TX",
    phone: "(555) 234-5678",
    email: "sales@frontier.com",
    status: "active",
    pendingOrders: 1,
  },
  {
    id: "3",
    name: "Ranch Supply Outlet",
    location: "Austin, TX",
    phone: "(555) 345-6789",
    email: "info@ranchsupply.com",
    status: "inactive",
    pendingOrders: 0,
  },
];

const DealerList = ({
  dealers = defaultDealers,
  onDealerSelect = () => {},
  selectedDealerId = "",
}: DealerListProps) => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDealers = dealers.filter(
    (dealer) =>
      dealer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dealer.location.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="w-full h-full bg-background border-r">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search dealers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <ScrollArea className="h-[calc(100vh-5rem)]">
        <div className="p-4 space-y-4">
          {filteredDealers.map((dealer) => (
            <Card
              key={dealer.id}
              className={`p-4 cursor-pointer transition-colors hover:bg-accent ${selectedDealerId === dealer.id ? "border-primary" : ""}`}
              onClick={() => onDealerSelect(dealer)}
            >
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-medium">{dealer.name}</h3>
                <Badge
                  variant={dealer.status === "active" ? "default" : "secondary"}
                >
                  {dealer.status}
                </Badge>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{dealer.location}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  <span>{dealer.phone}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <span>{dealer.email}</span>
                </div>
              </div>

              {dealer.pendingOrders > 0 && (
                <div className="mt-3">
                  <Badge variant="destructive">
                    {dealer.pendingOrders} Pending Orders
                  </Badge>
                </div>
              )}
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default DealerList;
