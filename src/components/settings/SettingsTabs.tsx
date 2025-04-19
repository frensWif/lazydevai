// Tabs Wrapper
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppearanceTab, AccountTab, NotificationsTab } from ".";
import { Palette, User, BellRing } from "lucide-react";

export default function SettingsTabs() {
  return (
    <Tabs defaultValue="appearance" className="w-full">
      <TabsList className="flex flex-wrap gap-2 mb-6">
        <TabsTrigger value="appearance" className="flex items-center gap-2">
          <Palette className="h-4 w-4" /> Appearance
        </TabsTrigger>
        <TabsTrigger value="account" className="flex items-center gap-2">
          <User className="h-4 w-4" /> Account
        </TabsTrigger>
        <TabsTrigger value="notifications" className="flex items-center gap-2">
          <BellRing className="h-4 w-4" /> Notifications
        </TabsTrigger>
      </TabsList>

      <TabsContent value="appearance"><AppearanceTab /></TabsContent>
      <TabsContent value="account"><AccountTab /></TabsContent>
      <TabsContent value="notifications"><NotificationsTab /></TabsContent>
    </Tabs>
  );
}
