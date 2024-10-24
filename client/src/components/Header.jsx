import PropTypes from "prop-types";

function Header({ toggleModal, nbOfTasks }) {
    return (
        <header className="header">
            <div className="container">
                <h3>Task List ({nbOfTasks})</h3>
                <button onClick={() => toggleModal(true)} className="btn">
                    <i className="bi bi-plus-square"></i> Add New Task
                </button>
            </div>
        </header>
    );
}

Header.propTypes = {
    nbOfTasks: PropTypes.oneOfType([PropTypes.number])
}


export default Header