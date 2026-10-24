'use client';

import React, { useState } from 'react';
import { Player } from '@/types/player';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Plus, Check, Eye, Heart, ArrowRightLeft } from 'lucide-react';

interface PlayerCardProps {
  player: Player;
  isDrafted: boolean;
  isShortlisted: boolean;
  isComparing: boolean;
  onToggleDraft: (player: Player) => void;
  onToggleShortlist: (player: Player) => void;
  onToggleCompare: (player: Player) => void;
  onOpenDossier: (player: Player) => void;
}

export const PlayerCard: React.FC<PlayerCardProps> = ({
  player,
  isDrafted,
  isShortlisted,
  isComparing,
  onToggleDraft,
  onToggleShortlist,
  onToggleCompare,
  onOpenDossier
}) => {
  const [imageError, setImageError] = useState(false);

  const getTierVariant = (tier: string) => {
    switch (tier) {
      case 'Legend': return 'legend';
      case 'World Class': return 'worldClass';
      case 'Elite': return 'elite';
      default: return 'risingStar';
    }
  };

  return (
    <article
      className="content-card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: '100%',
        borderRadius: '0px' // Boxy feel
      }}
    >
      {/* Top Media & Identification Area */}
      <div style={{
        position: 'relative',
        height: '210px',
        backgroundColor: 'var(--color-linen)',
        borderBottom: '1px solid var(--color-mist)',
        overflow: 'hidden',
        borderRadius: '0px'
      }}>
        {!imageError ? (
          <img
            src={player.image}
            alt={player.name}
            onError={() => setImageError(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center top'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'var(--color-linen)',
            color: 'var(--color-graphite)',
            fontFamily: 'var(--font-serif)',
            fontSize: '36px'
          }}>
            {player.name.charAt(0)}
          </div>
        )}

        {/* Top Badges: Nation Flag & Sport Pill */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span style={{
            backgroundColor: 'var(--color-paper)',
            border: '1px solid var(--color-mist)',
            borderRadius: '0px',
            padding: '2px 6px',
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-charcoal)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{player.flag}</span>
            <span>{player.nation}</span>
          </span>

          <Badge variant="secondary" style={{ textTransform: 'uppercase', fontSize: '10px' }}>
            {player.sport}
          </Badge>
        </div>

        {/* Top Right Quick Actions: Shortlist & OVR Badge */}
        <div style={{
          position: 'absolute',
          top: '10px',
          right: '10px',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          {/* Favorite Shortlist Heart */}
          <button
            onClick={() => onToggleShortlist(player)}
            title={isShortlisted ? "Remove from Shortlist" : "Add to Shortlist"}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '0px',
              backgroundColor: isShortlisted ? '#ffe4ea' : 'var(--color-paper)',
              border: isShortlisted ? '1px solid #e07a93' : '1px solid var(--color-mist)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: isShortlisted ? '#c92a54' : 'var(--color-ash)',
              transition: 'all 0.12s ease'
            }}
          >
            <Heart size={13} fill={isShortlisted ? '#c92a54' : 'none'} />
          </button>

          {/* OVR Rating Badge with Oxanium font */}
          <div style={{
            backgroundColor: 'var(--color-dusk)',
            borderRadius: '0px',
            color: '#ffffff',
            padding: '2px 6px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            lineHeight: 1
          }}>
            <span style={{ fontSize: '8px', color: 'var(--color-fog)', letterSpacing: '0.04em' }}>OVR</span>
            <span className="stat-number" style={{ fontSize: '15px', fontWeight: 700 }}>{player.stats.rating}</span>
          </div>
        </div>

        {/* Bottom Banner on Image: Tier */}
        <div style={{ position: 'absolute', bottom: '8px', left: '10px' }}>
          <Badge variant={getTierVariant(player.tier)}>
            {player.tier}
          </Badge>
        </div>
      </div>

      {/* Content Body */}
      <div style={{
        padding: '14px',
        display: 'flex',
        flexDirection: 'column',
        flex: 1
      }}>
        {/* Name and Club */}
        <div style={{ marginBottom: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
            <h3
              onClick={() => onOpenDossier(player)}
              className="serif-lead"
              style={{
                fontSize: '19px',
                cursor: 'pointer',
                transition: 'color 0.12s ease'
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--color-signal-blue)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--color-graphite)')}
            >
              {player.name}
            </h3>
            <span className="jersey-tag" style={{ fontSize: '12px', color: 'var(--color-ash)' }}>
              #{player.jerseyNumber}
            </span>
          </div>

          <div style={{
            fontSize: '11px',
            color: 'var(--color-ash)',
            marginTop: '2px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            <span>{player.role}</span>
            <span>·</span>
            <span>{player.team}</span>
          </div>
        </div>

        {/* Short Editorial Bio */}
        <p style={{
          fontSize: '12px',
          lineHeight: 1.45,
          color: 'var(--color-charcoal)',
          marginBottom: '12px',
          flex: 1,
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden'
        }}>
          {player.bio}
        </p>

        {/* Primary Stats Grid with Oxanium font */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '6px',
          padding: '6px 8px',
          backgroundColor: 'var(--color-linen)',
          borderRadius: '0px',
          border: '1px solid var(--color-mist)',
          marginBottom: '12px',
          textAlign: 'center'
        }}>
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-ash)', letterSpacing: '0.04em' }}>
              {player.stats.primaryStatLabel}
            </div>
            <div className="stat-number" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-graphite)' }}>
              {player.stats.primaryStatValue}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-ash)', letterSpacing: '0.04em' }}>
              {player.stats.secondaryStatLabel}
            </div>
            <div className="stat-number" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-graphite)' }}>
              {player.stats.secondaryStatValue}
            </div>
          </div>
          <div>
            <div style={{ fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-ash)', letterSpacing: '0.04em' }}>
              Age
            </div>
            <div className="stat-number" style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-graphite)' }}>
              {player.age} yrs
            </div>
          </div>
        </div>

        {/* Bottom Area: Market Valuation & Actions */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '10px',
          borderTop: '1px solid var(--color-mist)',
          marginTop: 'auto'
        }}>
          <div>
            <div style={{ fontSize: '9px', color: 'var(--color-ash)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Valuation
            </div>
            <div className="stat-number" style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-graphite)' }}>
              {player.marketValueFormatted}
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {/* Compare Button */}
            <Button
              variant={isComparing ? "signal" : "outline"}
              size="icon"
              onClick={() => onToggleCompare(player)}
              title={isComparing ? "Selected for comparison" : "Compare athlete"}
              style={{ width: '28px', height: '28px' }}
            >
              <ArrowRightLeft size={13} />
            </Button>

            {/* Dossier Button */}
            <Button
              variant="outline"
              size="icon"
              onClick={() => onOpenDossier(player)}
              title="Inspect Dossier"
              style={{ width: '28px', height: '28px' }}
            >
              <Eye size={13} />
            </Button>

            {/* Draft / Drafted Action */}
            {isDrafted ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onToggleDraft(player)}
                style={{ fontSize: '11px', height: '28px', padding: '0 8px' }}
              >
                <Check size={12} style={{ marginRight: '3px', color: '#4ade80' }} />
                <span>Drafted</span>
              </Button>
            ) : (
              <Button
                variant="signal"
                size="sm"
                onClick={() => onToggleDraft(player)}
                style={{ fontSize: '11px', height: '28px', padding: '0 8px' }}
              >
                <Plus size={12} style={{ marginRight: '3px' }} />
                <span>Draft</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
