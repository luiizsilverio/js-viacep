const addressForm = document.getElementById('address-form')
const cepInput = document.getElementById('cep')
const addressInput = document.getElementById('address')
const cityInput = document.getElementById('city')
const neighborhoodInput = document.getElementById('neighborhood')
const regionInput = document.getElementById('region')
const formInputs = document.querySelectorAll('[data-input]')
const closeButton = document.getElementById('close-message')
const fadeElement = document.getElementById('fade')

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

  const apiUrl = `https://viacep.com.br/ws/${cep}/json/`

  const response = await fetch(apiUrl)

  const data = await response.json()

  // console.log(data)
  if (data.erro === "true") {
    if (!addressInput.hasAttribute("disabled")) {
      toggleDisabled()
    }
    addressForm.reset()
    toggleLoader()
    toggleMessage("CEP inválido, tente novamente.")
    return
  }

  if (addressInput.value === "") {
    toggleDisabled()
  }

  addressInput.value = data.logradouro
  cityInput.value = data.localidade
  neighborhoodInput.value = data.bairro
  regionInput.value = data.uf

  toggleLoader()

};

// Add or remove disabled attribute
const toggleDisabled = () => {
  if (regionInput.hasAttribute("disabled")) {
    formInputs.forEach((input) => {
      input.removeAttribute("disabled")
    })
  } else {
    formInputs.forEach((input) => {
      input.setAttribute("disabled", "disabled")
    })
  }
}

// Show or hide loader
const toggleLoader = () => {
  const loaderElement = document.getElementById('loader')
  fadeElement.classList.toggle('hide')
  loaderElement.classList.toggle('hide')
}

// Show or hide message
const toggleMessage  = (msg) => {
  const messageElement = document.getElementById('message')
  const messageText = document.querySelector('#message p')

  messageText.innerText = msg;

  fadeElement.classList.toggle('hide')
  messageElement.classList.toggle('hide')
}

// Close message modal
closeButton.addEventListener("click", () => toggleMessage())

// Save address
addressForm.addEventListener("submit", (e) => {
  e.preventDefault()
  toggleLoader()

  setTimeout(() => {
    toggleLoader()
    toggleMessage("Endereço salvo com sucesso!")
    addressForm.reset()
    toggleDisabled()
  }, 1500)
})
