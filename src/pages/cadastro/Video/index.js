import React, { useEffect, useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link, useHistory } from 'react-router-dom';
import useForm from '../../../hooks/useForm';
import FormField from '../../../components/FormField';
import Button from '../../../components/Menu/components/Button';



const URL_BACKEND_TOP = window.location.hostname.includes('localhost')
    ? 'http://localhost:8080'
    : 'https://obelix-kivel.herokuapp.com';


const URL_VIDEOS = `${URL_BACKEND_TOP}/videos`;

function create(objetoDovideo) {
    return fetch(`${URL_VIDEOS}?_embed=videos`, {
        method: 'POST',
        headers: {
            'Content-type': 'application/json',
        },
        body: JSON.stringify(objetoDovideo),
    })

        .then(async (respostaDoServidor) => {
            if (respostaDoServidor.ok) {
                const resposta = await respostaDoServidor.json();
                return resposta;
            }

            throw new Error('Não foi posível cadastrar os dados :(');
        });
}


const URL_CATEGORIES = `${URL_BACKEND_TOP}/categorias`;

function getAll() {
    return fetch(`${URL_CATEGORIES}`)
        .then(async (respostaDoServidor) => {
            if (respostaDoServidor.ok) {
                const resposta = await respostaDoServidor.json();
                return resposta;
            }

            throw new Error('Não foi possível pegar os dados :(');
        });
}


function CadastroVideo() {
    const history = useHistory();
    const [categorias, setCategorias] = useState([]);
    const categoryTitles = categorias.map(({ titulo }) => titulo);
    const { handleChange, values } = useForm({
        titulo: 'Video padrão',
        url: 'https://www.youtube.com/watch?v=Iey2ELb1Hb0',
        categoria: 'Mindset'
    });

    useEffect(() => {
        getAll()
            .then((categoriasFromServer) => {
                setCategorias(categoriasFromServer);
            })
    }, []);

    return (
        <PageDefault>
            <h1>Cadastro de video</h1>

            <form onSubmit={(event) => {
                event.preventDefault();
                // alert('Video cadastrado com sucesso!');

                const categoriaEscolhida = categorias.find((categoria) => {
                    return categoria.titulo === values.categoria;
                });


                create({
                    titulo: values.titulo,
                    url: values.url,
                    categoriaId: categoriaEscolhida.id,
                })
                    .then(() => {
                        console.log('Cadastrou com sucesso');
                        history.push('/');
                    });
            }}
            >
                <FormField
                    label="Título do video: "
                    name="titulo"
                    value={values.titulo}
                    onChange={handleChange}
                />

                <FormField
                    label="URL do vídeo: "
                    name="url"
                    value={values.url}
                    onChange={handleChange}
                />

                <FormField
                    label="Categoria do vídeo: "
                    name="categoria"
                    value={values.categoria}
                    onChange={handleChange}
                    suggestions={categoryTitles}
                />

                <Button type="submit">
                    Cadastrar
                </Button>
            </form>

            <Link to="/cadastro/categoria">
                Cadastrar categoria
            </Link>
        </PageDefault>
    )
}

export default CadastroVideo;
