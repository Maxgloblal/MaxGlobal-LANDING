import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import SiteFooter from '../components/SiteFooter';

import { EMPRESA, URL_BACKOFFICE } from '../config';

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

    const ingresarLink = screen.getByTestId('footer-link-ingresar');
    expect(ingresarLink).toBeInTheDocument();
    expect(ingresarLink).toHaveTextContent('Ingresar');
    expect(ingresarLink).toHaveAttribute('target', '_blank');
    expect(ingresarLink).toHaveAttribute('rel', 'noopener noreferrer');
    expect(ingresarLink).toHaveAttribute('href', URL_BACKOFFICE);
  });
});
