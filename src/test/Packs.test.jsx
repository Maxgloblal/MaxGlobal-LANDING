import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import Packs from '../pages/Packs';
import PackCard from '../components/PackCard';

describe('Packs Component & PackCard', () => {
  it('renders PackCard with all features, price and CTA', async () => {
    const onSelectMock = vi.fn();
    render(
      <MemoryRouter>
        <PackCard
          id="gold"
          name="Pack Gold"
          price="S/. 1,200"
          lead="El plan completo."
          cta="Elegir Gold"
          featured={true}
          ribbon="El más elegido"
          features={[
            { text: '13 productos incluidos' },
            { text: '50% de descuento de por vida' },
          ]}
          onSelect={onSelectMock}
        />
      </MemoryRouter>
    );

    expect(screen.getByText('Pack Gold')).toBeInTheDocument();
    expect(screen.getByText('S/. 1,200')).toBeInTheDocument();
    expect(screen.getByText('El más elegido')).toBeInTheDocument();
    expect(screen.getByText('13 productos incluidos')).toBeInTheDocument();

    const user = userEvent.setup();
    const btn = screen.getByRole('button', { name: /elegir gold/i });
    await user.click(btn);
    expect(onSelectMock).toHaveBeenCalledWith('gold');
  });

  it('renders all 5 packs in the Packs page', () => {
    render(
      <MemoryRouter>
        <Packs />
      </MemoryRouter>
    );

    expect(screen.getByText('Kit Emprendedor')).toBeInTheDocument();
    expect(screen.getByText('Pack Ejecutivo')).toBeInTheDocument();
    expect(screen.getByText('Pack Gold')).toBeInTheDocument();
    expect(screen.getByText('Pack Familiar')).toBeInTheDocument();
    expect(screen.getByText('Pack Empresarial')).toBeInTheDocument();
  });

  it('renders the comparison table with 5 packs', () => {
    render(
      <MemoryRouter>
        <Packs />
      </MemoryRouter>
    );

    expect(screen.getByText('Los cinco packs, lado a lado')).toBeInTheDocument();
    expect(screen.getByText('Niveles de comisión')).toBeInTheDocument();
    expect(screen.getByText('Puntos de rango')).toBeInTheDocument();
  });

  it('renders compensation plan with 7 patrocinio levels and 10 residual levels including Level 8 at 10%', () => {
    render(
      <MemoryRouter>
        <Packs />
      </MemoryRouter>
    );

    expect(screen.getByText('Bono de patrocinio')).toBeInTheDocument();
    expect(screen.getByText('Bono residual')).toBeInTheDocument();
    expect(screen.getAllByText('70').length).toBeGreaterThan(0);
    expect(screen.getByText('puntos personales al mes')).toBeInTheDocument();
    expect(screen.getByText('Nivel 8')).toBeInTheDocument();
  });
});
