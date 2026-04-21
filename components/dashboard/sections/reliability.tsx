"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getReliabilityMetrics } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import { Activity, Clock, Wrench, CheckCircle, AlertCircle } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  ReferenceLine,
} from "recharts";

export function Reliability() {
  const { selectedPhase } = useDashboard();
  const reliability = getReliabilityMetrics(selectedPhase);

  const downtimeData = [
    { name: "Planned", value: reliability.plannedDowntime, color: "#6b7280" },
    { name: "Unplanned", value: reliability.unplannedDowntime, color: "#ef4444" },
    { name: "Operational", value: 100 - reliability.plannedDowntime - reliability.unplannedDowntime, color: "#22c55e" },
  ];

  const componentAvailability = [
    { name: "Inverters", value: reliability.inverterAvailability },
    { name: "Turbines", value: reliability.turbineAvailability },
    { name: "Battery", value: reliability.batteryUptime },
  ];

  const monthlyAvailability = [
    { month: "Jan", availability: 94.2 },
    { month: "Feb", availability: 95.1 },
    { month: "Mar", availability: 93.8 },
    { month: "Apr", availability: 94.9 },
    { month: "May", availability: 95.3 },
    { month: "Jun", availability: reliability.plantAvailability },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Reliability, Availability & Downtime
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Plant Availability"
            value={reliability.plantAvailability}
            unit="%"
            change={0.5}
            changeLabel="vs last month"
            icon={Activity}
            trend="up"
          />
          <KPICard
            title="MTBF"
            value={reliability.mtbf}
            unit="hrs"
            icon={Clock}
            trend="up"
          />
          <KPICard
            title="MTTR"
            value={reliability.mttr}
            unit="hrs"
            icon={Wrench}
            trend="down"
          />
          <KPICard
            title="Unplanned Downtime"
            value={reliability.unplannedDowntime}
            unit="%"
            change={-0.3}
            changeLabel="vs last month"
            icon={AlertCircle}
            trend="down"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="bg-card border-border lg:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Monthly Plant Availability Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyAvailability}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} domain={[90, 100]} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Availability"]}
                  />
                  <Bar dataKey="availability" fill="#ef4444" radius={[4, 4, 0, 0]} />
                  <ReferenceLine y={95} stroke="#22c55e" strokeDasharray="5 5" label="Target" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Downtime Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={downtimeData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, value }) => `${value.toFixed(1)}%`}
                  >
                    {downtimeData.map((entry, index) => (
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
              <div className="flex justify-center gap-4 -mt-4">
                {downtimeData.map((item) => (
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {componentAvailability.map((component) => (
          <Card key={component.name} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                {component.value >= 98 ? (
                  <CheckCircle className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-primary" />
                )}
                {component.name} Availability
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-bold text-foreground">{component.value}%</span>
                  <span className={`text-sm ${component.value >= 98 ? "text-green-500" : "text-primary"}`}>
                    Target: 98%
                  </span>
                </div>
                <div className="h-3 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      component.value >= 98 ? "bg-green-500" : "bg-primary"
                    }`}
                    style={{ width: `${component.value}%` }}
                  />
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
              <Clock className="h-4 w-4 text-primary" />
              Mean Time Between Failures (MTBF)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-foreground">{reliability.mtbf}</span>
                <span className="text-lg text-muted-foreground ml-2">hours</span>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Month</p>
                    <p className="font-semibold text-foreground">1,182 hrs</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Improvement</p>
                    <p className="font-semibold text-green-500">+5.5%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Wrench className="h-4 w-4 text-primary" />
              Mean Time To Repair (MTTR)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <span className="text-4xl font-bold text-foreground">{reliability.mttr}</span>
                <span className="text-lg text-muted-foreground ml-2">hours</span>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Last Month</p>
                    <p className="font-semibold text-foreground">4.8 hrs</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Improvement</p>
                    <p className="font-semibold text-green-500">-12.5%</p>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
