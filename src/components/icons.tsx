import type React from 'react';

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number | string;
}

export const InstagramIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

export const TwitterIcon: React.FC<IconProps> = ({ size = 24, className, ...props }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 1.4 3.3 4.3 3.3 4.3s-1.4.1-2.6.1c-.6 1.6-1.9 3.2-1.9 3.2s-2.1-.6-3.9-2.2c-2.3 2.1-4.8 2.2-4.8 2.2s-.5-1.9.5-3.2c-1.3-.3-2.3-.8-2.3-.8s-.2-1.1.8-2.2c-.7-.3-1.4-.4-1.4-.4H3s1.3-3.2 5.5-4.4c.5-.2 1.2-.2 1.2-.2S9 4 9 3.1C9 2 9.7.6 11.2.6s2.5 1.5 2.5 1.5S15 2.9 16.5 3c2 .3 3.3 1 3.3 1z" />
  </svg>
);
