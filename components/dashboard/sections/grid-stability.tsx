"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getGridMetrics } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import { Zap, Activity, Plug, Fuel, TrendingUp } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Line,
  Area,
  Cell,
} from "recharts";

export function GridStability() {
  const { selectedPhase } = useDashboard();
  const grid = getGridMetrics(selectedPhase);

  const energySourceData = [
    { name: "Renewable", value: grid.renewableSupply, color: "#22c55e" },
    { name: "Grid Import", value: grid.gridImport, color: "#6b7280" },
    { name: "Diesel", value: grid.dieselBackup, color: "#ef4444" },
  ];

  const demandVsSupplyData = Array.from({ length: 24 }, (_, i) => {
    const baseSupply = grid.renewableSupply * (0.8 + Math.sin(i * 0.3) * 0.3);
    const baseDemand = grid.mineDemand * (0.9 + Math.sin(i * 0.25) * 0.2);
    return {
      hour: `${i.toString().padStart(2, '0')}:00`,
      supply: Math.round(baseSupply * 10) / 10,
      demand: Math.round(baseDemand * 10) / 10,
      gap: Math.round((baseDemand - baseSupply) * 10) / 10,
    };
  });

  const stabilityMetrics = [
    { name: "Frequency", value: grid.frequencyStability, target: 99.5, unit: "%" },
    { name: "Voltage", value: grid.voltageStability, target: 99.0, unit: "%" },
    { name: "Connection", value: grid.connectionUptime, target: 99.5, unit: "%" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Grid Stability & Mine Demand Alignment
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Mine Demand"
            value={grid.mineDemand.toFixed(1)}
            unit="MW"
            icon={Zap}
            trend="neutral"
          />
          <KPICard
            title="Renewable Supply"
            value={grid.renewableSupply.toFixed(1)}
            unit="MW"
            icon={TrendingUp}
            trend="up"
          />
          <KPICard
            title="Renewable Penetration"
            value={grid.renewablePenetration}
            unit="%"
            change={3.2}
            changeLabel="vs last week"
            icon={Activity}
            trend="up"
          />
          <KPICard
            title="Grid Import"
            value={grid.gridImport.toFixed(1)}
            unit="MW"
            change={-8.5}
            changeLabel="vs last week"
            icon={Plug}
            trend="down"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Demand vs Renewable Supply (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={demandVsSupplyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} interval={3} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="supply"
                    fill="#22c55e"
                    fillOpacity={0.3}
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Renewable Supply (MW)"
                  />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Mine Demand (MW)"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Energy Source Mix
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energySourceData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} unit=" MW" />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value.toFixed(1)} MW`, "Power"]}
                  />
                  <Bar
                    dataKey="value"
                    radius={[0, 4, 4, 0]}
                  >
                    {energySourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stabilityMetrics.map((metric) => (
          <Card key={metric.name} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {metric.name} Stability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-foreground">
                    {metric.value}{metric.unit}
                  </span>
                  <span className={`text-sm ${metric.value >= metric.target ? "text-green-500" : "text-primary"}`}>
                    Target: {metric.target}{metric.unit}
                  </span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${metric.value >= metric.target ? "bg-green-500" : "bg-primary"}`}
                    style={{ width: `${metric.value}%` }}
                  />
                </div>
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${metric.value >= metric.target ? "bg-green-500" : "bg-primary"}`} />
                  <span className="text-xs text-muted-foreground">
                    {metric.value >= metric.target ? "Within Target" : "Below Target"}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Ramp Rate Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Ramp Rate</span>
                <span className="text-lg font-semibold text-foreground">{grid.rampRate} MW/min</span>
              </div>
              <div className="text-xs text-muted-foreground">
                Output variability is within acceptable limits for grid stability.
              </div>
              <div className="h-2 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${(grid.rampRate / 5) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>0 MW/min</span>
                <span>Max: 5 MW/min</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Fuel className="h-4 w-4 text-primary" />
              Diesel Backup Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Current Usage</span>
                <span className="text-lg font-semibold text-primary">{grid.dieselBackup.toFixed(1)} MW</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">% of Total Demand</span>
                <span className="text-lg font-semibold text-foreground">
                  {((grid.dieselBackup / grid.mineDemand) * 100).toFixed(1)}%
                </span>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Diesel backup is operating at minimum levels. Renewable sources are meeting {grid.renewablePenetration}% of demand.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
