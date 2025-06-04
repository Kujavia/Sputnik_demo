
function newProductOptimizationButton() {
    document.getElementById('new_product__modal').style.display = 'flex';
}

function newProductCloseModalButton() {
    document.getElementById('new_product__modal').style.display = 'none';
}

function newProductSaveModalButton() {
    const checkboxes = document.querySelectorAll('#new_product__modalContent input[type="checkbox"]');
    const selectedOptions = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.name);
        }
    });

    // alert('Выбранные опции: ' + selectedOptions.join(', '));
}

// Экспортируем функции
export {newProductOptimizationButton, newProductCloseModalButton, newProductSaveModalButton };

// Глобальные функции
window.newProductOptimizationButton = newProductOptimizationButton;
window.newProductCloseModalButton = newProductCloseModalButton;
window.newProductSaveModalButton = newProductSaveModalButton;