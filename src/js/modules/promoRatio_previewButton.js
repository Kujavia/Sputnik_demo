
export default window.tbPromoRatioPerviewButton = function() {

    //сохраняю в словарик выбранные параметры
    let currentData = JSON.parse(localStorage.getItem('globalParametersPromo'));
if (!currentData) {
    currentData = {}; // Если нет, создаем новый объект
}
const promoRatioMethodAgregation = document.getElementById('promoRatio_method');
// const seasonality_method = document.getElementById('seasonality_method').value;
const promoRatio_method = promoRatioMethodAgregation.options[promoRatioMethodAgregation.selectedIndex].text;
currentData['метод агрегации'] = promoRatio_method;
localStorage.setItem('globalParametersPromo', JSON.stringify(currentData));



  //далее рабочий код для загрузки csv_тбадлицы в забаненный iframe
    // const methodSelect = document.getElementById('promoRatio_method');
    // const selectedMethod = methodSelect.value;

    // let csvFilePath;
    // if (selectedMethod === 'promoRatio_method_average') {
    //     csvFilePath = './images/demo_file/test_forecast_csv.csv'; 
    // } else if (selectedMethod === 'promoRatio_method_mediana') {
    //     csvFilePath = './images/demo_file/test_forecast_csv2.csv'; 
    // } else {
    //     console.warn('Неизвестный метод прогнозирования:', selectedMethod);
    //     return; // Выход из функции, если метод не распознан
    // }
    // Papa.parse(csvFilePath, {
    //     download: true,
    //     header: true,
    //     complete: function(results) {
    //         const iframe = document.getElementById('tb_promoRatio');
    //         const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

    //         // Очищаем содержимое iframe
    //         iframeDoc.open();
    //         iframeDoc.write(
    //             `<html>
    //             <head>
    //                 <title>CSV Data</title>
    //                 <style>
    //                     body {
    //                         font-family: Arial, sans-serif;
    //                         background-color: #f4f4f4;
    //                     }
    //                     table {
    //                         width: 100%;
    //                         border-collapse: collapse;
    //                         margin-top: 0px;
    //                         font-size: 12px;
    //                     }
    //                     th {
    //                         background-color: #4CAF50; /* Цвет фона заголовков */
    //                         font-size: 14px;
    //                         color: white; /* Цвет текста заголовков */
    //                         padding: 10px;
    //                     }
    //                     td {
    //                         border: 1px solid #ddd; /* Цвет границ ячеек */
    //                         padding: 8px;
    //                     }
    //                     tr:nth-child(even) {
    //                         background-color: #f2f2f2; /* Цвет фона четных строк */
    //                     }
    //                     tr:hover {
    //                         background-color: #ddd; /* Цвет фона строки при наведении */
    //                     }
    //                 </style>
    //             </head>
    //             <body>
    //                 <table>
    //                     <thead>
    //                         <tr>`
    //         );

    //         // Добавляем заголовки
    //         const headers = Object.keys(results.data[0]);
    //         headers.forEach(header => {
    //             iframeDoc.write(`<th>${header}</th>`);
    //         });
    //         iframeDoc.write('</tr></thead><tbody>');

    //         // Добавляем строки данных
    //         results.data.forEach(row => {
    //             iframeDoc.write('<tr>');
    //             Object.values(row).forEach(cell => {
    //                 iframeDoc.write(`<td>${cell}</td>`);
    //             });
    //             iframeDoc.write('</tr>');
    //         });

    //         iframeDoc.write('</tbody></table>');
    //         iframeDoc.write('</body></html>');
    //         iframeDoc.close();
    //     }
    // });
}