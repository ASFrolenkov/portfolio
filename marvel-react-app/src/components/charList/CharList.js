import { useState, useEffect, useRef, useMemo } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PropTypes from 'prop-types';
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import './charList.scss';

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

const CharList = (props) => {

    const [charList, setCharList] = useState([]);
    const [newItemLoading, setNewItemLoading] = useState(false);
    const [offset, setOffset] = useState(1541);
    const [charEnded, setCharEnded] = useState(false);

    useEffect(() => {
        onRequest(offset, true);
    }, [])

    const {getAllCharecters, process, setProcess} = useMarvelService();

    const onListLoaded = (list) => {
        let ended = false;
        if (list.length < 9) {
            ended = true
        }

        setCharList(charList => [...charList, ...list]);
        setNewItemLoading(newItemLoading => false);
        setOffset(offset => offset + 9);
        setCharEnded(charEnded => ended);
    }

    const onRequest = (offset, initial) => {
        initial ? setNewItemLoading(false): setNewItemLoading(true);

        getAllCharecters(offset)
            .then(onListLoaded)
            .then(() => setProcess('confirmed'))
    }

    const itemsRefs = useRef([]);

    const focusOnItem = (id) => {
        itemsRefs.current.forEach(elem => elem.classList.remove('char__item_selected'));
        itemsRefs.current[id].classList.add('char__item_selected');
        itemsRefs.current[id].focus();
    }

    function renderItems(arr) {
        const items = arr.map((item, i) => {
            let imgStyle = {'objectFit': 'cover'};
            if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
                imgStyle = {'objectFit': 'unset'}
            }

            return (
                <CSSTransition
                            key={item.id}
                            timeout={500}
                            classNames="char__item">
                        <li className="char__item" 
                            key={item.id} 
                            tabIndex='0' 
                            onClick={() => {
                                        props.onCharSelected(item.id);
                                        focusOnItem(i);
                                    }}
                            ref={el => itemsRefs.current[i] = el}
                            onKeyDown={(e) => {
                                                if (e.key === ' ' || e.key === 'Enter') {
                                                    props.onCharSelected(item.id);
                                                    focusOnItem(i);
                                                }
                                            }}>
                            <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                            <div className="char__name">{item.name}</div>
                        </li>
                </CSSTransition>
            )
        });  

        return (
            <ul className="char__grid">
                <TransitionGroup component={null}>
                    {items}
                </TransitionGroup>
            </ul>
        )
    }

    const elements = useMemo(() => {
        return setContent(process, newItemLoading, () => renderItems(charList))
    }, [process]);

    return (
        <div className="char__list">
            {elements}
            <button className="button button__main button__long"
                    disabled={newItemLoading}
                    style={{display: charEnded ? 'none' : 'block'}}
                    onClick={() => onRequest(offset)}>
                <div className="inner">load more</div>
            </button>
        </div>
    )
}


CharList.propTypes = {
    onCharSelected: PropTypes.func
}

export default CharList;