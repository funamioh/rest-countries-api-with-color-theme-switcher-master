const toggle = document.querySelector('.btn-container')
const btnText = document.getElementById('theme-toggle-button')
const toggleIcon = document.getElementById('theme-toggle-icon')

toggle.addEventListener('click', () => {
  const html = document.querySelector('html')
  if (html.classList.contains('dark')) {
    html.classList.remove('dark')
    console.log("remoce dark");
    btnText.innerHTML = 'Light mode'
    toggleIcon.classList.remove('fa-moon')
    toggleIcon.classList.add('fa-sun')
  } else {
    html.classList.add('dark')
    btnText.innerHTML = 'Dark mode'
    toggleIcon.classList.remove('fa-sun')
    toggleIcon.classList.add('fa-moon')
  }
})
