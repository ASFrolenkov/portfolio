import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../spinner/Spinner";
import { fetchFilters, filterSelect, selectAll } from "./filterSlice";
import store from "../../store";

const HeroesFilters = () => {
    const filters = selectAll(store.getState());
    const {filtersLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchFilters())
                // eslint-disable-next-line
    }, [])

    const itemsRef = useRef([]);

    const focusOnItem = (id) => {
        itemsRef.current.forEach(elem => elem.classList.remove('active'));
        itemsRef.current[id].classList.add('active');
    }

    const renderBtn = (arr) => {
        if (arr.length === 0) {
            return <h5>Нет фильтров</h5>
        }
        return arr.map(({name, value, className}, i) => {
            return <button 
                        className={className} 
                        key={name} 
                        ref={el => itemsRef.current[i] = el}
                        onClick={() => {
                            focusOnItem(i);
                            dispatch(filterSelect(name))
                        }}>{value}</button>
        })
    }

    const content = (arr, status) => {
        switch (status) {
            case 'loading':
                return <Spinner/>
            case 'error':
                return <h5>Ошибка загрузки</h5>
            default: return renderBtn(arr)
        }
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {content(filters, filtersLoadingStatus)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;