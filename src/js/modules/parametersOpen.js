// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Popover from 'bootstrap/js/dist/popover';
import Tooltip from 'bootstrap/js/dist/tooltip'; // Добавляем импорт Tooltip

window.showContent_parameters = function () {
    const mainContent = document.getElementById('mainContent');
    fetch('./src/html/parameters.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Модуль не отвечает');
            }
            return response.text();
        })
        .then(data => {
            mainContent.innerHTML = data;
            parametersInit()
        })
        .catch(error => {
            console.error('Ошибка при загрузке файла:', error);
            mainContent.innerHTML = 'Ошибка при загрузке';
        });
}

function parametersInit() {
    loadSelectedGlobalParametersBefore();
            
    // Инициализируем и Popover и Tooltip
    initializePopovers();
    initializeTooltips(); // Добавляем вызов инициализации Tooltip
    
    initializeIcons();

    document.getElementById('linkToSeasonality').addEventListener('click', () => {
        document.getElementById('seasonalityNavItem').classList.remove('collapsed')
        document.getElementById('seasonalityNav').closest('.aside-nav__item--collapse').classList.add('show');
        document.getElementById('seasonalityNav').click();
    })
}

// Функция для загрузки сохранённых параметров
window.loadSelectedGlobalParametersBefore = function() {
    const parametersBefore = JSON.parse(localStorage.getItem('globalParametersBefore'));
    if (parametersBefore) {
        for (const id in parametersBefore) {
            const selectElement = document.getElementById(id);
            if (selectElement) {
                selectElement.value = parametersBefore[id];
            }
        }
    }
}

// Функция для инициализации Popover (оставляем как есть)
window.initializePopovers = function() {
    const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]');
    popoverTriggerList.forEach(popoverTriggerEl => {
        new Popover(popoverTriggerEl);
    });
};

// Новая функция для инициализации Tooltip
window.initializeTooltips = function() {
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach(tooltipTriggerEl => {
        new Tooltip(tooltipTriggerEl, {
            // Дополнительные опции (необязательно)
            trigger: 'hover focus', // Показывать при наведении и фокусе
            placement: 'top',     // Позиция по умолчанию
            delay: {show: 100, hide: 100} // Задержки
        });
    });
};

// Функция для инициализации иконок (оставляем без изменений)
window.initializeIcons = function() {
    const iconElements = [].slice.call(document.querySelectorAll('svg use'));
    iconElements.forEach(function (iconEl) {
        const href = iconEl.getAttribute('xlink:href');
        if (href && !document.querySelector(href)) {
            console.warn(`Иконка ${href} не найдена в DOM`);
        }
    });
};