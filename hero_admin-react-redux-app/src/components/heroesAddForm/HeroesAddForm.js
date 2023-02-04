import { useState } from "react";
import { v4 as uuid } from "uuid";
import { useSelector } from "react-redux";
import { selectAll } from "../heroesFilters/filterSlice";
import store from "../../store";
import { useCreateHeroMutation } from "../../api/apiSlice";

const HeroesAddForm = () => {
    const [heroName, setHeroName] = useState('');
    const [heroDescr, setHeroDescr] = useState('');
    const [heroElem, setHeroElem] = useState('');

    const filters = selectAll(store.getState())
    const {filtersLoadingStatus} = useSelector(state => state.filters);

    const [createHero, {isLoading, isError}] = useCreateHeroMutation();

    const heroConstructor = (e) => {
        e.preventDefault();
        if (!(heroName === '') && !(heroDescr === '')) {
            const heroData = {
                id: uuid(),
                name: heroName,
                description: heroDescr,
                element: heroElem
            }

            createHero(heroData).unwrap();

            setHeroName('');
            setHeroDescr('');
            setHeroElem('');
        }
    }

    const renderFilters = (filters) => {
        if (isLoading) {
            return <option>Загрузка элементов</option>
        } else if (isError) {
            return <option>Ошибка загрузки</option>
        }

        if (filters && filters.length > 0) {
            return filters.map(({name, value}, i) => {
                if (name === 'all') return
                return <option value={name} key={i}>{value}</option>
            })
        }
    }

    return (
        <form className="border p-4 shadow-lg rounded" onSubmit={heroConstructor}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    value={heroName}
                    onChange={(e) => setHeroName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    value={heroDescr}
                    onChange={(e) => setHeroDescr(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    className="form-select" 
                    id="element" 
                    name="element"
                    value={heroElem}
                    onChange={(e) => setHeroElem(e.target.value)}>
                    <option value="all">Я владею элементом...</option>
                    {renderFilters(filters, filtersLoadingStatus)}
                </select>
            </div>

            <button type="submit" className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;