
import React from 'react';

const FireIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M12 2c-4.4 3.5-6.5 8.5-6.5 12.5C5.5 19.3 8.4 22 12 22s6.5-2.7 6.5-7.5c0-4-2.1-9-6.5-12.5z" />
    <path d="M12 10.5c-2.8 2.3-4.5 5.7-4.5 8.5" />
  </svg>
);

export default FireIcon;
