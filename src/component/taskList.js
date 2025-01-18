import { Bell, Calendar, CircleChevronDown, CircleChevronUp, Repeat, Square, SquareCheckBig, Star, StarOff } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, taskInputBox, toggleTaskCompletion, toggleTaskImpportant, setSelectedTaskId, toggle } from '../store/slice/taskSlice';

const TaskList = () => {

    const showTaskSlider = useSelector((state) => state.task.isOpen);
    const showAside = useSelector((state) => state.aside.isOpen); // Get the isOpen state from Redux
    const [TaskSliderText, setTaskSliderText] = React.useState('');
    const tasks = useSelector((state) => state.task.taskList);
    const taskInput = useSelector((state) => state.task.isTaskInputBoxOpen);
    const layoutValue = useSelector((state) => state.task.layout);


    console.log(taskInput);
    const handleAddTask = () => {
        if (TaskSliderText.trim() !== '') {
            dispatch(addTask({ text: TaskSliderText, priority: 'Normal' })); // Assuming default priority is 'Normal'
            setTaskSliderText(''); // Clear the textarea after adding the task
        }
    };

    const handleToggleTaskCompletion = (e, taskId) => {
        e.stopPropagation()
        dispatch(toggleTaskCompletion(taskId)); // Dispatch the action to toggle task completion
    };
    const handleToggleTaskImportant = (e, taskId) => {
        e.stopPropagation()
        dispatch(toggleTaskImpportant(taskId)); // Dispatch the action to toggle task completion
    };
    const handleTaskInputBox = () => {
        dispatch(taskInputBox());
    }
    const handleSelectedTaskId = (taskId) => {
        dispatch(setSelectedTaskId(taskId)); // Dispatch the action to toggle task completion
        if (!showTaskSlider) dispatch(toggle())
    };

    const filter = useSelector((state) => state.task.filter); // Get the current filter from Redux

    // Modify the tasks rendering logic based on the filter
    const filteredTasks = Object.values(tasks).filter(task => {
        if (filter === 'all') return true;
        if (filter === 'important') return task.important;
        if (filter === 'today') {
            const today = new Date().setHours(0, 0, 0, 0);
            const taskDate = new Date(task.id).setHours(0, 0, 0, 0); // Assuming task.id is the timestamp when the task was created
            return taskDate === today;
        }
    });


    const dispatch = useDispatch();
    return (
        <div className={`${showTaskSlider && showAside ? "lg:w-3/5" : showTaskSlider || showAside ? "lg:w-4/5" : "lg:w-full"} flex flex-col gap-4 w-full `}>

            <div className="flex items-center gap-1 dark:text-white w-fit" onClick={handleTaskInputBox} > {/* Add a flex container for alignment */}
                <span className='text-[#142E159E] dark:text-white' >To Do</span> {/* Wrap the text in a span for potential styling */}
                {taskInput ? <CircleChevronDown className='dark:text-white text-[#142E159E]' /> : <CircleChevronUp className='dark:text-white text-[#142E159E]' />}
            </div>


            {taskInput && <div className='w-full bg-gradient-to-b from-[rgba(53,121,55,0.1)] to-[rgba(208,255,210,0.1)] h-64 flex flex-col justify-between'>
                <textarea
                    className='w-full bg-transparent text-[#142E159E] outline-none p-2 dark:text-white'
                    rows={9}
                    value={TaskSliderText}
                    onChange={(e) => setTaskSliderText(e.target.value)}
                    placeholder='Add a Task'
                />

                <div className='flex justify-between p-3 mt-auto '>
                    <div className='flex gap-4'>
                        <Bell className='dark:text-white text-[#142E159E]' />
                        <Repeat className='dark:text-white text-[#142E159E]' />
                        <Calendar className='dark:text-white text-[#142E159E]' />
                    </div>
                    {/* <button className='bg-[#35793729] text-[#357937] p-2 rounded-md' onClick={() => dispatch(toggle())}>ADD TASK</button> */}
                    <button className=' text-[#357937] bg-[#35793729] p-2 rounded-md dark:bg-[#347237] dark:text-white ' onClick={handleAddTask}>ADD TASK</button>
                </div>
            </div>}

            {layoutValue === "list" ?
                <ul className="task-list">
                    {filteredTasks.filter(task => !task.completed).map((task) => (
                        <li key={task.id} className="task-item flex justify-between items-center p-5 border border-[#496E4B33]" onClick={() => handleSelectedTaskId(task.id)}>
                            <div className='flex gap-2'>
                                <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskCompletion(e, task.id)}> {/* Add onClick handler */}
                                    {task.completed ? <SquareCheckBig /> : <Square />}
                                </span>
                                <span className="task-text dark:text-white">{task.text}</span>
                            </div>

                            <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskImportant(e, task.id)}> {/* Add onClick handler */}
                                {task.important ? <Star /> : <StarOff />}
                            </span>
                            {/* <span className="task-priority">{task.priority}</span> */}
                        </li>
                    ))}
                </ul>
                :
                <div className="task-list flex flex-wrap gap-4 ">
                    {filteredTasks.filter(task => !task.completed).map((task) => (
                        <div key={task.id} className="task-item lg:w-1/4 w-full sm:w-1/2 py-16 flex justify-between items-center p-5 border border-[#496E4B33]" onClick={() => handleSelectedTaskId(task.id)}>
                            <div className='flex gap-1'>
                                <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskCompletion(e, task.id)}> {/* Add onClick handler */}
                                    {task.completed ? <SquareCheckBig /> : <Square />}
                                </span>
                                <span className="task-text dark:text-white">{task.text}</span>
                            </div>

                            <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskImportant(e, task.id)}> {/* Add onClick handler */}
                                {task.important ? <Star /> : <StarOff />}
                            </span>
                        </div>
                    ))}
                </div>}
            {filteredTasks.filter(task => task.completed).length !== 0 && <p className='w-fit dark:text-white'>Completed</p>}

            {layoutValue === "list" ?
                <ul className="task-list">
                    {filteredTasks.filter(task => task.completed).map((task) => (
                        <li key={task.id} className="task-item flex justify-between items-center p-5 border border-[#496E4B33]" onClick={() => handleSelectedTaskId(task.id)}>
                            <div className='flex gap-2'>
                                <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskCompletion(e, task.id)}> {/* Add onClick handler */}
                                    {task.completed ? <SquareCheckBig /> : <Square />}
                                </span>
                                <span className="task-text dark:text-white">{task.text}</span>
                            </div>

                            <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskImportant(e, task.id)}> {/* Add onClick handler */}
                                {task.important ? <Star /> : <StarOff />}
                            </span>
                            {/* <span className="task-priority">{task.priority}</span> */}
                        </li>
                    ))}
                </ul>
                :
                <div className="task-list flex flex-wrap gap-4 ">
                    {filteredTasks.filter(task => task.completed).map((task) => (
                        <div key={task.id} className="task-item w-1/4 py-16 flex justify-between items-center p-5 border border-[#496E4B33]" onClick={() => handleSelectedTaskId(task.id)}>
                            <div className='flex gap-1'>
                                <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskCompletion(e, task.id)}> {/* Add onClick handler */}
                                    {task.completed ? <SquareCheckBig /> : <Square />}
                                </span>
                                <span className="task-text dark:text-white">{task.text}</span>
                            </div>

                            <span className='taskCheckBox dark:text-white' onClick={(e) => handleToggleTaskImportant(e, task.id)}> {/* Add onClick handler */}
                                {task.important ? <Star /> : <StarOff />}
                            </span>
                        </div>
                    ))}
                </div>}


        </div>
    )
}

export default TaskList