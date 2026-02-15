document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-btn');
    const mainContent = document.getElementById('main-content');

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
                <h2>Datos</h2>
                <p>Aquí se visualizarán los datos importantes en el futuro.</p>
                <div style="margin-top: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
                    <div style="background: #f0f4f8; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <h3 style="color: #0d4e6b; font-size: 2rem;">120</h3>
                        <p>Usuarios</p>
                    </div>
                    <div style="background: #f0f4f8; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <h3 style="color: #0d4e6b; font-size: 2rem;">85%</h3>
                        <p>Progreso</p>
                    </div>
                    <div style="background: #f0f4f8; padding: 1.5rem; border-radius: 8px; text-align: center;">
                        <h3 style="color: #0d4e6b; font-size: 2rem;">24/7</h3>
                        <p>Disponibilidad</p>
                    </div>
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
            }
        });
    });
});
