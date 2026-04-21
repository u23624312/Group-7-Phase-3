"use client";

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { Header } from "./header";
import { ExecutiveOverview } from "./sections/executive-overview";
import { SolarGeneration } from "./sections/solar-generation";
import { WindGeneration } from "./sections/wind-generation";
import { BatteryStorage } from "./sections/battery-storage";
import { GridStability } from "./sections/grid-stability";
import { Reliability } from "./sections/reliability";
import { Maintenance } from "./sections/maintenance";
import { Forecasting } from "./sections/forecasting";
import { Financial } from "./sections/financial";
import { Sustainability } from "./sections/sustainability";
import { Alerts } from "./sections/alerts";
import { PhaseAnalysis } from "./sections/phase-analysis";
import { CostSavings } from "./sections/cost-savings";

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview");

  const renderSection = () => {
    switch (activeSection) {
      case "overview":
        return <ExecutiveOverview />;
      case "solar":
        return <SolarGeneration />;
      case "wind":
        return <WindGeneration />;
      case "battery":
        return <BatteryStorage />;
      case "grid":
        return <GridStability />;
      case "reliability":
        return <Reliability />;
      case "maintenance":
        return <Maintenance />;
      case "forecasting":
        return <Forecasting />;
      case "financial":
        return <Financial />;
      case "sustainability":
        return <Sustainability />;
      case "alerts":
        return <Alerts />;
      case "phases":
        return <PhaseAnalysis />;
      case "savings":
        return <CostSavings />;
      default:
        return <ExecutiveOverview />;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {renderSection()}
        </main>
      </div>
    </div>
  );
}
