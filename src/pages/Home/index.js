import React, { useEffect } from 'react';
import Menu from '../../components/Menu';
import BannerMain from '../../components/BannerMain';
import dadosIniciais from '../../data/dados_iniciais.json';
import Carousel from '../../components/Carousel';
import Footer from '../../components/Footer';
import categoriasRepository from '../../repositories/categorias';



const URL_BACKEND_TOP = window.location.hostname.includes('localhost')
  ? 'http://localhost:8080'
  : 'https://obelix-kivel.herokuapp.com';

const URL_CATEGORIES = `${URL_BACKEND_TOP}/categorias?_embed=videos`;

console.log(URL_BACKEND_TOP);
console.log(URL_CATEGORIES);

function getAllWithVideos() {
  return fetch(URL_CATEGORIES)
      .then(async (respostaDoServidor) => {
          const resposta = await respostaDoServidor.json();
          return resposta;
      });
}



function Home() {

  useEffect(() => {
    getAllWithVideos()
      .then((categoriasComVideos) => {
        console.log(categoriasComVideos);
      });
  });

  return (
    <div style={{ background: "#141414" }}>
      <Menu />

      <BannerMain
        videoTitle={dadosIniciais.categorias[0].videos[0].titulo}
        url={dadosIniciais.categorias[0].videos[0].url}
        videoDescription={"O que é Front-end?"}
      />

      <Carousel
        ignoreFirstVideo
        category={dadosIniciais.categorias[0]}
      />

      <Carousel
        category={dadosIniciais.categorias[1]}
      />

      <Carousel
        category={dadosIniciais.categorias[2]}
      />

      <Carousel
        category={dadosIniciais.categorias[3]}
      />

      <Carousel
        category={dadosIniciais.categorias[4]}
      />

      <Carousel
        category={dadosIniciais.categorias[5]}
      />

      <Footer />
    </div>
  );
}

export default Home;
