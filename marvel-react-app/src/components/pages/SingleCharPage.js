import AppBanner from '../appBanner/AppBanner'
import { Helmet } from 'react-helmet'
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useMarvelService from '../../services/MarvelService'
import setContent from '../../utils/setContent'

import './singleCharPage.scss'

const Character = () => {
    const [char, setChar] = useState(null);
    const {charId} = useParams();
    const {getCharecter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar()
    }, [charId])

    const updateChar = () => {
        clearError();
        getCharecter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

    return (
        <>
            {setContent(process, char, View)}
        </>
    )
}

const View = ({data}) => {
    const {thumbnail, name, descr} = data;

    return (
        <div className="single-char">
            <Helmet>
                <meta
                    name="description"
                    content={`${name} character page`}/>
                <title>{name} character page</title>
            </Helmet>
            <img src={thumbnail} alt={name} className="single-char__thumbnail" />
            <div className="single-char__wrapper">
                <h2 className="single-char__name">{name}</h2>
                <p className="single-char__descr">{descr}</p>
            </div>
        </div>
    )
}

const SingleCharPage = () => {
    return (
        <>
            <AppBanner/>
            <Character/>
        </>
    )
}

export default SingleCharPage