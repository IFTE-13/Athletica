'use client';

import React, { useState } from 'react';
import { Player } from '@/types/player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Trash2, Download, Copy, Check, Users, Heart, Zap, Plus, ArrowRight } from 'lucide-react';

interface RosterSheetProps {
  isOpen: boolean;
  activeTab: 'football' | 'cricket' | 'shortlist';
  onTabChange: (tab: 'football' | 'cricket' | 'shortlist') => void;
  onClose: () => void;
  footballSquad: Player[];
  cricketSquad: Player[];
  shortlist: Player[];
  salaryCap: number;
  onIncreaseSalaryCap: (amount: number) => void;
  onDecreaseSalaryCap: (amount: number) => void;
  onRemoveFromFootballSquad: (playerId: string) => void;
  onRemoveFromCricketSquad: (playerId: string) => void;
  onClearFootballSquad: () => void;
  onClearCricketSquad: () => void;
  onToggleShortlist: (player: Player) => void;
  onDraftFromShortlist: (player: Player) => void;
  onAutoDraftFootball: () => void;
  onAutoDraftCricket: () => void;
}

export const RosterSheet: React.FC<RosterSheetProps> = ({
  isOpen,
  activeTab,
  onTabChange,
  onClose,
  footballSquad,
  cricketSquad,
  shortlist,
  salaryCap,
  onIncreaseSalaryCap,
  onDecreaseSalaryCap,
  onRemoveFromFootballSquad,
  onRemoveFromCricketSquad,
  onClearFootballSquad,
  onClearCricketSquad,
  onToggleShortlist,
  onDraftFromShortlist,
  onAutoDraftFootball,
  onAutoDraftCricket
}) => {
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const currentSquad = activeTab === 'football' ? footballSquad : cricketSquad;
  const currentTotal = currentSquad.reduce((acc, p) => acc + p.marketValue, 0);
  const budgetPercentage = Math.min(100, Math.round((currentTotal / salaryCap) * 100));
  const isOverBudget = currentTotal > salaryCap;
  const avgRating = currentSquad.length > 0 
    ? Math.round(currentSquad.reduce((acc, p) => acc + p.stats.rating, 0) / currentSquad.length)
    : 0;

  const handleCopySummary = (sport: 'football' | 'cricket') => {
    const squad = sport === 'football' ? footballSquad : cricketSquad;
    const total = squad.reduce((acc, p) => acc + p.marketValue, 0);
    const lines = [
      `✦ ATHLETICA ${sport.toUpperCase()} ROSTER ✦`,
      `Athletes: ${squad.length} / 11`,
      `Total Valuation: $${(total / 1000000).toFixed(1)}M / $${(salaryCap / 1000000).toFixed(0)}M`,
      `Average Rating: ${avgRating} OVR`,
      ``,
      ...squad.map((p, idx) => `${idx + 1}. ${p.name} (${p.role} · #${p.jerseyNumber}) — ${p.marketValueFormatted}`)
    ];
    navigator.clipboard.writeText(lines.join('\n'));
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleDownloadCSV = (sport: 'football' | 'cricket') => {
    const squad = sport === 'football' ? footballSquad : cricketSquad;
    const header = "Name,Sport,Nation,Role,Team,JerseyNumber,OVRRating,MarketValue\n";
    const rows = squad.map(p => 
      `"${p.name}","${p.sport}","${p.nation}","${p.role}","${p.team}",${p.jerseyNumber},${p.stats.rating},"${p.marketValueFormatted}"`
    ).join("\n");
    const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `athletica_${sport}_roster_${new Date().toISOString().slice(0,10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(18, 18, 23, 0.55)',
        backdropFilter: 'blur(4px)',
        WebkitBackdropFilter: 'blur(4px)',
        zIndex: 120,
        display: 'flex',
        justifyContent: 'flex-end'
      }}
    >
      <div style={{
        backgroundColor: 'var(--color-paper)',
        width: '100%',
        maxWidth: '520px',
        height: '100%',
        borderLeft: '1px solid var(--color-mist)',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        borderRadius: '0px' // Boxy
      }}>
        {/* Sheet Top Header */}
        <div style={{
          padding: '16px 20px',
          borderBottom: '1px solid var(--color-mist)',
          backgroundColor: 'var(--color-linen)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h2 className="serif-display" style={{ fontSize: '22px', margin: 0 }}>
              Rosters & Shortlist
            </h2>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={onClose}
            style={{ width: '28px', height: '28px', padding: 0 }}
          >
            <X size={14} />
          </Button>
        </div>

        {/* 3 Boxy Tabs: Football | Cricket | Shortlist */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          borderBottom: '1px solid var(--color-mist)',
          backgroundColor: 'var(--color-paper)'
        }}>
          <button
            onClick={() => onTabChange('football')}
            style={{
              padding: '12px 8px',
              border: 'none',
              borderRight: '1px solid var(--color-mist)',
              borderBottom: activeTab === 'football' ? '2px solid var(--color-signal-blue)' : '2px solid transparent',
              backgroundColor: activeTab === 'football' ? 'var(--color-linen)' : 'transparent',
              color: activeTab === 'football' ? 'var(--color-graphite)' : 'var(--color-ash)',
              fontSize: '12px',
              fontWeight: activeTab === 'football' ? 600 : 400,
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            ⚽ Football ({footballSquad.length}/11)
          </button>

          <button
            onClick={() => onTabChange('cricket')}
            style={{
              padding: '12px 8px',
              border: 'none',
              borderRight: '1px solid var(--color-mist)',
              borderBottom: activeTab === 'cricket' ? '2px solid var(--color-signal-blue)' : '2px solid transparent',
              backgroundColor: activeTab === 'cricket' ? 'var(--color-linen)' : 'transparent',
              color: activeTab === 'cricket' ? 'var(--color-graphite)' : 'var(--color-ash)',
              fontSize: '12px',
              fontWeight: activeTab === 'cricket' ? 600 : 400,
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            🏏 Cricket ({cricketSquad.length}/11)
          </button>

          <button
            onClick={() => onTabChange('shortlist')}
            style={{
              padding: '12px 8px',
              border: 'none',
              borderBottom: activeTab === 'shortlist' ? '2px solid #c92a54' : '2px solid transparent',
              backgroundColor: activeTab === 'shortlist' ? 'var(--color-linen)' : 'transparent',
              color: activeTab === 'shortlist' ? '#c92a54' : 'var(--color-ash)',
              fontSize: '12px',
              fontWeight: activeTab === 'shortlist' ? 600 : 400,
              cursor: 'pointer',
              textAlign: 'center'
            }}
          >
            ★ Shortlist ({shortlist.length})
          </button>
        </div>

        {/* Tab Content: Squad Views (Football or Cricket) */}
        {activeTab !== 'shortlist' ? (
          <>
            {/* Squad Budget & Cap Bar */}
            <div style={{
              padding: '16px 20px',
              borderBottom: '1px solid var(--color-mist)',
              backgroundColor: 'var(--color-linen)'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '8px'
              }}>
                <span style={{ fontSize: '12px', color: 'var(--color-ash)' }}>
                  {activeTab === 'football' ? 'Football' : 'Cricket'} Salary Cap
                </span>
                <span className="stat-number" style={{
                  fontSize: '14px',
                  fontWeight: 700,
                  color: isOverBudget ? '#e07a93' : 'var(--color-graphite)'
                }}>
                  ${(currentTotal / 1000000).toFixed(1)}M / ${(salaryCap / 1000000).toFixed(0)}M
                </span>
              </div>

              {/* Progress bar */}
              <div style={{
                height: '4px',
                backgroundColor: 'var(--color-paper)',
                border: '1px solid var(--color-mist)',
                marginBottom: '12px'
              }}>
                <div style={{
                  height: '100%',
                  width: `${budgetPercentage}%`,
                  backgroundColor: isOverBudget ? '#e07a93' : 'var(--color-signal-blue)',
                  transition: 'width 0.2s ease'
                }} />
              </div>

              {/* Metric stats row + Cap Controls */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                fontSize: '12px'
              }}>
                <div style={{ display: 'flex', gap: '16px' }}>
                  <span>Athletes: <strong className="stat-number">{currentSquad.length}/11</strong></span>
                  <span>Avg OVR: <strong className="stat-number">{avgRating || '—'}</strong></span>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onDecreaseSalaryCap(50000000)}
                    disabled={salaryCap <= 100000000}
                    style={{ height: '24px', padding: '0 6px', fontSize: '11px' }}
                  >
                    -$50M
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onIncreaseSalaryCap(50000000)}
                    style={{ height: '24px', padding: '0 6px', fontSize: '11px' }}
                  >
                    +$50M
                  </Button>
                  <Button
                    variant="signal"
                    size="sm"
                    onClick={activeTab === 'football' ? onAutoDraftFootball : onAutoDraftCricket}
                    style={{ height: '24px', padding: '0 8px', fontSize: '11px' }}
                  >
                    <Zap size={11} style={{ marginRight: '3px' }} />
                    <span>Auto XI</span>
                  </Button>
                </div>
              </div>
            </div>

            {/* Squad Players List */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
              {currentSquad.length === 0 ? (
                <div style={{
                  padding: '48px 16px',
                  textAlign: 'center',
                  color: 'var(--color-ash)',
                  fontSize: '13px'
                }}>
                  <Users size={28} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                  <p>No {activeTab} athletes drafted yet.</p>
                  <p style={{ fontSize: '12px', marginTop: '4px' }}>
                    Draft {activeTab} players from the directory or click &quot;Auto XI&quot; above.
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {currentSquad.map((player) => (
                    <div
                      key={player.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        backgroundColor: 'var(--color-paper)',
                        border: '1px solid var(--color-mist)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '30px',
                          height: '30px',
                          overflow: 'hidden',
                          backgroundColor: 'var(--color-mist)',
                          flexShrink: 0
                        }}>
                          <img
                            src={player.image}
                            alt={player.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                            {player.name}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--color-ash)' }}>
                            {player.flag} {player.role} · <span className="jersey-tag">#{player.jerseyNumber}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <span className="stat-number" style={{ fontSize: '13px', fontWeight: 600 }}>
                          {player.marketValueFormatted}
                        </span>
                        <button
                          onClick={() => activeTab === 'football' 
                            ? onRemoveFromFootballSquad(player.id)
                            : onRemoveFromCricketSquad(player.id)
                          }
                          title="Remove from roster"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-ash)',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Squad Footer Actions */}
            {currentSquad.length > 0 && (
              <div style={{
                padding: '14px 20px',
                borderTop: '1px solid var(--color-mist)',
                backgroundColor: 'var(--color-linen)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '8px'
              }}>
                <button
                  onClick={activeTab === 'football' ? onClearFootballSquad : onClearCricketSquad}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--color-ash)',
                    fontSize: '12px',
                    cursor: 'pointer',
                    textDecoration: 'underline'
                  }}
                >
                  Clear {activeTab} Roster
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDownloadCSV(activeTab)}
                    title="Download CSV"
                  >
                    <Download size={13} style={{ marginRight: '4px' }} />
                    <span>CSV</span>
                  </Button>

                  <Button
                    variant="signal"
                    size="sm"
                    onClick={() => handleCopySummary(activeTab)}
                  >
                    {copied ? (
                      <>
                        <Check size={13} style={{ marginRight: '4px' }} />
                        <span>Copied!</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} style={{ marginRight: '4px' }} />
                        <span>Copy Summary</span>
                      </>
                    )}
                  </Button>
                </div>
              </div>
            )}
          </>
        ) : (
          /* Shortlist Tab Content */
          <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
            {shortlist.length === 0 ? (
              <div style={{
                padding: '48px 16px',
                textAlign: 'center',
                color: 'var(--color-ash)',
                fontSize: '13px'
              }}>
                <Heart size={28} style={{ margin: '0 auto 10px', opacity: 0.4 }} />
                <p>No athletes bookmarked in your shortlist.</p>
                <p style={{ fontSize: '12px', marginTop: '4px' }}>
                  Click the heart icon on any athlete card to bookmark them here.
                </p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {shortlist.map((player) => {
                  const isDrafted = player.sport === 'football'
                    ? footballSquad.some(p => p.id === player.id)
                    : cricketSquad.some(p => p.id === player.id);

                  return (
                    <div
                      key={player.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '10px 12px',
                        backgroundColor: 'var(--color-paper)',
                        border: '1px solid var(--color-mist)'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <div style={{
                          width: '32px',
                          height: '32px',
                          overflow: 'hidden',
                          backgroundColor: 'var(--color-mist)',
                          flexShrink: 0
                        }}>
                          <img
                            src={player.image}
                            alt={player.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => { e.currentTarget.style.display = 'none'; }}
                          />
                        </div>
                        <div>
                          <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                            {player.name}
                          </div>
                          <div style={{ fontSize: '11px', color: 'var(--color-ash)' }}>
                            {player.flag} {player.sport.toUpperCase()} · {player.role} · <span className="stat-number">{player.marketValueFormatted}</span>
                          </div>
                        </div>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {isDrafted ? (
                          <Badge variant="secondary" style={{ fontSize: '10px' }}>
                            Drafted ✓
                          </Badge>
                        ) : (
                          <Button
                            variant="signal"
                            size="sm"
                            onClick={() => onDraftFromShortlist(player)}
                            style={{ height: '26px', fontSize: '11px', padding: '0 8px' }}
                          >
                            <Plus size={11} style={{ marginRight: '3px' }} />
                            <span>Draft</span>
                          </Button>
                        )}

                        <button
                          onClick={() => onToggleShortlist(player)}
                          title="Remove from shortlist"
                          style={{
                            background: 'transparent',
                            border: 'none',
                            color: 'var(--color-ash)',
                            cursor: 'pointer',
                            padding: '4px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                        >
                          <X size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
