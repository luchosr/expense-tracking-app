import { PropsWithChildren } from 'react';

export default function ErrorMessage({ children }: PropsWithChildren) {
  return (
    <p className="bg-red-600 text-white font-bold text-m text-center">
      {children}
    </p>
  );
}
