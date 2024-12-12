import React from 'react';

export function AccessDenied() {
  return (
    <div className="flex items-center justify-center h-full">
      <p className="text-lg text-primary-600">
        You don't have permission to access this page.
      </p>
    </div>
  );
}