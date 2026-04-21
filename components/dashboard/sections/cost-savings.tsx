"use client";

import { getPhaseData } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import {
  DollarSign,
  TrendingUp,
  PiggyBank,
  Fuel,
  Zap,
  Calendar,
} from "lucide-react";
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
  ComposedChart,
  Area,
} from "recharts";

export function CostSavings() {
  const phases = getPhaseData();

  const totalCostSavings = phases.reduce((sum, p) => sum + p.costSavings, 0);
  const totalCumulativeSavings = phases[phases.length - 1].cumulativeSavings;
  const avgPayback = phases.reduce((sum, p) => sum + p.paybackPeriod, 0) / phases.length;

  const phaseSavingsData = phases.map((p) => ({
    name: p.phaseName.split(" ")[0],
    savings: p.costSavings,
    cumulative: p.cumulativeSavings,
  }));

  const monthlySavingsProjection = [
    { month: "Jan", diesel: 145, grid: 52, efficiency: 23, total: 220 },
    { month: "Feb", diesel: 152, grid: 55, efficiency: 25, total: 232 },
    { month: "Mar", diesel: 158, grid: 58, efficiency: 27, total: 243 },
    { month: "Apr", diesel: 165, grid: 62, efficiency: 29, total: 256 },
    { month: "May", diesel: 172, grid: 65, efficiency: 31, total: 268 },
    { month: "Jun", diesel: 180, grid: 68, efficiency: 33, total: 281 },
  ];

  const yearlyProjection = [
    { year: "Y1", savings: 2.8, cumulative: 2.8 },
    { year: "Y2", savings: 3.2, cumulative: 6.0 },
    { year: "Y3", savings: 3.6, cumulative: 9.6 },
    { year: "Y4", savings: 4.0, cumulative: 13.6 },
    { year: "Y5", savings: 4.4, cumulative: 18.0 },
    { year: "Y6", savings: 4.8, cumulative: 22.8 },
    { year: "Y7", savings: 5.2, cumulative: 28.0 },
    { year: "Y8", savings: 5.6, cumulative: 33.6 },
    { year: "Y9", savings: 6.0, cumulative: 39.6 },
    { year: "Y10", savings: 6.4, cumulative: 46.0 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Cost Savings & Value Realisation
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="Annual Cost Savings"
            value={`$${totalCostSavings.toFixed(2)}`}
            unit="M"
            change={12.4}
            changeLabel="vs last year"
            icon={DollarSign}
            trend="up"
          />
          <KPICard
            title="Cumulative Savings"
            value={`$${totalCumulativeSavings.toFixed(2)}`}
            unit="M"
            icon={PiggyBank}
            trend="up"
          />
          <KPICard
            title="Avg. Payback Period"
            value={avgPayback.toFixed(1)}
            unit="years"
            icon={Calendar}
            trend="neutral"
          />
          <KPICard
            title="Projected 10Y Savings"
            value="$46.0"
            unit="M"
            icon={TrendingUp}
            trend="up"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Cost Savings by Phase
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={phaseSavingsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toFixed(2)}M`, ""]}
                  />
                  <Bar dataKey="savings" fill="#22c55e" name="Annual Savings" />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={{ fill: "#ef4444" }}
                    name="Cumulative Savings"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              10-Year Savings Projection
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={yearlyProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value.toFixed(1)}M`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    fill="#22c55e"
                    fillOpacity={0.2}
                    stroke="#22c55e"
                    strokeWidth={2}
                    name="Cumulative"
                  />
                  <Bar dataKey="savings" fill="#ef4444" name="Annual" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Monthly Savings Breakdown (Current Year)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlySavingsProjection}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
                <YAxis stroke="#9ca3af" fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1f2937",
                    border: "1px solid #374151",
                    borderRadius: "8px",
                  }}
                  formatter={(value: number) => [`$${value}K`, ""]}
                />
                <Bar dataKey="diesel" fill="#ef4444" name="Diesel Savings" stackId="a" />
                <Bar dataKey="grid" fill="#6b7280" name="Grid Savings" stackId="a" />
                <Bar dataKey="efficiency" fill="#374151" name="Efficiency Gains" stackId="a" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {phases.map((phase) => (
          <Card key={phase.phase} className="bg-card border-border">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-foreground">
                {phase.phaseName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center p-4 bg-green-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-green-500">${phase.costSavings}M</p>
                  <p className="text-xs text-muted-foreground">Annual Savings</p>
                </div>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="p-2 bg-secondary rounded-lg text-center">
                    <p className="font-semibold text-foreground">{phase.paybackPeriod} yrs</p>
                    <p className="text-xs text-muted-foreground">Payback</p>
                  </div>
                  <div className="p-2 bg-secondary rounded-lg text-center">
                    <p className="font-semibold text-foreground">${phase.cumulativeSavings}M</p>
                    <p className="text-xs text-muted-foreground">Cumulative</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Fuel className="h-4 w-4 text-primary" />
              Diesel Displacement Value
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">$1.84M</p>
                <p className="text-sm text-muted-foreground">Annual Diesel Savings</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Diesel Offset</span>
                  <span className="text-foreground">347,000 L</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Avg. Price</span>
                  <span className="text-foreground">$1.35/L</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Zap className="h-4 w-4 text-primary" />
              Grid Energy Savings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">$0.63M</p>
                <p className="text-sm text-muted-foreground">Annual Grid Savings</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Energy Offset</span>
                  <span className="text-foreground">5,250 MWh</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Avg. Rate</span>
                  <span className="text-foreground">$0.12/kWh</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-primary" />
              Efficiency Improvements
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-green-500">$0.32M</p>
                <p className="text-sm text-muted-foreground">Annual Efficiency Gains</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Reliability Savings</span>
                  <span className="text-foreground">$180K</span>
                </div>
                <div className="flex justify-between text-sm mt-2">
                  <span className="text-muted-foreground">Maintenance Savings</span>
                  <span className="text-foreground">$140K</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
