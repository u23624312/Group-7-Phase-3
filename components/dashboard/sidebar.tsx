"use client";

import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Sun,
  Wind,
  Battery,
  Zap,
  Activity,
  Wrench,
  LineChart,
  DollarSign,
  Leaf,
  AlertTriangle,
  Layers,
  PiggyBank,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

const navItems = [
  { id: "overview", label: "Executive Overview", icon: LayoutDashboard },
  { id: "solar", label: "Solar Generation", icon: Sun },
  { id: "wind", label: "Wind Generation", icon: Wind },
  { id: "battery", label: "Battery Storage", icon: Battery },
  { id: "grid", label: "Grid & Demand", icon: Zap },
  { id: "reliability", label: "Reliability", icon: Activity },
  { id: "maintenance", label: "Maintenance", icon: Wrench },
  { id: "forecasting", label: "Forecasting", icon: LineChart },
  { id: "financial", label: "Financial", icon: DollarSign },
  { id: "sustainability", label: "Sustainability", icon: Leaf },
  { id: "alerts", label: "Alerts & Risks", icon: AlertTriangle },
  { id: "phases", label: "Phase Analysis", icon: Layers },
  { id: "savings", label: "Cost Savings", icon: PiggyBank },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        "bg-sidebar border-r border-sidebar-border flex flex-col h-screen sticky top-0 transition-all duration-300",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="p-4 border-b border-sidebar-border flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
              <Zap className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="font-bold text-sm text-sidebar-foreground">IronPower</h1>
              <p className="text-xs text-muted-foreground">Energy Dashboard</p>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mx-auto">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          className={cn("h-8 w-8", collapsed && "mx-auto mt-2")}
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <nav className="flex-1 p-2 overflow-y-auto">
        <ul className="space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <button
                  onClick={() => onSectionChange(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors",
                    activeSection === item.id
                      ? "bg-sidebar-primary text-sidebar-primary-foreground"
                      : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
                >
                  <Icon className="h-4 w-4 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {!collapsed && (
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            <span>System Online</span>
          </div>
        </div>
      )}
    </aside>
  );
}
