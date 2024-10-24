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
        start: 1,
        end: 2,
    },
    {
        type: "Proyecto",
        name: "Un CRUD | <i class='bi bi-people-fill'></i> | Profe: Alex",
        start: 3,
        end: 5,
    },
    {
        type: "Proyecto",
        name: "Web Scraping | <i class='bi bi-person-fill'></i> | Profe: Jorge",
        start: 6,
        end: 7,
    },
    {
        type: "Proyecto",
        name: "Datathon | <i class='bi bi-person-fill'></i> | Profe: Alex y colaboradores externos",
        start: 8,
        end: 8,
    },
    {
        type: "Proyecto",
        name: "Proyecto de regresión (regresión lineal) | <i class='bi bi-person-fill'></i> | Profe: Jorge",
        start: 9,
        end: 12,
    },
    {
        type: "Proyecto",
        name: "Problema de clasificación (Regresión logística binaria y multiclase) | <i class='bi bi-person-fill'></i> | Profe: Alex",
        start: 13,
        end: 15,
    },
    {
        type: "Transición",
        name: "Transición flexible",
        start: 16,
        end: 19,
    },
    {
        type: "Proyecto",
        name: "Tracks (Data Analist, Data Engineer, AI Developer) | <i class='bi bi-people-fill'></i> | Profes: David y Jonnathan.",
        start: 20,
        end: 23,
    },
    {
        type: "Proyecto",
        name: "NLP (Youtube comments) | <i class='bi bi-people-fill'></i> | Profes: David y Jonnathan.",
        start: 24,
        end: 26,
    },
    {
        type: "Proyecto",
        name: "LLM (Rag + agentes) | <i class='bi bi-people-fill'></i> | Profes: David y Jonnathan.",
        start: 27,
        end: 29,
    },
    {
        type: "Proyecto",
        name: "Computer vision | <i class='bi bi-people-fill'></i> | Profes: David y Jonnathan.",
        start: 30,
        end: 32,
    },
    {
        type: "Proyecto",
        name: "Proyectos Finales | <i class='bi bi-people-fill'></i> | Profes: David y Jonnathan.",
        start: 33,
        end: 36,
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
        start: 3,
        end: 3,
    },
    {
        type: "Tema",
        name: "BBDD (SQL, NoSQL, ORM/ODM) y Despliegue en producción (APIs Rest, Render, Azure).",
        start: 4,
        end: 4,
    },
    {
        type: "Tema",
        name: "Web Scraping (HTML, CSS, JS, Selenium, Scrapy, DOM)",
        start: 6,
        end: 6,
    },
    {
        type: "Tema",
        name: "Intro a Análisis exploratorio de Datos (EDA), pandas, numpy, scikitlearn, matplotlib, visualización de datos.",
        start: 8,
        end: 8,
    },
    {
        type: "Tema",
        name: "Intro a mates y estadística (Derivadas, límites, métricas, distribuciones).",
        start: 9,
        end: 9,
    },
    {
        type: "Tema",
        name: "Intro a machine learning (Tipos de modelos) y regresión lineal (Modelos, entrenamiento, evaluación, regresión lineal).",
        start: 10,
        end: 10,
    },
    {
        type: "Tema",
        name: "Intro a modelo de clasificación binaria (Regresión logística, modelos, entrenamiento, evaluación).",
        start: 13,
        end: 13,
    },
    {
        type: "Tema",
        name: "Intro a modelo de clasificación multiclase y ajuste de modelo.",
        start: 14,
        end: 14,
    },
    {
        type: "Transición",
        name: "Transición flexible",
        start: 16,
        end: 19,
    },
    {
        type: "Tema",
        name: "Intro a los roles IA [Data Analist, Data Engineer, Data Scientist]",
        start: 20,
        end: 20,
    },
    {
        type: "Tema",
        name: "Intro a Spacy, NLTK, Word2Vec",
        start: 24,
        end: 24,
    },
    {
        type: "Tema",
        name: "Intro a Langchain, LLMs, Embedings, Vector DB.",
        start: 27,
        end: 27,
    },
    {
        type: "Tema",
        name: "Intro a OpenCV, YoloV11.",
        start: 30,
        end: 30,
    },
];

function generateGantt() {
    const weeks = document.getElementById("weeks").value;
    const table = document.getElementById("gantt-table");
    table.innerHTML = ""; // Clear table before regenerating

    // Create period header row with colspan for the periods
    let periodHeaderRow = "<tr><th>Periodo</th>"; // Header for periods

    // Define the periods and their week ranges
    const periods = [
        { name: "The Field", start: 1, end: 7 },
        { name: "The Hill", start: 8, end: 15 },
        { name: "The Mountain", start: 17, end: 24 },
        { name: "The Peak", start: 24, end: 32 },
        { name: "The Valley", start: 33, end: 36 },
    ];

    // Create the period header row with correct colspan
    periods.forEach(period => {
        let colspan = period.end - period.start + 1;
        periodHeaderRow += `<th colspan="${colspan}">${period.name}</th>`;
    });
    periodHeaderRow += "</tr>";
    table.innerHTML = periodHeaderRow;

    // Create month header row
    let monthHeaderRow = "<tr><th>Meses</th>";
    for (let i = 1; i <= weeks; i += 4) {
        const month = Math.ceil(i / 4);
        let colspan = Math.min(4, weeks - i + 1); // Handle cases where the last month might not have 4 weeks
        monthHeaderRow += `<th colspan="${colspan}">Mes ${month}</th>`;
    }
    monthHeaderRow += "</tr>";
    table.innerHTML += monthHeaderRow;

    // Create week header row
    let weekHeaderRow = "<tr><th>Elemento</th>";
    for (let i = 1; i <= weeks; i++) {
        weekHeaderRow += `<th>${i}</th>`;
    }
    weekHeaderRow += "</tr>";
    table.innerHTML += weekHeaderRow;

    // Create module header row with specific ranges
    let moduleHeaderRow = "<tr><th>Módulos</th>";
    const modules = [
        { name: "Module 1", start: 1, end: 7 }, // The Field
        { name: "Module 2", start: 8, end: 15 }, // The Hill
        { name: "Module 3", start: 17, end: 33 }, // The Mountain and The Peak
        { name: "End", start: 33, end: 36 }, // The Mountain and The Peak
    ];

    modules.forEach(module => {
        let colspan = module.end - module.start + 1;
        moduleHeaderRow += `<th colspan="${colspan}">${module.name}</th>`;
    });
    moduleHeaderRow += "</tr>";
    table.innerHTML += moduleHeaderRow;

    // Now proceed to add rows for data (projects, themes, integrations)
    let lastEnd = 0;

    data.forEach((item) => {
        let colorClass = "";
        let iconoProject = '<i class="bi bi-briefcase-fill"></i>';
        let iconoTema = '<i class="bi bi-book-fill"></i>';
        let iconoIntegracion = '<i class="bi bi-diagram-3-fill"></i>';
        let icon = '';

        // Determine the type of item and assign corresponding icon and color
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
        } else if (item.type === "Transición") {
            colorClass = "transicion";
            item.start = item.start ? item.start : lastEnd + 1;
            item.end = item.end ? item.end : item.start + 2;
            icon = iconoIntegracion;
        }

        lastEnd = item.end;

        // Create the row for this item
        let row = `<tr><td class="label ${colorClass}">${icon} ${item.name}</td>`;

        // Add empty or filled cells based on the item's start and end weeks
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
    table.style.width = `${weeks * 30 + 260}px`; // 30px per week + 260px for the first column
}