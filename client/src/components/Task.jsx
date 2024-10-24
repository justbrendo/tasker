import {Link} from 'react-router-dom'
import PropTypes from "prop-types";

function Task({task}) {
    return (
        <Link to={`/tasks/${task.id}`} className='task_item'>
            <div className="task__header">
                <div className="task__details">
                    <div className="task_title">
                        <p className="task_emoji">🧾</p>
                        <p className="task_title_text">
                            {task.title.trim().length > 15 ? task.title.substring(0,15).trim() + "..." : task.title}
                        </p>
                    </div>
                </div>
                <div className="task__body">
                    <p>{task.completed === true ? <i>✔️</i> :
                        <i>❌</i>} {task.completed}</p>
                </div>
            </div>
            <div className="desc-container">
                <p className="task_description">{task.description}</p>
            </div>
        </Link>
    );
}

Task.propTypes = {
    task: PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string]).isRequired,
        title: PropTypes.oneOfType([PropTypes.string]).isRequired,
        description: PropTypes.oneOfType([PropTypes.string]).isRequired,
        completed: PropTypes.oneOfType([PropTypes.bool]).isRequired,
        // deleted
    })
}

export default Task