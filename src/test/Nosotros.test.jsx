import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nosotros from '../pages/Nosotros';

describe('Nosotros Page (P-06)', () => {
  it('renders hero title and subtitle', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByText('La empresa')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /max global corporation/i })).toBeInTheDocument();
  });

  it('renders company sections and contact cards', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /qué hacemos/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /nuestros valores/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /cómo llegar a nosotros/i })).toBeInTheDocument();
    expect(screen.getByText(/20615864014/)).toBeInTheDocument();
    expect(screen.getByText('contacto@maxglobaloficial.com')).toBeInTheDocument();
    expect(screen.getByTestId('btn-libro-reclamaciones')).toBeInTheDocument();
  });
});
