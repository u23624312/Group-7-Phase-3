"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getWindMetrics } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import { Wind, Gauge, Activity, Navigation } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";

export function WindGeneration() {
  const { selectedPhase } = useDashboard();
  const wind = getWindMetrics(selectedPhase);

  const hourlyData = Array.from({ length: 24 }, (_, i) => ({
    hour: `${i.toString().padStart(2, '0')}:00`,
    windSpeed: Math.round((6 + Math.sin(i * 0.5) * 4 + Math.random() * 2) * 10) / 10,
    generation: Math.round((10 + Math.sin(i * 0.4) * 8 + Math.random() * 3) * 10) / 10,
  }));

  const performanceData = [
    { subject: "Efficiency", A: wind.turbineEfficiency, fullMark: 100 },
    { subject: "Availability", A: wind.availabilityFactor, fullMark: 100 },
    { subject: "Power Curve", A: wind.powerCurvePerformance, fullMark: 100 },
    { subject: "Utilisation", A: wind.utilisationRate, fullMark: 100 },
    { subject: "Capacity Factor", A: wind.capacityFactor * 3, fullMark: 100 },
  ];

  const windDirectionDegrees = wind.windDirection;
  const compassDirections = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
  const directionIndex = Math.round(windDirectionDegrees / 45) % 8;
  const compassDirection = compassDirections[directionIndex];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Wind Turbine Generation Metrics
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Wind Generation"
            value={wind.generation.toFixed(1)}
            unit="MWh"
            change={5.7}
            changeLabel="vs yesterday"
            icon={Wind}
            trend="up"
          />
          <KPICard
            title="Capacity Factor"
            value={wind.capacityFactor}
            unit="%"
            icon={Gauge}
            trend="neutral"
          />
          <KPICard
            title="Turbine Efficiency"
            value={wind.turbineEfficiency}
            unit="%"
            icon={Activity}
            trend="up"
          />
          <KPICard
            title="Availability Factor"
            value={wind.availabilityFactor}
            unit="%"
            icon={Activity}
            trend="up"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Wind Speed & Generation (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={hourlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="hour" stroke="#9ca3af" fontSize={12} />
                  <YAxis yAxisId="left" stroke="#6b7280" fontSize={12} />
                  <YAxis yAxisId="right" orientation="right" stroke="#ef4444" fontSize={12} />
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
                    dataKey="windSpeed"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={false}
                    name="Wind Speed (m/s)"
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="generation"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                    name="Generation (MW)"
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Turbine Performance Radar
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={performanceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af", fontSize: 12 }} />
                  <PolarRadiusAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                  <Radar
                    name="Performance"
                    dataKey="A"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.4}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Wind className="h-4 w-4 text-primary" />
              Wind Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Wind Speed</span>
                <span className="text-lg font-semibold text-foreground">{wind.windSpeed} m/s</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Air Density</span>
                <span className="text-lg font-semibold text-foreground">{wind.airDensity} kg/m³</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Power Curve</span>
                <span className="text-lg font-semibold text-foreground">{wind.powerCurvePerformance}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Navigation className="h-4 w-4 text-primary" />
              Wind Direction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col items-center justify-center h-[120px]">
              <div className="relative w-24 h-24">
                <div className="absolute inset-0 border-2 border-border rounded-full" />
                <div
                  className="absolute top-1/2 left-1/2 w-1 h-10 bg-primary origin-bottom rounded-full"
                  style={{
                    transform: `translate(-50%, -100%) rotate(${windDirectionDegrees}deg)`,
                  }}
                />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-2 text-xs text-muted-foreground">
                  N
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-2 text-xs text-muted-foreground">
                  S
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 text-xs text-muted-foreground">
                  W
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 text-xs text-muted-foreground">
                  E
                </div>
              </div>
              <p className="mt-4 text-sm text-muted-foreground">
                {windDirectionDegrees}° ({compassDirection})
              </p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Activity className="h-4 w-4 text-primary" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Utilisation Rate</span>
                <span className="text-lg font-semibold text-foreground">{wind.utilisationRate}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Curtailment</span>
                <span className="text-lg font-semibold text-primary">{wind.curtailment}%</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Capacity Factor</span>
                <span className="text-lg font-semibold text-foreground">{wind.capacityFactor}%</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
