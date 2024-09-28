import Image from "next/image";
import styles from "./page.module.css";
import React from "react";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div>
          <h1>Bienvenido al Portal de Administrador</h1>
        </div>
      </main>
      <footer className={styles.footer}>
        <p>© 2024 Parrot Software</p>
        <p>Todos los derechos reservados</p>
        <a
          href="https://parrotsoftware.com.mx/aviso-privacidad?__hstc=250815641.44261172114dfcd3aeaf52a548be70d6.1727389335489.1727550771062.1727553228823.5&__hssc=250815641.15.1727553228823&__hsfp=2015686276&_gl=1*7rwmi4*_gcl_au*MTM3ODEyNTA3OS4xNzI3Mzg5MzM1"
          target="_blank"
          rel="noopener noreferrer"
        >
          Aviso de privacidad
        </a>
        <a
          href="https://parrotsoftware.com.mx/programa-de-lealtad-parrot"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="https://nextjs.org/icons/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Conoce nuestro programa de lealtad
        </a>
        <a
          href="https://parrotsoftware.com.mx/preguntas-frecuentes-software-pos-para-restaurantes-en-mexico"
          target="_blank"
          rel="noopener noreferrer"
        >
          Preguntas frecuentas
        </a>
      </footer>
    </div>
  );
}
