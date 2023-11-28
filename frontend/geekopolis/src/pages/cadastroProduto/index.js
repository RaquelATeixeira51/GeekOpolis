/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable react/jsx-boolean-value */
/* eslint-disable import/no-extraneous-dependencies */
import * as React from 'react';
import { useEffect, useState } from 'react';
import ReactStars from 'react-stars';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { Navigate } from 'react-router-dom';
import Aside from '../../components/aside';
import Logo from '../../assets/img/logo/GeekOpolisLogo.png';
import './index.css';
import makeToast from '../../shared/toaster';

export default function CadastroProduto() {
  const [categorias, setCategorias] = useState([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(0);

  const nomeRef = React.createRef();
  const descricaoRef = React.createRef();
  const precoRef = React.createRef();
  const qtdEstoqueRef = React.createRef();

  const [rating, setRating] = useState(0);

  const [redirect, setRedirect] = React.useState('');
  const [imageUrls, setImageUrls] = useState([]);

  const handleRatingChange = (value) => {
    setRating(value);
  };

  const handleImageClick = () => {
    const inputElement = document.getElementById('image-upload');
    inputElement.click();
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
        makeToast('error', 'Erro ao carregar categorias, tente novamente');
        return null;
      })
      .then((data) => {
        setCategorias(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
          setImageUrls([...imageUrls, imageUrl]);
        } else {
          console.error('Erro ao fazer upload da imagem');
        }
      } catch (error) {
        console.error('Erro ao fazer upload da imagem:', error);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUpload(file);
    }
  };

  const removeImage = (index) => {
    const updatedImageUrls = [...imageUrls];
    updatedImageUrls.splice(index, 1);
    setImageUrls(updatedImageUrls);
  };

  const handleRegisterProduto = () => {
    fetch(
      `http://localhost:8080/produto/incluiProduto?token=${localStorage.getItem(
        'token'
      )}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nome: `${nomeRef.current.value}`.trim(),
          avaliacao: rating,
          descricao: `${descricaoRef.current.value}`.trim(),
          preco: precoRef.current.value,
          qtdEstoque: qtdEstoqueRef.current.value,
          imagesPath: imageUrls,
          categoriaId: categoriaSelecionada,
          status: true,
        }),
      }
    )
      .then((response) => {
        if (response.ok) {
          setRedirect('/listaProdutos');
          return response.json();
        }
        return null;
      })
      .catch((error) => {
        console.log(error);
        makeToast('Erro ao cadastrar, tente novamente');
      });
  };

  const handleCategoriaChange = (event) => {
    const novaCategoriaId = parseInt(event.target.value, 10);
    setCategoriaSelecionada(novaCategoriaId);
  };

  if (redirect !== '') return <Navigate to={redirect} />;

  return (
    <>
      <Aside />
      <div className="login-form">
        <img
          src={Logo}
          className="geekopolis-login-logo"
          alt="Geekopolis logo"
        />
        <div className="input-container">
          <p>Nome do Produto</p>
          <input
            type="text"
            id="nome"
            ref={nomeRef}
            className="rounded-input"
          />
          <div className="input-container">
            <p>Categoria</p>
            <select
              name="categoria"
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
          </div>
          <div className="input-container">
            <p>Avaliação</p>
          </div>
          <ReactStars
            count={5}
            size={40}
            half={true}
            onChange={handleRatingChange}
            color2="#fdd835"
          />
          <div className="input-container">
            <p>Descrição</p>
            <textarea ref={descricaoRef} />
          </div>
          <div className="input-group">
            <div className="double-input">
              <div>
                <p>Preço</p>
                <input
                  type="number"
                  id="preco"
                  ref={precoRef}
                  className="preco register-price-input"
                />
              </div>
              <div>
                <p>Quantidade em estoque</p>
                <input
                  type="number"
                  id="qtdEstoque"
                  ref={qtdEstoqueRef}
                  className="qtdEstoque"
                />
              </div>
            </div>
          </div>
          <div className="images">
            <ul>
              {imageUrls.map((url, index) => (
                <li key={index}>
                  <div>
                    <img src={url} alt="img" />
                  </div>
                  <div>
                    <button type="submit" onClick={() => removeImage(index)}>
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
          <div className="cadastrar-button">
            <button type="button" onClick={handleRegisterProduto}>
              <p>Cadastrar</p>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
