"use client";

import { getPhaseData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import {
  DollarSign,
  Zap,
  TrendingDown,
  Factory,
  Truck,
  Settings,
  Layers,
} from "lucide-react";
import {
  BarChart,
  Bar,
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

export function PhaseAnalysis() {
  const [selectedPhase, setSelectedPhase] = useState("processing-plant");
  const phases = getPhaseData();

  const currentPhase = phases.find((p) => p.phase === selectedPhase) || phases[0];

  const costComparisonData = phases.map((p) => ({
    name: p.phaseName.split(" ")[0],
    capex: p.capex,
    opex: p.opex,
    integration: p.integrationCosts,
  }));

  const phasePerformanceData = [
    { subject: "Energy", A: currentPhase.energyContribution, fullMark: 50 },
    { subject: "Grid Reduction", A: currentPhase.gridDependencyReduction, fullMark: 50 },
    { subject: "Diesel Reduction", A: currentPhase.dieselDependencyReduction, fullMark: 50 },
    { subject: "Cost Savings", A: currentPhase.costSavings * 15, fullMark: 50 },
    { subject: "ROI Speed", A: (10 - currentPhase.paybackPeriod) * 5, fullMark: 50 },
  ];

  const getPhaseIcon = (phase: string) => {
    switch (phase) {
      case "processing-plant":
        return <Factory className="h-5 w-5" />;
      case "mining-machinery":
        return <Truck className="h-5 w-5" />;
      case "crushing-beneficiation":
        return <Settings className="h-5 w-5" />;
      case "blending-handling":
        return <Layers className="h-5 w-5" />;
      default:
        return <Factory className="h-5 w-5" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Phased Implementation Cost Analysis
        </h3>
        <Select value={selectedPhase} onValueChange={setSelectedPhase}>
          <SelectTrigger className="w-[250px] bg-secondary border-border">
            <SelectValue placeholder="Select Phase" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="processing-plant">
              <div className="flex items-center gap-2">
                <Factory className="h-4 w-4" />
                Processing Plant
              </div>
            </SelectItem>
            <SelectItem value="mining-machinery">
              <div className="flex items-center gap-2">
                <Truck className="h-4 w-4" />
                Mining Machinery
              </div>
            </SelectItem>
            <SelectItem value="crushing-beneficiation">
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                Crushing & Beneficiation
              </div>
            </SelectItem>
            <SelectItem value="blending-handling">
              <div className="flex items-center gap-2">
                <Layers className="h-4 w-4" />
                Ore Blending & Handling
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">CAPEX</p>
                <p className="text-2xl font-bold text-foreground mt-1">${currentPhase.capex}M</p>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <DollarSign className="h-5 w-5 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">OPEX (Annual)</p>
                <p className="text-2xl font-bold text-foreground mt-1">${currentPhase.opex}M</p>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <DollarSign className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Integration</p>
                <p className="text-2xl font-bold text-foreground mt-1">${currentPhase.integrationCosts}M</p>
              </div>
              <div className="p-2 bg-secondary rounded-lg">
                <Settings className="h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Investment</p>
                <p className="text-2xl font-bold text-primary mt-1">
                  ${(currentPhase.capex + currentPhase.integrationCosts).toFixed(1)}M
                </p>
              </div>
              <div className="p-2 bg-primary/20 rounded-lg">
                {getPhaseIcon(selectedPhase)}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Cost Comparison Across Phases
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={costComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}M`, ""]}
                  />
                  <Bar dataKey="capex" fill="#ef4444" name="CAPEX" stackId="a" />
                  <Bar dataKey="opex" fill="#6b7280" name="OPEX" stackId="a" />
                  <Bar dataKey="integration" fill="#374151" name="Integration" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Phase Performance Radar - {currentPhase.phaseName}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={phasePerformanceData}>
                  <PolarGrid stroke="#374151" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: "#9ca3af", fontSize: 11 }} />
                  <PolarRadiusAxis tick={{ fill: "#9ca3af", fontSize: 10 }} />
                  <Radar
                    name={currentPhase.phaseName}
                    dataKey="A"
                    stroke="#ef4444"
                    fill="#ef4444"
                    fillOpacity={0.4}
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
              <Zap className="h-4 w-4 text-primary" />
              Energy Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-foreground">{currentPhase.energyContribution}%</p>
                <p className="text-sm text-muted-foreground">of Renewables to This Phase</p>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${currentPhase.energyContribution}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-primary" />
              Grid Dependency Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-500">-{currentPhase.gridDependencyReduction}%</p>
                <p className="text-sm text-muted-foreground">Grid Import Reduction</p>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${currentPhase.gridDependencyReduction}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-primary" />
              Diesel Dependency Reduction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-500">-{currentPhase.dieselDependencyReduction}%</p>
                <p className="text-sm text-muted-foreground">Diesel Consumption Reduction</p>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full"
                  style={{ width: `${currentPhase.dieselDependencyReduction}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            All Phases Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-medium">Phase</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">CAPEX</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">OPEX</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Integration</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Energy</th>
                  <th className="text-right py-3 px-4 text-muted-foreground font-medium">Payback</th>
                </tr>
              </thead>
              <tbody>
                {phases.map((phase) => (
                  <tr
                    key={phase.phase}
                    className={`border-b border-border ${
                      phase.phase === selectedPhase ? "bg-primary/10" : ""
                    }`}
                  >
                    <td className="py-3 px-4 font-medium text-foreground">{phase.phaseName}</td>
                    <td className="text-right py-3 px-4 text-foreground">${phase.capex}M</td>
                    <td className="text-right py-3 px-4 text-foreground">${phase.opex}M</td>
                    <td className="text-right py-3 px-4 text-foreground">${phase.integrationCosts}M</td>
                    <td className="text-right py-3 px-4 text-foreground">{phase.energyContribution}%</td>
                    <td className="text-right py-3 px-4 text-foreground">{phase.paybackPeriod} yrs</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
