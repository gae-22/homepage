import type { PropsWithChildren } from 'react';

export default function Container({ children }: PropsWithChildren) {
  return <div className="mx-auto max-w-3xl px-4">{children}</div>;
}
