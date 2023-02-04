import { useState, useEffect } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import setContent from '../../utils/setContent';

import useMarvelService from '../../services/MarvelService';
import './charInfo.scss';

const CharInfo = (props) => {

    const [char, setChar] = useState(null);

    const {getCharecter, clearError, process, setProcess} = useMarvelService();

    useEffect(() => {
        updateChar();
    }, [props.charId])

    const updateChar = () => {
        const {charId} = props;
        if (!charId) {
            return;
        }

        clearError();
        getCharecter(charId)
            .then(onCharLoaded)
            .then(() => setProcess('confirmed'));
    }

    const onCharLoaded = (char) => {
        setChar(char);
    }

        return (
            <div className="char__info">
                {setContent(process, char, View)}
            </div>
        )
}

const View = ({data}) => {
    const {name, descr, thumbnail, homepage, wiki, comics} = data;

    const regTest =  /image_not_available/.test(thumbnail);
    const styleMod = regTest ? 'contain' : 'cover'

    const comicsConstructor = comics.map((item, i) => {
                                                if (i < 9) {
                                                    const comicId = "/comics/" + item.resourceURI.split('http://gateway.marvel.com/v1/public/comics/').join('')
                                                    
                                                    return (
                                                        <Link to={comicId} key={i} className="char__comics-item">
                                                            {item.name}
                                                        </Link>
                                                    )
                                                }
                                            })

    return (
        <>
            <div className="char__basics">
                        <img src={thumbnail} alt={name} style={{objectFit: styleMod}}/>
                        <div>
                            <div className="char__info-name">{name}</div>
                            <div className="char__btns">
                                <a href={homepage} className="button button__main">
                                    <div className="inner">homepage</div>
                                </a>
                                <a href={wiki} className="button button__secondary">
                                    <div className="inner">Wiki</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div className="char__descr">
                        {descr}
                    </div>
                    <div className="char__comics">Comics:</div>
                    <ul className="char__comics-list">

                        {comics.length > -1 ? comicsConstructor : 'Comics not found'}
                        
                    </ul>
                </>
    )
}

CharInfo.propTypes = {
    charId: PropTypes.number
}

export default CharInfo;