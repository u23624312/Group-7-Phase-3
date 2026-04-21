"use client";

import { getSystemAlarms } from "@/lib/mock-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  AlertTriangle,
  AlertCircle,
  Info,
  Bell,
  CheckCircle,
  CloudRain,
  Zap,
  Shield,
  Clock,
} from "lucide-react";
import { format } from "date-fns";

export function Alerts() {
  const alarms = getSystemAlarms();

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "critical":
        return <AlertCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getSeverityBadge = (severity: string) => {
    switch (severity) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>;
      case "warning":
        return <Badge className="bg-yellow-500/20 text-yellow-500 hover:bg-yellow-500/30">Warning</Badge>;
      default:
        return <Badge variant="secondary">Info</Badge>;
    }
  };

  const recentEvents = [
    { type: "curtailment", message: "Wind curtailment event - 2.3 MW reduced", time: "2 hours ago", icon: Zap },
    { type: "weather", message: "Dust storm warning issued", time: "4 hours ago", icon: CloudRain },
    { type: "grid", message: "Grid frequency deviation detected", time: "6 hours ago", icon: Zap },
    { type: "safety", message: "Safety inspection completed - all clear", time: "1 day ago", icon: Shield },
  ];

  const criticalCount = alarms.filter(a => a.severity === "critical").length;
  const warningCount = alarms.filter(a => a.severity === "warning").length;
  const infoCount = alarms.filter(a => a.severity === "info").length;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Risk & Exception Monitoring
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Total Alerts</p>
                <p className="text-3xl font-bold text-foreground mt-1">{alarms.length}</p>
              </div>
              <div className="p-3 bg-secondary rounded-lg">
                <Bell className="h-6 w-6 text-primary" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-red-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Critical</p>
                <p className="text-3xl font-bold text-red-500 mt-1">{criticalCount}</p>
              </div>
              <AlertCircle className="h-8 w-8 text-red-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-yellow-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Warnings</p>
                <p className="text-3xl font-bold text-yellow-500 mt-1">{warningCount}</p>
              </div>
              <AlertTriangle className="h-8 w-8 text-yellow-500" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border border-l-4 border-l-blue-500">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wide">Info</p>
                <p className="text-3xl font-bold text-blue-500 mt-1">{infoCount}</p>
              </div>
              <Info className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-primary" />
                Active System Alarms
              </CardTitle>
              <Button variant="outline" size="sm">View All</Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {alarms.map((alarm) => (
                <div
                  key={alarm.id}
                  className={`flex items-start gap-3 p-4 rounded-lg border ${
                    alarm.severity === "critical"
                      ? "bg-red-500/10 border-red-500/30"
                      : alarm.severity === "warning"
                      ? "bg-yellow-500/10 border-yellow-500/30"
                      : "bg-secondary border-border"
                  }`}
                >
                  {getSeverityIcon(alarm.severity)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-medium text-sm text-foreground">{alarm.type}</span>
                      {getSeverityBadge(alarm.severity)}
                      {alarm.acknowledged && (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{alarm.message}</p>
                    <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>{format(alarm.timestamp, "MMM d, HH:mm")}</span>
                    </div>
                  </div>
                  {!alarm.acknowledged && (
                    <Button variant="ghost" size="sm">Acknowledge</Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Clock className="h-4 w-4 text-primary" />
              Recent Events
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentEvents.map((event, index) => {
                const Icon = event.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center gap-3 p-3 bg-secondary rounded-lg"
                  >
                    <div className="p-2 bg-background rounded-lg">
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm text-foreground">{event.message}</p>
                      <p className="text-xs text-muted-foreground">{event.time}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <CloudRain className="h-4 w-4 text-primary" />
              Weather Alerts
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="p-4 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  <span className="font-medium text-foreground">High Wind Advisory</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wind speeds expected to exceed 15 m/s between 14:00-18:00. 
                  Potential turbine curtailment may be required.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Valid until: Today 18:00</p>
              </div>
              <div className="p-4 bg-secondary rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Info className="h-4 w-4 text-blue-500" />
                  <span className="font-medium text-foreground">Dust Storm Watch</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Moderate dust levels forecasted for tomorrow. Solar panel cleaning 
                  may be required post-event.
                </p>
                <p className="text-xs text-muted-foreground mt-2">Valid: Tomorrow 06:00-12:00</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-foreground flex items-center gap-2">
              <Shield className="h-4 w-4 text-primary" />
              Safety Incidents (Energy Related)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-green-500">0</p>
                  <p className="text-xs text-muted-foreground">LTI (YTD)</p>
                </div>
                <div className="p-3 bg-green-500/10 rounded-lg">
                  <p className="text-2xl font-bold text-green-500">247</p>
                  <p className="text-xs text-muted-foreground">Days LTI Free</p>
                </div>
                <div className="p-3 bg-secondary rounded-lg">
                  <p className="text-2xl font-bold text-foreground">3</p>
                  <p className="text-xs text-muted-foreground">Near Misses</p>
                </div>
              </div>
              <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-foreground">
                    All safety protocols operational
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Last safety audit: 7 days ago - No issues identified
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
