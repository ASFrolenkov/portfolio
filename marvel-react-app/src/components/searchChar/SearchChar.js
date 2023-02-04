import { Formik, Form, Field, ErrorMessage } from 'formik'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import * as yup from 'yup';
import useMarvelService from '../../services/MarvelService'

import './searchChar.scss'

const CharFinded = ({name, id}) => {
    return (
        <div className="char__search_finded">
            <p className="char__search_green">There is! Visit {name} page?</p>
            <Link to={`/characters/${id}`} className="button button__secondary"><div className="inner">TO PAGE</div></Link>
        </div>
    )
}

const SearchChar = () => {
    const [char, setChar] = useState(null);
    const [errorFound, setErrorFound] = useState(false);

    const {getCharacterByName, clearError} = useMarvelService();

    const findChar = (name) => {
        clearError()

        getCharacterByName(name)
            .then(onCharFinded)
    }

    const onCharFinded = (char) => {
        setErrorFound(false)
        if (char.length === 0) {
            return setErrorFound(true)
        }
        setChar(char)
    }

    const msg = char && !errorFound ?  <CharFinded name={char[0].name} id={char[0].id}/> : null;

    return (
        <Formik
                initialValues={{
                    name: ''
                }}
                validationSchema={yup.object({
                    name: yup.string().required('This field is required')
                })}
                onSubmit={values => findChar(values.name)}>
            <Form className="char__search">
                <h2 className="char__search_title">Or find a character by name:</h2>
                <div className="char__search_wrapper">
                    <Field 
                        type="text"
                        name="name"
                        id="name" 
                        placeholder='Enter name' 
                        className="char__search_input"/>
                    <button className="button button__main" type="submit"><div className="inner">FIND</div></button>
                    {
                        errorFound ? <div className="char__search_error">The character was not found. Check the name and try again</div> : 
                                     <ErrorMessage className="char__search_error" name="name" component="div"/>
                    }
                    {msg}
                </div>
            </Form>
        </Formik>
    )
}

export default SearchChar