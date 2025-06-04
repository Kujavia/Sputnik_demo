export function moduleOpen(path) {
  return fetch(path)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Реакция сети' + response.statusText);
      }
      return response.text();
    })
    .then((html) => {
      document.getElementById('mainContent').innerHTML = html;
      const blankBtns = document.querySelectorAll('.btn--blank');
      for (const btn of blankBtns){
        btn.addEventListener('click', (event) => {
          buttonToggleLoading(event.target.closest('.btn'))
          setTimeout( () => buttonToggleLoading(event.target.closest('.btn')), 1500);
        })
      }
    })
    .catch((error) => {
      console.error('Возникла проблема с операцией выборки:', error);
    });
}

export function buttonToggleLoading(elem) {
  elem.toggleAttribute('disabled');
  setTimeout(() => {
    elem.classList.toggle('btn--loading');
  }, 150);
}

window.buttonToggleLoading = buttonToggleLoading