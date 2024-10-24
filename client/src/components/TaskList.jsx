import PropTypes from "prop-types";
import Task from "./Task.jsx";
import {useSearchParams} from "react-router-dom";

const TaskList = ({data, getAllTasks}) => {
    const [searchParams] = useSearchParams();
    const hPage = searchParams.get('page');
    const currentPage = hPage === null ? 0 : hPage - 1;

    console.log(currentPage)
    return (
        <main className='main'>
            {data?.content?.length === 0 && <div>No Tasks. Please add a new task</div>}

            <ul className='task__list'>
                {data?.content?.length > 0 && data.content.map(task => <Task task={task}
                                                                             key={task.id}/>)}
            </ul>

            {data?.content?.length > 0 && data?.totalPages > 1 &&
                <div className='pagination'>
                    <a onClick={() => getAllTasks(currentPage - 1)}
                       className={0 === currentPage ? 'disabled' : ''}>&laquo;</a>

                    {data && [...Array(data.totalPages).keys()].map((page) =>
                        <a onClick={() => getAllTasks(page)} className={currentPage === page ? 'active' : ''}
                           key={page}>{page + 1}</a>)}

                    <a onClick={() => getAllTasks(currentPage + 1)}
                       className={data.totalPages === currentPage + 1 ? 'disabled' : ''}>&raquo;</a>
                </div>
            }

        </main>
    )
}

TaskList.propTypes = {
    currentPage: PropTypes.oneOfType([PropTypes.number]).isRequired,
    data: PropTypes.shape({
        content: PropTypes.arrayOf(
            PropTypes.shape({
                id: PropTypes.string.isRequired,
            })
        ),
        totalPages: PropTypes.number
    }).isRequired,
    getAllTasks: PropTypes.func.isRequired
}

export default TaskList