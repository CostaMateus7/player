import Head from 'next/head';
import Footer from './Footer';
import Navbar from './Navbar';
import Styles from '../styles/Layout.module.css';

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <title>YouTube</title>
        <meta name="description" content="Plataforma de Vídeo" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/Favicon.ico" />
      </Head>
      <Navbar />
      <div className={Styles.layoutStyle}>
        {children}
      </div>
      <Footer />
    </>
  );
}
