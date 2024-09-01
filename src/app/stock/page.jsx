'use client';
import React, { useEffect, useState } from 'react';
import styles from "../page.module.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileExcel } from '@fortawesome/free-solid-svg-icons';

const Bienes = () => {
  const [data, setData] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newArticle, setNewArticle] = useState({
    id: '',
    articulo: '',
    color: '',
    talle: '',
    stock: 0,
  });
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const storedData = localStorage.getItem("db");
    if (storedData) {
      setData(JSON.parse(storedData));
    }
  }, []);

  const uniqueArticles = [...new Set(data.map(item => item.articulo))];

  const handleArticleClick = (article) => {
    setSelectedArticle(article === selectedArticle ? null : article);
  };

  const incrementStock = (id) => {
    const newData = data.map(item => 
      item.id === id ? { ...item, stock: item.stock + 1 } : item
    );
    setData(newData);
    localStorage.setItem("db", JSON.stringify(newData));
  };

  const decrementStock = (id) => {
    const newData = data.map(item => 
      item.id === id && item.stock > 0 ? { ...item, stock: item.stock - 1 } : item
    );
    setData(newData);
    localStorage.setItem("db", JSON.stringify(newData));
  };

  const handleAddArticle = () => {
    if (
      !newArticle.id ||
      !newArticle.articulo ||
      !newArticle.color ||
      !newArticle.talle ||
      newArticle.stock === null || newArticle.stock === ''
    ) {
      setErrorMessage('Todos los campos son obligatorios.');
      return;
    }

    setData(prevData => [...prevData, newArticle]);
    localStorage.setItem("db", JSON.stringify([...data, newArticle]));
    setShowAddModal(false);
    setNewArticle({
      id: '',
      articulo: '',
      color: '',
      talle: '',
      stock: 0,
    });
    setErrorMessage('');
  };

  const handleSendToExcel = async () => {
    const payload = {
      data: data.map(item => [
        item.articulo,
        item.color,
        item.talle,
        item.stock
      ])
    };
  
    try {
      const response = await fetch('/api/exec', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        mode: 'no-cors' // Esto evita el problema de CORS, pero limita el acceso a la respuesta.
      });
  
      // La respuesta no se podrá manejar completamente si usas 'no-cors'.
      alert('Datos enviados con éxito');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
    }
  };

  return (
    <div className={`${styles.main} ${styles.fondo}`}>
      <nav className={styles.nav}>
        <h1 className={styles.title}>Stock</h1>
        
        <button 
          className={styles.excelButton} 
          onClick={handleSendToExcel}
        >
          <FontAwesomeIcon style={{ width: '38px', height: '38px'}} icon={faFileExcel} />
        </button>
      
      </nav>
      <main>
        <div className={styles.articlesContainer}>
          {uniqueArticles.map(article => (
            <div 
              key={article} 
              className={`${styles.articleCard} ${selectedArticle === article ? styles.activeCard : ''}`}
              onClick={() => handleArticleClick(article)}
            >
              <p>{article}</p>
            </div>
          ))}
        </div>

        {selectedArticle ? (
          <div className={styles.articleDetails}>
            <h2>Detalles de {selectedArticle}</h2>
            {data
              .filter(item => item.articulo === selectedArticle)
              .map((item, index) => (
                <div key={item.id} className={styles.itemDetails}>
                  <p>Color: {item.color}</p>
                  <p>Talle: {item.talle}</p>
                  <p>Stock: {item.stock}</p>
                  <div className={styles.stockControls}>
                    <button onClick={() => incrementStock(item.id)}>+</button>
                    <button onClick={() => decrementStock(item.id)}>-</button>
                  </div>
                </div>
              ))}
          </div>
        ) : (
          <div className={styles.contenedorShow}>
            <p>Toque un articulo para consultar su stock</p>
          </div>
        )}
      </main>

      <button 
        className={styles.floatingButton} 
        onClick={() => setShowAddModal(true)}
      >
        +
      </button>

      {showAddModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>Agregar Nuevo Artículo</h2>
            {errorMessage && <p className={styles.error}>{errorMessage}</p>}
            <input 
              type="text" 
              placeholder="ID" 
              value={newArticle.id} 
              onChange={(e) => setNewArticle({ ...newArticle, id: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Artículo" 
              value={newArticle.articulo} 
              onChange={(e) => setNewArticle({ ...newArticle, articulo: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Color" 
              value={newArticle.color} 
              onChange={(e) => setNewArticle({ ...newArticle, color: e.target.value })} 
            />
            <input 
              type="text" 
              placeholder="Talle" 
              value={newArticle.talle} 
              onChange={(e) => setNewArticle({ ...newArticle, talle: e.target.value })} 
            />
            <input 
              type="number" 
              placeholder="Stock" 
              value={newArticle.stock} 
              onChange={(e) => setNewArticle({ ...newArticle, stock: parseInt(e.target.value) })} 
            />
            <button onClick={handleAddArticle}>Agregar</button>
            <button onClick={() => setShowAddModal(false)}>Cancelar</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bienes;
