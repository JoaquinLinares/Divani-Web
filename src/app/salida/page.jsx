'use client'
import React, { useEffect, useState} from 'react';
import styles from "../page.module.css";
import Image from 'next/image';

const Salida = () => {
  const [scannedItems, setScannedItems] = useState({});
  const [barcode, setBarcode] = useState('');

  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === 'Enter' && barcode) {
        const trimmedBarcode = barcode.slice(0, -1); // Eliminar la última letra del código escaneado
        
        // Actualizar el stock en localStorage
        let products = JSON.parse(localStorage.getItem("db")) || [];
        const productIndex = products.findIndex(product => product.id === trimmedBarcode);
        
        if (productIndex !== -1 && products[productIndex].stock > 0) {
          products[productIndex].stock -= 1;
          localStorage.setItem('db', JSON.stringify(products));
        }

        // Actualizar los elementos escaneados
        setScannedItems((prev) => {
          const count = prev[trimmedBarcode] ? prev[trimmedBarcode] + 1 : 1;
          return { ...prev, [trimmedBarcode]: count };
        });

        setBarcode('');
      } else if (event.key !== 'Enter') {
        setBarcode((prev) => prev + event.key);
      }
    };

    window.addEventListener('keypress', handleKeyPress);
    return () => {
      window.removeEventListener('keypress', handleKeyPress);
    };
  }, [barcode]);

  return (
    <div className={`${styles.main} ${styles.fondo}`}>
      <h1>Productos escaneados:</h1>
      {Object.keys(scannedItems).length > 0 ? (
        <div className={styles.scannedContainer}>
          {Object.entries(scannedItems).map(([code, count]) => (
            <div key={code} className={styles.scannedItem}>
              <h2>Producto Escaneado:</h2>
              <p>{code}</p>
              <p>Cantidad removida: {count}</p>
            </div>
          ))}
        </div>
      ) : (
        <div className={styles.imageContainer}>
          <Image
            src="/Box-Transparent-PNG.png"
            alt="Box"
            className={styles.image}
            width={500}
            height={500}
          />
          <p className={styles.titleIMG}>Quitar sus artículos</p>
        </div>
      )}
    </div>
  );
};

export default Salida