
export default window.tbSeasonalityPreview = function() {
    const methodSelect = document.getElementById('seasonality_method');
    const selectedMethod = methodSelect.value;

    const time = document.getElementById('seasonality_time');
    const selectedAggregationTime = time.value;

    const geo = document.getElementById('seasonality_geography');
    const selectedAggregationGeo = geo.value;

    const group = document.getElementById('seasonality_groupSCU');
    const selectedAggregationGroup = group.value;


    let csvFilePath;
    if (selectedMethod === 'not_selected' || selectedAggregationTime === 'not_selected' || selectedAggregationGeo === 'not_selected' || selectedAggregationGroup === 'not_selected') {
        const iframe = document.getElementById('tb_seasonality');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

        iframeDoc.open();
        iframeDoc.write(
            `<html>
            <head>
                <title>Сообщение</title>
                <style>
                    body {
                        font-family: Arial, sans-serif;
                        background-color:rgb(255, 255, 255);
                        text-align: start;
                        padding: 20px;
                    }
                    h1 {
                        color: #ff0000;/* Цвет текста сообщения */
                    }
                </style>
            </head>
            <body>
                <h5>Заполните все поля</h5>
            </body>
            </html>`
        );
        iframeDoc.close(); 
    } else if (selectedMethod === 'fluctuation_trend') {
        csvFilePath = './images/demo_file/test_forecast_csv.csv'; 
    } else if (selectedMethod === 'fluctuation_average') {
        csvFilePath = './images/demo_file/test_forecast_csv2.csv'; 
    } else {
        console.warn('Неизвестный метод прогнозирования:', selectedMethod);
        return; 
    }

    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: function(results) {
            const iframe = document.getElementById('tb_seasonality');
            const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

            // Очищаем содержимое iframe
            iframeDoc.open();
            iframeDoc.write(
                `<html>
                <head>
                    <title>CSV Data</title>
                    <style>
                        body {
                            font-family: Arial, sans-serif;
                            background-color: #f4f4f4;
                        }
                        table {
                            width: 100%;
                            border-collapse: collapse;
                            margin-top: 0px;
                            font-size: 12px;
                        }
                        th {
                            background-color:  rgb(163, 210, 242); /* Цвет фона заголовков */
                            font-size: 14px;
                            color: white; /* Цвет текста заголовков */
                            padding: 10px;
                        }
                        td {
                            border: 1px solid #ddd; /* Цвет границ ячеек */
                            padding: 8px;
                        }
                        tr:nth-child(even) {
                            background-color: #f2f2f2; /* Цвет фона четных строк */
                        }
                        tr:hover {
                            background-color: #ddd; /* Цвет фона строки при наведении */
                        }
                    </style>
                </head>
                <body>
                    <table>
                        <thead>
                            <tr>`
            );

            // Добавляем заголовки
            const headers = Object.keys(results.data[0]);
            headers.forEach(header => {
                iframeDoc.write(`<th>${header}</th>`);
            });
            iframeDoc.write('</tr></thead><tbody>');

            // Добавляем строки данных
            results.data.forEach(row => {
                iframeDoc.write('<tr>');
                Object.values(row).forEach(cell => {
                    iframeDoc.write(`<td>${cell}</td>`);
                });
                iframeDoc.write('</tr>');
            });

            iframeDoc.write('</tbody></table>');
            iframeDoc.write('</body></html>');
            iframeDoc.close();
        }
    });
}