'use client';

import React from 'react';
import { Player } from '@/types/player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, Plus, Check, Trophy, Heart, ArrowRightLeft } from 'lucide-react';

interface PlayerModalProps {
  player: Player | null;
  onClose: () => void;
  isDrafted: boolean;
  isShortlisted: boolean;
  isComparing: boolean;
  onToggleDraft: (player: Player) => void;
  onToggleShortlist: (player: Player) => void;
  onToggleCompare: (player: Player) => void;
}

export const PlayerModal: React.FC<PlayerModalProps> = ({
  player,
  onClose,
  isDrafted,
  isShortlisted,
  isComparing,
  onToggleDraft,
  onToggleShortlist,
  onToggleCompare
}) => {
  if (!player) return null;

  const getTierVariant = (tier: string) => {
    switch (tier) {
      case 'Legend': return 'legend';
      case 'World Class': return 'worldClass';
      case 'Elite': return 'elite';
      default: return 'risingStar';
    }
  };

  return (
    <div 
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(23, 23, 23, 0.45)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        zIndex: 100,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '24px'
      }}>
      <div style={{
        backgroundColor: 'var(--color-paper)',
        border: '1px solid var(--color-mist)',
        borderRadius: '0px',
        maxWidth: '720px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        boxShadow: 'var(--shadow-modal)',
        position: 'relative'
      }}>
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            width: '30px',
            height: '30px',
            borderRadius: '0px',
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: 'var(--color-charcoal)',
            zIndex: 10
          }}
        >
          <X size={18} />
        </button>

        {/* Modal Header Media & Identity */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          gap: '24px',
          padding: '32px 32px 24px',
          borderBottom: '1px solid var(--color-mist)',
          backgroundColor: 'var(--color-linen)',
          borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0'
        }}>
          {/* Portrait */}
          <div style={{
            height: '220px',
            borderRadius: 'var(--radius-lg)',
            overflow: 'hidden',
            backgroundColor: 'var(--color-mist)',
            border: '1px solid var(--color-mist)'
          }}>
            <img
              src={player.image}
              alt={player.name}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          </div>

          {/* Identity info */}
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '8px'
            }}>
              <span style={{ fontSize: '14px' }}>{player.flag}</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-ash)' }}>
                {player.nation}
              </span>
              <span style={{ color: 'var(--color-fog)' }}>·</span>
              <Badge variant="secondary" style={{ textTransform: 'uppercase', fontSize: '10px' }}>
                {player.sport}
              </Badge>
              <Badge variant={getTierVariant(player.tier)}>
                {player.tier}
              </Badge>
            </div>

            <h2 className="serif-display" style={{ fontSize: '32px', marginBottom: '4px' }}>
              {player.name}
            </h2>

            <div style={{ fontSize: '14px', color: 'var(--color-charcoal)', marginBottom: '16px' }}>
              {player.role} · <span className="jersey-tag">#{player.jerseyNumber}</span> · {player.team}
            </div>

            {/* Metrics with Oxanium */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>Index Rating</div>
                <div className="stat-number" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                  {player.stats.rating} <span style={{ fontSize: '13px', color: 'var(--color-ash)', fontWeight: 400 }}>/ 99</span>
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-mist)' }}></div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>Valuation</div>
                <div className="stat-number" style={{ fontSize: '24px', fontWeight: 700, color: 'var(--color-graphite)' }}>
                  {player.marketValueFormatted}
                </div>
              </div>
              <div style={{ width: '1px', height: '36px', backgroundColor: 'var(--color-mist)' }}></div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>Age</div>
                <div className="stat-number" style={{ fontSize: '22px', fontWeight: 600, color: 'var(--color-twilight)' }}>
                  {player.age} yrs
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Body */}
        <div style={{ padding: '32px' }}>
          {/* Biography */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-ash)',
              marginBottom: '10px'
            }}>
              Curator’s Evaluation
            </h4>
            <p style={{
              fontSize: '15px',
              lineHeight: 1.6,
              color: 'var(--color-charcoal)'
            }}>
              {player.bio}
            </p>
          </div>

          {/* Performance Metrics with Oxanium font */}
          <div style={{ marginBottom: '28px' }}>
            <h4 style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-ash)',
              marginBottom: '12px'
            }}>
              Career Performance Metrics
            </h4>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '12px',
              backgroundColor: 'var(--color-linen)',
              border: '1px solid var(--color-mist)',
              borderRadius: 'var(--radius-lg)',
              padding: '16px'
            }}>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  {player.stats.primaryStatLabel}
                </div>
                <div className="stat-number" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                  {player.stats.primaryStatValue}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  {player.stats.secondaryStatLabel}
                </div>
                <div className="stat-number" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                  {player.stats.secondaryStatValue}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  {player.stats.tertiaryStatLabel}
                </div>
                <div className="stat-number" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                  {player.stats.tertiaryStatValue}
                </div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: 'var(--color-ash)', textTransform: 'uppercase' }}>
                  Intl Caps
                </div>
                <div className="stat-number" style={{ fontSize: '20px', fontWeight: 600, color: 'var(--color-graphite)' }}>
                  {player.stats.caps}
                </div>
              </div>
            </div>
          </div>

          {/* Major Honors */}
          <div style={{ marginBottom: '32px' }}>
            <h4 style={{
              fontSize: '11px',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              color: 'var(--color-ash)',
              marginBottom: '12px'
            }}>
              Selected Honors & Titles
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {player.honors.map((honor, index) => (
                <span
                  key={index}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: 'var(--color-linen)',
                    border: '1px solid var(--color-mist)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '6px 12px',
                    fontSize: '13px',
                    color: 'var(--color-charcoal)'
                  }}
                >
                  <Trophy size={13} color="var(--color-signal-blue)" />
                  <span>{honor}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Footer actions */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '1px solid var(--color-mist)',
            paddingTop: '20px',
            flexWrap: 'wrap',
            gap: '12px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Button
                variant={isShortlisted ? "secondary" : "outline"}
                size="sm"
                onClick={() => onToggleShortlist(player)}
              >
                <Heart size={14} fill={isShortlisted ? '#c92a54' : 'none'} style={{ marginRight: '6px', color: isShortlisted ? '#c92a54' : 'inherit' }} />
                <span>{isShortlisted ? 'Shortlisted' : 'Shortlist'}</span>
              </Button>

              <Button
                variant={isComparing ? "signal" : "outline"}
                size="sm"
                onClick={() => onToggleCompare(player)}
              >
                <ArrowRightLeft size={14} style={{ marginRight: '6px' }} />
                <span>{isComparing ? 'Comparing' : 'Compare'}</span>
              </Button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>

              {isDrafted ? (
                <Button
                  variant="default"
                  onClick={() => onToggleDraft(player)}
                >
                  <Check size={16} style={{ marginRight: '6px', color: '#4ade80' }} />
                  <span>Drafted (Remove)</span>
                </Button>
              ) : (
                <Button
                  variant="signal"
                  onClick={() => onToggleDraft(player)}
                >
                  <Plus size={16} style={{ marginRight: '6px' }} />
                  <span>Draft Into Squad</span>
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
