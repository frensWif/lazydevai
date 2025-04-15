'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function BackNavigation() {
  return (
    <div className="mb-6">
      <Link href="/auth" className="flex items-center text-sm text-muted-foreground hover:text-primary transition-colors">
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to sign in
      </Link>
    </div>
  );
}
