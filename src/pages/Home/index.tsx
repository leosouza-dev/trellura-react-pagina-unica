import React, { useState } from 'react';
import Modal from 'react-modal';

import conecta from '../../services/api/index';
import { Form, Header, Mensagem, MainContainer, List, Card, OnlineList, FormModal } from './style';

const conexao = conecta();
Modal.setAppElement('#root');

interface Card {
  id: number;
  title: string;
  status: number;
}

const Home = () => {
  const [totalDeUsuariosOnline, setTotalDeUsuariosOnline] = useState(0);
  const [usuario, setUsuario] = useState(''); // nome do usuario que esta entrando
  const [listaDeUsuariosOnline, setListaDeUsuariosOnline] = useState<string[]>([])
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tipoModal, setTipoModal] = useState('');
  const [tituloNovoCard, setTituloNovoCard] = useState('');
  const [listaDeCards, setListaDeCards] = useState<Card[]>([]);
  const [noGrupo, setNoGrupo] = useState(false);

  const [tituloSelecionado, setTituloSelecionado] = useState('');
  const [idSelecionado, setIdSelecionado] = useState(0);
  const [statusSelecionado, setStatusSelecionado] = useState(0);

  // atualiza o numero de pessoas no header - quando conecta com o hub
  conexao.on('atualizarTotalUsuarios', (totalUser: number) =>
  setTotalDeUsuariosOnline(totalUser),
  );

  // atualiza o nome do usuário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUsuario(value);
  };

  // envia o nome do usuário e entra no grupo
  async function handleSubmit(event: any) {
    event.preventDefault();
    conexao.invoke('Entrar', usuario).then(() => {
    });
    console.log('nome do usuário', usuario)
    setUsuario('');
  }

  // Quando a pessoa entra no grupo, o hub chama esse método para atualizar a lista de pessoas online
  conexao.on('entrandoNoGrupo', (usuarios: string[]) => setListaDeUsuariosOnline(usuarios));
  conexao.on('entrouNoGrupo', (cards: Card[]) => {
    console.log(cards);
    setListaDeCards(cards);
    setNoGrupo(true);
    console.log("Lista de Cards", listaDeCards)
  })

  // atualiza o titulo do novo card
  function handleChangeNovoCard(e: React.ChangeEvent<HTMLInputElement>) {
    const { value } = e.target;
    setTituloNovoCard(value);
  }

  //função que envia um novo card
  async function handleSubmitNovoCard(event: any) {

    console.log('tentando criar um card...', tituloNovoCard)

    setModalIsOpen(false);

    setTituloNovoCard('');

    conexao.invoke('CriarCard', tituloNovoCard).then(() => {
    }).catch((error: any) => console.log(error))
    event.preventDefault();
  }

  //atualizarBoard após enviard novo card
  conexao.on('atualizarBoard', (cards: Card[]) => {
    console.log('cards que vieram do servdior:', cards)
    setListaDeCards(cards)
  });

  // abrir um card...
  function handleAbrirCard(e: any) {
    const { target } = e;
    console.log('target:', target);
    console.log('value:', target.value);

    const cardToUpdate = listaDeCards.find(c => c.id == target.value)

    if(cardToUpdate != null){
      setIdSelecionado(target.value);
      setStatusSelecionado(cardToUpdate.status)
      setTituloSelecionado(cardToUpdate?.title);
      setTipoModal('abreCard');
      setModalIsOpen(true);
    }
  }

  function handleAtualizaCard(){

  }

  function handleExcluirCard(){

  }

  return (
  <>
  <Header>
    <Form onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={usuario}
        type="text"
        placeholder="Digite o seu nome"
      />
      <button type="submit">Entrar</button>
    </Form>

    <h1>
      Trellura
    </h1>

    <div>
      <span>{totalDeUsuariosOnline} pessoas</span>
    </div>
  </Header>

  {noGrupo == false && <Mensagem>Bem vinda/o ao Trellura!</Mensagem>}

  {noGrupo && 
    <MainContainer>
    <div className="divTarefas">
      <List>
        <h1>Tarefa</h1>
        <ul>
          {listaDeCards.filter(c => c.status == 1).map(card => (
              // <Card onClick={handleAbrirCard} key={card.id}><p>{card.title}</p>
              <label onClick={handleAbrirCard}>
                <Card key={card.id}><p>{card.title}</p>
                    <input type="checkbox" value={card.id} />
                </Card>
              </label>
          ))}
        </ul>
        <button onClick={() => {setModalIsOpen(true); setTipoModal('novoCard')}} type="button">
          Adicionar cartão
        </button>
      </List>

      <List>
        <h1>Fazendo</h1>
        <ul>
        {listaDeCards.filter(c => c.status == 2).map(card => (
            <Card key={card.id}><p>{card.title}</p></Card>
          ))}
        </ul>
      </List>

      <List>
        <h1>Testando</h1>
        <ul>
        {listaDeCards.filter(c => c.status == 3).map(card => (
            <Card key={card.id}><p>{card.title}</p></Card>
          ))}
        </ul>
      </List>

      <List>
        <h1>Feito</h1>
        <ul>
        {listaDeCards.filter(c => c.status == 4).map(card => (
            <Card key={card.id}><p>{card.title}</p></Card>
          ))}
        </ul>
      </List>
    </div>

    <OnlineList>
    <h1>Online</h1>

    <ul>
      {listaDeUsuariosOnline.map(usuario => (
        <li key={usuario}>{usuario}</li>
      ))}
    </ul>
    </OnlineList>
  </MainContainer>
  }

  <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        style={{
          content: {
            width: '700px',
            height: '300px',
            textAlign: 'center',
            margin: '0 auto',
            background: '#E5E5E5',
            borderRadius: '10px',
            boxShadow: '0 1px 4px 0 rgba(192, 208, 230, 0.8)',
          },
        }}
      >
        {tipoModal == 'abreCard' &&
        <>
          <h1>Editar Card</h1>
          <FormModal onSubmit={handleAtualizaCard}>
            <input type="text" value={tituloSelecionado}/>
            <button>Atualizar</button> 

            <div>
              <select value={statusSelecionado}>
                <option value="1">Tarefa</option>
                <option value="2">Fazendo</option>
                <option value="3">Testando</option>
                <option value="4">Feito</option>
              </select>
            </div>
          </FormModal>

          <button onClick={handleExcluirCard}>Excluir Card</button>
        </>
        }

        {tipoModal == 'novoCard' &&
        <>
          <h1>Adiciona um novo cartão</h1>
          <FormModal onSubmit={handleSubmitNovoCard}>
            <input
              onChange={handleChangeNovoCard}
              value={tituloNovoCard}
              type="text"
              placeholder="Digite o nome da tarefa"
            />
            <button type="submit">Adicionar</button>

          </FormModal>
          <button
            onClick={() => setModalIsOpen(false)}
            type="button"
          >
            Cancelar
          </button>
        </>
        }
      </Modal>
  </>
  );
};

export default Home;
