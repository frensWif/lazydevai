
import { Metadata } from "next";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";

export const metadata: Metadata = {
  title: "Dashboard - LazyDev AI",
  description: "Manage your LazyDev AI projects",
};

export default function DashboardPage() {
  return (
    <div className="container py-8">
      <DashboardWelcome />
      <DashboardContent />
    </div>
  );
}
