import type { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return (
    <div className="mx-auto max-w-6xl px-3 sm:px-4 lg:px-6">{children}</div>
  );
}
