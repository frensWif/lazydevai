import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

export default function ThemeOptionCard({
  icon: Icon,
  label,
  selected,
  onClick
}: {
  icon: LucideIcon;
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      variant={selected ? "default" : "outline"}
      className={`flex flex-col items-center justify-center p-6 h-auto gap-2 w-full`}
      onClick={onClick}
    >
      <Icon className="h-6 w-6" />
      <span>{label}</span>
    </Button>
  );
}
