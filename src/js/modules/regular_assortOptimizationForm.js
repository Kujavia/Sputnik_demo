
function tbRegAssortOptimizationButton() {
    document.getElementById('modal').style.display = 'flex';
}

function ra_closeModalButton() {
    document.getElementById('modal').style.display = 'none';
}

function ra_saveButton() {
    const checkboxes = document.querySelectorAll('#modalContent input[type="checkbox"]');
    const selectedOptions = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.name);
        }
    });

    // alert('Выбранные опции: ' + selectedOptions.join(', '));
}

// Экспортируем функции
export { tbRegAssortOptimizationButton, ra_closeModalButton, ra_saveButton };

// Глобальные функции
window.tbRegAssortOptimizationButton = tbRegAssortOptimizationButton;
window.ra_closeModalButton = ra_closeModalButton;
window.ra_saveButton = ra_saveButton;