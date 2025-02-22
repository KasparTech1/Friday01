import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Plus, Minus } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface DealerLocation {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  status: "active" | "inactive" | "pending";
}

interface DealerMapProps {
  dealers?: DealerLocation[];
  onDealerSelect?: (dealerId: string) => void;
}

const defaultDealers: DealerLocation[] = [
  {
    id: "1",
    name: "Western Saddle Co",
    address: "123 Main St, Dallas, TX",
    lat: 32.7767,
    lng: -96.797,
    status: "active",
  },
  {
    id: "2",
    name: "Frontier Equestrian",
    address: "456 Ranch Rd, Houston, TX",
    lat: 29.7604,
    lng: -95.3698,
    status: "pending",
  },
  {
    id: "3",
    name: "Saddle Ridge Supply",
    address: "789 Horse Trail, Austin, TX",
    lat: 30.2672,
    lng: -97.7431,
    status: "inactive",
  },
];

const DealerMap = ({
  dealers = defaultDealers,
  onDealerSelect = () => {},
}: DealerMapProps) => {
  const [zoom, setZoom] = useState(6);

  const statusColors = {
    active: "bg-green-500",
    inactive: "bg-gray-400",
    pending: "bg-yellow-500",
  };

  return (
    <Card className="w-full h-[600px] bg-white p-4 relative overflow-hidden">
      <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(Math.min(zoom + 1, 10))}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setZoom(Math.max(zoom - 1, 1))}
        >
          <Minus className="h-4 w-4" />
        </Button>
      </div>

      <div
        className="w-full h-full bg-slate-100 relative"
        style={{
          backgroundImage:
            "url(https://api.mapbox.com/styles/v1/mapbox/light-v10/static/-97.7431,32.7767,4/1200x600?access_token=YOUR_MAPBOX_TOKEN)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {dealers.map((dealer) => (
          <TooltipProvider key={dealer.id}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 p-1 rounded-full ${statusColors[dealer.status]}`}
                  style={{
                    left: `${((dealer.lng + 180) / 360) * 100}%`,
                    top: `${((90 - dealer.lat) / 180) * 100}%`,
                    transform: `scale(${zoom / 5})`,
                  }}
                  onClick={() => onDealerSelect(dealer.id)}
                >
                  <MapPin className="h-4 w-4 text-white" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <div className="p-2">
                  <h3 className="font-bold">{dealer.name}</h3>
                  <p className="text-sm text-gray-500">{dealer.address}</p>
                  <p className="text-xs text-gray-400 capitalize">
                    {dealer.status}
                  </p>
                </div>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        ))}
      </div>

      <div className="absolute bottom-4 left-4 z-10 flex gap-4">
        {Object.entries(statusColors).map(([status, color]) => (
          <div key={status} className="flex items-center gap-2">
            <div className={`w-3 h-3 rounded-full ${color}`} />
            <span className="text-sm capitalize">{status}</span>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default DealerMap;
