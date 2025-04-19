import { useTheme } from "@/context/ThemeContext";
import { Switch } from "@/components/ui/switch";
import SettingsCard from "./SettingsCard";
import ThemeOptionCard from "./ThemeOptionCard";
import { Sun, Moon, Laptop } from "lucide-react";

export default function AppearanceTab() {
  const { theme, setTheme } = useTheme();

  return (
    <SettingsCard
      title="Theme Preferences"
      description="Customize how the app looks to you."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-6">
        <ThemeOptionCard
          icon={Sun}
          label="Light"
          selected={theme === "light"}
          onClick={() => setTheme("light")}
        />
        <ThemeOptionCard
          icon={Moon}
          label="Dark"
          selected={theme === "dark"}
          onClick={() => setTheme("dark")}
        />
        <ThemeOptionCard
          icon={Laptop}
          label="System"
          selected={theme === "system"}
          onClick={() => setTheme("system")}
        />
      </div>

      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Neon Effects</p>
          <p className="text-sm text-muted-foreground">Enable fancy glow styling</p>
        </div>
        <Switch defaultChecked />
      </div>
    </SettingsCard>
  );
}
