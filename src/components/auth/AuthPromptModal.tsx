// components/AuthPromptModal.tsx
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

export default function AuthPromptModal({ show }: { show: boolean }) {
  const [open, setOpen] = useState(show);

  useEffect(() => {
    setOpen(show);
  }, [show]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Hold up 👋</DialogTitle>
        </DialogHeader>
        <div className="text-sm text-muted-foreground mb-4">
          You need to log in or sign up to access this feature.
        </div>
        <div className="flex gap-2 justify-end">
          <Button asChild variant="outline">
            <Link href="/auth/login">Log In</Link>
          </Button>
          <Button asChild>
            <Link href="/auth/signup">Sign Up</Link>
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
