/*
Script em typescript para fazer cadastros de cidades

*/

// importando a biblioteca react e alguns hooks
import React, { useRef, useState, useEffect } from "react";

//importando o componente de cidades
import Cidade from "./Cidade";

// importando a api, na qual foi utilizada a biblioteca axios
// para fazer as requisições
import { api } from "./services/api";
import { CidadeDados } from "./models/cidade";
import "./App.css";

const App: React.FC = () => {
  // criando hooks useRef para obter as informações dos inputs de cadastro
  const nomeCidadeRef = useRef<HTMLInputElement>(null);
  const nomeEstadoRef = useRef<HTMLInputElement>(null);

  // criando hooks useState para atualizar o array de cidades e a cidade selecionada para ediar
  const [cidades, setCidades] = useState<CidadeDados[]>([]);
  const [cidadeParaEditar, setCidadeParaEditar] = useState<CidadeDados>();
  const [habilitarBotao, setHabilitarBotao] = useState(true);

  // criando hook useEffect para requisição dos dados do database e atualização do array de cidades
  useEffect(() => {
    async function fetchApi() {
      let resultado = await api.get<CidadeDados[]>("cidades");
      setCidades([...cidades, ...resultado.data]); // spead operator para pegar todas as cidades dentro de 'cidades' e concatenar com as cidades obtidas do banco de dados
    }
    fetchApi();
  }, []);

  // Função executada ao apertar o botão de salvar. Vai receber os valores dos inputs, cadastrar uma
  // nova cidade, adicionar no array de cidades e limpar os inputs.
  const handleSubmitForm = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    const nomeCidade = nomeCidadeRef.current?.value;
    const nomeEstado = nomeEstadoRef.current?.value;
    if (nomeCidade !== "" && nomeEstado !== "") {
      const res = await api.post("cidades", {
        nomeCidade,
        nomeEstado,
      } as CidadeDados);
      setCidades([...cidades, res.data]); // spead operator para pegar todas as cidades dentro de 'cidades' e concatenar com a nova cidade

      nomeCidadeRef.current!.value = "";
      nomeEstadoRef.current!.value = "";
    }
  };

  // Função executada ao apertar o botão de editar. Vai pegar os dados da cidade e colocar nos inputs.
  const handleEdit = async (cidade: CidadeDados) => {
    nomeCidadeRef.current!.value = cidade.nomeCidade;
    nomeEstadoRef.current!.value = cidade.nomeEstado;
    setHabilitarBotao(false);
    setCidadeParaEditar(cidade);
  };

  // Função executada ao apertar o botão de atualizar. Deve ser executada após o botão de editar ter sido pressionado.
  // Vai pegar os novos dados dos inputs e alterar os dados da cidade selecionada de acordo com seu id. Limpa os inputs no final
  const handleSubmitEdit = async (
    event: React.FormEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();

    if (cidadeParaEditar === undefined) return;

    const novaCidade = nomeCidadeRef.current!.value;
    const novoEstado = nomeEstadoRef.current!.value;

    await api.put(`cidades/${cidadeParaEditar.id}`, {
      nomeCidade: novaCidade,
      nomeEstado: novoEstado,
    } as CidadeDados);

    let resultado = await api.get<CidadeDados[]>("cidades");
    setCidades(resultado.data);

    nomeCidadeRef.current!.value = "";
    nomeEstadoRef.current!.value = "";
    setCidadeParaEditar(undefined);
    setHabilitarBotao(true);
  };

  // Função executada ao apertar o botão de delete. Vai deletar a cidade selecionada de acordo com o seu id.
  // No final atualiza a lista de cidades filtrando o id removido
  const handleDelete = (id: number) => {
    api.delete(`cidades/${id}`);
    setCidades(cidades.filter((cidade) => cidade.id !== id));
  };

  return (
    <div>
      <div>
        <div className="ui fixed inverted menu">
          <div className="ui container">
            <a href="/#" className="header item">
              Cadastro de cidades
            </a>
          </div>
        </div>
      </div>

      <div className="ui main container">
        <form className="ui form">
          <div className="fields">
            <div className="ten wide field">
              <label>Cidade</label>
              <input
                type="text"
                name="cidade"
                placeholder="Nome da cidade"
                ref={nomeCidadeRef}
              />
            </div>
            <div className="ten wide field">
              <label>Estado</label>
              <input
                type="text"
                name="estado"
                placeholder="Nome do estado"
                ref={nomeEstadoRef}
              />
            </div>

            <div className="four wide field">
              <button
                className="ui green button submit-button1"
                style={{ width: "100px" }}
                type="button"
                onClick={(e) => handleSubmitEdit(e)}
                disabled={habilitarBotao}
              >
                Atualizar
              </button>
            </div>

            <div className="four wide field">
              <button
                className="ui green button submit-button2"
                style={{ width: "100px" }}
                type="submit"
                onClick={(e) => handleSubmitForm(e)}
              >
                Salvar
              </button>
            </div>
          </div>
        </form>

        <div className="data">
          <table className="ui celled table">
            <thead>
              <tr>
                <th style={{ width: "50px", textAlign: "center" }}>#</th>
                <th>Cidade</th>
                <th>Estado</th>
                <th style={{ width: "164px" }}>Opções</th>
              </tr>
            </thead>

            <tbody>
              {/* Usando a função map para desempacotar todas as cidades dentro de 'cidades' */}
              {cidades.map((m, i) => (
                <Cidade
                  key={i}
                  id={m.id}
                  cidade={m.nomeCidade}
                  estado={m.nomeEstado}
                  onEdit={() => handleEdit(m)}
                  onDelete={() => handleDelete(m.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default App;
