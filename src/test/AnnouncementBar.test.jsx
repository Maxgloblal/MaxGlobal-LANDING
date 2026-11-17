import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import AnnouncementBar from '../components/AnnouncementBar';

describe('AnnouncementBar Component', () => {
  it('renders the 3 announcements in desktop container', () => {
    render(<AnnouncementBar />);

    const bar = screen.getByTestId('announcement-bar');
    expect(bar).toBeInTheDocument();

    const desktopContainer = screen.getByTestId('announcement-desktop');
    expect(desktopContainer).toBeInTheDocument();
    expect(desktopContainer).toHaveTextContent('Envíos a todo el Perú');
    expect(desktopContainer).toHaveTextContent('Descuento de por vida para socios');
    expect(desktopContainer).toHaveTextContent('Packs desde S/ 120');
  });

  it('renders the mobile container with the first announcement', () => {
    render(<AnnouncementBar />);

    const mobileContainer = screen.getByTestId('announcement-mobile');
    expect(mobileContainer).toBeInTheDocument();
    expect(mobileContainer).toHaveTextContent('Envíos a todo el Perú');
  });
});
