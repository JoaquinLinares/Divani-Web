'use client'
import styles from "./page.module.css";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDolly, faFolderMinus, faFolderOpen, faFolderPlus } from '@fortawesome/free-solid-svg-icons'
import divaniData from '../app/db/divani.json';
import { useEffect, useState } from "react";


const setSettings =  () => {
  try {
    const database =  localStorage.getItem("db")
    
    if (!database) {
       localStorage.setItem("db", JSON.stringify(divaniData))
    }     

  } catch (error) {
    console.error(error)
  }
}
export default function Home() {  

  useEffect(() => {
    setSettings()
  }, []);  
  
  return (
    <div className={`${styles.main} ${styles.backgroundImage}`}>
      
      <nav className={styles.nav} >
        <h1 className={styles.title}>Divani</h1>      
      </nav>
      <main className={styles.mainTarjetas}>

      <Link  href="/stock" className={styles.link}>
        <section className={styles.tarjetasContainerStock } > 
          <div className={styles.divTarjetas}>
          <FontAwesomeIcon icon={faDolly} className={styles.fa} />
            <span className={styles.tarjetas}>Stock</span> 
          </div>
        </section>
      </Link>
      
      <div className={styles.divTarjetasentradaSalida}>
      <Link  href="/salida" className={styles.link}>
        <section className={styles.tarjetasContainer} > 
          <div className={styles.divTarjetas}>
            <FontAwesomeIcon icon={faFolderMinus} className={styles.fa}/>
            <span className={styles.tarjetas}>Salida</span> 
          </div>
        </section>
      </Link>

        <Link  href="/entrada" className={styles.link}>
        <section className={styles.tarjetasContainer} > 
          <div className={styles.divTarjetas}>
            <FontAwesomeIcon icon={faFolderPlus} className={styles.fa}/>
            <span className={styles.tarjetas}>Entrada</span> 
          </div>
        </section>
      </Link> 
    </div>
      </main>
      
    </div>
  );
}
