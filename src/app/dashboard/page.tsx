
import { Metadata } from "next";
import DashboardContent from "@/components/dashboard/DashboardContent";
import DashboardWelcome from "@/components/dashboard/DashboardWelcome";
import { APP_NAME } from "@/lib/constants";

export const metadata: Metadata = {
  title: `Dashboard - ${APP_NAME}`,
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
