import { Component } from 'react';
import './app-search.css'

class SearchPanel extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: ''
        }
    }

    onUpdateSearchLocal = (event) => {
        const str = event.target.value;
        this.setState({term: str});
        this.props.onUpdateSearch(str);
    }

    render() {
        return (
            <input type="text" 
                   className="form-control search-input"
                   placeholder="Найти сотрудника" 
                   value={this.state.term}
                   onChange={this.onUpdateSearchLocal}/>
        );
    }
}

export default SearchPanel;