"use client";

import { getForecastData, getWeatherForecast } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Sun,
  Wind,
  Cloud,
  Droplets,
  Thermometer,
  TrendingUp,
  TrendingDown,
  Activity,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Area,
} from "recharts";
import { format } from "date-fns";

export function Forecasting() {
  const forecastData = getForecastData();
  const weather = getWeatherForecast();

  const chartData = forecastData.map((d) => ({
    time: format(d.timestamp, "HH:mm"),
    solarForecast: d.solarForecast,
    solarActual: d.actualSolar,
    windForecast: d.windForecast,
    windActual: d.actualWind,
    demand: d.demandForecast,
  }));

  const varianceData = forecastData.slice(0, 12).map((d) => ({
    time: format(d.timestamp, "HH:mm"),
    solarVariance: Math.round((d.actualSolar - d.solarForecast) * 10) / 10,
    windVariance: Math.round((d.actualWind - d.windForecast) * 10) / 10,
  }));

  const avgSolarVariance = varianceData.reduce((sum, d) => sum + Math.abs(d.solarVariance), 0) / varianceData.length;
  const avgWindVariance = varianceData.reduce((sum, d) => sum + Math.abs(d.windVariance), 0) / varianceData.length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Forecasting & Planning
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <Card className="bg-card border-border lg:col-span-3">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Generation Forecast vs Actual (24h)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[350px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
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
                    dataKey="solarForecast"
                    fill="#f59e0b"
                    fillOpacity={0.2}
                    stroke="#f59e0b"
                    strokeDasharray="5 5"
                    name="Solar Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="solarActual"
                    stroke="#f59e0b"
                    strokeWidth={2}
                    dot={false}
                    name="Solar Actual"
                  />
                  <Area
                    type="monotone"
                    dataKey="windForecast"
                    fill="#6b7280"
                    fillOpacity={0.2}
                    stroke="#6b7280"
                    strokeDasharray="5 5"
                    name="Wind Forecast"
                  />
                  <Line
                    type="monotone"
                    dataKey="windActual"
                    stroke="#6b7280"
                    strokeWidth={2}
                    dot={false}
                    name="Wind Actual"
                  />
                  <Line
                    type="monotone"
                    dataKey="demand"
                    stroke="#ef4444"
                    strokeWidth={2}
                    strokeDasharray="3 3"
                    dot={false}
                    name="Demand Forecast"
                  />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Cloud className="h-4 w-4 text-primary" />
              Weather Conditions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <span className="text-sm text-muted-foreground">Temperature</span>
                </div>
                <span className="font-semibold text-foreground">{weather.current.temperature}°C</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-muted-foreground">Wind Speed</span>
                </div>
                <span className="font-semibold text-foreground">{weather.current.windSpeed} m/s</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-400" />
                  <span className="text-sm text-muted-foreground">Humidity</span>
                </div>
                <span className="font-semibold text-foreground">{weather.current.humidity}%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Cloud className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-muted-foreground">Cloud Cover</span>
                </div>
                <span className="font-semibold text-foreground">{weather.current.cloudCover}%</span>
              </div>

              <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                <div className="flex items-center gap-2">
                  <Sun className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm text-muted-foreground">UV Index</span>
                </div>
                <span className="font-semibold text-foreground">{weather.current.uvIndex}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Forecast vs Actual Variance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={varianceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="time" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#1f2937",
                      border: "1px solid #374151",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value} MW`, "Variance"]}
                  />
                  <Bar dataKey="solarVariance" fill="#f59e0b" name="Solar Variance" />
                  <Bar dataKey="windVariance" fill="#6b7280" name="Wind Variance" />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground">
              Forecast Accuracy Metrics
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Sun className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-foreground">Solar Forecast Accuracy</span>
                  </div>
                  <Badge variant={avgSolarVariance < 3 ? "default" : "secondary"}>
                    {(100 - avgSolarVariance * 10).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  <span>Avg. Variance: ±{avgSolarVariance.toFixed(1)} MW</span>
                </div>
              </div>

              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <Wind className="h-4 w-4 text-gray-400" />
                    <span className="text-sm text-foreground">Wind Forecast Accuracy</span>
                  </div>
                  <Badge variant={avgWindVariance < 2 ? "default" : "secondary"}>
                    {(100 - avgWindVariance * 10).toFixed(1)}%
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <Activity className="h-3 w-3" />
                  <span>Avg. Variance: ±{avgWindVariance.toFixed(1)} MW</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 text-green-500">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-semibold">+12%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Forecast Improvement (30d)</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <div className="flex items-center justify-center gap-1 text-primary">
                    <TrendingDown className="h-4 w-4" />
                    <span className="font-semibold">2.1%</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">Expected Curtailment</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Hourly Weather Forecast
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {weather.hourly.map((hour, index) => (
              <div
                key={index}
                className="flex-shrink-0 w-20 p-3 bg-secondary rounded-lg text-center"
              >
                <p className="text-sm font-medium text-foreground">
                  {hour.hour.toString().padStart(2, "0")}:00
                </p>
                <div className="my-2">
                  {hour.cloudCover > 50 ? (
                    <Cloud className="h-6 w-6 text-gray-400 mx-auto" />
                  ) : (
                    <Sun className="h-6 w-6 text-yellow-500 mx-auto" />
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{hour.temperature}°C</p>
                <p className="text-xs text-muted-foreground">{hour.windSpeed} m/s</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
