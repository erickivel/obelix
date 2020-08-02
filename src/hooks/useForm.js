import { useState } from 'react';

function useForm(valoresIniciais) {
    const [values, setValues] = useState(valoresIniciais);

    function setValue(chave, valor) {
        setValues({
            ...values,
            [chave]: valor, // nome: 'valor',
        });
    }

    function handleChange(infosDoEvento) {
        const { value } = infosDoEvento.target;
        setValue(
            infosDoEvento.target.getAttribute('name'),
            value,
        );
    }

    function clearForm() {
        setValues(valoresIniciais);
    }

    return {
        values,
        handleChange,
        clearForm,
    }
}

export default useForm;