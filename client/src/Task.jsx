function Task() {
    const task1 = "my first task"
    const task2 = "my second task"

    return(
        <div className="task">
            <img src="https://placehold.co/200x200/purple/white?text=My+Task" alt="task picture" />
            <h2>My sample task</h2>
            <p>My sample very descriptive description of a very described describable thing</p>
        </div>
    );
}

export default Task