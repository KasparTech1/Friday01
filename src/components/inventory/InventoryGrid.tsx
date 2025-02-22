import React from "react";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search, ShoppingCart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface InventoryItem {
  part: string;
  description: string;
  qtyOnHand: number;
  qtyRequired: number;
  effectiveQty: number;
  price: number;
}

interface InventoryGridProps {
  items?: InventoryItem[];
  onAddToCart?: (item: InventoryItem) => void;
}

const defaultItems: InventoryItem[] = [
  {
    part: "80-1234",
    description: "Western Saddle - Premium Leather",
    qtyOnHand: 50,
    qtyRequired: 20,
    effectiveQty: 30,
    price: 1299.99,
  },
  {
    part: "81-5678",
    description: "English Saddle - Competition Grade",
    qtyOnHand: 35,
    qtyRequired: 15,
    effectiveQty: 20,
    price: 1499.99,
  },
  {
    part: "82-9012",
    description: "Leather Bridle Set",
    qtyOnHand: 100,
    qtyRequired: 40,
    effectiveQty: 60,
    price: 299.99,
  },
];

const InventoryGrid = ({
  items = defaultItems,
  onAddToCart = () => {},
}: InventoryGridProps) => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [filteredItems, setFilteredItems] = React.useState(items);

  React.useEffect(() => {
    const filtered = items.filter(
      (item) =>
        item.part.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()),
    );
    setFilteredItems(filtered);
  }, [searchTerm, items]);

  return (
    <Card className="w-full p-6 bg-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold text-gray-800">Inventory</h2>
        <div className="relative w-72">
          <Input
            type="text"
            placeholder="Search inventory..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Part #</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">Qty On Hand</TableHead>
              <TableHead className="text-right">Qty Required</TableHead>
              <TableHead className="text-right">Effective Qty</TableHead>
              <TableHead className="text-right">Price</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredItems.map((item) => (
              <TableRow key={item.part}>
                <TableCell className="font-medium">{item.part}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right">{item.qtyOnHand}</TableCell>
                <TableCell className="text-right">{item.qtyRequired}</TableCell>
                <TableCell className="text-right">
                  <span
                    className={`px-2 py-1 rounded ${
                      item.effectiveQty > 20
                        ? "bg-green-100 text-green-800"
                        : item.effectiveQty > 0
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {item.effectiveQty}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  ${item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onAddToCart(item)}
                          disabled={item.effectiveQty <= 0}
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Add to cart</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};

export default InventoryGrid;
