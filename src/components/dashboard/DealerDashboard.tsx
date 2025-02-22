import React, { useState } from "react";
import StatusTiles from "./StatusTiles";
import OrderForm from "../orders/OrderForm";
import InventoryGrid from "../inventory/InventoryGrid";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Building2, Package, Bell } from "lucide-react";

interface DealerDashboardProps {
  dealer?: {
    id: string;
    name: string;
    avatarUrl?: string;
  };
}

const DealerDashboard = ({
  dealer = {
    id: "D123",
    name: "Western Saddle Supply",
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=WesternSaddle",
  },
}: DealerDashboardProps) => {
  const [notifications] = useState(3);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <Card className="mb-6 p-6 bg-white">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Avatar className="h-12 w-12">
              <AvatarImage src={dealer.avatarUrl} />
              <AvatarFallback>
                {dealer.name.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{dealer.name}</h1>
              <p className="text-sm text-gray-500">Dealer ID: {dealer.id}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" className="relative">
              <Bell className="h-5 w-5" />
              {notifications > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {notifications}
                </span>
              )}
            </Button>
            <OrderForm />
          </div>
        </div>
      </Card>

      {/* Status Tiles */}
      <div className="mb-6">
        <StatusTiles />
      </div>

      {/* Main Content */}
      <Tabs defaultValue="inventory" className="space-y-6">
        <Card className="p-2">
          <TabsList>
            <TabsTrigger value="inventory" className="flex items-center">
              <Package className="h-4 w-4 mr-2" />
              Inventory
            </TabsTrigger>
            <TabsTrigger value="orders" className="flex items-center">
              <Building2 className="h-4 w-4 mr-2" />
              Orders
            </TabsTrigger>
          </TabsList>
        </Card>

        <TabsContent value="inventory" className="m-0">
          <InventoryGrid />
        </TabsContent>

        <TabsContent value="orders" className="m-0">
          <Card className="p-6">
            <div className="flex items-center justify-center h-64 text-gray-500">
              Orders view coming soon
            </div>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DealerDashboard;
