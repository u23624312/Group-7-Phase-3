"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getSustainabilityMetrics, getEmissionsData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import { Leaf, Fuel, Factory, TrendingUp, Globe, Award } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";

export function Sustainability() {
  const { selectedPhase } = useDashboard();
  const sustainability = getSustainabilityMetrics(selectedPhase);
  const emissionsData = getEmissionsData();

  const penetrationData = [
    {
      name: "Renewable Penetration",
      value: sustainability.renewablePenetration,
      fill: "#22c55e",
    },
  ];

  const esgMetrics = [
    { name: "Carbon Neutral Target", progress: 73, target: "2030", status: "On Track" },
    { name: "Zero Diesel Operations", progress: 65, target: "2028", status: "On Track" },
    { name: "Grid Independence", progress: 42, target: "2032", status: "In Progress" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Sustainability & ESG Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="CO₂ Avoided"
            value={sustainability.co2Avoided.toLocaleString()}
            unit="tons"
            change={15.3}
            changeLabel="vs last month"
            icon={Leaf}
            trend="up"
          />
          <KPICard
            title="Diesel Offset"
            value={(sustainability.dieselOffset / 1000).toFixed(0)}
            unit="kL"
            change={11.2}
            changeLabel="vs last month"
            icon={Fuel}
            trend="up"
          />
          <KPICard
            title="Carbon Intensity"
            value={sustainability.carbonIntensity}
            unit="kg CO₂/kWh"
            change={-8.5}
            changeLabel="vs last year"
            icon={Factory}
            trend="down"
          />
          <KPICard
            title="Renewable Penetration"
            value={sustainability.renewablePenetration}
            unit="%"
            change={5.2}
            changeLabel="vs last month"
            icon={TrendingUp}
            trend="up"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Cumulative CO₂ Emissions Avoided (YTD)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={emissionsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} tons`, "CO₂ Avoided"]}
                  />
                  <defs>
                    <linearGradient id="co2Gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8} />
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0.1} />
                    </linearGradient>
                  </defs>
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="#22c55e"
                    fill="url(#co2Gradient)"
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
              Renewable Energy Penetration
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] flex flex-col items-center justify-center">
              <ResponsiveContainer width="100%" height="80%">
                <RadialBarChart
                  cx="50%"
                  cy="50%"
                  innerRadius="60%"
                  outerRadius="100%"
                  barSize={20}
                  data={penetrationData}
                  startAngle={180}
                  endAngle={0}
                >
                  <RadialBar
                    background={{ fill: "#374151" }}
                    dataKey="value"
                    cornerRadius={10}
                  />
                </RadialBarChart>
              </ResponsiveContainer>
              <div className="text-center -mt-16">
                <p className="text-4xl font-bold text-foreground">
                  {sustainability.renewablePenetration}%
                </p>
                <p className="text-sm text-muted-foreground">of Total Energy</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
            <Globe className="h-4 w-4 text-primary" />
            ESG Target Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {esgMetrics.map((metric) => (
              <div key={metric.name} className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium text-foreground">{metric.name}</span>
                  <span className="text-xs text-muted-foreground">Target: {metric.target}</span>
                </div>
                <div className="h-3 bg-background rounded-full overflow-hidden mb-2">
                  <div
                    className="h-full bg-green-500 rounded-full transition-all duration-500"
                    style={{ width: `${metric.progress}%` }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-semibold text-foreground">{metric.progress}%</span>
                  <span className={`text-xs px-2 py-1 rounded ${
                    metric.status === "On Track" 
                      ? "bg-green-500/20 text-green-500" 
                      : "bg-yellow-500/20 text-yellow-500"
                  }`}>
                    {metric.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Fuel className="h-4 w-4 text-primary" />
              Diesel Displacement Analysis
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {(sustainability.dieselOffset / 1000).toFixed(0)}
                  </p>
                  <p className="text-xs text-muted-foreground">kL Diesel Offset (YTD)</p>
                </div>
                <div className="p-4 bg-secondary rounded-lg text-center">
                  <p className="text-2xl font-bold text-green-500">
                    ${((sustainability.dieselOffset / 1000) * 1.2).toFixed(0)}K
                  </p>
                  <p className="text-xs text-muted-foreground">Fuel Cost Saved</p>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <p className="text-sm text-foreground">
                  <strong>Impact:</strong> Equivalent to removing {Math.round(sustainability.dieselOffset / 2000)} passenger vehicles from roads for one year.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Award className="h-4 w-4 text-primary" />
              Environmental Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Leaf className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">ISO 14001:2015</p>
                    <p className="text-xs text-muted-foreground">Environmental Management</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center">
                    <Globe className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">RE100 Member</p>
                    <p className="text-xs text-muted-foreground">100% Renewable Commitment</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded">Active</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-yellow-500/20 rounded-full flex items-center justify-center">
                    <Award className="h-5 w-5 text-yellow-500" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Science Based Targets</p>
                    <p className="text-xs text-muted-foreground">Net Zero Pathway</p>
                  </div>
                </div>
                <span className="text-xs px-2 py-1 bg-yellow-500/20 text-yellow-500 rounded">Pending</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
