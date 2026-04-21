"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getKPIData, getEnergyGenerationHistory } from "@/lib/mock-data";
import { KPICard } from "../kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Zap,
  Sun,
  Wind,
  DollarSign,
  Leaf,
  Fuel,
  Activity,
  TrendingUp,
} from "lucide-react";
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
  Legend,
} from "recharts";

export function ExecutiveOverview() {
  const { selectedPhase } = useDashboard();
  const kpi = getKPIData(selectedPhase);
  const generationData = getEnergyGenerationHistory();

  const energySourceData = [
    { name: "Solar", value: kpi.solarContribution, color: "#f59e0b" },
    { name: "Wind", value: kpi.windContribution, color: "#6b7280" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Executive Overview - Key Performance Indicators
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Total Energy Generated"
            value={kpi.totalEnergyGenerated.toFixed(1)}
            unit="GWh"
            change={12.4}
            changeLabel="vs last month"
            icon={Zap}
            trend="up"
          />
          <KPICard
            title="Real-Time Power"
            value={kpi.realTimePowerOutput.toFixed(1)}
            unit="MW"
            icon={Activity}
            trend="neutral"
          />
          <KPICard
            title="Renewable Demand Met"
            value={kpi.renewableDemandMet}
            unit="%"
            change={5.2}
            changeLabel="vs target"
            icon={TrendingUp}
            trend="up"
          />
          <KPICard
            title="Cost Savings"
            value={`$${kpi.totalCostSavings.toFixed(2)}`}
            unit="M"
            change={8.7}
            changeLabel="vs last month"
            icon={DollarSign}
            trend="up"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard
          title="CO₂ Avoided"
          value={kpi.co2Avoided.toLocaleString()}
          unit="tons"
          change={15.3}
          changeLabel="vs last month"
          icon={Leaf}
          trend="up"
        />
        <KPICard
          title="Diesel Offset"
          value={(kpi.dieselOffset / 1000).toFixed(0)}
          unit="kL"
          change={11.2}
          changeLabel="vs last month"
          icon={Fuel}
          trend="up"
        />
        <KPICard
          title="Solar Contribution"
          value={kpi.solarContribution}
          unit="%"
          icon={Sun}
          trend="neutral"
        />
        <KPICard
          title="Wind Contribution"
          value={kpi.windContribution}
          unit="%"
          icon={Wind}
          trend="neutral"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Energy Generation vs Demand (Today)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={generationData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    labelStyle={{ color: "#f3f4f6" }}
                  />
                  <Area
                    type="monotone"
                    dataKey="solar"
                    stackId="1"
                    stroke="#f59e0b"
                    fill="#f59e0b"
                    fillOpacity={0.6}
                    name="Solar"
                  />
                  <Area
                    type="monotone"
                    dataKey="wind"
                    stackId="1"
                    stroke="#6b7280"
                    fill="#6b7280"
                    fillOpacity={0.6}
                    name="Wind"
                  />
                  <Area
                    type="monotone"
                    dataKey="battery"
                    stackId="1"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.6}
                    name="Battery"
                  />
                  <Area
                    type="monotone"
                    dataKey="demand"
                    stroke="#ffffff"
                    fill="none"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="Demand"
                  />
                </AreaChart>
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
                <PieChart>
                  <Pie
                    data={energySourceData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={90}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                    labelLine={false}
                  >
                    {energySourceData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Legend />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Plant Availability vs Target
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Current Availability</span>
                <span className="font-medium text-foreground">{kpi.plantAvailability}%</span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-primary rounded-full transition-all duration-500"
                  style={{ width: `${kpi.plantAvailability}%` }}
                />
              </div>
              <div className="flex justify-between text-xs mt-1">
                <span className="text-muted-foreground">0%</span>
                <span className="text-muted-foreground">
                  Target: {kpi.availabilityTarget}%
                </span>
                <span className="text-muted-foreground">100%</span>
              </div>
            </div>
            <div className="text-center px-4 border-l border-border">
              <p className="text-2xl font-bold text-foreground">
                {(kpi.plantAvailability - kpi.availabilityTarget).toFixed(1)}%
              </p>
              <p className="text-xs text-muted-foreground">vs Target</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
