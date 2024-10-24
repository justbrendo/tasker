import Header from "./components/Header";
import {useEffect, useRef, useState} from "react";
import {getTasks, saveTask} from "./api/TaskService.jsx";
import {Navigate, Route, Routes, useNavigate, useSearchParams} from "react-router-dom";
import TaskList from "./components/TaskList.jsx";
import TaskDetail from "./components/TaskDetail.jsx";
import {toastError, toastSuccess} from "./api/ToasService.jsx";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const modalRef = useRef();
    const [data, setData] = useState({});
    const [values, setValues] = useState({
        title: '',
        description: '',
    });
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const pageFromUrl = searchParams.get('page') ? Number(searchParams.get('page')) - 1 : 0;
    const pageSizeFromUrl = searchParams.get('size') ? Number(searchParams.get('size')) - 1 : 10;

    const handleNewTask = async (event) => {
        event.preventDefault();
        try {
            const response = await saveTask(values);
            console.log(response);
            setValues({
                title: '',
                description: '',
            })
            toggleModal(false);
            await getAllTasks(0, 10);
        } catch (e) {
            console.log(e);
            toastError(e.message);
        }
        toastSuccess("Task created.")
    }

    const getAllTasks = async (page, size) => {
        try {
            const {data} = await getTasks(page, size);
            setData(data);
            navigate(`/tasks?page=${page + 1}`);
        } catch (e) {
            console.log(e)
            toastError(e.message);
        }
    }

    const updateTask = async (task) => {
        try {
            const data = await saveTask(task);
            console.log(data);
        } catch
            (e) {
            console.log(e);
            toastError(e.message);
        }
    }

    const toggleModal = (show) => {
        show ? modalRef.current.showModal() : modalRef.current.close();
    }

    const onChange = (event) => {
        setValues({...values, [event.target.name]: event.target.value});
    }

    useEffect(() => {
        getAllTasks(pageFromUrl, pageSizeFromUrl);
    }, []);

    return (
        <>
            <Header toggleModal={toggleModal} nbOfTasks={data.totalElements}/>
            <main className='main'>
                <div className='container'>
                    <Routes>
                        <Route path="/tasks/:id"
                               element={<TaskDetail updateTask={updateTask}/>}></Route>
                        <Route path="/tasks" element={<TaskList data={data} getAllTasks={getAllTasks}/>}/>
                        <Route path={'/'} element={<Navigate to={'/tasks?page=1'}/>}/>
                    </Routes>
                </div>
            </main>

            {/* Modal */}
            <dialog ref={modalRef} className="modal" id="modal">
                <div className="modal__header">
                    <h3>New Task</h3>
                    <i onClick={() => toggleModal(false)} className="bi bi-x-lg">✖️</i>
                </div>
                <div className="divider"></div>
                <div className="modal__body">
                    <form onSubmit={handleNewTask}>
                        <div className="task-details">
                            <div className="input-box">
                                <span className="details">Title</span>
                                <input type="text" value={values.title} onChange={onChange} name="title" required/>
                            </div>
                            <div className="input-box">
                                <span className="details">Description</span>
                                <input type="text" value={values.description} onChange={onChange} name="description"
                                       required/>
                            </div>
                        </div>
                        <div className="form_footer">
                            <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel
                            </button>
                            <button type='submit' className="btn">Save</button>
                        </div>
                    </form>
                </div>
            </dialog>
            <ToastContainer></ToastContainer>
        </>
    );
}

export default App;
