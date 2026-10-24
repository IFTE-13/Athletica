'use client';

import React, { useState, useMemo, useEffect, useRef } from 'react';
import { PLAYERS_DATABASE } from '@/data/players';
import { Player, FilterState, SportType } from '@/types/player';
import { Header } from '@/components/Header';
import { StatsBar } from '@/components/StatsBar';
import { FilterBar } from '@/components/FilterBar';
import { PlayerCard } from '@/components/PlayerCard';
import { PlayerTableView } from '@/components/PlayerTableView';
import { Pagination } from '@/components/Pagination';
import { PlayerModal } from '@/components/PlayerModal';
import { CompareModal } from '@/components/CompareModal';
import { RosterSheet } from '@/components/RosterSheet';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, X } from 'lucide-react';

const DEFAULT_SALARY_CAP = 500000000; // $500M default

export default function Home() {
  const [salaryCap, setSalaryCap] = useState<number>(DEFAULT_SALARY_CAP);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [itemsPerPage, setItemsPerPage] = useState<number>(12);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const [filters, setFilters] = useState<FilterState>({
    sport: 'all',
    role: 'All Roles',
    nation: 'All Nations',
    tier: 'All Tiers',
    searchQuery: '',
    sortBy: 'value-desc',
    viewMode: 'grid',
    listTab: 'all',
    maxPrice: 0,
    minRating: 0
  });

  // Separate drafts for Football and Cricket (Cannot be drafted together!)
  const [footballSquad, setFootballSquad] = useState<Player[]>([]);
  const [cricketSquad, setCricketSquad] = useState<Player[]>([]);
  const [shortlistedPlayerIds, setShortlistedPlayerIds] = useState<Set<string>>(new Set(['fb-01', 'ck-01']));

  const [comparingPlayers, setComparingPlayers] = useState<[Player | null, Player | null]>([null, null]);
  const [selectedDossierPlayer, setSelectedDossierPlayer] = useState<Player | null>(null);
  const [isRosterSheetOpen, setIsRosterSheetOpen] = useState(false);
  const [rosterSheetTab, setRosterSheetTab] = useState<'football' | 'cricket' | 'shortlist'>('football');
  const [isCompareModalOpen, setIsCompareModalOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const registryRef = useRef<HTMLDivElement>(null);

  // Initialize with initial players into their respective squads
  useEffect(() => {
    const initFb = PLAYERS_DATABASE.filter(p => p.id === 'fb-01');
    const initCk = PLAYERS_DATABASE.filter(p => p.id === 'ck-01');
    setFootballSquad(initFb);
    setCricketSquad(initCk);

    // Dark mode preference detection
    const savedTheme = localStorage.getItem('athletica_theme');
    if (savedTheme === 'dark' || (!savedTheme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setIsDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => {
      const next = !prev;
      if (next) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('athletica_theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('athletica_theme', 'light');
      }
      return next;
    });
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2400);
  };

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
    setCurrentPage(1); // Reset page on filter change
  };

  const handleResetFilters = () => {
    setFilters({
      sport: 'all',
      role: 'All Roles',
      nation: 'All Nations',
      tier: 'All Tiers',
      searchQuery: '',
      sortBy: 'value-desc',
      viewMode: filters.viewMode,
      listTab: 'all',
      maxPrice: 0,
      minRating: 0
    });
    setCurrentPage(1);
    showToast('Filters reset.');
  };

  // Salary cap adjusters
  const handleIncreaseSalaryCap = (amount: number) => {
    setSalaryCap(prev => {
      const next = prev + amount;
      showToast(`Salary cap: $${(next / 1000000).toFixed(0)}M`);
      return next;
    });
  };

  const handleDecreaseSalaryCap = (amount: number) => {
    setSalaryCap(prev => {
      const next = Math.max(100000000, prev - amount);
      showToast(`Salary cap: $${(next / 1000000).toFixed(0)}M`);
      return next;
    });
  };

  const handleSetSalaryCap = (amount: number) => {
    setSalaryCap(amount);
    showToast(`Salary cap: $${amount >= 1000000000 ? `${amount / 1000000000}B` : `${amount / 1000000}M`}`);
  };

  // Separate Drafting Logic for Football vs Cricket
  const handleToggleDraft = (player: Player) => {
    if (player.sport === 'football') {
      setFootballSquad(prev => {
        const exists = prev.some(p => p.id === player.id);
        if (exists) {
          showToast(`Removed ${player.name} from Football squad.`);
          return prev.filter(p => p.id !== player.id);
        } else {
          if (prev.length >= 11) {
            showToast('Football squad full (max 11). Remove a footballer first.');
            return prev;
          }
          showToast(`Drafted ${player.name} into Football squad.`);
          return [...prev, player];
        }
      });
    } else {
      setCricketSquad(prev => {
        const exists = prev.some(p => p.id === player.id);
        if (exists) {
          showToast(`Removed ${player.name} from Cricket squad.`);
          return prev.filter(p => p.id !== player.id);
        } else {
          if (prev.length >= 11) {
            showToast('Cricket squad full (max 11). Remove a cricketer first.');
            return prev;
          }
          showToast(`Drafted ${player.name} into Cricket squad.`);
          return [...prev, player];
        }
      });
    }
  };

  // Auto-Draft for Football
  const handleAutoDraftFootball = () => {
    const picks = PLAYERS_DATABASE.filter(p => p.sport === 'football').slice(0, 11);
    setFootballSquad(picks);
    showToast('⚡ Auto-Drafted 11-player Football squad!');
    setRosterSheetTab('football');
    setIsRosterSheetOpen(true);
  };

  // Auto-Draft for Cricket
  const handleAutoDraftCricket = () => {
    const picks = PLAYERS_DATABASE.filter(p => p.sport === 'cricket').slice(0, 11);
    setCricketSquad(picks);
    showToast('⚡ Auto-Drafted 11-player Cricket squad!');
    setRosterSheetTab('cricket');
    setIsRosterSheetOpen(true);
  };

  // Shortlist toggle
  const handleToggleShortlist = (player: Player) => {
    setShortlistedPlayerIds(prev => {
      const next = new Set(prev);
      if (next.has(player.id)) {
        next.delete(player.id);
        showToast(`Removed ${player.name} from shortlist.`);
      } else {
        next.add(player.id);
        showToast(`Added ${player.name} to shortlist.`);
      }
      return next;
    });
  };

  // Compare toggle
  const handleToggleCompare = (player: Player) => {
    setComparingPlayers(prev => {
      const [first, second] = prev;
      if (first?.id === player.id) {
        showToast(`Removed ${player.name} from comparison.`);
        return [second, null];
      }
      if (second?.id === player.id) {
        showToast(`Removed ${player.name} from comparison.`);
        return [first, null];
      }
      if (!first) {
        showToast(`Selected ${player.name} (1/2) for comparison.`);
        return [player, null];
      }
      if (!second) {
        showToast(`Comparing ${first.name} vs ${player.name}.`);
        setIsCompareModalOpen(true);
        return [first, player];
      }
      // Replace second with new player
      showToast(`Comparing ${first.name} vs ${player.name}.`);
      setIsCompareModalOpen(true);
      return [first, player];
    });
  };

  const handleClearCompare = () => {
    setComparingPlayers([null, null]);
    setIsCompareModalOpen(false);
    showToast('Comparison cleared.');
  };

  // Sets for O(1) checks
  const allDraftedPlayerIds = useMemo(() => {
    const ids = new Set<string>();
    footballSquad.forEach(p => ids.add(p.id));
    cricketSquad.forEach(p => ids.add(p.id));
    return ids;
  }, [footballSquad, cricketSquad]);

  const comparingPlayerIds = useMemo(() => {
    const ids = new Set<string>();
    if (comparingPlayers[0]) ids.add(comparingPlayers[0].id);
    if (comparingPlayers[1]) ids.add(comparingPlayers[1].id);
    return ids;
  }, [comparingPlayers]);

  const shortlistedPlayersList = useMemo(() => {
    return PLAYERS_DATABASE.filter(p => shortlistedPlayerIds.has(p.id));
  }, [shortlistedPlayerIds]);

  // Filtered & Sorted players
  const filteredPlayers = useMemo(() => {
    return PLAYERS_DATABASE.filter(player => {
      // Primary list tab
      if (filters.listTab === 'shortlist' && !shortlistedPlayerIds.has(player.id)) {
        return false;
      }
      if (filters.listTab === 'squad' && !allDraftedPlayerIds.has(player.id)) {
        return false;
      }

      // Sport
      if (filters.sport !== 'all' && player.sport !== filters.sport) {
        return false;
      }
      // Nation
      if (filters.nation !== 'All Nations' && player.nation !== filters.nation) {
        return false;
      }
      // Role
      if (filters.role !== 'All Roles' && player.role !== filters.role) {
        return false;
      }
      // Tier
      if (filters.tier !== 'All Tiers' && player.tier !== filters.tier) {
        return false;
      }
      // Max Price
      if (filters.maxPrice > 0 && player.marketValue > filters.maxPrice) {
        return false;
      }
      // Min Rating
      if (filters.minRating > 0 && player.stats.rating < filters.minRating) {
        return false;
      }

      // Search query
      if (filters.searchQuery.trim() !== '') {
        const query = filters.searchQuery.toLowerCase().trim();
        const matchesName = player.name.toLowerCase().includes(query);
        const matchesTeam = player.team.toLowerCase().includes(query);
        const matchesNation = player.nation.toLowerCase().includes(query);
        const matchesRole = player.role.toLowerCase().includes(query);
        if (!matchesName && !matchesTeam && !matchesNation && !matchesRole) {
          return false;
        }
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'value-desc') {
        return b.marketValue - a.marketValue;
      }
      if (filters.sortBy === 'value-asc') {
        return a.marketValue - b.marketValue;
      }
      if (filters.sortBy === 'rating-desc') {
        return b.stats.rating - a.stats.rating;
      }
      if (filters.sortBy === 'age-asc') {
        return a.age - b.age;
      }
      if (filters.sortBy === 'name-asc') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });
  }, [filters, shortlistedPlayerIds, allDraftedPlayerIds]);

  // Paginated players
  const paginatedPlayers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredPlayers.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredPlayers, currentPage, itemsPerPage]);

  const totalMarketCapFormatted = useMemo(() => {
    const total = PLAYERS_DATABASE.reduce((acc, p) => acc + p.marketValue, 0);
    return `$${(total / 1000000000).toFixed(2)}B`;
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      {/* Centered Minimal Header with "Athletica" text only */}
      <Header
        footballCount={footballSquad.length}
        cricketCount={cricketSquad.length}
        shortlistCount={shortlistedPlayerIds.size}
        compareCount={comparingPlayerIds.size}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onOpenSheet={(tab) => {
          if (tab) setRosterSheetTab(tab);
          setIsRosterSheetOpen(true);
        }}
        onOpenCompareModal={() => setIsCompareModalOpen(true)}
      />

      <main style={{ flex: 1 }}>
        {/* Compact Stats Bar with interactive Salary Cap options */}
        <StatsBar
          totalAthletesCount={PLAYERS_DATABASE.length}
          totalMarketCapFormatted={totalMarketCapFormatted}
          salaryCap={salaryCap}
          onIncreaseSalaryCap={handleIncreaseSalaryCap}
          onDecreaseSalaryCap={handleDecreaseSalaryCap}
          onSetSalaryCap={handleSetSalaryCap}
          onAutoDraftFootball={handleAutoDraftFootball}
          onAutoDraftCricket={handleAutoDraftCricket}
        />

        {/* Directory Section */}
        <section ref={registryRef} style={{ paddingBottom: '48px' }}>
          <div className="container">
            {/* Redesigned Boxy Filter Section */}
            <FilterBar
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              totalFilteredCount={filteredPlayers.length}
            />

            {/* Display: Grid Cards vs Table Ledger */}
            {filters.viewMode === 'grid' ? (
              paginatedPlayers.length > 0 ? (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                  gap: '16px'
                }}>
                  {paginatedPlayers.map((player) => (
                    <PlayerCard
                      key={player.id}
                      player={player}
                      isDrafted={allDraftedPlayerIds.has(player.id)}
                      isShortlisted={shortlistedPlayerIds.has(player.id)}
                      isComparing={comparingPlayerIds.has(player.id)}
                      onToggleDraft={handleToggleDraft}
                      onToggleShortlist={handleToggleShortlist}
                      onToggleCompare={handleToggleCompare}
                      onOpenDossier={(p) => setSelectedDossierPlayer(p)}
                    />
                  ))}
                </div>
              ) : (
                <div style={{
                  padding: '48px 20px',
                  textAlign: 'center',
                  backgroundColor: 'var(--color-paper)',
                  border: '1px solid var(--color-mist)',
                  color: 'var(--color-ash)'
                }}>
                  <p style={{ fontSize: '14px', marginBottom: '8px' }}>
                    No athletes found matching your search and filter criteria.
                  </p>
                  <Button variant="signal" size="sm" onClick={handleResetFilters}>
                    Reset All Filters
                  </Button>
                </div>
              )
            ) : (
              <PlayerTableView
                players={paginatedPlayers}
                draftedPlayerIds={allDraftedPlayerIds}
                shortlistedPlayerIds={shortlistedPlayerIds}
                comparingPlayerIds={comparingPlayerIds}
                onToggleDraft={handleToggleDraft}
                onToggleShortlist={handleToggleShortlist}
                onToggleCompare={handleToggleCompare}
                onOpenDossier={(p) => setSelectedDossierPlayer(p)}
              />
            )}

            {/* Pagination Controls */}
            <Pagination
              currentPage={currentPage}
              totalItems={filteredPlayers.length}
              itemsPerPage={itemsPerPage}
              onPageChange={(page) => {
                setCurrentPage(page);
                registryRef.current?.scrollIntoView({ behavior: 'smooth' });
              }}
              onItemsPerPageChange={(items) => {
                setItemsPerPage(items);
                setCurrentPage(1);
              }}
            />
          </div>
        </section>
      </main>

      {/* Floating Compare Selection Dock if 1 player is chosen */}
      {comparingPlayers[0] && !comparingPlayers[1] && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-paper)',
          border: '1px solid var(--color-signal-blue)',
          boxShadow: 'var(--shadow-modal)',
          borderRadius: '0px',
          padding: '8px 14px',
          zIndex: 150,
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <span style={{ fontSize: '12px', color: 'var(--color-graphite)' }}>
            Comparing: <strong>{comparingPlayers[0].name}</strong> vs <em>Select 2nd Athlete...</em>
          </span>

          <Button
            variant="signal"
            size="sm"
            onClick={() => setIsCompareModalOpen(true)}
            style={{ height: '26px', padding: '0 8px', fontSize: '11px' }}
          >
            <ArrowRightLeft size={12} style={{ marginRight: '4px' }} />
            <span>Open Compare</span>
          </Button>

          <button
            onClick={handleClearCompare}
            title="Cancel Compare"
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              color: 'var(--color-ash)',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* Right Slide-over Sheet for Rosters & Shortlist */}
      <RosterSheet
        isOpen={isRosterSheetOpen}
        activeTab={rosterSheetTab}
        onTabChange={setRosterSheetTab}
        onClose={() => setIsRosterSheetOpen(false)}
        footballSquad={footballSquad}
        cricketSquad={cricketSquad}
        shortlist={shortlistedPlayersList}
        salaryCap={salaryCap}
        onIncreaseSalaryCap={handleIncreaseSalaryCap}
        onDecreaseSalaryCap={handleDecreaseSalaryCap}
        onRemoveFromFootballSquad={(id) => setFootballSquad(prev => prev.filter(p => p.id !== id))}
        onRemoveFromCricketSquad={(id) => setCricketSquad(prev => prev.filter(p => p.id !== id))}
        onClearFootballSquad={() => setFootballSquad([])}
        onClearCricketSquad={() => setCricketSquad([])}
        onToggleShortlist={handleToggleShortlist}
        onDraftFromShortlist={handleToggleDraft}
        onAutoDraftFootball={handleAutoDraftFootball}
        onAutoDraftCricket={handleAutoDraftCricket}
      />

      {/* Head-to-Head Compare Modal */}
      <CompareModal
        isOpen={isCompareModalOpen}
        playerA={comparingPlayers[0]}
        playerB={comparingPlayers[1]}
        onSelectPlayerA={(p) => setComparingPlayers(prev => [p, prev[1]])}
        onSelectPlayerB={(p) => setComparingPlayers(prev => [prev[0], p])}
        onClose={() => setIsCompareModalOpen(false)}
        onClearCompare={handleClearCompare}
        isDraftedA={comparingPlayers[0] ? allDraftedPlayerIds.has(comparingPlayers[0].id) : false}
        isDraftedB={comparingPlayers[1] ? allDraftedPlayerIds.has(comparingPlayers[1].id) : false}
        onToggleDraft={handleToggleDraft}
      />

      {/* Athlete Detail Dossier Modal */}
      <PlayerModal
        player={selectedDossierPlayer}
        onClose={() => setSelectedDossierPlayer(null)}
        isDrafted={selectedDossierPlayer ? allDraftedPlayerIds.has(selectedDossierPlayer.id) : false}
        isShortlisted={selectedDossierPlayer ? shortlistedPlayerIds.has(selectedDossierPlayer.id) : false}
        isComparing={selectedDossierPlayer ? comparingPlayerIds.has(selectedDossierPlayer.id) : false}
        onToggleDraft={handleToggleDraft}
        onToggleShortlist={handleToggleShortlist}
        onToggleCompare={handleToggleCompare}
      />

      {/* Floating Toast Notification */}
      {toastMessage && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: 'var(--color-twilight)',
          color: '#ffffff',
          padding: '8px 16px',
          border: '1px solid var(--color-mist)',
          borderRadius: '0px',
          boxShadow: 'var(--shadow-modal)',
          fontSize: '12px',
          fontWeight: 500,
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          gap: '6px'
        }}>
          <span>✦</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Boxy Footer (Without "The Global Sports Ledger") */}
      <Footer />
    </div>
  );
}
