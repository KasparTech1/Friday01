import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, History } from "lucide-react";

interface StatusTileProps {
  title: string;
  count: number;
  icon: React.ReactNode;
  color: string;
}

interface StatusTilesProps {
  pendingCount?: number;
  activeCount?: number;
  historyCount?: number;
}

const StatusTile = ({ title, count, icon, color }: StatusTileProps) => {
  return (
    <Card
      className={`p-6 flex flex-col items-center justify-center space-y-2 bg-white hover:bg-gray-50 transition-colors cursor-pointer`}
    >
      <div className={`p-3 rounded-full ${color}`}>{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <Badge variant="secondary" className="text-lg px-4 py-1">
        {count}
      </Badge>
    </Card>
  );
};

const StatusTiles = ({
  pendingCount = 5,
  activeCount = 12,
  historyCount = 24,
}: StatusTilesProps) => {
  const tiles = [
    {
      title: "Pending Orders",
      count: pendingCount,
      icon: <Clock className="w-6 h-6 text-amber-600" />,
      color: "bg-amber-100",
    },
    {
      title: "Active Orders",
      count: activeCount,
      icon: <CheckCircle className="w-6 h-6 text-green-600" />,
      color: "bg-green-100",
    },
    {
      title: "Order History",
      count: historyCount,
      icon: <History className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-100",
    },
  ];

  return (
    <div className="w-full bg-gray-100 p-6 rounded-lg">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tiles.map((tile, index) => (
          <StatusTile
            key={index}
            title={tile.title}
            count={tile.count}
            icon={tile.icon}
            color={tile.color}
          />
        ))}
      </div>
    </div>
  );
};

export default StatusTiles;
