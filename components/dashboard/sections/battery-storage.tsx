"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getBatteryMetrics, getBatteryHistory } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import { Battery, BatteryCharging, Gauge, Activity, AlertTriangle } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export function BatteryStorage() {
  const { selectedPhase } = useDashboard();
  const battery = getBatteryMetrics(selectedPhase);
  const batteryHistory = getBatteryHistory();

  const contributionData = [
    { name: "Peak Shaving", value: battery.peakShavingContribution, color: "#ef4444" },
    { name: "Load Shifting", value: battery.loadShiftingContribution, color: "#6b7280" },
    { name: "Backup Supply", value: battery.backupContribution, color: "#374151" },
  ];

  const getSoCColor = (soc: number) => {
    if (soc >= 70) return "bg-green-500";
    if (soc >= 40) return "bg-yellow-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Battery Storage & Dispatch
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="State of Charge"
            value={battery.stateOfCharge}
            unit="%"
            icon={Battery}
            trend="neutral"
          />
          <KPICard
            title="Round-Trip Efficiency"
            value={battery.roundTripEfficiency}
            unit="%"
            icon={Gauge}
            trend="up"
          />
          <KPICard
            title="Energy Dispatched"
            value={battery.energyDispatched.toFixed(1)}
            unit="MWh"
            change={7.3}
            changeLabel="vs yesterday"
            icon={BatteryCharging}
            trend="up"
          />
          <KPICard
            title="Cycle Count"
            value={battery.cycleCount}
            unit="cycles"
            icon={Activity}
            trend="neutral"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              State of Charge History (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={batteryHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} interval={3} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "SoC"]}
                  />
                  <defs>
                    <linearGradient id="socGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ef4444" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#ef4444"
                    fill="url(#socGradient)"
                    strokeWidth={2}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Battery Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={contributionData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                  >
                    {contributionData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex justify-center gap-4 mt-2">
                {contributionData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-xs text-muted-foreground">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Current State of Charge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center">
              <div className="relative w-32 h-48 border-4 border-border rounded-lg overflow-hidden">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-4 bg-border rounded-t-md" />
                <div
                  className={`absolute bottom-0 left-0 right-0 ${getSoCColor(battery.stateOfCharge)} transition-all duration-500`}
                  style={{ height: `${battery.stateOfCharge}%` }}
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-2xl font-bold text-foreground drop-shadow-lg">
                    {battery.stateOfCharge}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <BatteryCharging className="h-4 w-4 text-primary" />
              Charge/Discharge
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Charge Rate</span>
                  <span className="text-green-500">{battery.chargeRate} MW</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${(battery.chargeRate / 20) * 100}%` }}
                  />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-muted-foreground">Discharge Rate</span>
                  <span className="text-primary">{battery.dischargeRate} MW</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${(battery.dischargeRate / 20) * 100}%` }}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Energy Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Energy Stored</span>
                <span className="font-semibold text-foreground">{battery.energyStored} MWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Energy Dispatched</span>
                <span className="font-semibold text-foreground">{battery.energyDispatched} MWh</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Round-Trip Eff.</span>
                <span className="font-semibold text-foreground">{battery.roundTripEfficiency}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Health & Degradation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Cycle Count</span>
                <span className="font-semibold text-foreground">{battery.cycleCount}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Degradation</span>
                <span className="font-semibold text-primary">{battery.degradation}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Remaining Capacity</span>
                <span className="font-semibold text-foreground">{(100 - battery.degradation).toFixed(1)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
