import {useEffect, useState} from "react";
import {Link, useParams} from "react-router-dom";
import {getTask} from "../api/TaskService.jsx";
import {toastSuccess} from "../api/ToasService.jsx";

const TaskDetail = ({updateTask, returnHeaders}) => {
    const [task, setTask] = useState({
        id: '',
        title: '',
        description: '',
        completed: '',
    });

    const {id} = useParams();

    const getCurrentTask = async (id) => {
        try {
            const {data} = await getTask(id);
            setTask(data);
        } catch (e) {
            console.log(e);
        }
    }

    const onChange = (event) => {
        setTask({ ...task, [event.target.name]: event.target.value });
    };

    const onUpdateTask = async (event) => {
        event.preventDefault();
        await updateTask(task);
        await getCurrentTask(id);
        toastSuccess('Task Updated');
    };

    useEffect(() => {
        getCurrentTask(id);
    }, []);

    return (
        <>
            <Link to={`/`} className='link'><i className='bi bi-arrow-left'></i> Back to list</Link>
            <div className='task'>
                <div className='task__details'>
                    <div className='task__metadata'>
                        <p className='task__name'>{task.name}</p>
                    </div>
                </div>
                <div className='profile__settings'>
                    <div>
                        <form onSubmit={onUpdateTask} className="form">
                            <div className="user-details">
                                <input type="hidden" defaultValue={task.id} name="id" required />
                                <div className="input-box">
                                    <span className="details">Title</span>
                                    <input type="text" value={task.title} onChange={onChange} name="title" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Description</span>
                                    <input type="text" value={task.description} onChange={onChange} name="description" required />
                                </div>
                                <div className="input-box">
                                    <span className="details">Status</span>
                                    <select value={task.completed} onChange={onChange} name="completed" required>
                                        <option value={true}>Completed</option>
                                        <option value={false}>Uncompleted</option>
                                    </select>
                                </div>
                            </div>
                            <div className="form_footer">
                                <button type="submit" className="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TaskDetail;