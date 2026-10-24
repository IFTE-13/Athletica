'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalItems: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  onItemsPerPageChange: (items: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalItems,
  itemsPerPage,
  onPageChange,
  onItemsPerPageChange
}) => {
  const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));

  if (totalItems === 0) return null;

  const startItem = (currentPage - 1) * itemsPerPage + 1;
  const endItem = Math.min(currentPage * itemsPerPage, totalItems);

  // Generate page numbers array
  const getPageNumbers = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '16px',
      marginTop: '36px',
      paddingTop: '20px',
      borderTop: '1px solid var(--color-mist)',
      fontSize: '13px',
      color: 'var(--color-ash)'
    }}>
      {/* Information & Per Page Selector */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <span>
          Showing <strong>{startItem}–{endItem}</strong> of <strong>{totalItems}</strong> athletes
        </span>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <span style={{ fontSize: '12px' }}>Per page:</span>
          <select
            value={itemsPerPage}
            onChange={(e) => onItemsPerPageChange(Number(e.target.value))}
            style={{
              backgroundColor: 'var(--color-linen)',
              border: '1px solid var(--color-mist)',
              borderRadius: '0px',
              padding: '3px 8px',
              fontSize: '12px',
              color: 'var(--color-charcoal)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value={8}>8</option>
            <option value={12}>12</option>
            <option value={16}>16</option>
            <option value={24}>24</option>
          </select>
        </div>
      </div>

      {/* Page Navigation Controls */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage <= 1}
          style={{ height: '32px', padding: '0 8px' }}
        >
          <ChevronLeft size={14} style={{ marginRight: '2px' }} />
          <span>Previous</span>
        </Button>

        {getPageNumbers().map((page) => {
          const isActive = page === currentPage;
          return (
            <button
              key={page}
              onClick={() => onPageChange(page)}
              style={{
                width: '32px',
                height: '32px',
                borderRadius: '0px',
                border: isActive ? '1px solid var(--color-signal-blue)' : '1px solid var(--color-mist)',
                backgroundColor: isActive ? 'rgba(65, 161, 207, 0.12)' : 'transparent',
                color: isActive ? 'var(--color-signal-blue)' : 'var(--color-charcoal)',
                fontSize: '13px',
                fontWeight: isActive ? 600 : 400,
                fontFamily: 'var(--font-oxanium)',
                cursor: 'pointer',
                transition: 'all 0.12s ease'
              }}
            >
              {page}
            </button>
          );
        })}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage >= totalPages}
          style={{ height: '32px', padding: '0 8px' }}
        >
          <span>Next</span>
          <ChevronRight size={14} style={{ marginLeft: '2px' }} />
        </Button>
      </div>
    </div>
  );
};
