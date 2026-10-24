'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Zap, Plus, Minus } from 'lucide-react';

interface StatsBarProps {
  totalAthletesCount: number;
  totalMarketCapFormatted: string;
  salaryCap: number;
  onIncreaseSalaryCap: (amount: number) => void;
  onDecreaseSalaryCap: (amount: number) => void;
  onSetSalaryCap: (amount: number) => void;
  onAutoDraftFootball: () => void;
  onAutoDraftCricket: () => void;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  totalAthletesCount,
  totalMarketCapFormatted,
  salaryCap,
  onIncreaseSalaryCap,
  onDecreaseSalaryCap,
  onSetSalaryCap,
  onAutoDraftFootball,
  onAutoDraftCricket
}) => {
  const salaryCapFormatted = `$${(salaryCap / 1000000).toFixed(0)}M`;

  return (
    <section style={{ marginBottom: '20px' }}>
      <div className="container">
        <div style={{
          backgroundColor: 'var(--color-paper)',
          border: '1px solid var(--color-mist)',
          borderRadius: '0px', // Boxy
          padding: '14px 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          {/* Key Metric Blocks */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '24px',
            flexWrap: 'wrap'
          }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-ash)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Indexed Athletes
              </div>
              <div className="stat-number" style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                {totalAthletesCount}
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-mist)' }} />

            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-ash)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Nations
              </div>
              <div className="stat-number" style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                16
              </div>
            </div>

            <div style={{ width: '1px', height: '24px', backgroundColor: 'var(--color-mist)' }} />

            <div>
              <div style={{ fontSize: '10px', color: 'var(--color-ash)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                Total Valuation
              </div>
              <div className="stat-number" style={{ fontSize: '19px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                {totalMarketCapFormatted}
              </div>
            </div>
          </div>

          {/* Interactive Salary Cap Adjuster & Auto-Drafts */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '10px', color: 'var(--color-ash)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                  Salary Cap
                </div>
                <div className="stat-number" style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-signal-blue)' }}>
                  {salaryCapFormatted}
                </div>
              </div>

              {/* Stepper buttons to adjust salary cap */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onDecreaseSalaryCap(50000000)}
                  disabled={salaryCap <= 100000000}
                  title="Decrease Cap by $50M"
                  style={{ width: '26px', height: '26px', padding: 0 }}
                >
                  <Minus size={12} />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onIncreaseSalaryCap(50000000)}
                  title="Increase Cap by $50M"
                  style={{ width: '26px', height: '26px', padding: 0 }}
                >
                  <Plus size={12} />
                </Button>
              </div>

              {/* Quick preset buttons */}
              <div style={{ display: 'flex', gap: '2px', marginLeft: '4px' }}>
                {[300000000, 500000000, 750000000, 1000000000].map((preset) => {
                  const isCurrent = salaryCap === preset;
                  const label = `$${preset / 1000000000 >= 1 ? `${preset / 1000000000}B` : `${preset / 1000000}M`}`;
                  return (
                    <button
                      key={preset}
                      onClick={() => onSetSalaryCap(preset)}
                      style={{
                        padding: '3px 6px',
                        fontSize: '11px',
                        fontFamily: 'var(--font-oxanium)',
                        borderRadius: '0px',
                        border: isCurrent ? '1px solid var(--color-signal-blue)' : '1px solid var(--color-mist)',
                        backgroundColor: isCurrent ? 'rgba(65, 161, 207, 0.12)' : 'transparent',
                        color: isCurrent ? 'var(--color-signal-blue)' : 'var(--color-ash)',
                        cursor: 'pointer'
                      }}
                    >
                      {label}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Auto-Draft buttons for Football & Cricket */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <Button
                variant="outline"
                size="sm"
                onClick={onAutoDraftFootball}
                title="Auto-draft 11 Football players"
                style={{ height: '28px', fontSize: '11px' }}
              >
                <Zap size={11} style={{ marginRight: '3px', color: '#b8972e' }} />
                <span>Auto ⚽ XI</span>
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={onAutoDraftCricket}
                title="Auto-draft 11 Cricket players"
                style={{ height: '28px', fontSize: '11px' }}
              >
                <Zap size={11} style={{ marginRight: '3px', color: '#b8972e' }} />
                <span>Auto 🏏 XI</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
