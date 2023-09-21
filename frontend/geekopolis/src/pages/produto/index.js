/* eslint-disable no-debugger */
import * as React from 'react';
import './index.css';
import { Navigate, useParams } from 'react-router-dom';
import makeToast from '../../shared/toaster';

export default function Produto() {
  const { id } = useParams();
  const [redirect, setRedirect] = React.useState('');
  const [product, setProduct] = React.useState({});

  
  React.useEffect(() => {
    fetch(`http://localhost:8080/produto/listaProduto/${id}`, {
      method: 'GET',
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        makeToast('error', 'Erro ao encontrar o produto.');
        setRedirect('/landing-page')
        return null;
      })
      .then((data) => {
        if (data) {
          setProduct(data)
        } else {
          makeToast('error', 'Erro ao encontrar o produto.');
          setRedirect('/landing-page')
        }
      })
      .catch((err) => {
        makeToast('error', err);
        setRedirect('/landing-page')
      })
  }, [])

  if (redirect !== '') return <Navigate to={redirect} />;


  return (
    <>
      {product.nome}
    </>
  );
}
