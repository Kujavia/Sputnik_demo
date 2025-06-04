import * as XLSX from 'xlsx';  // ES6-импорт

import 'jquery';
import 'bootstrap/dist/js/bootstrap.min.js'
import 'bootstrap/dist/css/bootstrap.min.css';
// import '../scss/bootstrap.css'
import '../scss/style.scss'
import './blocks/aside.js'
import './tools.js'

import './modules/check_mark'
import './modules/summaryPlan_OptimizationForm'
import './modules/newProduct_OptimizationForm'
import './modules/parametersOpen'
import './modules/seasonalityOpen'
import './modules/regularOpen'
import './modules/promoOpen'
import './modules/check_mark'
import './modules/actionOpen'
import './modules/new_products'
import './modules/output_assort'
import './modules/promo_ratio'
import './modules/planner'
import './modules/regular_assortTable_copy'
import './modules/seasonality_visualLines'
import './modules/summary_plan'
import './modules/promoRatio_previewButton'
import './modules/regular_assortOptimizationForm'
import './modules/promo_OptimizationForm'
import './modules/newProduct_PreviewTable'
import './modules/summaryPlan_PreviewTable'
import './modules/planner_formRepeat'
import './modules/planner_saveModalRepetition'
import './modules/planner_formRepeatSelect'
import './modules/parametersGlobalChecked'
import './modules/seasonalityGlobalChecked'
import './modules/regularGlobalChecked'
import './modules/scenarios_save.js'


//@import url("https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.3/css/bootstrap.min.css");

import imageZE from '/images/users/ZilevichElizaveta.jpg';
import imageTO from '/images/users/TkachevOleg.jpg';
import imageTG from '/images/users/TolokGalina.jpg';
import imageNP from '/images/users/question.jpg';
import imageU1 from '/images/users/user1.png';
/*вставка юзера*/

export function initBootstrapTooltips() {
    // Находим все неинициализированные tooltips
    document.querySelectorAll('[data-bs-toggle="tooltip"]:not(.bs-tooltip-initialized)').forEach(el => {
        new bootstrap.Tooltip(el);
        el.classList.add('bs-tooltip-initialized'); // Помечаем как инициализированный
    });
}

// Инициализация при загрузке
document.addEventListener('DOMContentLoaded', initBootstrapTooltips);

// Для динамического контента можно использовать MutationObserver
//   const observer = new MutationObserver(function(mutations) {
//     initBootstrapTooltips();
//   });

// observer.observe(document.body, {
//     childList: true,
//     subtree: true
// });


//REG ASSORT********

window.loadAndFilterData = function () {

    window.saveGlobalParametersRegular = function () {
        let currentData = JSON.parse(localStorage.getItem('globalParameters'));
        if (!currentData) {
            currentData = {};
        }
        const regularAssortMethodForecast = document.getElementById('regular_assort_method');
        const regular_method = regularAssortMethodForecast.value;
        // console.log('Выбранный метод прогноза:', regular_method);

        currentData['методы прогноза'] = regular_method;
        localStorage.setItem('globalParameters', JSON.stringify(currentData));
    }
    window.saveGlobalParametersRegular();

    // Получаем параметры из localStorage
    const parameters = JSON.parse(localStorage.getItem('globalParameters'));
    const iframe = document.getElementById('tb_regular_assort_results');
    iframe.contentDocument.body.style.fontFamily = '"Inter", sans-serif';
    // Проверяем наличие ключей и выводим соответствующие сообщения
    if (!parameters || !parameters['методы прогноза']) {
        iframe.contentDocument.body.innerHTML = '<p>Выберите глобальные параметры</p>';
        return; // Прекращаем выполнение функции
    }
    if (!parameters['сезонность']) {
        iframe.contentDocument.body.innerHTML = '<p>Выберите метод расчета сезонности</p>';
        return; // Прекращаем выполнение функции
    }
    window.filterData = function (data) {
        const parameters = JSON.parse(localStorage.getItem('globalParameters'));
        return data.filter(row => {
            return Object.keys(parameters).every(key => {
                if (row[key] !== undefined) {
                    return row[key].toString().toLowerCase() === parameters[key].toString().toLowerCase();   // Приведение к нижнему регистру для независимости от регистра
                }
                return true;
            });
        });
    };

    window.displayTable = function (data) {
        console.log(data)
        const iframe = document.getElementById('tb_regular_assort_results');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.body.innerHTML = '';

        // Добавление стилей
        const style = document.createElement('style');
        style.textContent =`
            table {
                width: 100%;
                border-collapse: collapse;
                font-family: Inter, sans-serif;
                font-size: 14px;
                background-color: white;
                border-radius: 8px; /* Закругляем углы */
                overflow: hidden; /* Скрываем острые углы у ячеек */
                border-style: hidden; /* Скрываем внешнюю границу таблицы (опционально) */
                box-shadow: 0 0 0 1px #E0E0E0; /* Восстанавливаем видимость границы (опционально) */
            }
            th, td {
                padding: 12px 15px;
                text-align: left;
                border: 1px solid #E0E0E0;
            }
            th {
                background-color: #F1F2FF;
                color: #333;
                font-weight: 600;
                border-bottom: 2px solid #D0D0D0;
            }
            tr {
                background-color: white;
            }
            tr:hover {
                background-color: #F8F8F8;
            }
        `;
        iframeDocument.head.appendChild(style);
        const table = iframeDocument.createElement('table');
        table.innerHTML = ''; // Очистка предыдущего содержимого
        if (data.length === 0) {
            table.innerHTML = '<tr><td colspan="100%">Нет данных для отображения</td></tr>';
            iframeDocument.body.appendChild(table);
            return;
        }

        // Определяем желаемый порядок
        const desiredOrder = [
            'WAPE, %',
            'BIAS, %',
            'Кол-во позиций с прогнозом',
            'Всего позиций с продажами',
            'Доля, %',
            'недопрогноз, %',
            'перепрогноз, %',
            'Объем прогноза, шт',
            'Объем продаж, шт',
            'Доля, %2'
        ];
        // Сортируем данные по желаемому порядку
        data.sort((a, b) => {
            const indexA = desiredOrder.indexOf(a['МЕРЫ']); // Приводим к нижнему регистру
            const indexB = desiredOrder.indexOf(b['МЕРЫ']);

            // Сравниваем индексы
            return indexA - indexB;
        });

        // Создание заголовков, начиная с 7-го столбца
        const headers = Object.keys(data[0]);
        const startIndex = 6;
        let periodValue = Number(document.getElementById('period').value)
        const period = startIndex + 13 + periodValue > headers.length ? headers.length : startIndex + 13 + periodValue;
        const headerRow = document.createElement('tr');
        // for (let i = 6; i < headers.length; i++) { // Начинаем с 7-го столбца (индекс 6)
        for (let i = startIndex; i < period; i++) { // Начинаем с 7-го столбца (индекс 6)
            const th = document.createElement('th');
            th.textContent = headers[i];
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);
        const percentColumns = ['WAPE, %', 'BIAS, %', 'Доля, %', 'Доля, %2', 'недопрогноз, %', 'перепрогноз, %'];

        // Заполнение таблицы данными, начиная с 7-го столбца
        data.forEach(row => {
            const tr = document.createElement('tr');
            // for (let i = 6; i < headers.length; i++) { // Начинаем с 7-го столбца (индекс 6)
            for (let i = startIndex; i < period; i++) { // Начинаем с 7-го столбца (индекс 6)
                const td = document.createElement('td');
                let cellValue = row[headers[i]];

                if (typeof cellValue === 'number') {
                    // Проверяем, есть ли соответствующее название в столбце "МЕРЫ"
                    if (row['МЕРЫ'] && percentColumns.includes(row['МЕРЫ'])) {
                        cellValue = (cellValue * 100).toFixed(0) + '%'; // Преобразование в процент
                    } else {
                        cellValue = cellValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });// Округл, разделение на локали до без знаков после запятой для остальных чисел
                    }
                }
                td.textContent = cellValue;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        iframeDocument.body.appendChild(table);
    };

    // const url = './public/images/users/regAssort2.xlsx';// ссылки для локального компа
    //fetch('./public/images/users/regAssort2.xlsx') // ссылки для локального компа
    //const url = '   https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/regAssort3.xlsx';
    // fetch('./images/demo_file/regAssort3.xlsx')
    fetch('./data/regularAssort/regAssort4.xlsx')// ссылки для локального компа
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // console.log(jsonData); // Проверка загруженных данных

            const filteredData = window.filterData(jsonData);
            window.displayTable(filteredData);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
        });
};

//NEWS PRODUCTS global*********

window.loadAndFilterDataNewProducts = function () {
    window.saveGlobalParametersRegularNewProducts = function () {
        let currentData = JSON.parse(localStorage.getItem('globalParametersNewProducts'));
        if (!currentData) {
            currentData = {};
        }
        const newProductAggregationGeo = document.getElementById('new_product__aggregation-geo'); //забираю
        const newProductAggregationGroup = document.getElementById('new_product__aggregation-group'); //забираю
        // const newProductAggregationAddParameter = document.getElementById('new_product__aggregation-parameter'); //забираю

        const additionalList = document.getElementById('additional').querySelectorAll('input:checked:not(#additional-metrics)');

        const AggregationGeo = newProductAggregationGeo.options[newProductAggregationGeo.selectedIndex].text;//присваиваю
        const AggregationGroup = newProductAggregationGroup.options[newProductAggregationGroup.selectedIndex].text;//присваиваю
        // const AggregationAddParameter = newProductAggregationAddParameter.options[newProductAggregationAddParameter.selectedIndex].text;//присваиваю


        currentData['агрегат по географии'] = AggregationGeo; // добавляю в словарь
        currentData['агрегат по позиции'] = AggregationGroup; // добавляю в словарь
        // currentData['дополнительные показатели'] = AggregationAddParameter; // добавляю в словарь
        delete currentData['дополнительные показатели']; // удаляем предыдущее значение
        if (additionalList.length){
            currentData['дополнительные показатели'] = Array.from(additionalList).map( (el) => {
                return document.querySelector(`label[for="${el.id}"]`).textContent
            })
        }

        localStorage.setItem('globalParametersNewProducts', JSON.stringify(currentData));
    }
    window.saveGlobalParametersRegularNewProducts();

    window.filterDataNewProducts = function (data) {
        const parameters = JSON.parse(localStorage.getItem('globalParametersNewProducts'));
        return data.filter(row => {
            return Object.keys(parameters).every(key => {
                if (row[key] !== undefined) {
                    return row[key].toString().toLowerCase() === parameters[key].toString().toLowerCase();
                }
                return true;
            });
        });
    };

    window.displayTableNewProducts = function (data) {
        const iframe = document.getElementById('new_product_PreviewIframe');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.body.innerHTML = '';

        // Добавление стилей
        const style = document.createElement('style');
        style.textContent =`
            table {
                width: 100%;
                border-collapse: collapse;
                font-family: Inter, sans-serif;
                font-size: 14px;
                background-color: white;
                border-radius: 8px; /* Закругляем углы */
                overflow: hidden; /* Скрываем острые углы у ячеек */
                border-style: hidden; /* Скрываем внешнюю границу таблицы (опционально) */
                box-shadow: 0 0 0 1px #E0E0E0; /* Восстанавливаем видимость границы (опционально) */
            }
            th, td {
                padding: 12px 15px;
                text-align: left;
                border: 1px solid #E0E0E0;
            }
            th {
                background-color: #F1F2FF;
                color: #333;
                font-weight: 600;
                border-bottom: 2px solid #D0D0D0;
            }
            tr {
                background-color: white;
            }
            tr:hover {
                background-color: #F8F8F8;
            }`;
        iframeDocument.head.appendChild(style);
        const table = iframeDocument.createElement('table');
        table.innerHTML = ''; // Очистка предыдущего содержимого
        if (data.length === 0) {
            table.innerHTML = '<tr><td colspan="100%">Нет данных для отображения</td></tr>';
            iframeDocument.body.appendChild(table);
            return;
        }

        // Определяем желаемый порядок
        const desiredOrder = [
            'WAPE, %',
            'BIAS, %',
            'Кол-во позиций с прогнозом',
            'Всего позиций с продажами',
            'Доля, %',
            'недопрогноз, %',
            'перепрогноз, %',
            'Объем прогноза, шт',
            'Объем продаж, шт',
            'Доля, %2'
        ];
        // Сортируем данные по желаемому порядку
        data.sort((a, b) => {
            const indexA = desiredOrder.indexOf(a['МЕРЫ']); // Приводим к нижнему регистру
            const indexB = desiredOrder.indexOf(b['МЕРЫ']);

            // Сравниваем индексы
            return indexA - indexB;
        });

        // Создание заголовков, начиная с 4-го столбца
        const headers = Object.keys(data[0]);
        const startIndex = 3;
        let periodValue = Number(document.getElementById('period').value)
        const period = startIndex + 13 + periodValue > headers.length ? headers.length : startIndex + 13 + periodValue;
        const headerRow = document.createElement('tr');
        for (let i = startIndex; i < period; i++) { // Начинаем с 4-го столбца (индекс 3)
            const th = document.createElement('th');
            th.textContent = headers[i];
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);
        const percentColumns = ['WAPE, %', 'BIAS, %', 'Доля, %', 'Доля, %2', 'недопрогноз, %', 'перепрогноз, %'];

        // Заполнение таблицы данными, начиная с 7-го столбца
        data.forEach(row => {
            const tr = document.createElement('tr');
            for (let i = startIndex; i < period; i++) { // Начинаем с 4-го столбца (индекс 3)
                const td = document.createElement('td');
                let cellValue = row[headers[i]];

                if (typeof cellValue === 'number') {
                    // Проверяем, есть ли соответствующее название в столбце "МЕРЫ"
                    if (row['МЕРЫ'] && percentColumns.includes(row['МЕРЫ'])) {
                        cellValue = (cellValue * 100).toFixed(0) + '%'; // Преобразование в процент
                    } else {
                        cellValue = cellValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });// Округление до двух знаков после запятой для остальных чисел
                    }
                }
                td.textContent = cellValue;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        iframeDocument.body.appendChild(table);
    };

    // const url = './public/images/users/regAssort2.xlsx';// ссылки для локального компа
    // fetch('./public/images/users/regAssort2.xlsx')// ссылки для локального компа
    //const url = '   https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/newProducts1.xlsx';
    // fetch('   https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/newProducts1.xlsx')
    // fetch('./images/demo_file/newProducts1.xlsx')
    // fetch('./public/images/demo_file/newProducts1.xlsx')// ссылки для локального компа
    fetch('./data/newProducts/newProducts1.xlsx')
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // console.log(jsonData); // Проверка загруженных данных

            const filteredData = window.filterDataNewProducts(jsonData);
            window.displayTableNewProducts(filteredData);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
        });
};

//PROMO global*********
window.loadAndFilterDataPromo = function () {
    window.saveGlobalParametersPromo = function () {
        let currentData = JSON.parse(localStorage.getItem('globalParametersPromo'));
        if (!currentData) {
            currentData = {};
        }
        const promoСoefficients = document.getElementById('promo_method'); //забираю

        const promoCoefficient = promoСoefficients.options[promoСoefficients.selectedIndex].text;//присваиваю

        // currentData['выбор коэффициентов'] = promoCoefficient; // добавляю в словарь
        currentData['Выбрать коэффициенты'] = promoCoefficient; // добавляю в словарь

        localStorage.setItem('globalParametersPromo', JSON.stringify(currentData));
    }
    window.saveGlobalParametersPromo();

    window.filterDataPromo = function (data) {
        const parameters = JSON.parse(localStorage.getItem('globalParametersPromo'));
        return data.filter(row => {
            return Object.keys(parameters).every(key => {
                if (row[key] !== undefined) {
                    return row[key].toString().toLowerCase() === parameters[key].toString().toLowerCase();
                }
                return true;
            });
        });
    };

    window.displayTablePromo = function (data) {
        const iframe = document.getElementById('promo_PreviewIframe');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.body.innerHTML = '';

        // Добавление стилей
        const style = document.createElement('style');
        style.textContent =`
            table {
                width: 100%;
                border-collapse: collapse;
                font-family: Inter, sans-serif;
                font-size: 14px;
                background-color: white;
                border-radius: 8px; /* Закругляем углы */
                overflow: hidden; /* Скрываем острые углы у ячеек */
                border-style: hidden; /* Скрываем внешнюю границу таблицы (опционально) */
                box-shadow: 0 0 0 1px #E0E0E0; /* Восстанавливаем видимость границы (опционально) */
            }
            th, td {
                padding: 12px 15px;
                text-align: left;
                border: 1px solid #E0E0E0;
            }
            th {
                background-color: #F1F2FF;
                color: #333;
                font-weight: 600;
                border-bottom: 2px solid #D0D0D0;
            }
            tr {
                background-color: white;
            }
            tr:hover {
                background-color: #F8F8F8;
        }`;
        iframeDocument.head.appendChild(style);
        const table = iframeDocument.createElement('table');
        table.innerHTML = ''; // Очистка предыдущего содержимого
        if (data.length === 0) {
            table.innerHTML = '<tr><td colspan="100%">Нет данных для отображения</td></tr>';
            iframeDocument.body.appendChild(table);
            return;
        }

        // Определяем желаемый порядок
        const desiredOrder = [
            'WAPE, %',
            'BIAS, %',
            'Кол-во позиций с прогнозом',
            'Всего позиций с продажами',
            'Доля, %',
            'недопрогноз, %',
            'перепрогноз, %',
            'Объем прогноза, шт',
            'Объем продаж, шт',
            'Доля, %2'
        ];
        // Сортируем данные по желаемому порядку
        data.sort((a, b) => {
            const indexA = desiredOrder.indexOf(a['МЕРЫ']); // Приводим к нижнему регистру
            const indexB = desiredOrder.indexOf(b['МЕРЫ']);

            // Сравниваем индексы
            return indexA - indexB;
        });

        // Создание заголовков, начиная с 4-го столбца
        const headers = Object.keys(data[0]);
        const startIndex = 1;
        let periodValue = Number(document.getElementById('period').value)
        const period = startIndex + 13 + periodValue > headers.length ? headers.length : startIndex + 13 + periodValue;
        const headerRow = document.createElement('tr');
        for (let i = startIndex; i < period; i++) { // Начинаем с 4-го столбца (индекс 3)
            const th = document.createElement('th');
            th.textContent = headers[i];
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);
        const percentColumns = ['WAPE, %', 'BIAS, %', 'Доля, %', 'Доля, %2', 'недопрогноз, %', 'перепрогноз, %'];

        // Заполнение таблицы данными, начиная с 7-го столбца
        data.forEach(row => {
            const tr = document.createElement('tr');
            for (let i = startIndex; i < period; i++) { // Начинаем с 4-го столбца (индекс 3)
                const td = document.createElement('td');
                let cellValue = row[headers[i]];

                if (typeof cellValue === 'number') {
                    // Проверяем, есть ли соответствующее название в столбце "МЕРЫ"
                    if (row['МЕРЫ'] && percentColumns.includes(row['МЕРЫ'])) {
                        cellValue = (cellValue * 100).toFixed(0) + '%'; // Преобразование в процент
                    } else {
                        cellValue = cellValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });// Округление до двух знаков после запятой для остальных чисел
                    }
                }
                td.textContent = cellValue;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        iframeDocument.body.appendChild(table);
    };

    // const url = './public/images/users/regAssort2.xlsx';// ссылки для локального компа
    // fetch('./public/images/users/regAssort2.xlsx')// ссылки для локального компа
    //const url = '   https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/promo.xlsx';
    fetch('./data/promo/promo2.xlsx')
        // fetch('https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/promo.xlsx')
        // fetch('./public/images/demo_file/promo.xlsx')// ссылки для локального компа
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // console.log(jsonData); // Проверка загруженных данных

            const filteredData = window.filterDataPromo(jsonData);
            window.displayTablePromo(filteredData);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
        });
};

//summaryPlanGlobalMMMMMMM


window.loadAndFilterDataSummaryPlan = function () {
    window.saveGlobalParametersSummaryPlan = function () {
        let currentData = JSON.parse(localStorage.getItem('globalParametersSummaryPlan'));
        if (!currentData) {
            currentData = {};
        }
        // const newProductAggregationGeo = document.getElementById('new_product__aggregation-geo'); //забираю
        // const newProductAggregationGroup = document.getElementById('new_product__aggregation-group'); //забираю
        // const newProductAggregationAddParameter = document.getElementById('new_product__aggregation-parameter'); //забираю
        //Получаем значения чекбоксов
        currentData['регулярный ассортимент'] = document.getElementById("summary_plan__regAssort").checked ? "true" : "false";;//забираю
        currentData['промо'] = document.getElementById("summary_plan__promo").checked ? "true" : "false";;
        currentData['новинки'] = document.getElementById("summary_plan__newsProducts").checked ? "true" : "false";;
        currentData['учёт каннибализации'] = document.getElementById("summary_plan__cannibalization").checked ? "true" : "false";

        // const AggregationGeo = newProductAggregationGeo.options[newProductAggregationGeo.selectedIndex].text;//присваиваю
        // const AggregationGroup = newProductAggregationGroup.options[newProductAggregationGroup.selectedIndex].text;//присваиваю
        // const AggregationAddParameter = newProductAggregationAddParameter.options[newProductAggregationAddParameter.selectedIndex].text;//присваиваю

        // currentData['агрегат по географии'] = AggregationGeo; // добавляю в словарь
        // currentData['агрегат по позиции'] = AggregationGroup; // добавляю в словарь
        // currentData['дополнительные показатели'] = AggregationAddParameter; // добавляю в словарь
        localStorage.setItem('globalParametersSummaryPlan', JSON.stringify(currentData));
    }
    window.saveGlobalParametersSummaryPlan();

    window.filterDataSummaryPlan = function (data) {
        const parameters = JSON.parse(localStorage.getItem('globalParametersSummaryPlan'));
        return data.filter(row => {
            return Object.keys(parameters).every(key => {
                if (row[key] !== undefined) {
                    return row[key].toString().toLowerCase() === parameters[key].toString().toLowerCase();
                }
                return true;
            });
        });
    };



    window.displayTableSummaryPlan = function (data) {
        const iframe = document.getElementById('summaryPlan_PreviewIframe');
        const iframeDocument = iframe.contentDocument || iframe.contentWindow.document;
        iframeDocument.body.innerHTML = '';

        // Добавление стилей
        const style = document.createElement('style');
        style.textContent =
            `
        table {
               width: 100%;
        border-collapse: collapse;
        font-family: Inter, sans-serif;
        font-size: 14px;
        background-color: white;
        border-radius: 8px; /* Закругляем углы */
        overflow: hidden; /* Скрываем острые углы у ячеек */
        border-style: hidden; /* Скрываем внешнюю границу таблицы (опционально) */
        box-shadow: 0 0 0 1px #E0E0E0; /* Восстанавливаем видимость границы (опционально) */
        }
        th, td {
            padding: 12px 15px;
            text-align: left;
            border: 1px solid #E0E0E0;
        }
        th {
            background-color: #F1F2FF;
            color: #333;
            font-weight: 600;
            border-bottom: 2px solid #D0D0D0;
        }
        tr {
            background-color: white;
        }
        tr:hover {
            background-color: #F8F8F8;
        }
    `
            ;
        iframeDocument.head.appendChild(style);
        const table = iframeDocument.createElement('table');
        table.innerHTML = ''; // Очистка предыдущего содержимого
        if (data.length === 0) {
            table.innerHTML = '<tr><td colspan="100%">Нет данных для отображения</td></tr>';
            iframeDocument.body.appendChild(table);
            return;
        }

        // Определяем желаемый порядок
        const desiredOrder = [
            'WAPE, %',
            'BIAS, %',
            'Кол-во позиций с прогнозом',
            'Всего позиций с продажами',
            'Доля, %',
            'недопрогноз, %',
            'перепрогноз, %',
            'Объем прогноза, шт',
            'Объем продаж, шт',
            'Доля, %2'
        ];
        // Сортируем данные по желаемому порядку
        data.sort((a, b) => {
            const indexA = desiredOrder.indexOf(a['МЕРЫ']); // Приводим к нижнему регистру
            const indexB = desiredOrder.indexOf(b['МЕРЫ']);

            // Сравниваем индексы
            return indexA - indexB;
        });

        // Создание заголовков, начиная с 4-го столбца
        const headers = Object.keys(data[0]);
        const headerRow = document.createElement('tr');
        const startIndex = 4;
        let periodValue = Number(document.getElementById('period').value)
        const period = startIndex + 13 + periodValue > headers.length ? headers.length : startIndex + 13 + periodValue;
        for (let i = startIndex; i < period; i++) { // Начинаем с 4-го столбца (индекс 3)
            const th = document.createElement('th');
            th.textContent = headers[i];
            headerRow.appendChild(th);
        }
        table.appendChild(headerRow);
        const percentColumns = ['WAPE, %', 'BIAS, %', 'Доля, %', 'Доля, %2', 'недопрогноз, %', 'перепрогноз, %'];

        // Заполнение таблицы данными, начиная с 7-го столбца
        data.forEach(row => {
            const tr = document.createElement('tr');
            for (let i = startIndex; i < period; i++) { // Начинаем с 4-го столбца (индекс 3)
                const td = document.createElement('td');
                let cellValue = row[headers[i]];

                if (typeof cellValue === 'number') {
                    // Проверяем, есть ли соответствующее название в столбце "МЕРЫ"
                    if (row['МЕРЫ'] && percentColumns.includes(row['МЕРЫ'])) {
                        cellValue = (cellValue * 100).toFixed(0) + '%'; // Преобразование в процент
                    } else {
                        cellValue = cellValue.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 });// Округление до двух знаков после запятой для остальных чисел
                    }
                }
                td.textContent = cellValue;
                tr.appendChild(td);
            }
            table.appendChild(tr);
        });
        iframeDocument.body.appendChild(table);
    };

    // const url = './public/images/users/regAssort2.xlsx';// ссылки для локального компа
    // fetch('./public/images/users/regAssort2.xlsx')// ссылки для локального компа
    //const url = '   https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/summaryPlan.xlsx';
    fetch('./data/summaryPlan/summaryPlan.xlsx')
        // fetch('https://raw.githubusercontent.com/Kujavia/SputnikPro_test_2_2/master/public/images/demo_file/summaryPlan.xlsx')
        // fetch('./images/demo_file/summaryPlan.xlsx')
        // fetch('./public/images/demo_file/summaryPlan.xlsx')// ссылки для локального компа
        .then(response => {
            if (!response.ok) {
                throw new Error('Сеть не отвечает');
            }
            return response.arrayBuffer();
        })
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet);

            // console.log(jsonData); // Проверка загруженных данных

            const filteredData = window.filterDataSummaryPlan(jsonData);
            window.displayTableSummaryPlan(filteredData);
        })
        .catch(error => {
            console.error('Ошибка загрузки файла:', error);
        });
};

