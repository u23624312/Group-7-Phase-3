"use client";

import { useDashboard } from "@/lib/dashboard-context";
import { getFinancialMetrics, getCostSavingsHistory } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KPICard } from "../kpi-card";
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  PiggyBank,
  Calculator,
  BarChart3,
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

export function Financial() {
  const { selectedPhase } = useDashboard();
  const financial = getFinancialMetrics(selectedPhase);
  const savingsHistory = getCostSavingsHistory();

  const costBreakdown = [
    { name: "O&M", value: financial.omCostsPerMw / 1000, color: "#6b7280" },
    { name: "Maintenance", value: 8.2, color: "#374151" },
    { name: "Grid Fees", value: 3.5, color: "#1f2937" },
  ];

  const roiProjection = [
    { year: "Y1", investment: -45, cumulative: -45, savings: 2.4 },
    { year: "Y2", investment: 0, cumulative: -42.6, savings: 2.5 },
    { year: "Y3", investment: 0, cumulative: -40.1, savings: 2.6 },
    { year: "Y4", investment: 0, cumulative: -37.5, savings: 2.7 },
    { year: "Y5", investment: 0, cumulative: -34.8, savings: 2.8 },
    { year: "Y6", investment: 0, cumulative: -32, savings: 2.9 },
    { year: "Y7", investment: 0, cumulative: -29.1, savings: 3.0 },
    { year: "Y8", investment: 0, cumulative: -26.1, savings: 3.1 },
    { year: "Y9", investment: 0, cumulative: -23, savings: 3.2 },
    { year: "Y10", investment: 0, cumulative: -19.8, savings: 3.3 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Financial & Cost Tracking
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <KPICard
            title="LCOE"
            value={`$${(financial.lcoe * 1000).toFixed(1)}`}
            unit="/MWh"
            change={-3.2}
            changeLabel="vs last year"
            icon={Calculator}
            trend="down"
          />
          <KPICard
            title="Cost per kWh"
            value={`$${financial.costPerKwh.toFixed(3)}`}
            unit=""
            icon={DollarSign}
            trend="down"
          />
          <KPICard
            title="ROI"
            value={financial.roi}
            unit="%"
            change={2.1}
            changeLabel="vs projection"
            icon={TrendingUp}
            trend="up"
          />
          <KPICard
            title="Payback Period"
            value={financial.paybackPeriod}
            unit="years"
            icon={PiggyBank}
            trend="neutral"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Monthly Cost Savings Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={savingsHistory}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}K`, "Savings"]}
                  />
                  <Bar dataKey="value" fill="#22c55e" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              ROI & Payback Projection (10 Year)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={roiProjection}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="year" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number, name: string) => [
                      `$${Math.abs(value)}M`,
                      name === "cumulative" ? "Net Position" : "Annual Savings"
                    ]}
                  />
                  <Area
                    type="monotone"
                    dataKey="cumulative"
                    fill="#ef4444"
                    fillOpacity={0.2}
                    stroke="#ef4444"
                    name="cumulative"
                  />
                  <Bar dataKey="savings" fill="#22c55e" name="savings" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-primary" />
              Avoided Costs (Monthly)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Fuel Costs Avoided</span>
                  <span className="text-lg font-semibold text-green-500">
                    ${financial.avoidedFuelCosts.toFixed(2)}M
                  </span>
                </div>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Electricity Costs Avoided</span>
                  <span className="text-lg font-semibold text-green-500">
                    ${financial.avoidedElectricityCosts.toFixed(2)}M
                  </span>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-foreground">Total Avoided</span>
                  <span className="text-lg font-bold text-green-500">
                    ${(financial.avoidedFuelCosts + financial.avoidedElectricityCosts).toFixed(2)}M
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <BarChart3 className="h-4 w-4 text-primary" />
              Operating Costs
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">O&M per MW</span>
                <span className="font-semibold text-foreground">
                  ${financial.omCostsPerMw.toLocaleString()}
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <span className="text-sm text-muted-foreground">Maintenance Trend</span>
                <span className={`font-semibold flex items-center gap-1 ${
                  financial.maintenanceCostTrend < 0 ? "text-green-500" : "text-primary"
                }`}>
                  {financial.maintenanceCostTrend < 0 ? (
                    <TrendingDown className="h-4 w-4" />
                  ) : (
                    <TrendingUp className="h-4 w-4" />
                  )}
                  {Math.abs(financial.maintenanceCostTrend)}%
                </span>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Maintenance costs are trending downward due to predictive maintenance strategies and improved asset reliability.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <PiggyBank className="h-4 w-4 text-primary" />
              Investment Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-4 bg-secondary rounded-lg">
                <p className="text-3xl font-bold text-foreground">{financial.paybackPeriod}</p>
                <p className="text-sm text-muted-foreground">Years to Payback</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <p className="text-lg font-semibold text-foreground">{financial.roi}%</p>
                  <p className="text-xs text-muted-foreground">Current ROI</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <p className="text-lg font-semibold text-green-500">24.5%</p>
                  <p className="text-xs text-muted-foreground">Projected ROI (Y10)</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
