/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/img-redundant-alt */
/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-array-index-key */
/* eslint-disable import/extensions */
/* eslint-disable arrow-body-style */
/* eslint-disable no-debugger */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable import/order */
import './index.css';
import Carrinho from '../../assets/img/produtos/carrinho.png';
import avaliacao from '../../assets/img/produtos/avaliacao.png';
import Pix from '../../assets/img/produtos/pix.svg';
import * as React from 'react';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import Aside from '../../components/aside';
import LogoutIcon from '../../assets/img/icons/edit-icon.png';
import makeToast from '../../shared/toaster';
import Pagination from '../../components/Pagination';
import VizuIcon from '../../assets/img/icons/Visualizar.png';
import ReactStars from 'react-stars';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function ListaProdutos() {
  const nameRef = React.createRef();
  const [requests, setRequests] = useState([]);
  const [produto, setProduto] = useState({});
  const [body, setBody] = React.useState({
    nome: '',
    avaliacao: 0,
    descricao: '',
    preco: 0,
    qtdEstoque: 0,
    imagesPath: 0,
    categoriaId: 0,
    status: false,
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [categorias, setCategorias] = useState([]);
  const [cargo, setCargo] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const productsPerPage = 10;

  const handleBody = (e) => {
    const newBody = { ...body, [e.target.name]: e.target.value };
    if (e.target.name === 'categoriaId') {
      newBody.categoriaId = parseInt(e.target.value, 10);
    }
    setBody(newBody);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeModal2 = () => {
    setIsModalOpen2(false);
  };

  const buscaProdutos = (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    fetch(
      `http://localhost:8080/produto/buscaProdutos/?nomeFiltro=${nameRef.current.value}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar produtos, tente novamente');
        return null;
      })
      .then((data) => {
        const productsOnPage = data.produtos.slice(startIndex, endIndex);
        setRequests(productsOnPage);
        const totalPage = Math.ceil(data.qtdTotal / productsPerPage);
        setTotalPages(totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const filtrar = (page) => {
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;

    setRequests([]);
    fetch(
      `http://localhost:8080/produto/buscaProdutos/?nomeFiltro=${nameRef.current.value}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar produtos, tente novamente');
        return null;
      })
      .then((data) => {
        const productsOnPage = data.produtos.slice(startIndex, endIndex);
        setRequests(productsOnPage);
        const totalPage = Math.ceil(data.qtdTotal / productsPerPage);
        setTotalPages(totalPage);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    buscaProdutos(currentPage);
  }, [currentPage]);

  const atualizaAcesso = (id) => {
    fetch(
      `http://localhost:8080/produto/atualizaStatusProduto/${id}?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.text();
        }
        makeToast('error', 'Erro na atualização de status do produto.');
        return null;
      })
      .then(() => {
        window.location.href = '/listaProdutos';
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/listaProdutos';
      });
  };

  const buscaProduto = (id) => {
    fetch(`http://localhost:8080/produto/listaProduto/${id}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar produto, tente novamente');
        return null;
      })
      .then((data) => {
        setProduto(data);
        setCategoriaSelecionada(data.categoria.id);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const atualizaProduto = (id) => {
    body.preco = parseFloat(body.preco);
    body.categoriaId = categoriaSelecionada;
    fetch(
      `http://localhost:8080/produto/atualizaProduto/${id}?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      }
    )
      .then((response) => {
        if (response.ok) {
          makeToast('success', 'Produto atualizado');
          return response.text();
        }

        makeToast('error', 'Erro na atualização de produto');
        return null;
      })
      .then(() => {
        setTimeout(() => {
          window.location.href = '/listaProdutos';
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/listaProdutos';
      });
  };

  useEffect(() => {
    if (isModalOpen) {
      setBody(produto);
    }
  }, [isModalOpen, produto]);

  useEffect(() => {
    if (isModalOpen2) {
      setBody(produto);
    }
  }, [isModalOpen2, produto]);

  const handleCategoriaChange = (event) => {
    const novaCategoriaId = parseInt(event.target.value, 10);
    setCategoriaSelecionada(novaCategoriaId);
    setBody((prevBody) => ({
      ...prevBody,
      categoriaId: novaCategoriaId,
    }));
  };

  useEffect(() => {
    fetch(`http://localhost:8080/categoria/buscaCategoriasSemProduto`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao carregar caegorias, tente novamente');
        return null;
      })
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    fetch(
      `http://localhost:8080/usuario/informacoes?jwtToken=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        }

        makeToast('error', 'Erro ao verificar usuario.');
        return null;
      })
      .then((data) => {
        setCargo(data.grupo);
      })
      .catch((err) => {
        console.error(err);
        window.location.href = '/listaUsuarios';
      });
  }, []);

  let disabled;

  if (cargo === 'ESTOQUISTA') {
    disabled = true;
  } else {
    disabled = false;
  }

  const handleUpload = async (image) => {
    if (image) {
      const formData = new FormData();
      formData.append('key', '5d7b99eb4e0e934e0de6dbfce6cd0859');
      formData.append('image', image);

      try {
        const response = await fetch('https://api.imgbb.com/1/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const imageUrl = data.data.url;
          setBody((prevBody) => ({
            ...prevBody,
            imagesPath: [...prevBody.imagesPath, imageUrl],
          }));
        } else {
          console.error('Erro ao fazer upload da imagem');
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };
  const removeImage = (index) => {
    setBody((prevBody) => ({
      ...prevBody,
      imagesPath: prevBody.imagesPath.filter((_, i) => i !== index),
    }));
  };

  const handleImageClick = () => {
    const inputElement = document.getElementById('image-upload');
    inputElement.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  return (
    <>
      <Aside />
      <div className="container">
        <div className="fundo">
          <div className="filtro">
            <input
              type="text"
              name="nome"
              id="nome"
              ref={nameRef}
              placeholder="Pesquisar produto"
              className="inserir"
            />
            <button
              type="button"
              className="botao-Filtro"
              onClick={() => filtrar(currentPage)}
            >
              <p>Filtrar</p>
            </button>
            <div className="adicionar-Produto" />
            <button
              type="button"
              className="botao-adicionar"
              disabled={cargo === 'ESTOQUISTA'}
              onClick={() => {
                if (cargo !== 'ESTOQUISTA') {
                  window.location.href = '/cadastroProduto';
                }
              }}
            >
              <h2>Adicionar produto</h2>
              <p>+</p>
            </button>
          </div>
          <tbody className="user-list">
            <table className="request-table">
              <thead className="lista">
                <th>Nome</th>
                <th>Valor</th>
                <th>Quatidade em estoque</th>
                <th>Status</th>
                <th>Editar</th>
                <th>Visualizar</th>
              </thead>
            </table>
            {requests &&
              requests.map((client) => (
                <tr className="coluns">
                  <td className="user-data product-name">
                    <p>{client.nome}</p>
                  </td>
                  <td className="user-data">{client.preco}</td>
                  <td className="user-data">{client.qtdEstoque}</td>
                  <td className="user-data">
                    <button
                      disabled={disabled}
                      type="button"
                      className={`status ${
                        client.status ? 'ativo' : 'inativo'
                      } ${cargo !== 'ESTOQUISTA' ? 'able' : 'disabled'}`}
                      onClick={() => {
                        if (cargo !== 'ESTOQUISTA') {
                          atualizaAcesso(client.id);
                        }
                      }}
                    >
                      {client.status ? 'Ativo' : 'Inativo'}
                    </button>
                  </td>
                  <td
                    className="user-edit"
                    onClick={() => {
                      buscaProduto(client.id);
                      setIsModalOpen(true);
                    }}
                  >
                    <img
                      src={LogoutIcon}
                      alt="GeekOpolis Logout Icon"
                      id="edit"
                    />
                  </td>
                  <td
                    disabled={disabled}
                    onClick={() => {
                      if (cargo !== 'ESTOQUISTA') {
                        buscaProduto(client.id);
                        setIsModalOpen2(true);
                      }
                    }}
                  >
                    <img
                      className={`vizu ${
                        cargo !== 'ESTOQUISTA' ? 'able' : 'disabled'
                      } `}
                      src={VizuIcon}
                      alt="GeekOpolis Logout Icon"
                      id="edit"
                    />
                  </td>
                </tr>
              ))}
          </tbody>

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(newPage) => setCurrentPage(newPage)}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        className="modal-content"
        overlayClassName="modal-overlay"
      >
        <div className="input-container">
          {cargo === 'ADMIN' && (
            <>
              <p>Nome do Produto</p>
              <input
                type="text"
                name="nome"
                value={body?.nome || ''}
                className="rounded-input"
                onChange={handleBody}
              />
            </>
          )}
          {cargo === 'ESTOQUISTA' && <p>Nome do Produto: {body?.nome || ''}</p>}
        </div>
        <div className="input-container">
          {cargo === 'ADMIN' && (
            <>
              <p>Categoria</p>
              <select
                name="categoriaId"
                className="rounded-select"
                value={categoriaSelecionada}
                onChange={handleCategoriaChange}
              >
                <option>---</option>
                {categorias.map((categoria) => (
                  <option key={categoria.id} value={categoria.id}>
                    {categoria.nome}
                  </option>
                ))}
              </select>
            </>
          )}
          {cargo === 'ESTOQUISTA' && <p>Categoria: {body?.categoria?.nome}</p>}
        </div>
        <div className="input-container">
          <p>Avaliação</p>
        </div>
        <div style={cargo === 'ESTOQUISTA' ? { pointerEvents: 'none' } : {}}>
          <ReactStars
            count={5}
            size={40}
            disabled={disabled}
            value={body?.avaliacao}
            onChange={handleBody}
            color2="#fdd835"
          />
        </div>
        <div className="input-container">
          {cargo === 'ADMIN' && (
            <>
              <p>Descrição</p>
              <textarea
                name="descricao"
                disabled={disabled}
                value={body?.descricao}
                onChange={handleBody}
              />
            </>
          )}
          {cargo === 'ESTOQUISTA' && <p>Descrição: {body?.descricao}</p>}
        </div>
        <div className="input-container">
          {cargo === 'ADMIN' && (
            <>
              <p>Valor</p>
              <input
                disabled={disabled}
                type="valor"
                name="preco"
                value={body?.preco}
                className="rounded-input"
                onChange={handleBody}
              />
            </>
          )}
          {cargo === 'ESTOQUISTA' && <p>Valor: {body?.preco}</p>}
        </div>
        <div className="input-container">
          <p>Quantidade</p>
          <input
            type="number"
            id="qtdEstoque"
            name="qtdEstoque"
            value={body?.qtdEstoque}
            onChange={handleBody}
            className="rounded-input"
          />
        </div>
        {cargo === 'ESTOQUISTA' && (
          <div className="input-container">
            <p>Imagens:</p>
            <div className="mini-imagens-container">
              {Array.isArray(body.imagesPath) &&
                body.imagesPath.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Imagem ${index}`}
                    className="mini-imagem"
                  />
                ))}
            </div>
          </div>
        )}

        {cargo === 'ADMIN' && (
          <>
            {body && body.imagesPath && (
              <>
                <div className="images">
                  <ul>
                    {body.imagesPath.map((url, index) => (
                      <li key={index}>
                        <div>
                          <img src={url} alt="img" />
                        </div>
                        <div>
                          <button
                            type="submit"
                            onClick={() => removeImage(index)}
                          >
                            <MdDelete size={25} />
                          </button>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="upload" onClick={handleImageClick}>
                  <MdCloudUpload size={48} />
                  <span>Adicionar Imagem</span>
                  <input
                    type="file"
                    id="image-upload"
                    accept="image/*"
                    onChange={handleImageChange}
                    style={{ display: 'none' }}
                  />
                </div>
              </>
            )}
          </>
        )}
        <div className="modal-botoes">
          <button
            type="button"
            className="botao-Filtro"
            onClick={() => atualizaProduto(produto.id)}
          >
            <p>Editar</p>
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={isModalOpen2}
        onRequestClose={closeModal2}
        className="modal-content products-list"
        overlayClassName="modal-overlay"
      >
        <div className="modal-content-container">
          <div className="carousel-container products-list-carousel-container">
            <Slider
              infinite={true}
              speed="500"
              slidesToShow={1}
              slidesToScroll={1}
              dots={true}
              arrows={false}
            >
              {Array.isArray(body.imagesPath) ? (
                body.imagesPath.map((image, index) => (
                  <div key={index} className="carousel-slide">
                    <img
                      src={image}
                      alt={`Image ${index}`}
                      className="carousel-image"
                    />
                  </div>
                ))
              ) : (
                <div>Nenhuma imagem disponível</div>
              )}
            </Slider>
          </div>
          <div className="text-container">
            <div className="categoria-nome">{body.categoria?.nome}</div>
            <div className="produto-nome">{body.nome}</div>
            <div style={{ pointerEvents: 'none' }}>
              <ReactStars
                count={5}
                size={40}
                disabled={disabled}
                value={body?.avaliacao}
                onChange={handleBody}
                color2="#fdd835"
              />
            </div>
            <div className="preco-produto">R$: {body.preco}</div>
            <div className="adicionar-ao">
              <div className="box">
                <div className="overlap-2">
                  <div className="rectangle" />
                  <div className="adicionar-ao-2">Adicionar ao Carrinho</div>
                  <img
                    className="carrinho-carrinho"
                    alt="Carrinho carrinho"
                    src={Carrinho}
                  />
                  <div className="rectangle-2" />
                </div>
              </div>
            </div>
            <div className="descricao-produto">
              <p>Descrição do produto:</p>
              <br />
              {body.descricao}
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default ListaProdutos;
