import config from '../config';

const URL_CATEGORIES = `${config.URL__BACKEND_TOP}/categorias`;

function getAllWithVideos() {
    return fetch(URL_CATEGORIES)
        .then(async (respostaDoServidor) => {
            const resposta = await respostaDoServidor.json();
            return resposta;
        });
}

export default {getAllWithVideos}; 