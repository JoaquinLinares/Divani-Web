import React from 'react'
import styles from "../page.module.css";

const movimientos = () => {
  return (
    <div className={`${styles.main} ${styles.fondo}`}>
      <nav className={styles.nav}>
        <h1 className={styles.title}> Movimientos</h1>
      </nav>
      <h2 className={styles.titleMovimientos}>Proximamente...</h2>

    </div>
  )
}

export default movimientos