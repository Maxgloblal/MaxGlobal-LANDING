import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Nosotros from '../pages/Nosotros';
import { INSTITUCIONAL } from '../config';

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

  it('renders mision, vision, and valores from config (RF-180)', () => {
    render(
      <MemoryRouter>
        <Nosotros />
      </MemoryRouter>
    );

    expect(screen.getByText('Misión')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(INSTITUCIONAL.mision.slice(0, 30), 'i'))).toBeInTheDocument();
    expect(screen.getByText('Visión')).toBeInTheDocument();
    expect(screen.getByText(new RegExp(INSTITUCIONAL.vision.slice(0, 30), 'i'))).toBeInTheDocument();
    for (const val of INSTITUCIONAL.valores) {
      expect(screen.getByText(new RegExp(val.titulo, 'i'))).toBeInTheDocument();
    }
  });
});

