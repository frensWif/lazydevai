
'use client'

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { ROUTES } from '@/lib/constants';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const router = useRouter();
  const { session, isLoading } = useAuth();

  useEffect(() => {
    if (!isLoading && !session) {
      router.push(ROUTES.SIGN_IN);
    }
  }, [isLoading, session, router]);

  if (isLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
