import { Switch } from "@/components/ui/switch";
import SettingsCard from "./SettingsCard";

export default function NotificationsTab() {
  // Explicitly type the array as a tuple [string, boolean]
  const settings: [string, boolean][] = [
    ["Marketing emails", true],
    ["Product updates", true],
    ["Security alerts", false]
  ];

  return (
    <SettingsCard title="Notifications" description="Manage notification preferences.">
      <div className="space-y-4">
        {settings.map(([label, enabled], idx) => (
          <div className="flex items-center justify-between" key={idx}>
            <div>
              <p className="text-sm font-medium">{label}</p>
              <p className="text-sm text-muted-foreground">
                {label === "Marketing emails"
                  ? "Tips, offers, and news"
                  : label === "Product updates"
                  ? "New features and changes"
                  : "Important account notifications"}
              </p>
            </div>
            <Switch defaultChecked={enabled} />
          </div>
        ))}
      </div>
    </SettingsCard>
  );
}
