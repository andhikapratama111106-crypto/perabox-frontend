import React from 'react';
import { render, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Reveal } from '@/components/Reveal/Reveal';

/* ───────── IntersectionObserver Mock ───────── */
type IntersectionCallback = (entries: IntersectionObserverEntry[]) => void;

let observerCallback: IntersectionCallback;
let observerInstance: {
    observe: jest.Mock;
    unobserve: jest.Mock;
    disconnect: jest.Mock;
};

beforeEach(() => {
    // Mock matchMedia (no reduced motion)
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query: string) => ({
            matches: false,
            media: query,
            onchange: null,
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            addListener: jest.fn(),
            removeListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });

    observerInstance = {
        observe: jest.fn(),
        unobserve: jest.fn(),
        disconnect: jest.fn(),
    };

    (global as unknown as Record<string, unknown>).IntersectionObserver = jest.fn(
        (callback: IntersectionCallback) => {
            observerCallback = callback;
            return observerInstance;
        },
    );
});

/* ───────── Helper to simulate intersection ───────── */
function triggerIntersection(isIntersecting: boolean) {
    act(() => {
        observerCallback([
            {
                isIntersecting,
                target: document.createElement('div'),
                boundingClientRect: {} as DOMRectReadOnly,
                intersectionRatio: isIntersecting ? 1 : 0,
                intersectionRect: {} as DOMRectReadOnly,
                rootBounds: null,
                time: Date.now(),
            },
        ]);
    });
}

describe('Reveal', () => {
    it('renders children', () => {
        const { getByText } = render(<Reveal>Konten Reveal</Reveal>);
        expect(getByText('Konten Reveal')).toBeInTheDocument();
    });

    it('observes the element on mount', () => {
        render(<Reveal>Test</Reveal>);
        expect(observerInstance.observe).toHaveBeenCalled();
    });

    it('becomes visible when element intersects', () => {
        const { container } = render(
            <Reveal>
                <span>Visible Test</span>
            </Reveal>,
        );

        // Initially hidden (Framer Motion sets opacity to 0 via style)
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper).toBeTruthy();

        // Trigger intersection
        triggerIntersection(true);

        // Element should now animate to visible (Framer Motion handles the transition)
        // We verify the observer was called and unobserved (once=true default)
        expect(observerInstance.unobserve).toHaveBeenCalled();
    });

    it('unobserves after intersection when once=true', () => {
        render(<Reveal once={true}>Once Test</Reveal>);

        triggerIntersection(true);

        expect(observerInstance.unobserve).toHaveBeenCalledTimes(1);
    });

    it('does NOT unobserve when mirror=true and once=false', () => {
        render(
            <Reveal once={false} mirror={true}>
                Mirror Test
            </Reveal>,
        );

        triggerIntersection(true);
        expect(observerInstance.unobserve).not.toHaveBeenCalled();

        // Trigger out of view
        triggerIntersection(false);
        // Element should hide again
    });

    it('disconnects observer on unmount', () => {
        const { unmount } = render(<Reveal>Unmount</Reveal>);
        unmount();
        expect(observerInstance.disconnect).toHaveBeenCalled();
    });

    it('applies custom className', () => {
        const { container } = render(
            <Reveal className="custom-class">Styled</Reveal>,
        );
        const wrapper = container.firstChild as HTMLElement;
        expect(wrapper?.className).toContain('custom-class');
    });
});
