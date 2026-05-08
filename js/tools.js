// Tools Revolution JavaScript

document.addEventListener('DOMContentLoaded', () => {
    const filterPills = document.querySelectorAll('.filter-pill');
    const toolCards = document.querySelectorAll('.tool-card');

    // Fallback SVG für fehlende Tool-Icons
    const fallbackSVG = `data:image/svg+xml,%3Csvg width='48' height='48' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect width='48' height='48' rx='12' fill='%23161616' fill-opacity='0.1'/%3E%3Cpath d='M24 14L16 20V34H20V26H28V34H32V20L24 14Z' fill='%23161616' fill-opacity='0.4'/%3E%3C/svg%3E`;

    // Alle Tool-Icons durchgehen und Fallback setzen
    document.querySelectorAll('.tool-icon').forEach(img => {
        img.onerror = function() {
            this.src = fallbackSVG;
        };
    });

    filterPills.forEach(pill => {
        pill.addEventListener('click', () => {
            // Remove active from all pills
            filterPills.forEach(p => p.classList.remove('active'));
            // Add active to clicked pill
            pill.classList.add('active');

            const category = pill.getAttribute('data-category');

            // Filter cards with fade animation
            toolCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');

                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
});
