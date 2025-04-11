
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BackNavigation() {
  return (
    <div className="absolute top-4 left-4">
      <Button variant="ghost" size="sm" asChild className="gap-2 hover:text-neon-green">
        <Link to="/">
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Home</span>
        </Link>
      </Button>
    </div>
  );
}
