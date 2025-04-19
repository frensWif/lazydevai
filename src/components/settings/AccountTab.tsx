import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import SettingsCard from "./SettingsCard";

export default function AccountTab() {
  return (
    <SettingsCard title="Account Info" description="Update your email or username.">
      <div className="grid gap-4">
        <div className="grid gap-2">
          <Label>Email</Label>
          <Input defaultValue="me@example.com" />
        </div>
        <div className="grid gap-2">
          <Label>Username</Label>
          <Input defaultValue="frensaccount" />
        </div>
        <Button className="mt-2 w-fit">Save Changes</Button>
      </div>
    </SettingsCard>
  );
}
