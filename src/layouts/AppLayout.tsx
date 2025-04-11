
import { Outlet } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";

export function AppLayout() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-background">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}
