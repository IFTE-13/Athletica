'use client';

import React from 'react';
import { Github } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer style={{
      backgroundColor: 'var(--color-paper)',
      borderTop: '1px solid var(--color-mist)',
      padding: '28px 0',
      marginTop: '48px',
      borderRadius: '0px'
    }}>
      <div className="container" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '16px'
      }}>
        {/* Just "Athletica" */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: '13px', color: 'var(--color-twilight)' }}>✦</span>
          <span style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '18px',
            color: 'var(--color-graphite)',
            letterSpacing: '-0.02em',
            fontWeight: 400
          }}>
            Athletica
          </span>
        </div>

        {/* Minimal Copyright & GitHub Link */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '16px',
          fontSize: '12px',
          color: 'var(--color-ash)'
        }}>
          <a
            href="https://github.com/IFTE-13/Athletica"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
              color: 'var(--color-ash)',
              textDecoration: 'none'
            }}
          >
            <Github size={13} />
            <span>GitHub</span>
          </a>
          <span>·</span>
          <span>Football & Cricket</span>
          <span>·</span>
          <span>© {new Date().getFullYear()}</span>
        </div>
      </div>
    </footer>
  );
};
