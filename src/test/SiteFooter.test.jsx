import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

describe('SiteFooter Component', () => {
  it('renders footer links and sections', () => {
    render(
      <MemoryRouter>
        <SiteFooter />
      </MemoryRouter>
    );

    expect(screen.getByText('Productos')).toBeInTheDocument();
    expect(screen.getByText('Afiliación')).toBeInTheDocument();
    expect(screen.getByText('Legal')).toBeInTheDocument();
    expect(screen.getByText(/Libro de Reclamaciones/i)).toBeInTheDocument();
    expect(screen.getByText(/© 2026 Max Global Corporation/i)).toBeInTheDocument();
  });
});
