
function promo_OptimizationButton() {
    document.getElementById('promo_modal').style.display = 'flex';
}

function promo_closeModalButton() {
    document.getElementById('promo_modal').style.display = 'none';
}

function promo_saveModalButton() {
    const checkboxes = document.querySelectorAll('#promo_modalContent input[type="checkbox"]');
    const selectedOptions = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.name);
        }
    });

    // alert('Выбранные опции: ' + selectedOptions.join(', '));
}

// Экспортируем функции
export { promo_OptimizationButton, promo_closeModalButton, promo_saveModalButton };

// Глобальные функции
window.promo_OptimizationButton = promo_OptimizationButton;
window.promo_closeModalButton = promo_closeModalButton;
window.promo_saveModalButton = promo_saveModalButton;