'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'signal' | 'legend' | 'worldClass' | 'elite' | 'risingStar';
}

export function Badge({ className, variant = 'default', style, children, ...props }: BadgeProps) {
  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'secondary':
        return {
          backgroundColor: 'var(--color-linen)',
          borderColor: 'var(--color-mist)',
          color: 'var(--color-graphite)',
        };
      case 'outline':
        return {
          backgroundColor: 'transparent',
          borderColor: 'var(--color-mist)',
          color: 'var(--color-charcoal)',
        };
      case 'signal':
        return {
          backgroundColor: 'rgba(65, 161, 207, 0.12)',
          borderColor: 'var(--color-signal-blue)',
          color: 'var(--color-signal-blue)',
        };
      case 'legend':
        return {
          backgroundColor: 'rgba(216, 182, 78, 0.12)',
          borderColor: '#d8b64e',
          color: '#d8b64e',
        };
      case 'worldClass':
        return {
          backgroundColor: 'rgba(65, 161, 207, 0.12)',
          borderColor: 'var(--color-signal-blue)',
          color: 'var(--color-signal-blue)',
        };
      case 'elite':
        return {
          backgroundColor: 'rgba(40, 122, 75, 0.12)',
          borderColor: '#4ade80',
          color: '#4ade80',
        };
      case 'risingStar':
        return {
          backgroundColor: 'rgba(212, 139, 189, 0.12)',
          borderColor: '#d48bbd',
          color: '#d48bbd',
        };
      case 'default':
      default:
        return {
          backgroundColor: 'var(--color-dusk)',
          borderColor: 'var(--color-twilight)',
          color: '#ffffff',
        };
    }
  };

  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    borderRadius: '0px', // Boxy
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: '2px 6px',
    fontSize: '11px',
    fontWeight: 500,
    fontFamily: 'var(--font-sans)',
    letterSpacing: '-0.01em',
    lineHeight: 1.2,
    ...getVariantStyles(),
    ...style,
  };

  return (
    <div className={cn(className)} style={baseStyles} {...props}>
      {children}
    </div>
  );
}
