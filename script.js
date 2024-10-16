document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Generate the roadmap on page load
    generateGantt();
});

const data = [
    {
        type: "Proyecto",
        name: "App con Python | <i class='bi bi-person-fill'></i> | Profe: Jorge",
    },
    {
        type: "Proyecto",
        name: "Un CRUD | <i class='bi bi-people-fill'></i> | Profe: Alex",
        start: 4,
        end: 7,
    },
    {
        type: "Proyecto",
        name: "Web Scraping | <i class='bi bi-person-fill'></i> | Profe: Jorge",
        start: 8,
        end: 9,
    },
    {
        type: "Proyecto",
        name: "Datathon | <i class='bi bi-person-fill'></i> | Profe: Alex",
        start: 10,
        end: 10,
    },
    {
        type: "Proyecto",
        name: "Regresión de regresión (regresión lineal) | <i class='bi bi-person-fill'></i> | Profe: Jorge",
        start: 11,
        end: 14,
    },
    {
        type: "Proyecto",
        name: "Problema de clasificación (Regresión logística binaria) | <i class='bi bi-person-fill'></i> | Profe: Alex",
        start: 15,
        end: 16,
    },
    {
        type: "Proyecto",
        name: "Problema de clasificación (Regresión logística multiclase) | <i class='bi bi-people-fill'></i> | Profes: Jorge y Alex.",
        start: 17,
        end: 18,
    },
    {
        type: "Tema",
        name: "Introducción a programación (Terminal, Entornos de desarrollo (Pycharn, Jupyter, Colab, etc.), Python (Variables, funciones, gestor de paquetes, entorno virtual, etc.). SCRUM / VUCA).",
        start: 1,
        end: 1,
    },
    {
        type: "Tema",
        name: "Buenas prácticas (Programación funcional, OOP, Git, Docker, Testing).",
        start: 4,
        end: 4,
    },
    {
        type: "Tema",
        name: "BBDD (SQL, NoSQL, ORM/ODM) y Despliegue en producción (APIs Rest, Render, Azure).",
        start: 5,
        end: 5,
    },
    {
        type: "Tema",
        name: "Web Scraping (HTML, CSS, JS, Selenium, Scrapy, DOM)",
        start: 8,
        end: 8,
    },
    {
        type: "Tema",
        name: "Intro a Análisis exploratorio de Datos (EDA), pandas, numpy, scikitlearn, matplotlib.",
        start: 10,
        end: 10,
    },
    {
        type: "Tema",
        name: "Intro a mates y estadística (Derivadas, límites, métricas, distribuciones).",
        start: 11,
        end: 11,
    },
    {
        type: "Tema",
        name: "Intro a machine learning (Tipos de modelos) y regresión lineal (Modelos, entrenamiento, evaluación, regresión lineal).",
        start: 12,
        end: 12,
    },
    {
        type: "Tema",
        name: "Intro a modelo de clasificación binaria (Regresión logística, modelos, entrenamiento, evaluación).",
        start: 15,
        end: 15,
    },
    {
        type: "Tema",
        name: "Intro a modelo de clasificación multiclase y ajuste de modelo.",
        start: 17,
        end: 17,
    },
];

function generateGantt() {
    const weeks = document.getElementById("weeks").value;
    const table = document.getElementById("gantt-table");
    table.innerHTML = ""; // Clear table before regenerating

    // Create month header
    let monthHeaderRow = "<tr><th style='width:200px'></th>"; // Increased width for the first column

    for (let i = 1; i <= weeks; i += 4) {
        const month = Math.ceil(i / 4);
        monthHeaderRow += `<th colspan="4">Mes ${month}</th>`;
    }

    monthHeaderRow += "</tr>";
    table.innerHTML = monthHeaderRow;

    // Create week header
    let weekHeaderRow = "<tr><th>Elemento</th>";

    for (let i = 1; i <= weeks; i++) {
        weekHeaderRow += `<th>${i}</th>`;
    }

    weekHeaderRow += "</tr>";
    table.innerHTML += weekHeaderRow;

    let lastEnd = 0;

    // Create rows
    data.forEach((item) => {
        let colorClass = "";
        let iconoProject = '<i class="bi bi-briefcase-fill"></i>';
        let iconoTema = '<i class="bi bi-book-fill"></i>';
        let icon = '';

        if (item.type === "Proyecto") {
            colorClass = "proyecto";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconoProject;
        } else if (item.type === "Tema") {
            colorClass = "tema";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconoTema;
        }

        lastEnd =   item.end;

        let row = `<tr><td class="label ${colorClass}">${icon} ${item.name}</td>`;
        for (let i = 1; i <= weeks; i++) {
            if (i >= item.start && i <= item.end) {
                row += `<td class="block ${colorClass}"></td>`;
            } else {
                row += `<td class="empty"></td>`;
            }
        }
        row += "</tr>";
        table.innerHTML += row;
    });

    // Set a fixed width for the table
    table.style.width = `${weeks * 30 + 200}px`; // 30px per week + 200px for the first column
}
