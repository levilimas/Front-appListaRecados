axios.defaults.baseURL = 'https://git.heroku.com/back-app-lista-recados.git'

axios.get('/scraps').then(response => {response.data.forEach(item => {
lista.innerHTML += `${item.nome} <br/>`})}).catch(error => console.log(error));
let scraps = [];
document.getElementById("form").addEventListener("submit", addScrap);
async function addScrap(e) {e.preventDefault();
  const id = document.getElementById('idScrap');
  const detailing = document.getElementById('detailing');
  const description = document.getElementById('description');
  const scrapM = {
    detailing: detailing.value,
    description: description.value,
  }
  try {
    if (!id.value) {
      await axios.post("/Scraps", scrapM);
    } else {
      await axios.put(`/Scraps/${id.value}`, scrapM);
    }
  } catch (error) {
    console.error('request error: ', error);
  }
  listScraps();
  id.value = "";
  detailing.value = "";
  description.value = "";
}
async function listScraps() {
  try {
    let response = await axios.get('/Scraps');
    if (!response.data.length) {
      return;
    }
    Scraps = response.data;
    renderScrap();
  } catch (error) {
    console.error('request error: ', error)
  }
}
function renderScrap() {
  const listOfScraps = document.getElementById('listOfScraps');
  listOfScraps.innerHTML = "";
  for (let scrap of Scraps) {
    const btn = `<button type="button" class="btn btn-success" onclick="editScrap('${scrap.id}')">
                    Editar
                  </button>
                  <button type="button" class="btn btn-danger" onclick="deleteScrap('${scrap.id}')">
                    Apagar
                  </button>`;
    listOfScraps.innerHTML += `
                              <tr class="itens-Scraps">
                              <td> ${scrap.id}</td>
                              <td> ${scrap.detailing}</td>
                              <td> ${scrap.description}</td>
                              <td>${btn}</tr>
                              </tr>`;
    document.getElementById("description").focus();
  }
}
async function deleteScrap(idDelete) {
try {
  const response = await axios.delete(`/Scraps/`, {
    data: { id: idDelete }
  }) ;
  if (response.status != 204) {
    return
  }
  const index = Scraps.findIndex((scrap) => idDelete == scrap.id);
    Scraps.splice(index, 1);
    renderScrap();
  } catch (error) {
  console.error(error)
  }
}
// async function editScrap(idEdit) {
//   const edit = await axios.put(`/Scraps/`, {
//     data: { id: idEdit }
//   });
//   const indexScrap = Scraps.findIndex((ScrapsAut) => {
//   return ScrapsAut.id === id
//   });
//   Scraps[indexScrap].document.getElementById('idScrap').value = edit.idScrap
//   Scraps[indexScrap].document.getElementById('detailing').value = edit.detailing
//   Scraps[indexScrap].cdocument.getElementById('description').value = edit.descriptions
//   listagem.innerHTML += "";
// }