import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SiteHeader from '../components/SiteHeader';
import { EMPRESA, URL_BACKOFFICE } from '../config';

describe('SiteHeader Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders official brand logo image', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const logoImg = screen.getByAltText('Max Global');
    expect(logoImg).toBeInTheDocument();
    expect(logoImg).toHaveAttribute('src', '/brand/logo-color-horizontal.png');
  });

  it('renders all main navigation links', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: /productos/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /packs/i })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: /nosotros/i })).toBeInTheDocument();
  });

  it('renders WhatsApp button with prefilled message in mobile menu and keeps desktop clean', async () => {
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    // En escritorio no hay botón de WhatsApp repetido
    expect(screen.queryByRole('link', { name: /hablar por whatsapp/i })).not.toBeInTheDocument();

    // En el menú móvil sí se mantiene
    const burger = screen.getByTestId('nav-burger');
    await user.click(burger);
    const waLink = screen.getByRole('link', { name: /hablar por whatsapp/i });
    expect(waLink).toBeInTheDocument();
    expect(waLink).toHaveAttribute('href', expect.stringContaining(`https://wa.me/${EMPRESA.whatsapp}`));
  });

  it('displays referral label when stored in sessionStorage', () => {
    sessionStorage.setItem('mg_ref', 'MG-00417');

    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    expect(screen.getByText('Te recomendó: MG-00417')).toBeInTheDocument();
  });

  it('renders Afíliate button in header linking to /registro', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const btn = screen.getByTestId('head-registro');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Afíliate');
    expect(btn).toHaveAttribute('href', '/registro');
  });

  it('renders Afíliate button visible without opening mobile burger menu', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const btn = screen.getByTestId('head-registro');
    expect(btn).toBeInTheDocument();
    // El drawer del menu movil no esta abierto
    expect(screen.queryByTestId('mobile-menu')).not.toBeInTheDocument();
  });

  it('renders secondary Ingresar button in desktop header', () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    const btn = screen.getByTestId('head-ingresar');
    expect(btn).toBeInTheDocument();
    expect(btn).toHaveTextContent('Ingresar');
    expect(btn).toHaveAttribute('target', '_blank');
    expect(btn).toHaveAttribute('rel', 'noopener noreferrer');
    expect(btn).toHaveAttribute('href', URL_BACKOFFICE);
  });

  it('renders Ingresar link in mobile menu drawer', async () => {
    render(
      <MemoryRouter>
        <SiteHeader />
      </MemoryRouter>
    );

    // Abrir menú móvil
    const burger = screen.getByTestId('nav-burger');
    await userEvent.setup().click(burger);

    const mobileLink = screen.getByTestId('mobile-nav-ingresar');
    expect(mobileLink).toBeInTheDocument();
    expect(mobileLink).toHaveTextContent('Ingresar');
    expect(mobileLink).toHaveAttribute('target', '_blank');
    expect(mobileLink).toHaveAttribute('href', URL_BACKOFFICE);
  });
});
