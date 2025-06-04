
export default window.summaryPlan_PreviewButton = function() {
    const aggregationTime = document.getElementById('summary_plan_time');
    const selectedAggregationTime = aggregationTime.value;

    const aggregationGeo = document.getElementById('summary_plan_geography');
    const selectedAggregationGeo = aggregationGeo.value;

    // const aggregationGroup = document.getElementById('summary_plan_groupSCU');
    // const selectedAggregationGroup = aggregationGroup.value;

    const aggregationParameter = document.getElementById('summary_plan_scu');
    const selectedAggregationParameter = aggregationParameter.value;

    const forecastParameter = document.getElementById('summary_plan_method');
    const selectedforecastParameter = forecastParameter.value;



    let csvFilePath;
    if (selectedAggregationTime !== 'not_selected' && selectedAggregationGeo !== 'not_selected' && selectedAggregationParameter !== 'not_selected' &&selectedforecastParameter !== 'not_selected') {
        csvFilePath = './images/demo_file/test_forecast_csv.csv'; 
    } else if (selectedAggregationTime === 'not_selected' || selectedAggregationGeo === 'not_selected' || selectedAggregationParameter === 'not_selected' || selectedforecastParameter === 'not_selected' ) {
        const iframe = document.getElementById('summaryPlan_PreviewIframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
          // Очищаем содержимое iframe и добавляем сообщение
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
                  <h5>Выберите все параметры</h5>
              </body>
              </html>`
          );
          iframeDoc.close();
          return; // Завершаем выполнение функции
        


    // } else if (selectedMethod === 'promo_weighted__custom') {
    //     csvFilePath = './images/demo_file/test_forecast_csv2.csv'; 
    } else {
        console.warn('Неизвестный метод прогнозирования:', selectedMethod);
        return; 
    }

    Papa.parse(csvFilePath, {
        download: true,
        header: true,
        complete: function(results) {
            const iframe = document.getElementById('summaryPlan_PreviewIframe');
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
                            background-color: #4CAF50; /* Цвет фона заголовков */
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