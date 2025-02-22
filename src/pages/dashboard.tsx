import React, { useState } from "react";
import DealerDashboard from "@/components/dashboard/DealerDashboard";
import SalesRepDashboard from "@/components/dashboard/SalesRepDashboard";

interface DashboardProps {
  userRole?: "dealer" | "sales_rep";
  userId?: string;
}

const Dashboard = ({
  userRole = "dealer", // Default to dealer view if no role provided
  userId = "D123", // Default user ID for demo purposes
}: DashboardProps) => {
  const [role] = useState(userRole);

  return (
    <div className="min-h-screen bg-gray-100">
      {role === "dealer" ? (
        <DealerDashboard
          dealer={{
            id: userId,
            name: "Western Saddle Supply",
            avatarUrl: `https://api.dicebear.com/7.x/avataaars/svg?seed=${userId}`,
          }}
        />
      ) : (
        <SalesRepDashboard />
      )}
    </div>
  );
};

export default Dashboard;
