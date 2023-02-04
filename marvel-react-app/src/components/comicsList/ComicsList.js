import useMarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';


import './comicsList.scss';

const setContent = (process, newItemLoading, Component) => {
    switch (process) {
        case 'waiting': 
            return <Spinner/>;
        case 'loading':
            return newItemLoading ? <Component/> : <Spinner/>;
        case 'confirmed': 
            return <Component/>;
        case 'error':
            return <ErrorMessage/>;
        default: 
            throw new Error('Unexpected process state')
    }
}

const ComicsList = () => {

    const {getAllComics, process, setProcess} = useMarvelService();
    const [endList, setEndList] = useState(false);
    const [comicsList, setComicsList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(210)

    useEffect(() => {
        onRequest(offset, true)
    }, [])

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false) : setNewItemLoading(true)

        getAllComics(offset)
            .then(onListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const onListLoaded = (list) => {
        if (list.length < 8) {
            setEndList(true)
        }

        setComicsList(comicsList => [...comicsList, ...list]);
        setNewItemLoading(false);
        setOffset(offset => offset + 8)
    }

    function renderList(data) {
        const items = data.map(item => {
            return (
                <li className="comics__item"
                    key={item.id}
                    tabIndex='0'>
                    <Link to={`/comics/${item.id}`}>
                        <img src={item.thumbnail} alt={item.alt} className="comics__item-img"/>
                        <div className="comics__item-name">{item.title}</div>
                        <div className="comics__item-price">{item.price === 0 ? 'NOT AVAILABLE': item.price + '$'}</div>
                    </Link>
                </li>
            )
        })

        return items
    }

    return (
        <div className="comics__list">
            <ul className="comics__grid">
                {setContent(process, newItemLoading, () => renderList(comicsList))}
            </ul>
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: endList ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;