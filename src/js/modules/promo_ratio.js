import * as XLSX from 'xlsx';  // ES6-импорт
import Plotly from 'plotly.js-dist-min';

export default window.showContent_promoRatio = function() {
    fetch('./src/html/promo_ratio.html')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById('mainContent').innerHTML = html;
            promoRatioInit();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
}

function promoRatioInit(){
    document.getElementById('promoRatio_calculation').addEventListener('click', promoRatioChart)
    document.getElementById('promoRatio_method').addEventListener('change', promoRatioUpdateDownload);
    promoRatioUpdateDownload();
}

const dataPath = {
    average: './data/promoRatio/promoCoefficientsAvg.xlsx',
    mediana: './data/promoRatio/promoCoefficientsMedian.xlsx'
}

function promoRatioChart(){
    const value = document.getElementById('promoRatio_method').value;
    const path = dataPath[value]

    document.getElementById('download').href = path;

    fetch(path)
        .then(response => response.arrayBuffer())
        .then(data => {
            const workbook = XLSX.read(data, { type: 'array' });
            const firstSheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[firstSheetName];
            const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
            const labels = [];
            const datasets = {};
            // Пропускаем заголовок и обрабатываем данные
            for (let i = 1; i < jsonData.length; i++) {
                const row = jsonData[i];
                if (row.length === 3) { // Убедитесь, что в строке три колонки
                    const productType = row[0]; // Наименование
                    const segment = row[1]; // Ценовой сегмент
                    const value = parseFloat(row[2]); // Коэффициенты
                    // Добавляем сегмент в labels, если их еще нет и если неделя не -1
                    if (!labels.includes(segment) && segment !== '-1') {
                        labels.push(segment);
                    }
                    // Создаем массив для каждого типа продукции, если его еще нет
                    if (!datasets[productType]) {
                        datasets[productType] = { 
                            x: [], 
                            y: [], 
                            type: 'scatter', // Тип графика
                            mode: 'lines+markers', // Режим отображения
                            name: productType // Имя для легенды
                        };
                    }
                    const segmentIndex = labels.indexOf(segment); // Заполняем массив значений для соответствующей недели
                    if (segmentIndex !== -1) {
                        datasets[productType].x.push(segment);
                        datasets[productType].y.push(value);
                    }
                }
            }
            // Преобразуем объект datasets в массив для Plotly
            const plotData = Object.values(datasets);
            // Создание нового графика
            Plotly.newPlot('chart', plotData, {
                title: 'Промо коэффициенты',
                xaxis: {
                    title: 'Ценовой сегмент',
                    tickmode: 'linear', // Используем линейный режим для оси X
                    tick0: 0, // Начальное значение оси X (Ценовой сегмент)
                    dtick: 1, // Шаг по оси X
                    range: [-0.5, 4.5]
                },
                yaxis: {
                    title: 'Значение',
                    // rangemode: 'tozero' // Начинаем ось Y с нуля
                    range: [0.5, 2.5]
                }
            });
        })
        .catch(error => {
            console.error('Ошибка при загрузке файла:', error);
        });

}

function promoRatioUpdateDownload(){
    const value = document.getElementById('promoRatio_method').value;
    document.getElementById('download').href = dataPath[document.getElementById('promoRatio_method').value];
}

//   // Находим главный чекбокс и все подчиненные чекбоксы по data-атрибуту
//   const mainCheckbox = document.querySelector('.main-checkbox[data-group="metrics"]');
//   const subCheckboxes = document.querySelectorAll('.sub-checkbox[data-group="metrics"]');

//   // Обработчик для главного чекбокса
//   mainCheckbox.addEventListener('change', function () {
//     if (this.checked) {
//       // Если главный чекбокс отмечен, отмечаем все подчиненные
//       subCheckboxes.forEach(checkbox => {
//         checkbox.checked = true;
//       });
//     } else {
//       // Если главный чекбокс снят, снимаем все подчиненные
//       subCheckboxes.forEach(checkbox => {
//         checkbox.checked = false;
//       });
//     }
//   });

//   // Обработчики для подчиненных чекбоксов
//   subCheckboxes.forEach(checkbox => {
//     checkbox.addEventListener('change', function () {
//       // Если любой из подчиненных чекбоксов снят, делаем главный чекбокс серым
//       if (!this.checked) {
//         mainCheckbox.indeterminate = true;
//       } else {
//         // Если все подчиненные чекбоксы отмечены, снимаем серый цвет
//         const allChecked = Array.from(subCheckboxes).every(checkbox => checkbox.checked);
//         if (allChecked) {
//           mainCheckbox.indeterminate = false;
//           mainCheckbox.checked = true;
//         }
//       }
//     });
//   });
