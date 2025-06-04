export default window.planner_saveButton = function() {
    const plannerBlock= document.getElementById('planner__block');
    const selectedplannerBlock = plannerBlock.value;

    const plannerScenarioCustom = document.getElementById('planner__scenarioCustom');
    const selectedplannerScenarioCustom = plannerScenarioCustom.value;

    const plannerScenarioRepeat = document.getElementById('planner__scenarioRepeat');
    const selectedplannerScenarioRepeat = plannerScenarioRepeat.value;

    const day = document.getElementById('planner_dayOfWeekRepeat').value;
    const time = document.getElementById('planner_selectedTime').value;
    const startDate = document.getElementById('planner_selectedStartDate').value;
    const endDate = document.getElementById('planner_selectedEndDate').value;


    let csvFilePath;
    if (selectedplannerBlock === 'not_selected' || selectedplannerScenarioCustom === 'not_selected' || selectedplannerScenarioRepeat === 'not_selected') {
        const iframe = document.getElementById('planner_Iframe');
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
          return;



    } else {
        const iframe = document.getElementById('planner_Iframe');
        const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
        frameDocument.body.innerHTML = 
        `<h3>Выбранные значения:</h3>
        <table border="1">
            <tr>
                <th>День недели</th>
                <th>Время</th>
                <th>Дата начала</th>
                <th>Дата окончания</th>
            </tr>
            <tr>
            <td>${day}</td>
                <td>${day}</td>
                <td>${time}</td>
                <td>${startDate}</td>
                <td>${endDate}</td>
            </tr>
        </table>`
    ;
        // iframeDoc.open();
        // iframeDoc.write(
        //     `<html>
        //       <head>
        //           <title>Сообщение</title>
        //           <style>
        //               body {
        //                   font-family: Arial, sans-serif;
        //                   background-color:rgb(255, 255, 255);
        //                   text-align: start;
        //                   padding: 20px;
        //               }
        //               h1 {
        //                   color: #ff0000;/* Цвет текста сообщения */
        //               }
        //           </style>
        //       </head>
        //       <body>
        //           <h5>Выберите</h5>
        //       </body>
        //       </html>`
        //   );
        //   iframeDoc.close();
          return;
        

    } 
    // else {
    //     console.warn('Неизвестный метод прогнозирования:', selectedMethod);
    //     return; // Выход из функции, если метод не распознан
    // }
    
    // Papa.parse(csvFilePath, {
    //     download: true,
    //     header: true,
    //     complete: function(results) {
    //         const iframe = document.getElementById('planner_Iframe');
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