
function populateUFs() {
  const ufSelect = document.querySelector("select[name=uf")

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(res => res.json())
    .then(states => {

      for(state of states) {
        ufSelect.innerHTML +=`<option value="${state.id}">${state.nome}</option>`
      }
    })
}

populateUFs()


function getCities(event) {
  const citiesSelect = document.querySelector("select[name=city")
  const stateInput = document.querySelector("input[name=state")
  citiesSelect.innerHTML = `<option value="">Selecione a cidade</option>`
  citiesSelect.disabled = true

  const ufValue = (event.target.value)

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text;

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
  fetch(url)
  .then(res => res.json())
  .then(cities => {

    for(city of cities) {
      citiesSelect.innerHTML +=`<option value="${city.nome}">${city.nome}</option>`
    }

    citiesSelect.disabled =false
  })

}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities)


  const itemsToCollect = document.querySelectorAll(".items-grid li")

  for(item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem)
  }

 const collectedItems = document.querySelector("input[name=items]")

  let selectedItems = []

  function handleSelectedItem(event) {
    const itemLi = event.target

    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id

    

    const alreadySelected = selectedItems.findIndex( item => item == itemId) // isso será true ou false
    
    if(alreadySelected >= 0) {
      const filteredItems = selectedItems.filter(item =>{
        const itemIsDifferent = item != itemId
        return itemIsDifferent
      })

      selectedItems = filteredItems
    }
    else {
      selectedItems.push(itemId)
    }

   collectedItems.value = selectedItems

  }