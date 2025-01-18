import { Bell, Calendar, Plus, Repeat, Square, SquareCheckBig, Star, StarOff, Trash2, X } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteTask, toggle, toggleTaskCompletion, toggleTaskImpportant } from '../store/slice/taskSlice';

const TaskSlider = () => {
  const isOpen = useSelector((state) => state.task.isOpen);
  const task = useSelector((state) => state.task.taskList[state.task.taskId]);
  const dispatch = useDispatch();

  if (!isOpen) return null;

  const handleToggleTaskCompletion = (taskId) => {
    dispatch(toggleTaskCompletion(taskId)); // Dispatch the action to toggle task completion
  };
  const handleToggleTaskImportant = (taskId) => {
    dispatch(toggleTaskImpportant(taskId)); // Dispatch the action to toggle task completion
  };
  const handleTaskDelete = (taskId) => {
    dispatch(deleteTask(taskId)); // Dispatch the action to toggle task completion
    dispatch(toggle())
  };
  const handleClose =() => {
    dispatch(toggle())
  }

  return (
    <div className='lg:w-1/5 lg:flex-1  bg-[#EEF6EF] flex flex-col p-4 lg:h-screen h-full dark:bg-[#2c2c2c]  lg:relative absolute right-0 w-full'>
      <div className='flex flex-col' key={task.id} >

        <div className="task-item flex justify-between items-center p-5 border-t border-b border-[#496E4B33]" >
          <div className='flex gap-2 '>
            <span className='taskCheckBox dark:text-white' onClick={() => handleToggleTaskCompletion(task.id)}> 
              {task.completed ? <SquareCheckBig /> : <Square />}
            </span>
            <span className="task-text dark:text-white">{task.text}</span>
          </div>

          <span className='taskCheckBox dark:text-white' onClick={() => handleToggleTaskImportant(task.id)}> 
            {task.important ? <Star /> : <StarOff />}
          </span>
          {/* <span className="task-priority">{task.priority}</span> */}
        </div>
        <div  className="task-item flex justify-between items-center p-5 border-t border-b border-[#496E4B33]" >
          <div className='flex gap-2'>
            <span className='taskCheckBox dark:text-white'> 
              <Plus />
            </span>
            <span className="task-text dark:text-white">Add Step</span>
          </div>

        </div>
        <div  className="task-item flex justify-between items-center p-5 border-t border-b border-[#496E4B33]" >
          <div className='flex gap-2'>
            <span className='taskCheckBox dark:text-white'> 
              <Bell />
            </span>
            <span className="task-text dark:text-white">Set Reminder</span>
          </div>

        </div>
        <div  className="task-item flex justify-between items-center p-5 border-t border-b border-[#496E4B33]" >
          <div className='flex gap-2'>
            <span className='taskCheckBox dark:text-white'> 
              <Calendar />
            </span>
            <span className="task-text dark:text-white">Add Due Date</span>
          </div>

        </div>
        <div  className="task-item flex justify-between items-center p-5 border-t border-b border-[#496E4B33]" >
          <div className='flex gap-2'>
            <span className='taskCheckBox dark:text-white'> 
              <Repeat />
            </span>
            <span className="task-text dark:text-white">Add Due Date</span>
          </div>

        </div>
      </div>
      <div className='mt-auto'>

        <div className="task-item flex justify-between items-center p-5 border-t border-b border-[#496E4B33]" >
          <span className='taskCheckBox dark:text-white' onClick={handleClose}> 
            <X />
          </span>
          <span className="task-text dark:text-white">Created Today</span>
          <span className='taskCheckBox dark:text-white' onClick={() => handleTaskDelete(task.id)}> 
            <Trash2 />
          </span>
        </div>

      </div>
    </div>
  );
};


export default TaskSlider