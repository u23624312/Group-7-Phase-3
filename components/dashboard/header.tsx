"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { phaseNames } from "@/lib/mock-data";
import type { MinePhase, TimeRange } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Bell, RefreshCw, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
  const { selectedPhase, setSelectedPhase, timeRange, setTimeRange } = useDashboard();

  return (
    <header className="bg-card border-b border-border px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            Renewable Energy Monitoring System
          </h2>
          <p className="text-sm text-muted-foreground">
            Iron Ore Mine - Hybrid Energy Dashboard
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Select
          value={selectedPhase}
          onValueChange={(value: MinePhase) => setSelectedPhase(value)}
        >
          <SelectTrigger className="w-[200px] bg-secondary border-border">
            <SelectValue placeholder="Select Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="processing-plant">{phaseNames["processing-plant"]}</SelectItem>
            <SelectItem value="mining-machinery">{phaseNames["mining-machinery"]}</SelectItem>
            <SelectItem value="crushing-beneficiation">{phaseNames["crushing-beneficiation"]}</SelectItem>
            <SelectItem value="blending-handling">{phaseNames["blending-handling"]}</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={timeRange}
          onValueChange={(value: TimeRange) => setTimeRange(value)}
        >
          <SelectTrigger className="w-[120px] bg-secondary border-border">
            <SelectValue placeholder="Time Range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="24h">Last 24h</SelectItem>
            <SelectItem value="7d">Last 7 Days</SelectItem>
            <SelectItem value="30d">Last 30 Days</SelectItem>
            <SelectItem value="90d">Last 90 Days</SelectItem>
            <SelectItem value="1y">Last Year</SelectItem>
          </SelectContent>
        </Select>

        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
        </Button>

        <Button variant="ghost" size="icon">
          <RefreshCw className="h-5 w-5" />
        </Button>

        <Button variant="ghost" size="icon">
          <Settings className="h-5 w-5" />
        </Button>
      </div>
    </header>
  );
}
