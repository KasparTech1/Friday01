import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  Phone,
  Mail,
  MapPin,
  Package,
  History,
  Clock,
  ChevronRight,
} from "lucide-react";

interface Order {
  id: string;
  status: "pending_upload" | "pending_review" | "active" | "delivered";
  date: string;
  total: number;
  items: number;
}

interface DealerProfileProps {
  dealer?: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zip: string;
    avatarUrl?: string;
    orders?: Order[];
  };
}

const DealerProfile = ({
  dealer = {
    id: "D123",
    name: "Western Saddle Supply",
    email: "contact@westernsaddle.com",
    phone: "(555) 123-4567",
    address: "123 Ranch Road",
    city: "Dallas",
    state: "TX",
    zip: "75001",
    orders: [
      { id: "O1", status: "active", date: "2024-03-15", total: 2500, items: 3 },
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
  },
}: DealerProfileProps) => {
  const getStatusColor = (status: Order["status"]) => {
    const colors = {
      pending_upload: "bg-yellow-100 text-yellow-800",
      pending_review: "bg-blue-100 text-blue-800",
      active: "bg-green-100 text-green-800",
      delivered: "bg-gray-100 text-gray-800",
    };
    return colors[status];
  };

  return (
    <div className="w-full h-full bg-gray-50 p-6">
      <Card className="w-full h-full overflow-hidden">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b bg-white">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={dealer.avatarUrl} />
                  <AvatarFallback>
                    {dealer.name.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h1 className="text-2xl font-semibold">{dealer.name}</h1>
                  <p className="text-sm text-gray-500">
                    Dealer ID: {dealer.id}
                  </p>
                </div>
              </div>
              <Button>Impersonate Dealer</Button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{dealer.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{`${dealer.city}, ${dealer.state} ${dealer.zip}`}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{dealer.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-500" />
                <span className="text-sm">{dealer.email}</span>
              </div>
            </div>
          </div>

          {/* Content */}
          <Tabs defaultValue="orders" className="flex-1">
            <div className="border-b px-6 bg-white">
              <TabsList>
                <TabsTrigger value="orders">Orders</TabsTrigger>
                <TabsTrigger value="inventory">Inventory</TabsTrigger>
                <TabsTrigger value="activity">Activity</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="orders" className="flex-1 p-6">
              <ScrollArea className="h-[calc(100vh-300px)]">
                <div className="space-y-4">
                  {dealer.orders?.map((order) => (
                    <Card key={order.id} className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Package className="h-8 w-8 text-gray-400" />
                          <div>
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium">Order #{order.id}</h3>
                              <Badge className={getStatusColor(order.status)}>
                                {order.status.replace("_", " ").toUpperCase()}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                              <div className="flex items-center gap-1">
                                <History className="h-4 w-4" />
                                {order.date}
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="h-4 w-4" />
                                {order.items} items
                              </div>
                              <div className="flex items-center gap-1">
                                <Clock className="h-4 w-4" />${order.total}
                              </div>
                            </div>
                          </div>
                        </div>
                        <Button variant="ghost" size="icon">
                          <ChevronRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </TabsContent>

            <TabsContent value="inventory" className="p-6">
              <div className="flex items-center justify-center h-[calc(100vh-300px)] text-gray-500">
                Inventory view coming soon
              </div>
            </TabsContent>

            <TabsContent value="activity" className="p-6">
              <div className="flex items-center justify-center h-[calc(100vh-300px)] text-gray-500">
                Activity log coming soon
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  );
};

export default DealerProfile;
