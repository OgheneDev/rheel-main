import { Suspense } from 'react';
import { LoadingState } from "@/app/components/property/StateComponents";

export default function FallbackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LoadingState />}>
      {children}
    </Suspense>
  );
}
