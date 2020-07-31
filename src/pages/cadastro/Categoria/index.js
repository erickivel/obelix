import React, { useState } from 'react';
import PageDefault from '../../../components/PageDefault';
import { Link } from 'react-router-dom';


function CadastroCategoria() {
    const [categorias, setCategorias] = useState(['Teste', 'Filmes', 'Marketing']);
    
    const valoresIniciais = {
        nome: 'awdwa',
        descricao: 'descricva',
        cor: '#000',
    }
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
        setValues({
           ...values,
           [chave]: valor, 
        })
    }

    return (
        <PageDefault>
            <h1>Cadastro de categoria: {values.nome}</h1>

            <form onSubmit={function handleSubmit(infosDoEvento) {
                infosDoEvento.preventDefault();
                setCategorias([
                    ...categorias,
                    values
                ]);
            }}>
                <div>
                    <label>
                        Nome da Categoria:
                    <input
                            type="text"
                            value={values.nome}
                            onChange={function funcaoHandler(infosDoEvento) {
                            // setValues(infosDoEvento.target.value);
                            }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Descrição:
                    <textarea
                            type="text"
                            value={values.descricao}
                            onChange={function funcaoHandler(infosDoEvento) {
                            // set.values(infosDoEvento.target.value);
                            }}
                        />
                    </label>
                </div>
                <div>
                    <label>
                        Cor:
                    <input
                            type="color"
                            value={values.cor}
                            onChange={function funcaoHandler(infosDoEvento) {
                            // set.values(infosDoEvento.target.value);
                            }}
                        />
                    </label>
                </div>


                <button>
                    Cadastrar
                </button>

            </form>

            <ul>
                {categorias.map((categoria, index) => {
                    return (
                        <li key={`${categoria}${index}`}>
                            {categoria}
                        </li>
                    )
                })}
            </ul>


            <Link to="/">
                Ir para home
            </Link>
        </PageDefault>
    )
}

export default CadastroCategoria;