'use client';

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'signal' | 'outline' | 'secondary' | 'ghost' | 'destructive';
  size?: 'default' | 'sm' | 'lg' | 'icon';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'default', style, children, onMouseEnter, onMouseLeave, ...props }, ref) => {
    const [isHovered, setIsHovered] = React.useState(false);

    const getVariantStyles = (): React.CSSProperties => {
      switch (variant) {
        case 'signal':
          return {
            backgroundColor: isHovered ? 'rgba(65, 161, 207, 0.12)' : 'transparent',
            borderColor: 'var(--color-signal-blue)',
            color: 'var(--color-signal-blue)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'outline':
          return {
            backgroundColor: isHovered ? 'var(--color-linen)' : 'transparent',
            borderColor: isHovered ? 'var(--color-ash)' : 'var(--color-mist)',
            color: 'var(--color-graphite)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'secondary':
          return {
            backgroundColor: isHovered ? 'var(--color-linen)' : 'transparent',
            borderColor: 'var(--color-twilight)',
            color: 'var(--color-twilight)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'ghost':
          return {
            backgroundColor: isHovered ? 'var(--color-linen)' : 'transparent',
            borderColor: 'transparent',
            color: 'var(--color-charcoal)',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'destructive':
          return {
            backgroundColor: isHovered ? '#3b1c21' : 'transparent',
            borderColor: '#e07a93',
            color: '#e07a93',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
        case 'default':
        default:
          return {
            backgroundColor: isHovered ? 'var(--color-twilight)' : 'var(--color-dusk)',
            borderColor: 'var(--color-twilight)',
            color: '#ffffff',
            borderWidth: '1px',
            borderStyle: 'solid',
          };
      }
    };

    const getSizeStyles = (): React.CSSProperties => {
      switch (size) {
        case 'sm':
          return {
            height: '28px',
            padding: '0 8px',
            fontSize: '12px',
          };
        case 'lg':
          return {
            height: '40px',
            padding: '0 18px',
            fontSize: '14px',
          };
        case 'icon':
          return {
            height: '30px',
            width: '30px',
            padding: '0',
          };
        case 'default':
        default:
          return {
            height: '34px',
            padding: '0 12px',
            fontSize: '13px',
          };
      }
    };

    const baseStyles: React.CSSProperties = {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '0px', // Boxy
      fontFamily: 'var(--font-sans)',
      fontWeight: 500,
      cursor: 'pointer',
      outline: 'none',
      transition: 'all 0.12s ease',
      userSelect: 'none',
      whiteSpace: 'nowrap',
      ...getSizeStyles(),
      ...getVariantStyles(),
      ...style,
    };

    return (
      <button
        ref={ref}
        className={cn(className)}
        style={baseStyles}
        onMouseEnter={(e) => {
          setIsHovered(true);
          onMouseEnter?.(e);
        }}
        onMouseLeave={(e) => {
          setIsHovered(false);
          onMouseLeave?.(e);
        }}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
