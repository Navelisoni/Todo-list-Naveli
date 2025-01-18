import { useSelector } from 'react-redux';
import './App.css';
import Aside from './component/aside';
import Navbar from './component/navbar';
import TaskList from './component/taskList';
import { useEffect } from 'react';
import TaskSlider from './component/newTask';

function App() {

  const showTaskSlider = useSelector((state) => state.task.isOpen);
  const showAside = useSelector((state) => state.aside.isOpen); // Get the isOpen state from Redux


  const darkMode = useSelector((state) => state.theme.darkMode);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className="App flex flex-col h-screen px-4 dark:bg-[#242424] ">
      <Navbar />
      <div className={`flex flex-1 w-full relative ${showTaskSlider && showAside ? "gap-4" : showTaskSlider || showAside ? "gap-8" : ""} overflow-hidden`}>
        <Aside />
        <TaskList />
        <TaskSlider />
      </div>
    </div>
  );
}

export default App;
