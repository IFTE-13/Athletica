'use client';

import React from 'react';
import { Player } from '@/types/player';
import { PLAYERS_DATABASE } from '@/data/players';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Check, ArrowRightLeft, Trophy, Plus } from 'lucide-react';

interface CompareModalProps {
  isOpen: boolean;
  playerA: Player | null;
  playerB: Player | null;
  onSelectPlayerA: (player: Player) => void;
  onSelectPlayerB: (player: Player) => void;
  onClose: () => void;
  onClearCompare: () => void;
  isDraftedA: boolean;
  isDraftedB: boolean;
  onToggleDraft: (player: Player) => void;
}

export const CompareModal: React.FC<CompareModalProps> = ({
  isOpen,
  playerA,
  playerB,
  onSelectPlayerA,
  onSelectPlayerB,
  onClose,
  onClearCompare,
  isDraftedA,
  isDraftedB,
  onToggleDraft
}) => {
  if (!isOpen) return null;
  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 23, 23, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 105,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}
    >
      <div style={{
        backgroundColor: 'var(--color-paper)',
        border: '1px solid var(--color-mist)',
        borderRadius: '0px',
        maxWidth: '840px',
        width: '100%',
        maxHeight: '92vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative'
      }}>
        {/* Header */}
        <div style={{
          padding: '20px 28px',
          borderBottom: '1px solid var(--color-mist)',
          backgroundColor: 'var(--color-linen)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <ArrowRightLeft size={18} color="var(--color-signal-blue)" />
            <h3 className="serif-display" style={{ fontSize: '22px' }}>
              Head-to-Head Athlete Comparison
            </h3>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Button variant="ghost" size="sm" onClick={onClearCompare}>
              Reset
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={onClose}
              style={{ width: '32px', height: '32px', padding: 0 }}
            >
              <X size={15} />
            </Button>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '28px' }}>
          {/* Athlete Selector & Card Headers */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 100px 1fr',
            gap: '16px',
            alignItems: 'start',
            marginBottom: '28px'
          }}>
            {/* Player A Column */}
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--color-linen)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-mist)',
              textAlign: 'center'
            }}>
              {/* Quick Dropdown to swap player A */}
              <div style={{ marginBottom: '12px' }}>
                <select
                  value={playerA?.id || ''}
                  onChange={(e) => {
                    const found = PLAYERS_DATABASE.find(p => p.id === e.target.value);
                    if (found) onSelectPlayerA(found);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-paper)',
                    border: '1px solid var(--color-mist)',
                    borderRadius: '4px',
                    padding: '5px 8px',
                    fontSize: '12px',
                    color: 'var(--color-charcoal)',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="" disabled>Select Athlete A...</option>
                  {PLAYERS_DATABASE.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.flag} {p.name} ({p.sport.toUpperCase()} · {p.marketValueFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {playerA ? (
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    margin: '0 auto 10px',
                    overflow: 'hidden',
                    border: '2px solid var(--color-mist)',
                    backgroundColor: 'var(--color-mist)'
                  }}>
                    <img src={playerA.image} alt={playerA.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 className="serif-lead" style={{ fontSize: '19px', marginBottom: '4px' }}>
                    {playerA.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--color-ash)', marginBottom: '8px' }}>
                    {playerA.flag} {playerA.nation} · <span className="jersey-tag">#{playerA.jerseyNumber}</span>
                  </div>
                  <Badge variant="secondary" style={{ marginBottom: '10px' }}>
                    {playerA.sport.toUpperCase()} · {playerA.role}
                  </Badge>
                  <div>
                    <Button
                      variant={isDraftedA ? "secondary" : "signal"}
                      size="sm"
                      onClick={() => onToggleDraft(playerA)}
                    >
                      {isDraftedA ? <Check size={13} style={{ marginRight: '4px', color: '#2b7a4b' }} /> : <Plus size={13} style={{ marginRight: '4px' }} />}
                      {isDraftedA ? 'Drafted' : 'Draft'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '24px 8px', color: 'var(--color-ash)', fontSize: '13px' }}>
                  Pick Athlete A above
                </div>
              )}
            </div>

            {/* VS Divider */}
            <div style={{ textAlign: 'center', paddingTop: '40px' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-mist)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto',
                fontSize: '11px',
                fontWeight: 700,
                color: 'var(--color-ash)',
                fontFamily: 'var(--font-oxanium)'
              }}>
                VS
              </div>
            </div>

            {/* Player B Column */}
            <div style={{
              padding: '16px',
              backgroundColor: 'var(--color-linen)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-mist)',
              textAlign: 'center'
            }}>
              {/* Quick Dropdown to swap player B */}
              <div style={{ marginBottom: '12px' }}>
                <select
                  value={playerB?.id || ''}
                  onChange={(e) => {
                    const found = PLAYERS_DATABASE.find(p => p.id === e.target.value);
                    if (found) onSelectPlayerB(found);
                  }}
                  style={{
                    width: '100%',
                    backgroundColor: 'var(--color-paper)',
                    border: '1px solid var(--color-mist)',
                    borderRadius: '4px',
                    padding: '5px 8px',
                    fontSize: '12px',
                    color: 'var(--color-charcoal)',
                    cursor: 'pointer',
                    outline: 'none'
                  }}
                >
                  <option value="" disabled>Select Athlete B...</option>
                  {PLAYERS_DATABASE.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.flag} {p.name} ({p.sport.toUpperCase()} · {p.marketValueFormatted})
                    </option>
                  ))}
                </select>
              </div>

              {playerB ? (
                <div>
                  <div style={{
                    width: '64px',
                    height: '64px',
                    borderRadius: '50%',
                    margin: '0 auto 10px',
                    overflow: 'hidden',
                    border: '2px solid var(--color-mist)',
                    backgroundColor: 'var(--color-mist)'
                  }}>
                    <img src={playerB.image} alt={playerB.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  </div>
                  <h4 className="serif-lead" style={{ fontSize: '19px', marginBottom: '4px' }}>
                    {playerB.name}
                  </h4>
                  <div style={{ fontSize: '12px', color: 'var(--color-ash)', marginBottom: '8px' }}>
                    {playerB.flag} {playerB.nation} · <span className="jersey-tag">#{playerB.jerseyNumber}</span>
                  </div>
                  <Badge variant="secondary" style={{ marginBottom: '10px' }}>
                    {playerB.sport.toUpperCase()} · {playerB.role}
                  </Badge>
                  <div>
                    <Button
                      variant={isDraftedB ? "secondary" : "signal"}
                      size="sm"
                      onClick={() => onToggleDraft(playerB)}
                    >
                      {isDraftedB ? <Check size={13} style={{ marginRight: '4px', color: '#2b7a4b' }} /> : <Plus size={13} style={{ marginRight: '4px' }} />}
                      {isDraftedB ? 'Drafted' : 'Draft'}
                    </Button>
                  </div>
                </div>
              ) : (
                <div style={{ padding: '24px 8px', color: 'var(--color-ash)', fontSize: '13px' }}>
                  Pick Athlete B above
                </div>
              )}
            </div>
          </div>

          {/* Metric Comparison Table */}
          {playerA && playerB && (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              borderTop: '1px solid var(--color-mist)',
              paddingTop: '20px'
            }}>
              {/* Valuation Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                padding: '10px 14px',
                backgroundColor: 'var(--color-linen)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}>
                <div className="stat-number" style={{ fontSize: '18px', fontWeight: 700, color: playerA.marketValue >= playerB.marketValue ? 'var(--color-signal-blue)' : 'var(--color-graphite)' }}>
                  {playerA.marketValueFormatted}
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Valuation
                </div>
                <div className="stat-number" style={{ fontSize: '18px', fontWeight: 700, textAlign: 'right', color: playerB.marketValue >= playerA.marketValue ? 'var(--color-signal-blue)' : 'var(--color-graphite)' }}>
                  {playerB.marketValueFormatted}
                </div>
              </div>

              {/* OVR Rating Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                padding: '10px 14px',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-mist)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}>
                <div className="stat-number" style={{ fontSize: '20px', fontWeight: 700, color: playerA.stats.rating >= playerB.stats.rating ? '#2b7a4b' : 'var(--color-graphite)' }}>
                  {playerA.stats.rating} OVR
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Overall Rating
                </div>
                <div className="stat-number" style={{ fontSize: '20px', fontWeight: 700, textAlign: 'right', color: playerB.stats.rating >= playerA.stats.rating ? '#2b7a4b' : 'var(--color-graphite)' }}>
                  {playerB.stats.rating} OVR
                </div>
              </div>

              {/* Age Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                padding: '10px 14px',
                backgroundColor: 'var(--color-linen)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}>
                <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600 }}>
                  {playerA.age} yrs
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Age
                </div>
                <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600, textAlign: 'right' }}>
                  {playerB.age} yrs
                </div>
              </div>

              {/* International Caps Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                padding: '10px 14px',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-mist)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}>
                <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600 }}>
                  {playerA.stats.caps} caps
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Intl Caps
                </div>
                <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600, textAlign: 'right' }}>
                  {playerB.stats.caps} caps
                </div>
              </div>

              {/* Primary Metric */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                padding: '10px 14px',
                backgroundColor: 'var(--color-linen)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}>
                <div>
                  <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600 }}>{playerA.stats.primaryStatValue}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-ash)' }}>{playerA.stats.primaryStatLabel}</div>
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Primary Metric
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600 }}>{playerB.stats.primaryStatValue}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-ash)' }}>{playerB.stats.primaryStatLabel}</div>
                </div>
              </div>

              {/* Honors Row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 120px 1fr',
                padding: '10px 14px',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-mist)',
                borderRadius: 'var(--radius-md)',
                alignItems: 'center'
              }}>
                <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600 }}>
                  {playerA.honors.length} major titles
                </div>
                <div style={{ textAlign: 'center', fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Honors
                </div>
                <div className="stat-number" style={{ fontSize: '15px', fontWeight: 600, textAlign: 'right' }}>
                  {playerB.honors.length} major titles
                </div>
              </div>
            </div>
          )}

          {/* Footer close button */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            paddingTop: '20px',
            borderTop: '1px solid var(--color-mist)',
            marginTop: '20px'
          }}>
            <Button variant="secondary" onClick={onClose}>
              Close Comparison
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
