import './app-info.css';

const AppInfo = ({dataCounter, dataIncreaseCounter}) => {
    return (
        <div className="app-info">
            <h1>Учет сотрудников в компании N</h1>
            <h2>Общее число сотрудников: {dataCounter}</h2>
            <h2>Премию получат: {dataIncreaseCounter}</h2>
        </div>
    );
}

export default AppInfo;