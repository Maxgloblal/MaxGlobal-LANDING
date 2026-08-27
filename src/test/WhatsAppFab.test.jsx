import React from 'react';
import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import WhatsAppFab from '../components/WhatsAppFab';
import { EMPRESA } from '../config';

describe('WhatsAppFab Component', () => {
  beforeEach(() => {
    sessionStorage.clear();
  });

  it('renders floating action button with default message', () => {
    render(<WhatsAppFab />);

    const link = screen.getByRole('link', { name: /contactar por whatsapp/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute(
      'href',
      expect.stringContaining(`https://wa.me/${EMPRESA.whatsapp}`)
    );
  });

  it('includes referral in WhatsApp message when present', () => {
    sessionStorage.setItem('mg_ref', 'MG-99999');
    render(<WhatsAppFab />);

    const link = screen.getByRole('link', { name: /contactar por whatsapp/i });
    expect(link.getAttribute('href')).toContain(encodeURIComponent('Ref: MG-99999'));
  });
});
