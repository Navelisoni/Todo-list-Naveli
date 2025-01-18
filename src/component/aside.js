import { Calendar, Info, Plus, SquareMenu, Star } from 'lucide-react';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoughnutChart from './donutChat';
import { toggle } from '../store/slice/asideSlice';
import { setFilter } from '../store/slice/taskSlice';

const ProfileImage = React.memo(() => (
    <div className='rounded-full w-32 h-32 relative overflow-hidden'>
        <img className='object-cover w-full h-full' src='https://s3-alpha-sig.figma.com/img/333c/2d05/a5f50ecf137e000854b1631514ec0670?Expires=1737936000&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=UI98xJz9KlKtBp63kzXrnd1bcYVR7W3jjoFNxYCAmo~bN1HOiSZiaBT~0vlO3BcH4Tum0k8XatjemnKd-nZ-A2pLSV-D~z8XdKJev6LwLWE51pr53Dfu2~ELCxkBDkqDBkvirqOK7hdKmZ6X67uPo83kcY86SpqHc4Tux9tcyrKGlVjJ8LibsnlfKlltEYE90SXA2LWTiIahuwfnl7vz0nVAe0g7JBPgKoXZHqQOmi~59QARMhJcCWKBCHfTaNO5oW-qNZneFC-DU7Q-RyZ--1gAvTbdmBIAbR1np68xhydNgXNv-JyaghB-IYRy0iNX3QoohS4W1CIX-jwsEkBPAA__' alt='' />
    </div>
));

const Aside = () => {
    const dispatch = useDispatch(); // Make sure to import useDispatch from 'react-redux'
    const currentFilter = useSelector((state) => state.task.filter); // Retrieve the current filter value from Redux state
    const isOpen = useSelector((state) => state.aside.isOpen); // Get the isOpen state from Redux
    if (!isOpen) return null;

    const handleMobileClick = (filter) => {
        dispatch(setFilter(filter));
        // Assuming you're using a responsive design check to determine if it's mobile
        if (window.innerWidth <= 768) {
            dispatch(toggle()); // Dispatch the action to toggle the aside
        }
    };


    return (
        <div className='lg:w-1/5 bg-[#EEF6EF] lg:flex-1 lg:p-4 lg:relative lg:mt-28 lg:pt-24 dark:bg-[#2C2C2C] dark:text-white absolute w-full'>
            <div className='w-full flex flex-col items-center gap-2 -top-16 lg:absolute justify-center'>
                <ProfileImage />
                <p>Hey, ABCD</p>
            </div>

            <div className='flex flex-col gap-4 p-4 '>
                <ul className='flex flex-col bg-white gap-2 py-2 dark:bg-[#232323]'>
                    <li onClick={() => handleMobileClick('all')} className={`flex items-center dark:bg-transparent space-x-2 bg-white p-2 ${currentFilter === 'all' ? 'bg-[#35793729] rounded-lg text-green-900 dark:bg-[#35793729] dark:text-[#98E19B]' : 'hover:bg-[#35793729] hover:rounded-lg hover:text-green-900 dark:hover:bg-[#35793729] dark:hover:text-[#98E19B]'}`}>
                        <SquareMenu />
                        <span>All Tasks</span>
                    </li>
                    <li onClick={() => handleMobileClick('important')} className={`flex items-center dark:bg-transparent space-x-2 bg-white p-2 ${currentFilter === 'important' ? 'bg-[#35793729] rounded-lg text-green-900 dark:bg-[#35793729] dark:text-[#98E19B]' : 'hover:bg-[#35793729] hover:rounded-lg hover:text-green-900 dark:hover:bg-[#35793729] dark:hover:text-[#98E19B]'}`}>
                        <Star />
                        <span>Important</span>
                    </li>
                    <li onClick={() => handleMobileClick('today')} className={`flex items-center dark:bg-transparent space-x-2 bg-white p-2 ${currentFilter === 'today' ? 'bg-[#35793729] rounded-lg text-green-900 dark:bg-[#35793729] dark:text-[#98E19B]' : 'hover:bg-[#35793729] hover:rounded-lg hover:text-green-900 dark:hover:bg-[#35793729] dark:hover:text-[#98E19B]'}`}>
                        <Calendar />
                        <span>Today</span>
                    </li>
                </ul>

                <ul className='flex flex-col bg-white gap-2 py-2 dark:bg-[#232323]'>
                    <li className='flex items-center dark:bg-transparent space-x-2 bg-white p-2 hover:bg-[#35793729] hover:rounded-lg hover:text-green-900 dark:hover:bg-[#35793729] dark:hover:text-[#98E19B]'>
                        <Plus /> {/* Icon */}
                        <span>Add list</span> {/* Name next to the icon */}
                    </li>

                </ul>
                <ul className='flex flex-col bg-white gap-2 py-2 dark:bg-[#232323]'>
                    <li className='flex items-center space-x-2  p-2 justify-between '> {/* Add flexbox styling */}
                        <span>Today Tasks</span> {/* Name next to the icon */}
                        < Info />
                    </li>
                    <li>
                        <DoughnutChart />
                    </li>

                </ul>
            </div>
        </div>
    )
}

export default Aside