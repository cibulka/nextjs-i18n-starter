'use client';
import { useEffect } from 'react';

type ErrorProps = { error: Error; reset: () => void };

export default function Error(props: ErrorProps) {
  const { error, reset } = props;
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center flex-1 py-12">
      <h1 className="text-4xl font-display font-bold mb-12">Something went wrong!</h1>
      <button onClick={() => reset()} type="button" className="underline">
        Reset error boundary
      </button>
    </div>
  );
}
