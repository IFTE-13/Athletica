'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Sun, Moon, ArrowRightLeft, Layers, Github } from 'lucide-react';

interface HeaderProps {
  footballCount: number;
  cricketCount: number;
  shortlistCount: number;
  compareCount: number;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onOpenSheet: (tab?: 'football' | 'cricket' | 'shortlist') => void;
  onOpenCompareModal: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  footballCount,
  cricketCount,
  shortlistCount,
  compareCount,
  isDarkMode,
  onToggleDarkMode,
  onOpenSheet,
  onOpenCompareModal
}) => {
  return (
    <header style={{
      borderBottom: '1px solid var(--color-mist)',
      backgroundColor: 'var(--color-paper)',
      padding: '16px 0',
      marginBottom: '20px'
    }}>
      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: '1fr auto 1fr',
        alignItems: 'center',
        gap: '16px'
      }}>
        {/* Left: Quick Access to Roster & Shortlist Sheet */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onOpenSheet('football')}
            title="Open Roster & Shortlist Sheet"
          >
            <Layers size={14} style={{ marginRight: '6px' }} />
            <span>Rosters</span>
            <span className="stat-number" style={{
              marginLeft: '6px',
              padding: '0 4px',
              fontSize: '11px',
              backgroundColor: 'var(--color-linen)',
              border: '1px solid var(--color-mist)'
            }}>
              ⚽ {footballCount} · 🏏 {cricketCount} · ★ {shortlistCount}
            </span>
          </Button>

          {compareCount > 0 && (
            <Button
              variant="signal"
              size="sm"
              onClick={onOpenCompareModal}
            >
              <ArrowRightLeft size={13} style={{ marginRight: '4px' }} />
              <span>Compare ({compareCount}/2)</span>
            </Button>
          )}
        </div>

        {/* Center: "Athletica" Text Only (No subtext, perfectly centered) */}
        <div style={{ textAlign: 'center' }}>
          <h1 className="serif-display" style={{
            fontSize: '34px',
            color: 'var(--color-graphite)',
            letterSpacing: '-0.03em',
            lineHeight: 1,
            margin: 0
          }}>
            Athletica
          </h1>
        </div>

        {/* Right: GitHub Repo Link & Dark Mode Toggle */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: '8px' }}>
          <a
            href="https://github.com/IFTE-13/Athletica"
            target="_blank"
            rel="noopener noreferrer"
            style={{ textDecoration: 'none' }}
          >
            <Button
              variant="outline"
              size="sm"
              title="View on GitHub: https://github.com/IFTE-13/Athletica"
              style={{ height: '32px', gap: '6px' }}
            >
              <Github size={14} />
              <span>GitHub</span>
            </Button>
          </a>

          <Button
            variant="outline"
            size="sm"
            onClick={onToggleDarkMode}
            title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            style={{ width: '32px', height: '32px', padding: 0 }}
          >
            {isDarkMode ? <Sun size={15} color="#e5a93b" /> : <Moon size={15} color="var(--color-graphite)" />}
          </Button>
        </div>
      </div>
    </header>
  );
};
