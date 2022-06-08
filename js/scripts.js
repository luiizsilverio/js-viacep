const addressForm = document.getElementById('address-form')
const cepInput = document.getElementById('cep')
const addressInput = document.getElementById('address')
const cityInput = document.getElementById('city')
const neighborhoodInput = document.getElementById('neighborhood')
const region = document.getElementById('region')
const formInputs = document.querySelectorAll('[data-input]')
const closeButton = document.getElementById('close-message')

// Validate CEP input
cepInput.addEventListener("keypress", (e) => {
  const onlyNumbers = /[0-9]/;
  // const key = String.fromCharCode(e.keyCode)
  const key = e.key

  // allow only numbers
  if (!onlyNumbers.test(key)) {
    e.preventDefault()
    return
  }
});

cepInput.addEventListener("keyup", (e) => {
  const inputValue = e.target.value;

  if (inputValue.length === 8) {
    getAddress(inputValue);
  }
});

// Get address from API
const getAddress = async (cep) => {
  toggleLoader()
  cepInput.blur();
};

// Show or hide loader
const toggleLoader = () => {
  const fadeElement = document.getElementById('fade')
  const loaderElement = document.getElementById('loader')

  console.log(loaderElement)
  fadeElement.classList.toggle('hide')
  loaderElement.classList.toggle('hide')
}