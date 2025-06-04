export default window.check_mark = function() {
    const statusElement = document.getElementById('check-mark_button');
    statusElement.style.display = 'inline';
    setTimeout(function() {
        statusElement.style.display = 'none';
    }, 5000);
}
