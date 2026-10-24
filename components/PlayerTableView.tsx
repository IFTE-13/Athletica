'use client';

import React from 'react';
import { Player } from '@/types/player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Eye, Heart, ArrowRightLeft } from 'lucide-react';

interface PlayerTableViewProps {
  players: Player[];
  draftedPlayerIds: Set<string>;
  shortlistedPlayerIds: Set<string>;
  comparingPlayerIds: Set<string>;
  onToggleDraft: (player: Player) => void;
  onToggleShortlist: (player: Player) => void;
  onToggleCompare: (player: Player) => void;
  onOpenDossier: (player: Player) => void;
}

export const PlayerTableView: React.FC<PlayerTableViewProps> = ({
  players,
  draftedPlayerIds,
  shortlistedPlayerIds,
  comparingPlayerIds,
  onToggleDraft,
  onToggleShortlist,
  onToggleCompare,
  onOpenDossier
}) => {
  if (players.length === 0) {
    return (
      <div style={{
        padding: '48px',
        textAlign: 'center',
        backgroundColor: 'var(--color-paper)',
        border: '1px solid var(--color-mist)',
        borderRadius: '0px',
        color: 'var(--color-ash)'
      }}>
        No athletes match the current filter criteria.
      </div>
    );
  }

  return (
    <div style={{
      backgroundColor: 'var(--color-paper)',
      border: '1px solid var(--color-mist)',
      borderRadius: '0px', // Boxy
      overflowX: 'auto'
    }}>
      <table style={{
        width: '100%',
        borderCollapse: 'collapse',
        textAlign: 'left',
        fontSize: '13px'
      }}>
        <thead>
          <tr style={{
            backgroundColor: 'var(--color-linen)',
            borderBottom: '1px solid var(--color-mist)',
            color: 'var(--color-ash)',
            textTransform: 'uppercase',
            letterSpacing: '0.04em',
            fontSize: '11px',
            fontWeight: 600
          }}>
            <th style={{ padding: '12px 14px', width: '36px' }}>★</th>
            <th style={{ padding: '12px 14px' }}>Athlete</th>
            <th style={{ padding: '12px 14px' }}>Discipline</th>
            <th style={{ padding: '12px 14px' }}>Nation</th>
            <th style={{ padding: '12px 14px' }}>Role</th>
            <th style={{ padding: '12px 14px' }}>Key Metric</th>
            <th style={{ padding: '12px 14px' }}>OVR</th>
            <th style={{ padding: '12px 14px' }}>Valuation</th>
            <th style={{ padding: '12px 14px', textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => {
            const isDrafted = draftedPlayerIds.has(player.id);
            const isShortlisted = shortlistedPlayerIds.has(player.id);
            const isComparing = comparingPlayerIds.has(player.id);

            return (
              <tr
                key={player.id}
                style={{
                  borderBottom: '1px solid var(--color-mist)',
                  transition: 'background-color 0.12s ease'
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-linen)')}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
              >
                {/* Shortlist Heart */}
                <td style={{ padding: '10px 8px 10px 14px' }}>
                  <button
                    onClick={() => onToggleShortlist(player)}
                    style={{
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      color: isShortlisted ? '#c92a54' : 'var(--color-ash)',
                      display: 'flex',
                      alignItems: 'center'
                    }}
                  >
                    <Heart size={13} fill={isShortlisted ? '#c92a54' : 'none'} />
                  </button>
                </td>

                {/* Athlete identity */}
                <td style={{ padding: '10px 14px' }}>
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
                      <div
                        onClick={() => onOpenDossier(player)}
                        className="serif-lead"
                        style={{
                          fontSize: '14px',
                          fontWeight: 500,
                          cursor: 'pointer',
                          color: 'var(--color-graphite)'
                        }}
                      >
                        {player.name}
                      </div>
                      <div style={{ fontSize: '11px', color: 'var(--color-ash)' }}>
                        {player.team} · <span className="jersey-tag">#{player.jerseyNumber}</span>
                      </div>
                    </div>
                  </div>
                </td>

                {/* Sport */}
                <td style={{ padding: '10px 14px' }}>
                  <Badge variant="secondary" style={{ fontSize: '10px', textTransform: 'uppercase' }}>
                    {player.sport}
                  </Badge>
                </td>

                {/* Nation */}
                <td style={{ padding: '10px 14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                    <span>{player.flag}</span>
                    <span>{player.nation}</span>
                  </div>
                </td>

                {/* Role */}
                <td style={{ padding: '10px 14px', color: 'var(--color-charcoal)' }}>
                  <div>{player.role}</div>
                  <div style={{ fontSize: '11px', color: 'var(--color-ash)' }}>{player.tier}</div>
                </td>

                {/* Key Metric with Oxanium */}
                <td style={{ padding: '10px 14px' }}>
                  <div className="stat-number" style={{ fontWeight: 600, color: 'var(--color-graphite)', fontSize: '13px' }}>
                    {player.stats.primaryStatValue}
                  </div>
                  <div style={{ fontSize: '10px', color: 'var(--color-ash)' }}>
                    {player.stats.primaryStatLabel}
                  </div>
                </td>

                {/* OVR */}
                <td style={{ padding: '10px 14px' }}>
                  <span className="stat-number" style={{
                    backgroundColor: 'var(--color-linen)',
                    border: '1px solid var(--color-mist)',
                    padding: '2px 5px',
                    fontWeight: 700,
                    fontSize: '12px',
                    color: 'var(--color-graphite)'
                  }}>
                    {player.stats.rating}
                  </span>
                </td>

                {/* Valuation */}
                <td style={{ padding: '10px 14px' }}>
                  <span className="stat-number" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                    {player.marketValueFormatted}
                  </span>
                </td>

                {/* Actions */}
                <td style={{ padding: '10px 14px', textAlign: 'right' }}>
                  <div style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <Button
                      variant={isComparing ? "signal" : "outline"}
                      size="icon"
                      onClick={() => onToggleCompare(player)}
                      title="Compare"
                      style={{ width: '28px', height: '28px' }}
                    >
                      <ArrowRightLeft size={13} />
                    </Button>

                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => onOpenDossier(player)}
                      title="Inspect Dossier"
                      style={{ width: '28px', height: '28px' }}
                    >
                      <Eye size={13} />
                    </Button>

                    {isDrafted ? (
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onToggleDraft(player)}
                        style={{ height: '28px', fontSize: '11px', padding: '0 8px' }}
                      >
                        <Check size={11} style={{ marginRight: '3px', color: '#4ade80' }} />
                        <span>Drafted</span>
                      </Button>
                    ) : (
                      <Button
                        variant="signal"
                        size="sm"
                        onClick={() => onToggleDraft(player)}
                        style={{ height: '28px', fontSize: '11px', padding: '0 8px' }}
                      >
                        <Plus size={11} style={{ marginRight: '3px' }} />
                        <span>Draft</span>
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};
