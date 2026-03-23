const mobileCartBtn = document.getElementById('mobileCartBtn');
const basketWrapper = document.getElementById('basketWrapper');
const basketCloseBtn = document.getElementById('basketCloseBtn');
const basketBackdrop = document.getElementById('basketBackdrop');

function openBasket() {
  if (!basketWrapper || window.innerWidth > 1100) return;

  basketWrapper.classList.add('is-open');
  basketWrapper.setAttribute('aria-hidden', 'false');
  document.body.classList.add('basket-open');
}

function closeBasket() {
  if (!basketWrapper) return;

  basketWrapper.classList.remove('is-open');
  basketWrapper.setAttribute('aria-hidden', 'true');
  document.body.classList.remove('basket-open');
}

function toggleBasket() {
  if (!basketWrapper) return;

  if (basketWrapper.classList.contains('is-open')) {
    closeBasket();
  } else {
    openBasket();
  }
}

if (mobileCartBtn) {
  mobileCartBtn.addEventListener('click', toggleBasket);
}

if (basketCloseBtn) {
  basketCloseBtn.addEventListener('click', closeBasket);
}

if (basketBackdrop) {
  basketBackdrop.addEventListener('click', closeBasket);
}
