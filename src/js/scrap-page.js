axios.get('/recados').then(response => {response.data.forEach(item => {
lista.innerHTML += `${item.nome} <br/>`})}).catch(error => console.log(error));
let recados = [];
document.getElementById("formulario").addEventListener("submit", adicionarRecado);
async function adicionarRecado(e) {e.preventDefault();
  const id = document.getElementById('idRecado');
  const detalhamento = document.getElementById('detalhamento');
  const descricao = document.getElementById('descricao');
  const recadoM = {
    detalhamento: detalhamento.value,
    descricao: descricao.value,
  }
  try {
    if (!id.value) {
      await axios.post("/recados", recadoM);
    } else {
      await axios.put(`/recados/${id.value}`, recadoM);
    }
  } catch (error) {
    console.error('Erro de Requisição: ', error);
  }
  listarRecados();
  id.value = "";
  detalhamento.value = "";
  descricao.value = "";
}
async function listarRecados() {
  try {
    let response = await axios.get('/recados');
    if (!response.data.length) {
      return;
    }
    recados = response.data;
    renderizarRecados();
  } catch (error) {
    console.error('Erro de Requisição: ', error)
  }
}
function renderizarRecados() {
  const listaDeRecados = document.getElementById('listaDeRecados');
  listaDeRecados.innerHTML = "";
  for (let recado of recados) {
    const btn = `<button type="button" class="btn btn-success" onclick="editarRecado('${recado.id}')">
                    Editar
                  </button>
                  <button type="button" class="btn btn-danger" onclick="apagarRecado('${recado.id}')">
                    Apagar
                  </button>`;
    listaDeRecados.innerHTML += `
                              <tr class="itens-recados">
                              <td> ${recado.id}</td>
                              <td> ${recado.detalhamento}</td>
                              <td> ${recado.descricao}</td>
                              <td>${btn}</tr>
                              </tr>`;
    document.getElementById("descricao").focus();
  }
}
async function apagarRecado(idDeletar) {
try {
  const response = await axios.delete(`/recados/`, {
    data: { id: idDeletar }
  }) ;
  if (response.status != 204) {
    return
  }
  const index = recados.findIndex((recado) => idDeletar == recado.id);
    recados.splice(index, 1);
    renderizarRecados();
  } catch (error) {
  console.error(error)
  }
}
// async function editarRecado(idEditar) {
//   const edit = await axios.put(`/recados/`, {
//     data: { id: idEditar }
//   });
//   const indexRecado = recados.findIndex((recadosAut) => {
//   return recadosAut.id === id
//   });
//   recados[indexRecado].document.getElementById('idRecado').value = edit.idRecado
//   recados[indexRecado].document.getElementById('detalhamento').value = edit.detalhamento
//   recados[indexRecado].cdocument.getElementById('descricao').value = edit.descricaos
//   listagem.innerHTML += "";
// }