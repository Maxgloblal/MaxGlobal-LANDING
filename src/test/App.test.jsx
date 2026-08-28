import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe('App Routing and Referral Handling', () => {
  beforeEach(() => {
    sessionStorage.clear();
    window.history.pushState({}, '', '/');
  });

  it('renders Portada on default route', () => {
    render(<App />);
    expect(screen.getByRole('heading', { name: /un negocio propio/i })).toBeInTheDocument();
  });

  it('navigates to Packs page when clicking link', async () => {
    render(<App />);
    const user = userEvent.setup();

    const packsLinks = screen.getAllByRole('link', { name: /packs/i });
    await user.click(packsLinks[0]);

    expect(screen.getByRole('heading', { name: /elige cómo quieres empezar/i })).toBeInTheDocument();
  });

  it('stores referral code in sessionStorage when URL contains ?ref=', () => {
    window.history.pushState({}, '', '/?ref=MG-00847');
    render(<App />);

    expect(sessionStorage.getItem('mg_ref')).toBe('MG-00847');
  });

  it('sets noindex on /registro route', () => {
    window.history.pushState({}, '', '/registro');
    render(<App />);

    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).not.toBeNull();
    expect(robots.getAttribute('content')).toBe('noindex, nofollow');
  });

  it('renders 404 NoEncontrado page on invalid route with noindex', () => {
    window.history.pushState({}, '', '/ruta-inexistente-123');
    render(<App />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /esta página no existe/i })).toBeInTheDocument();
    expect(screen.getByTestId('btn-404-home')).toBeInTheDocument();
    expect(screen.getByTestId('btn-404-productos')).toBeInTheDocument();

    const robots = document.querySelector('meta[name="robots"]');
    expect(robots).not.toBeNull();
    expect(robots.getAttribute('content')).toBe('noindex, nofollow');
  });
});
