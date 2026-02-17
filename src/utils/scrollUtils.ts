export const customSmoothScroll = (targetId: string) => {
    const targetElement = document.querySelector(targetId);
    if (!targetElement) return;

    const navbarHeight = 80; // Adjust based on your actual navbar height
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    const duration = 2500; // Even slower duration for premium feel
    let start: number | null = null;

    const step = (timestamp: number) => {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        // Easing function: easeInOutCubic
        const easing = percentage < 0.5
            ? 4 * percentage * percentage * percentage
            : 1 - Math.pow(-2 * percentage + 2, 3) / 2;

        window.scrollTo(0, startPosition + distance * easing);

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    };

    window.requestAnimationFrame(step);
};
