// Compare Revolution JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Tool Database - All 33 Tools
    const tools = [
        // EXPOSÉ TOOLS (8)
        { id: 'chatgpt', name: 'ChatGPT', category: 'Exposé', icon: 'icons/tools/chatgpt.svg', price: 'ab €20/Monat', rating: 4.8, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': true, 'DSGVO-konform': false } },
        { id: 'jasper', name: 'Jasper AI', category: 'Exposé', icon: 'icons/tools/jasper.svg', price: 'ab €49/Monat', rating: 4.5, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': true, 'DSGVO-konform': false } },
        { id: 'copyai', name: 'Copy.ai', category: 'Exposé', icon: 'icons/tools/copyai.svg', price: 'ab €36/Monat', rating: 4.4, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': true, 'DSGVO-konform': false } },
        { id: 'writesonic', name: 'Writesonic', category: 'Exposé', icon: 'icons/tools/writesonic.svg', price: 'ab €19/Monat', rating: 4.3, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': true, 'DSGVO-konform': false } },
        { id: 'rytr', name: 'Rytr', category: 'Exposé', icon: 'icons/tools/rytr.svg', price: 'ab €9/Monat', rating: 4.2, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': false, 'Templates': true, 'DSGVO-konform': false } },
        { id: 'neuroflash', name: 'Neuroflash', category: 'Exposé', icon: 'icons/tools/neuroflash.svg', price: 'ab €29/Monat', rating: 4.4, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': true, 'DSGVO-konform': true } },
        { id: 'claude', name: 'Claude', category: 'Exposé', icon: 'icons/tools/claude.svg', price: 'ab €20/Monat', rating: 4.7, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': false, 'DSGVO-konform': false } },
        { id: 'anyword', name: 'Anyword', category: 'Exposé', icon: 'icons/tools/anyword.svg', price: 'ab €39/Monat', rating: 4.3, features: { 'Exposé-Erstellung': true, 'SEO-Optimierung': true, 'Mehrsprachig': true, 'API-Zugang': true, 'Templates': true, 'DSGVO-konform': false } },

        // FOTO TOOLS (6)
        { id: 'photoroom', name: 'Photoroom', category: 'Foto', icon: 'icons/tools/photoroom.svg', price: 'ab €9/Monat', rating: 4.6, features: { 'Hintergrund entfernen': true, 'Bildoptimierung': true, 'Batch-Verarbeitung': true, 'API-Zugang': true, 'Cloud-Speicher': true, 'KI-Upscaling': true } },
        { id: 'lightroom', name: 'Lightroom AI', category: 'Foto', icon: 'icons/tools/lightroom.svg', price: 'ab €12/Monat', rating: 4.7, features: { 'Hintergrund entfernen': true, 'Bildoptimierung': true, 'Batch-Verarbeitung': true, 'API-Zugang': false, 'Cloud-Speicher': true, 'KI-Upscaling': true } },
        { id: 'topaz', name: 'Topaz Photo AI', category: 'Foto', icon: 'icons/tools/topaz.svg', price: '€199 einmalig', rating: 4.8, features: { 'Hintergrund entfernen': false, 'Bildoptimierung': true, 'Batch-Verarbeitung': true, 'API-Zugang': false, 'Cloud-Speicher': false, 'KI-Upscaling': true } },
        { id: 'removebg', name: 'Remove.bg', category: 'Foto', icon: 'icons/tools/removebg.svg', price: 'ab €9/Monat', rating: 4.5, features: { 'Hintergrund entfernen': true, 'Bildoptimierung': false, 'Batch-Verarbeitung': true, 'API-Zugang': true, 'Cloud-Speicher': false, 'KI-Upscaling': false } },
        { id: 'luminar', name: 'Luminar AI', category: 'Foto', icon: 'icons/tools/luminar.svg', price: '€79 einmalig', rating: 4.4, features: { 'Hintergrund entfernen': true, 'Bildoptimierung': true, 'Batch-Verarbeitung': true, 'API-Zugang': false, 'Cloud-Speicher': false, 'KI-Upscaling': true } },
        { id: 'canva', name: 'Canva AI', category: 'Foto', icon: 'icons/tools/canva.svg', price: 'ab €12/Monat', rating: 4.6, features: { 'Hintergrund entfernen': true, 'Bildoptimierung': true, 'Batch-Verarbeitung': false, 'API-Zugang': true, 'Cloud-Speicher': true, 'KI-Upscaling': true } },

        // STAGING TOOLS (5)
        { id: 'boxbrownie', name: 'BoxBrownie', category: 'Staging', icon: 'icons/tools/boxbrownie.svg', price: 'ab €24/Foto', rating: 4.9, features: { 'Virtual Staging': true, '3D-Rendering': true, 'Möbel-Bibliothek': true, 'Schnelle Lieferung': true, 'Renovierungs-Vorschau': true, 'API-Zugang': false } },
        { id: 'virtualstaging', name: 'Virtual Staging AI', category: 'Staging', icon: 'icons/tools/virtualstaging.svg', price: 'ab €16/Foto', rating: 4.7, features: { 'Virtual Staging': true, '3D-Rendering': false, 'Möbel-Bibliothek': true, 'Schnelle Lieferung': true, 'Renovierungs-Vorschau': false, 'API-Zugang': true } },
        { id: 'styldod', name: 'Styldod', category: 'Staging', icon: 'icons/tools/styldod.svg', price: 'ab €16/Foto', rating: 4.5, features: { 'Virtual Staging': true, '3D-Rendering': true, 'Möbel-Bibliothek': true, 'Schnelle Lieferung': true, 'Renovierungs-Vorschau': true, 'API-Zugang': false } },
        { id: 'rooomy', name: 'Rooomy', category: 'Staging', icon: 'icons/tools/rooomy.svg', price: 'ab €35/Foto', rating: 4.6, features: { 'Virtual Staging': true, '3D-Rendering': true, 'Möbel-Bibliothek': true, 'Schnelle Lieferung': false, 'Renovierungs-Vorschau': true, 'API-Zugang': true } },
        { id: 'applydesign', name: 'Apply Design', category: 'Staging', icon: 'icons/tools/applydesign.svg', price: 'ab €29/Foto', rating: 4.4, features: { 'Virtual Staging': true, '3D-Rendering': false, 'Möbel-Bibliothek': true, 'Schnelle Lieferung': true, 'Renovierungs-Vorschau': true, 'API-Zugang': false } },

        // LEADS TOOLS (7)
        { id: 'salesforce', name: 'Salesforce Einstein', category: 'Leads', icon: 'icons/tools/salesforce.svg', price: 'ab €75/Monat', rating: 4.6, features: { 'Lead-Scoring': true, 'CRM-Integration': true, 'E-Mail-Automation': true, 'Analytics': true, 'Multi-Channel': true, 'KI-Prognosen': true } },
        { id: 'hubspot', name: 'HubSpot AI', category: 'Leads', icon: 'icons/tools/hubspot.svg', price: 'ab €45/Monat', rating: 4.5, features: { 'Lead-Scoring': true, 'CRM-Integration': true, 'E-Mail-Automation': true, 'Analytics': true, 'Multi-Channel': true, 'KI-Prognosen': true } },
        { id: 'apollo', name: 'Apollo.io', category: 'Leads', icon: 'icons/tools/apollo.svg', price: 'ab €49/Monat', rating: 4.4, features: { 'Lead-Scoring': true, 'CRM-Integration': true, 'E-Mail-Automation': true, 'Analytics': true, 'Multi-Channel': false, 'KI-Prognosen': true } },
        { id: 'linkedin', name: 'LinkedIn Sales Nav', category: 'Leads', icon: 'icons/tools/linkedin.svg', price: 'ab €80/Monat', rating: 4.5, features: { 'Lead-Scoring': true, 'CRM-Integration': true, 'E-Mail-Automation': false, 'Analytics': true, 'Multi-Channel': false, 'KI-Prognosen': true } },
        { id: 'zapier', name: 'Zapier AI', category: 'Leads', icon: 'icons/tools/zapier.svg', price: 'ab €19/Monat', rating: 4.6, features: { 'Lead-Scoring': false, 'CRM-Integration': true, 'E-Mail-Automation': true, 'Analytics': false, 'Multi-Channel': true, 'KI-Prognosen': false } },
        { id: 'pipedrive', name: 'Pipedrive', category: 'Leads', icon: 'icons/tools/pipedrive.svg', price: 'ab €15/Monat', rating: 4.4, features: { 'Lead-Scoring': true, 'CRM-Integration': true, 'E-Mail-Automation': true, 'Analytics': true, 'Multi-Channel': false, 'KI-Prognosen': true } },
        { id: 'instantly', name: 'Instantly.ai', category: 'Leads', icon: 'icons/tools/instantly.svg', price: 'ab €37/Monat', rating: 4.5, features: { 'Lead-Scoring': true, 'CRM-Integration': true, 'E-Mail-Automation': true, 'Analytics': true, 'Multi-Channel': false, 'KI-Prognosen': true } },

        // VIDEO TOOLS (7)
        { id: 'matterport', name: 'Matterport', category: 'Video', icon: 'icons/tools/matterport.svg', price: 'ab €69/Monat', rating: 4.8, features: { '3D-Rundgänge': true, 'Video-Erstellung': true, 'KI-Avatare': false, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': true } },
        { id: 'descript', name: 'Descript', category: 'Video', icon: 'icons/tools/descript.svg', price: 'ab €12/Monat', rating: 4.6, features: { '3D-Rundgänge': false, 'Video-Erstellung': true, 'KI-Avatare': true, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': false } },
        { id: 'runway', name: 'Runway', category: 'Video', icon: 'icons/tools/runway.svg', price: 'ab €12/Monat', rating: 4.5, features: { '3D-Rundgänge': false, 'Video-Erstellung': true, 'KI-Avatare': false, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': false } },
        { id: 'synthesia', name: 'Synthesia', category: 'Video', icon: 'icons/tools/synthesia.svg', price: 'ab €22/Monat', rating: 4.7, features: { '3D-Rundgänge': false, 'Video-Erstellung': true, 'KI-Avatare': true, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': true } },
        { id: 'heygen', name: 'HeyGen', category: 'Video', icon: 'icons/tools/heygen.svg', price: 'ab €24/Monat', rating: 4.6, features: { '3D-Rundgänge': false, 'Video-Erstellung': true, 'KI-Avatare': true, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': false } },
        { id: 'invideo', name: 'InVideo AI', category: 'Video', icon: 'icons/tools/invideo.svg', price: 'ab €15/Monat', rating: 4.4, features: { '3D-Rundgänge': false, 'Video-Erstellung': true, 'KI-Avatare': false, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': false } },
        { id: 'capcut', name: 'CapCut AI', category: 'Video', icon: 'icons/tools/capcut.svg', price: 'Kostenlos', rating: 4.5, features: { '3D-Rundgänge': false, 'Video-Erstellung': true, 'KI-Avatare': false, 'Cloud-Hosting': true, 'Einbettung': true, 'Analytics': false } }
    ];

    // Category mapping
    const categoryMap = {
        'expose': 'Exposé',
        'foto': 'Foto',
        'staging': 'Staging',
        'leads': 'Leads',
        'video': 'Video'
    };

    // State
    let selectedTools = [null, null, null, null];
    let currentSlot = null;
    let currentCategory = 'all';

    // Elements
    const selectorSlots = document.querySelectorAll('.selector-slot');
    const toolPicker = document.getElementById('toolPicker');
    const pickerClose = document.getElementById('pickerClose');
    const pickerSearch = document.getElementById('pickerSearch');
    const pickerList = document.getElementById('pickerList');
    const pickerCats = document.querySelectorAll('.picker-cat');
    const comparisonSection = document.getElementById('comparisonSection');
    const comparisonTable = document.getElementById('comparisonTable');
    const resetBtn = document.getElementById('resetBtn');

    // Initialize
    renderPickerList();

    // Slot click handler
    selectorSlots.forEach((slot) => {
        slot.addEventListener('click', (e) => {
            const index = parseInt(slot.getAttribute('data-slot'));

            if (e.target.closest('.slot-remove')) {
                removeToolFromSlot(index);
                return;
            }

            currentSlot = index;
            showToolPicker();
        });
    });

    // Category filter
    pickerCats.forEach(cat => {
        cat.addEventListener('click', () => {
            pickerCats.forEach(c => c.classList.remove('active'));
            cat.classList.add('active');
            currentCategory = cat.getAttribute('data-cat');
            renderPickerList(pickerSearch.value);
        });
    });

    // Picker close
    pickerClose.addEventListener('click', hideToolPicker);

    // Picker search
    pickerSearch.addEventListener('input', (e) => {
        renderPickerList(e.target.value);
    });

    // Reset button
    resetBtn.addEventListener('click', resetComparison);

    // Render picker list
    function renderPickerList(searchQuery = '') {
        const query = searchQuery.toLowerCase().trim();

        const filteredTools = tools.filter(tool => {
            const matchesSearch = !query ||
                tool.name.toLowerCase().includes(query) ||
                tool.category.toLowerCase().includes(query);

            const matchesCategory = currentCategory === 'all' ||
                tool.category.toLowerCase() === categoryMap[currentCategory]?.toLowerCase();

            return matchesSearch && matchesCategory;
        });

        pickerList.innerHTML = filteredTools.map(tool => {
            const isSelected = selectedTools.some(t => t && t.id === tool.id);

            return `
                <div class="picker-item ${isSelected ? 'disabled' : ''}" data-tool-id="${tool.id}">
                    <div class="picker-item-icon">
                        <img src="${tool.icon}" alt="${tool.name}">
                    </div>
                    <div class="picker-item-info">
                        <div class="picker-item-name">${tool.name}</div>
                        <div class="picker-item-category">${tool.category}</div>
                    </div>
                </div>
            `;
        }).join('');

        // Add click handlers
        pickerList.querySelectorAll('.picker-item:not(.disabled)').forEach(item => {
            item.addEventListener('click', () => {
                const toolId = item.getAttribute('data-tool-id');
                selectTool(toolId);
            });
        });
    }

    // Show tool picker
    function showToolPicker() {
        toolPicker.classList.add('active');
        pickerSearch.value = '';
        pickerSearch.focus();
        renderPickerList();
    }

    // Hide tool picker
    function hideToolPicker() {
        toolPicker.classList.remove('active');
        currentSlot = null;
    }

    // Select tool
    function selectTool(toolId) {
        const tool = tools.find(t => t.id === toolId);
        if (!tool) return;

        selectedTools[currentSlot] = tool;
        updateSlot(currentSlot, tool);
        hideToolPicker();
        updateComparison();
    }

    // Remove tool from slot
    function removeToolFromSlot(index) {
        selectedTools[index] = null;
        const slot = document.querySelector(`.selector-slot[data-slot="${index}"]`);
        slot.classList.remove('filled');
        slot.innerHTML = `
            <div class="slot-empty">
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="8" x2="12" y2="16"></line>
                    <line x1="8" y1="12" x2="16" y2="12"></line>
                </svg>
                <p>${index < 2 ? 'Tool wählen' : 'Optional'}</p>
            </div>
        `;
        updateComparison();
    }

    // Update slot UI
    function updateSlot(index, tool) {
        const slot = document.querySelector(`.selector-slot[data-slot="${index}"]`);

        slot.classList.add('filled');
        slot.innerHTML = `
            <button class="slot-remove">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
            </button>
            <div class="slot-filled">
                <div class="slot-tool-icon">
                    <img src="${tool.icon}" alt="${tool.name}">
                </div>
                <div class="slot-tool-name">${tool.name}</div>
                <div class="slot-tool-category">${tool.category}</div>
            </div>
        `;
    }

    // Update comparison table
    function updateComparison() {
        const activeTools = selectedTools.filter(t => t !== null);

        if (activeTools.length < 2) {
            comparisonSection.style.display = 'none';
            return;
        }

        comparisonSection.style.display = 'block';

        // Get all unique features
        const allFeatures = [...new Set(activeTools.flatMap(t => Object.keys(t.features)))];

        // Generate table
        comparisonTable.innerHTML = `
            <table>
                <thead>
                    <tr>
                        <th>Funktion</th>
                        ${activeTools.map(tool => `
                            <th class="tool-header-cell">
                                <div class="tool-header-icon">
                                    <img src="${tool.icon}" alt="${tool.name}">
                                </div>
                                <div class="tool-header-name">${tool.name}</div>
                                <div class="tool-header-category">${tool.category}</div>
                            </th>
                        `).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Preis</td>
                        ${activeTools.map(tool => `
                            <td><div class="price-value">${tool.price}</div></td>
                        `).join('')}
                    </tr>
                    <tr>
                        <td>Bewertung</td>
                        ${activeTools.map(tool => {
                            const fullStars = Math.floor(tool.rating);
                            const stars = '★'.repeat(fullStars) + '☆'.repeat(5 - fullStars);

                            return `
                                <td>
                                    <div class="rating-stars">${stars}</div>
                                    <div class="rating-number">${tool.rating}</div>
                                </td>
                            `;
                        }).join('')}
                    </tr>
                    ${allFeatures.map(feature => `
                        <tr>
                            <td>${feature}</td>
                            ${activeTools.map(tool => `
                                <td>
                                    ${tool.features[feature]
                                        ? '<span class="feature-check">✓</span>'
                                        : '<span class="feature-cross">✕</span>'}
                                </td>
                            `).join('')}
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        `;

        // Smooth scroll to comparison
        setTimeout(() => {
            comparisonSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    }

    // Reset comparison
    function resetComparison() {
        selectedTools = [null, null, null, null];
        selectorSlots.forEach((slot) => {
            const index = parseInt(slot.getAttribute('data-slot'));
            removeToolFromSlot(index);
        });
        comparisonSection.style.display = 'none';

        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Close picker on outside click
    document.addEventListener('click', (e) => {
        if (toolPicker.classList.contains('active') &&
            !toolPicker.contains(e.target) &&
            !e.target.closest('.selector-slot')) {
            hideToolPicker();
        }
    });
});
