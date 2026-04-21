"use client";

import { getMaintenanceAlerts, getSolarMetrics, getWindMetrics } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sun,
  Wind,
  AlertTriangle,
  AlertCircle,
  Info,
  Calendar,
  Wrench,
  Activity,
  CheckCircle,
} from "lucide-react";
import { format } from "date-fns";

export function Maintenance() {
  const alerts = getMaintenanceAlerts();
  const solar = getSolarMetrics("processing-plant");
  const wind = getWindMetrics("processing-plant");

  const maintenanceSchedule = [
    { asset: "Inverter INV-04", type: "Inspection", date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), status: "scheduled" },
    { asset: "Wind Turbine T3", type: "Preventive", date: new Date(Date.now() + 5 * 24 * 60 * 60 * 1000), status: "scheduled" },
    { asset: "Battery Bank B1", type: "Calibration", date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), status: "scheduled" },
    { asset: "Solar Array A2", type: "Cleaning", date: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000), status: "pending" },
  ];

  const getSeverityIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Info className="h-4 w-4 text-blue-500" />;
    }
  };

  const getSeverityBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Warning</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Maintenance & Asset Health (Predictive Monitoring)
        </h3>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-primary" />
              Active Maintenance Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-start gap-3 p-3 bg-secondary rounded-lg"
                >
                  {getSeverityIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-foreground">
                        {alert.component}
                      </span>
                      {getSeverityBadge(alert.type)}
                    </div>
                    <p className="text-xs text-muted-foreground">{alert.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {format(alert.timestamp, "MMM d, HH:mm")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              Upcoming Maintenance Schedule
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {maintenanceSchedule.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-secondary rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Wrench className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium text-sm text-foreground">{item.asset}</p>
                      <p className="text-xs text-muted-foreground">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-foreground">{format(item.date, "MMM d")}</p>
                    <Badge variant="outline" className="text-xs">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              Solar Asset Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm text-muted-foreground">Panel Degradation Rate</span>
                  <span className={`font-semibold ${solar.soilingImpact > 3 ? "text-primary" : "text-green-500"}`}>
                    1.2% /year
                  </span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 rounded-full" style={{ width: "24%" }} />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Within acceptable range (target: {"<"}1.5%/year)
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    {solar.inverterEfficiency > 97 ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <AlertTriangle className="h-4 w-4 text-yellow-500" />
                    )}
                    <span className="text-xs text-muted-foreground">Inverter Status</span>
                  </div>
                  <p className="font-semibold text-foreground">{solar.inverterEfficiency}% Eff.</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-2 mb-2">
                    <Activity className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">Faulty Strings</span>
                  </div>
                  <p className="font-semibold text-foreground">2 of 124</p>
                </div>
              </div>

              <div className="p-3 bg-primary/10 border border-primary/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">Predictive Alert</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  String 47B showing early degradation signs. Schedule inspection within 30 days.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Wind className="h-4 w-4 text-gray-400" />
              Wind Turbine Health
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <Activity className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Vibration</p>
                  <p className="font-semibold text-green-500">Normal</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <Wrench className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Gearbox</p>
                  <p className="font-semibold text-green-500">Good</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg text-center">
                  <Wind className="h-5 w-5 text-muted-foreground mx-auto mb-1" />
                  <p className="text-xs text-muted-foreground">Blades</p>
                  <p className="font-semibold text-yellow-500">Monitor</p>
                </div>
              </div>

              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-muted-foreground">Turbine Availability</span>
                  <span className="font-semibold text-foreground">{wind.availabilityFactor}%</span>
                </div>
                <div className="h-2 bg-background rounded-full overflow-hidden">
                  <div
                    className="h-full bg-green-500 rounded-full"
                    style={{ width: `${wind.availabilityFactor}%` }}
                  />
                </div>
              </div>

              <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="text-sm font-medium text-foreground">Maintenance Advisory</span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Turbine T7 blade erosion detected. Schedule blade inspection within 2 weeks.
                </p>
              </div>

              <Button variant="outline" className="w-full">
                View Full Diagnostics Report
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-card border-border">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-foreground">
            Maintenance Schedule Adherence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-3xl font-bold text-green-500">94%</p>
              <p className="text-sm text-muted-foreground mt-1">On-Time Completion</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-3xl font-bold text-foreground">127</p>
              <p className="text-sm text-muted-foreground mt-1">Tasks Completed (YTD)</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-3xl font-bold text-yellow-500">8</p>
              <p className="text-sm text-muted-foreground mt-1">Pending Tasks</p>
            </div>
            <div className="p-4 bg-secondary rounded-lg text-center">
              <p className="text-3xl font-bold text-primary">3</p>
              <p className="text-sm text-muted-foreground mt-1">Overdue Tasks</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
