import EmployeesListItem from '../employess-list-item/employees-list-item';
import './employees-list.css'

const EmployeesList = ({data, onDelete, onToggleProp}) => {
    const elements = data.map(elem => {
        const {id, ...elemProps} = elem;
        return (
            <EmployeesListItem key={id} {...elemProps}
                               onDelete={() => onDelete(id)}
                               onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}/>
        )
    });

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
};

export default EmployeesList;