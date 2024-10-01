'use client';

import React from 'react';
import { FooterContainer } from './Footer.styles';

const Footer = () => {
  return (
    <FooterContainer>
      <div className="footer-content">
        <div className="footer-main-information">
          <p>&copy; {new Date().getFullYear()} Parrot Software</p>
          <p>Todos los derechos reservados</p>
        </div>
        <div className="footer-links-section">
          <div>
            <p>
              <a
                href="https://parrotsoftware.com.mx/aviso-privacidad?__hstc=250815641.44261172114dfcd3aeaf52a548be70d6.1727389335489.1727571777265.1727573967568.7&__hssc=250815641.1.1727573967568&__hsfp=2015686276&_gl=1*114a6x4*_gcl_au*MTM3ODEyNTA3OS4xNzI3Mzg5MzM1"
                target="_blank"
                rel="noreferrer"
              >
                Aviso de privacidad
              </a>
            </p>
            <p>
              <a
                href="https://parrotsoftware.com.mx/preguntas-frecuentes-software-pos-para-restaurantes-en-mexico"
                target="_blank"
                rel="noreferrer"
              >
                Preguntas frecuentes
              </a>
            </p>
          </div>
          <div>
            <p>
              <a
                href="https://parrotsoftware.com.mx/programa-de-lealtad-parrot"
                target="_blank"
                rel="noreferrer"
              >
                Programa de lealtad
              </a>
            </p>
          </div>
        </div>
      </div>
    </FooterContainer>
  );
};

export default Footer;
