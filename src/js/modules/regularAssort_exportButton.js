export default window.tbRegAssortButton = function() {
    const fileUrl = './public/images/demo_file/test_forecast_csv.csv'; // Замените на нужный путь
    // Создаем временную ссылку
    const link = document.createElement('a');
    link.href = fileUrl;
    link.download = 'test_forecast_csv.csv'; // Имя файла при загрузке
    // Добавляем ссылку в документ
    document.body.appendChild(link);
    // Инициализируем клик по ссылке
    link.click();
    // Удаляем ссылку из документа
    document.body.removeChild(link);
}