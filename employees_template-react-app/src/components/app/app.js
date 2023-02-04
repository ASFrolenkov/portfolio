import { Component } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../app-search/app-search';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employess-add-form/employees-add-form';
import './app.css';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {
                    name: 'Jhon C.',
                    salary: 800,
                    increase: false,
                    like: true,
                    id: 1
                },
                {
                    name: 'Alex M.',
                    salary: 3000,
                    increase: true,
                    like: false,
                    id: 2
                },
                {
                    name: 'Carl W.',
                    salary: 5000,
                    increase: false,
                    like: false,
                    id: 3
                }
            ],
            term: '',
            filter: 'all'
        };
        this.maxId = 4;
    
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }

        this.setState(({data}) => {
            const newArr = [...data, newItem];
            return {
                data: newArr
            }
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id) {
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        const newArr = [...items]

        return newArr.filter(item => {
            return ((item.name.indexOf(term) > -1))
        })
    }

    onUpdateSearch = (str) => {
        this.setState({term: str})
    }

    filterPost = (arr, filter) => {
        switch (filter) {
            case 'rise':
                return arr.filter(elem => elem.like);
            case 'moreThen1000':
                return arr.filter(elem => elem.salary > 1000)
            default:
                return arr
        }
    }

    onFilterSelect = (strFilter) => {
        this.setState({filter: strFilter});
    }
    
    render() {
        const {data, term, filter} = this.state,
              employees = data.length,
              increasedEmployees = data.filter((elem) => elem.increase).length,
              visibleData = this.filterPost(this.searchEmp(data, term), filter);

        return (
            <div className="app">
                <AppInfo dataCounter={employees} dataIncreaseCounter={increasedEmployees}/>
    
                <div className="search-panel">
                    <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
    
                    <AppFilter filter={filter} onFilterSelect={this.onFilterSelect}/>
                </div>
    
                <EmployeesList data={visibleData} onDelete={this.deleteItem} onToggleProp={this.onToggleProp}/>
    
                <EmployeesAddForm onAdd={this.addItem}/>
            </div>
        );
    }
}

export default App;