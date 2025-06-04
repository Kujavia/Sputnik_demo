import {initBootstrapTooltips} from '../main';

// функция для Доп.сведения - Новинки
export default window.showContent_newProducts = function() {
    fetch('./src/html/new_products.html')
        .then(response => {
            // Проверяем, успешно ли выполнен запрос
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.text(); // Преобразуем ответ в текст
        })
        .then(html => {
            // Вставляем загруженный HTML в контейнер maincontent
            document.getElementById('mainContent').innerHTML = html;
            window.initializeTooltips();
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
  }
  