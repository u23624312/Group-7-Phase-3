"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getSolarMetrics } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import { Sun, Thermometer, Gauge, Zap, AlertTriangle } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

export function SolarGeneration() {
  const { selectedPhase } = useDashboard();
  const solar = getSolarMetrics(selectedPhase);

  const hourlyData = Array.from({ length: 12 }, (_, i) => {
    const hour = 6 + i;
    const solarOutput = hour >= 6 && hour <= 18 ? Math.sin((hour - 6) * Math.PI / 12) * 35 : 0;
    return {
      hour: `${hour}:00`,
      generation: Math.round(solarOutput + Math.random() * 3),
      irradiance: Math.round(400 + Math.sin((hour - 6) * Math.PI / 12) * 500),
    };
  });

  const lossesData = [
    { name: "DC Losses", value: solar.dcLosses },
    { name: "AC Losses", value: solar.acLosses },
    { name: "Soiling", value: solar.soilingImpact },
    { name: "Curtailment", value: solar.curtailment },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Solar PV Generation Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Solar Generation"
            value={solar.generation.toFixed(1)}
            unit="MWh"
            change={8.2}
            changeLabel="vs yesterday"
            icon={Sun}
            trend="up"
          />
          <KPICard
            title="Capacity Factor"
            value={solar.capacityFactor}
            unit="%"
            icon={Gauge}
            trend="neutral"
          />
          <KPICard
            title="Performance Ratio"
            value={solar.performanceRatio}
            unit="%"
            icon={Zap}
            trend="neutral"
          />
          <KPICard
            title="Inverter Efficiency"
            value={solar.inverterEfficiency}
            unit="%"
            icon={Zap}
            trend="up"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Solar Generation & Irradiance (Today)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#f59e0b" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="generation"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                    name="Generation (MW)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="irradiance"
                    stroke="#9ca3af"
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={false}
                    name="Irradiance (W/m²)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Energy Losses Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={lossesData} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis type="number" stroke="#9ca3af" fontSize={12} unit="%" />
                  <YAxis dataKey="name" type="category" stroke="#9ca3af" fontSize={12} width={80} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, "Loss"]}
                  />
                  <Bar dataKey="value" fill="#ef4444" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Thermometer className="h-4 w-4 text-primary" />
              Temperature Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Panel Temperature</span>
                <span className="text-lg font-semibold text-foreground">{solar.panelTemperature}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Ambient Temperature</span>
                <span className="text-lg font-semibold text-foreground">{solar.ambientTemperature}°C</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Delta T</span>
                <span className="text-lg font-semibold text-foreground">
                  {solar.panelTemperature - solar.ambientTemperature}°C
                </span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sun className="h-4 w-4 text-primary" />
              Irradiance Data
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Current Irradiance</span>
                <span className="text-lg font-semibold text-foreground">{solar.irradiance} W/m²</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Utilisation Rate</span>
                <span className="text-lg font-semibold text-foreground">{solar.utilisationRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Performance Ratio</span>
                <span className="text-lg font-semibold text-foreground">{solar.performanceRatio}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Curtailment & Losses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Curtailment</span>
                <span className="text-lg font-semibold text-primary">{solar.curtailment}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Soiling Impact</span>
                <span className="text-lg font-semibold text-primary">{solar.soilingImpact}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Losses</span>
                <span className="text-lg font-semibold text-primary">
                  {(solar.dcLosses + solar.acLosses + solar.soilingImpact + solar.curtailment).toFixed(1)}%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
