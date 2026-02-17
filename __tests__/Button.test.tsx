import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BtnPrimary } from '@/components/Button/Button';

/* ───────── Mock matchMedia ───────── */
const mockMatchMedia = (matches: boolean) => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query: string) => ({
            matches,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
};

describe('BtnPrimary', () => {
    beforeEach(() => {
        mockMatchMedia(false); // no reduced-motion
    });

    it('renders children', () => {
        render(<BtnPrimary>Klik Saya</BtnPrimary>);
        expect(screen.getByText('Klik Saya')).toBeInTheDocument();
    });

    it('calls onClick handler', () => {
        const handleClick = jest.fn();
        render(<BtnPrimary onClick={handleClick}>Klik</BtnPrimary>);

        fireEvent.click(screen.getByText('Klik'));
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('creates ripple element on click and removes it after animation', () => {
        render(<BtnPrimary>Ripple Test</BtnPrimary>);
        const btn = screen.getByText('Ripple Test');

        fireEvent.click(btn);

        const ripple = btn.querySelector('.ripple-effect');
        expect(ripple).toBeTruthy();
        expect(ripple?.getAttribute('aria-hidden')).toBe('true');

        // Simulate animation end
        if (ripple) {
            act(() => {
                fireEvent.animationEnd(ripple);
            });
        }

        expect(btn.querySelector('.ripple-effect')).toBeNull();
    });

    it('triggers ripple on keyboard activation (Enter)', () => {
        render(<BtnPrimary>Keyboard</BtnPrimary>);
        const btn = screen.getByText('Keyboard');

        // Focus the button
        btn.focus();
        fireEvent.keyDown(btn, { key: 'Enter' });

        const ripple = btn.querySelector('.ripple-effect');
        expect(ripple).toBeTruthy();
    });

    it('triggers ripple on keyboard activation (Space)', () => {
        render(<BtnPrimary>Space Test</BtnPrimary>);
        const btn = screen.getByText('Space Test');

        btn.focus();
        fireEvent.keyDown(btn, { key: ' ' });

        const ripple = btn.querySelector('.ripple-effect');
        expect(ripple).toBeTruthy();
    });

    it('does not create ripple when disabled', () => {
        render(<BtnPrimary disabled>Disabled</BtnPrimary>);
        const btn = screen.getByText('Disabled');

        fireEvent.click(btn);

        const ripple = btn.querySelector('.ripple-effect');
        expect(ripple).toBeNull();
    });

    it('does not create ripple when prefers-reduced-motion is active', () => {
        mockMatchMedia(true); // reduced-motion

        render(<BtnPrimary>No Motion</BtnPrimary>);
        const btn = screen.getByText('No Motion');

        fireEvent.click(btn);

        const ripple = btn.querySelector('.ripple-effect');
        expect(ripple).toBeNull();
    });

    it('sets aria-pressed when prop is provided', () => {
        render(<BtnPrimary pressed={true}>Toggle</BtnPrimary>);
        expect(screen.getByText('Toggle')).toHaveAttribute('aria-pressed', 'true');
    });

    it('applies variant classes', () => {
        const { container } = render(
            <BtnPrimary variant="outline">Outline</BtnPrimary>,
        );
        const btn = container.querySelector('button');
        expect(btn?.className).toContain('border-primary');
    });
});
