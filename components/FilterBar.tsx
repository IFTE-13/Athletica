'use client';

import React from 'react';
import { FilterState, SportType } from '@/types/player';
import { NATIONS_LIST, FOOTBALL_ROLES, CRICKET_ROLES } from '@/data/players';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, LayoutGrid, Table, X, ArrowUpDown } from 'lucide-react';

interface FilterBarProps {
  filters: FilterState;
  onFilterChange: (newFilters: Partial<FilterState>) => void;
  onResetFilters: () => void;
  totalFilteredCount: number;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  totalFilteredCount
}) => {
  // Role options tailored to sport
  const roleOptions = React.useMemo(() => {
    if (filters.sport === 'football') return FOOTBALL_ROLES;
    if (filters.sport === 'cricket') return CRICKET_ROLES;
    return ['All Roles', ...FOOTBALL_ROLES.slice(1), ...CRICKET_ROLES.slice(1)];
  }, [filters.sport]);

  const hasActiveFilters = 
    filters.role !== 'All Roles' ||
    filters.nation !== 'All Nations' ||
    filters.tier !== 'All Tiers' ||
    filters.searchQuery.trim() !== '' ||
    filters.sport !== 'all' ||
    filters.maxPrice > 0 ||
    filters.minRating > 0;

  return (
    <div style={{
      backgroundColor: 'var(--color-paper)',
      border: '1px solid var(--color-mist)',
      borderRadius: '0px', // Boxy
      padding: '16px 20px',
      marginBottom: '24px'
    }}>
      {/* Row 1: Sport Selection + Search Bar + View Mode */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        marginBottom: '14px'
      }}>
        {/* Boxy Sport Tabs */}
        <div style={{ display: 'flex', gap: '0px' }}>
          {(['all', 'football', 'cricket'] as const).map((sportKey, idx) => {
            const isActive = filters.sport === sportKey;
            const label = sportKey === 'all' ? 'All Disciplines' : sportKey === 'football' ? '⚽ Football' : '🏏 Cricket';
            return (
              <button
                key={sportKey}
                onClick={() => onFilterChange({ sport: sportKey, role: 'All Roles' })}
                style={{
                  border: '1px solid var(--color-mist)',
                  borderLeft: idx > 0 ? 'none' : '1px solid var(--color-mist)',
                  borderRadius: '0px',
                  backgroundColor: isActive ? 'var(--color-twilight)' : 'var(--color-linen)',
                  color: isActive ? '#ffffff' : 'var(--color-charcoal)',
                  padding: '7px 14px',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 500,
                  cursor: 'pointer',
                  transition: 'background-color 0.12s ease'
                }}
              >
                {label}
              </button>
            );
          })}
        </div>

        {/* Search Bar with Flat Boxy Input */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          flex: '1',
          minWidth: '240px',
          maxWidth: '440px',
          position: 'relative'
        }}>
          <Search size={14} color="var(--color-ash)" style={{ position: 'absolute', left: '10px' }} />
          <input
            type="text"
            placeholder="Search athlete, club, or country..."
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ searchQuery: e.target.value })}
            className="editorial-input"
            style={{
              width: '100%',
              paddingLeft: '32px',
              paddingRight: '28px',
              height: '32px',
              fontSize: '12px'
            }}
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ searchQuery: '' })}
              style={{
                position: 'absolute',
                right: '8px',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--color-ash)',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              <X size={13} />
            </button>
          )}
        </div>

        {/* View Mode Toggle */}
        <div style={{ display: 'flex', gap: '0px' }}>
          <button
            onClick={() => onFilterChange({ viewMode: 'grid' })}
            title="Grid View"
            style={{
              border: '1px solid var(--color-mist)',
              borderRadius: '0px',
              backgroundColor: filters.viewMode === 'grid' ? 'var(--color-twilight)' : 'var(--color-linen)',
              color: filters.viewMode === 'grid' ? '#ffffff' : 'var(--color-ash)',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <LayoutGrid size={14} />
          </button>
          <button
            onClick={() => onFilterChange({ viewMode: 'table' })}
            title="Ledger Table View"
            style={{
              border: '1px solid var(--color-mist)',
              borderLeft: 'none',
              borderRadius: '0px',
              backgroundColor: filters.viewMode === 'table' ? 'var(--color-twilight)' : 'var(--color-linen)',
              color: filters.viewMode === 'table' ? '#ffffff' : 'var(--color-ash)',
              padding: '6px 10px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <Table size={14} />
          </button>
        </div>
      </div>

      {/* Row 2: Secondary Dropdown Filters */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '8px',
        paddingTop: '12px',
        borderTop: '1px solid var(--color-mist)'
      }}>
        {/* Nation */}
        <select
          value={filters.nation}
          onChange={(e) => onFilterChange({ nation: e.target.value })}
          style={{
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            padding: '5px 8px',
            fontSize: '12px',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '0px'
          }}
        >
          {NATIONS_LIST.map((nation) => (
            <option key={nation} value={nation}>{nation}</option>
          ))}
        </select>

        {/* Role */}
        <select
          value={filters.role}
          onChange={(e) => onFilterChange({ role: e.target.value })}
          style={{
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            padding: '5px 8px',
            fontSize: '12px',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '0px'
          }}
        >
          {roleOptions.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>

        {/* Tier */}
        <select
          value={filters.tier}
          onChange={(e) => onFilterChange({ tier: e.target.value })}
          style={{
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            padding: '5px 8px',
            fontSize: '12px',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '0px'
          }}
        >
          <option value="All Tiers">All Tiers</option>
          <option value="Legend">Legend</option>
          <option value="World Class">World Class</option>
          <option value="Elite">Elite</option>
          <option value="Rising Star">Rising Star</option>
        </select>

        {/* Max Valuation */}
        <select
          value={filters.maxPrice}
          onChange={(e) => onFilterChange({ maxPrice: Number(e.target.value) })}
          style={{
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            padding: '5px 8px',
            fontSize: '12px',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '0px'
          }}
        >
          <option value={0}>Price: Any</option>
          <option value={20000000}>≤ $20M</option>
          <option value={50000000}>≤ $50M</option>
          <option value={100000000}>≤ $100M</option>
          <option value={150000000}>≤ $150M</option>
        </select>

        {/* Min OVR */}
        <select
          value={filters.minRating}
          onChange={(e) => onFilterChange({ minRating: Number(e.target.value) })}
          style={{
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            padding: '5px 8px',
            fontSize: '12px',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '0px'
          }}
        >
          <option value={0}>Rating: Any</option>
          <option value={88}>≥ 88 OVR</option>
          <option value={90}>≥ 90 OVR</option>
          <option value={92}>≥ 92 OVR</option>
        </select>

        {/* Sort By */}
        <select
          value={filters.sortBy}
          onChange={(e) => onFilterChange({ sortBy: e.target.value as any })}
          style={{
            backgroundColor: 'var(--color-linen)',
            border: '1px solid var(--color-mist)',
            padding: '5px 8px',
            fontSize: '12px',
            color: 'var(--color-charcoal)',
            cursor: 'pointer',
            outline: 'none',
            borderRadius: '0px'
          }}
        >
          <option value="value-desc">Sort: Highest Valuation</option>
          <option value="value-asc">Sort: Lowest Valuation</option>
          <option value="rating-desc">Sort: Highest Rating</option>
          <option value="age-asc">Sort: Youngest</option>
          <option value="name-asc">Sort: Name (A-Z)</option>
        </select>
      </div>

      {/* Row 3: Active Filters & Count */}
      <div style={{
        marginTop: '10px',
        paddingTop: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '6px',
        fontSize: '12px',
        color: 'var(--color-ash)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
          <span><strong>{totalFilteredCount}</strong> athletes indexed</span>

          {filters.nation !== 'All Nations' && (
            <Badge variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>{filters.nation}</span>
              <X size={10} style={{ cursor: 'pointer' }} onClick={() => onFilterChange({ nation: 'All Nations' })} />
            </Badge>
          )}

          {filters.role !== 'All Roles' && (
            <Badge variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>{filters.role}</span>
              <X size={10} style={{ cursor: 'pointer' }} onClick={() => onFilterChange({ role: 'All Roles' })} />
            </Badge>
          )}

          {filters.tier !== 'All Tiers' && (
            <Badge variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>{filters.tier}</span>
              <X size={10} style={{ cursor: 'pointer' }} onClick={() => onFilterChange({ tier: 'All Tiers' })} />
            </Badge>
          )}

          {filters.maxPrice > 0 && (
            <Badge variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>≤ ${filters.maxPrice / 1000000}M</span>
              <X size={10} style={{ cursor: 'pointer' }} onClick={() => onFilterChange({ maxPrice: 0 })} />
            </Badge>
          )}

          {filters.minRating > 0 && (
            <Badge variant="secondary" style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              <span>≥ {filters.minRating} OVR</span>
              <X size={10} style={{ cursor: 'pointer' }} onClick={() => onFilterChange({ minRating: 0 })} />
            </Badge>
          )}
        </div>

        {hasActiveFilters && (
          <button
            onClick={onResetFilters}
            style={{
              border: 'none',
              background: 'transparent',
              color: 'var(--color-signal-blue)',
              cursor: 'pointer',
              fontSize: '11px',
              textDecoration: 'underline'
            }}
          >
            Reset Filters
          </button>
        )}
      </div>
    </div>
  );
};
