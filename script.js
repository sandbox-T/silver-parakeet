document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const mainContent = document.getElementById('main-content');
    const SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1iwudo1TF5uFhF0OvB1hAe8Wvs344CpWbsBLjX_IyWoY/export?format=csv';

    // Data for the pages
    const pages = {
        home: `
            <div class="welcome-banner fade-in">
                <h1>BIENVENIDO</h1>
                <p>Selecciona una opción del menú para comenzar.</p>
            </div>
        `,
        datos: `
            <div class="content-section fade-in">
                <h2>Datos en Tiempo Real</h2>
                <div id="data-container" class="data-grid">
                    <p>Cargando datos...</p>
                </div>
            </div>
        `,
        proximamente: `
            <div class="content-section fade-in">
                <h2>Próximamente</h2>
                <div style="text-align: center; padding: 3rem;">
                    <span style="font-size: 4rem; display: block; margin-bottom: 1rem;">🚧</span>
                    <h3>Estamos trabajando en nuevas funcionalidades</h3>
                    <p style="color: #666; margin-top: 1rem;">Vuelva pronto para ver las actualizaciones.</p>
                </div>
            </div>
        `
    };

    // Helper function to parse CSV line correctly (handling commas inside quotes would require regex, but simple split is ok for this data)
    function parseCSVLine(line) {
        return line.split(',');
    }

    async function fetchAndRenderData() {
        const container = document.getElementById('data-container');
        if (!container) return;

        try {
            const response = await fetch(SHEET_CSV_URL);
            const data = await response.text();

            // Split by new line and filter empty lines
            const rows = data.split('\n').filter(row => row.trim() !== '');

            // Allow header to be skipped if needed, but we'll use it for labels
            const headers = parseCSVLine(rows[0]);
            const bodyRows = rows.slice(1);

            container.innerHTML = ''; // Clear loading text

            if (bodyRows.length === 0) {
                container.innerHTML = '<p>No hay datos disponibles.</p>';
                return;
            }

            bodyRows.forEach(row => {
                const cols = parseCSVLine(row);

                // Create Card
                const card = document.createElement('div');
                card.className = 'data-card';

                // Create Inner Grid
                const innerGrid = document.createElement('div');
                innerGrid.className = 'card-inner-grid';

                // Create 5 Rectangles (for the first 5 columns)
                for (let i = 0; i < 5; i++) {
                    const item = document.createElement('div');
                    item.className = 'card-item';

                    // Add label and content
                    const label = headers[i] ? headers[i].trim() : `Columna ${i + 1}`;
                    const content = cols[i] ? cols[i].trim() : '-';

                    item.innerHTML = `
                        <small>${label}</small>
                        <span>${content}</span>
                    `;

                    innerGrid.appendChild(item);
                }

                card.appendChild(innerGrid);
                container.appendChild(card);
            });

        } catch (error) {
            console.error('Error fetching data:', error);
            container.innerHTML = `<p style="color: red;">Error al cargar los datos: ${error.message}</p>`;
        }
    }

    // Event Listeners for Navigation
    navButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            navButtons.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            // Update content
            const target = btn.getAttribute('data-target');
            if (pages[target]) {
                mainContent.innerHTML = pages[target];

                // Special handling for 'datos' page
                if (target === 'datos') {
                    fetchAndRenderData();
                }
            }
        });
    });
});
