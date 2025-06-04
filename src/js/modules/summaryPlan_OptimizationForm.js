
function summaryPlan_OptimizationButton() {
    document.getElementById('summaryPlan_modal').style.display = 'flex';
}

function summaryPlan_closeModalButton() {
    document.getElementById('summaryPlan_modal').style.display = 'none';
}

function summaryPlan_saveModalButton() {
    const checkboxes = document.querySelectorAll('#summaryPlan_modalContent input[type="checkbox"]');
    const selectedOptions = [];
    
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            selectedOptions.push(checkbox.name);
        }
    });

    // alert('Выбранные опции: ' + selectedOptions.join(', '));
}

export {summaryPlan_OptimizationButton, summaryPlan_closeModalButton, summaryPlan_saveModalButton };

window.summaryPlan_OptimizationButton = summaryPlan_OptimizationButton;
window.summaryPlan_closeModalButton = summaryPlan_closeModalButton;
window.summaryPlan_saveModalButton = summaryPlan_saveModalButton;