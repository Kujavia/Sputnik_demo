window.scenariosSave = () => {
  // универсальная логика сохранения
}

window.scenariosSaveOpen = () => {
  document.getElementById('scenariosSaveModal').style.display = 'block';
}

window.scenariosSaveClose = () => {
  closeModal('scenariosSaveModal');
  document.getElementById('scenariosSaveInput').value = '';
}

function scenariosSaveInputHandler(event) {
  if (event.target.value.length > 0){
    document.getElementById('scenariosSaveSubmit').disabled = false;
    return
  }
  if (event.target.value.length == 0){
    document.getElementById('scenariosSaveSubmit').disabled = true;
    return
  }
}

function scenariosSaveSubmit() {
  // scenariosSave()
  scenariosSaveClose();
}

function scenariosSaveInit() {
  document.getElementById('scenariosSaveInput').addEventListener('input', scenariosSaveInputHandler)
  document.getElementById('scenariosSaveSubmit').addEventListener('click', scenariosSaveSubmit)
}

(() => {
  scenariosSaveInit()
})()