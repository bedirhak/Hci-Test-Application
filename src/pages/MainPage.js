import React, { useState } from 'react';
import '../style/mainpage.css';

const MainPage = () => {
    const [tasks, setTasks] = useState([
       'Modify the notifications settings that you will receive from system.',
       'Modify security settings through profile settings.',
       'Find the course which name is "HTML5 ile Web Geliştirme”',
       'View comments of "HTML5 ile Web Geliştirme” course',
       'Open first video of this courses.',
       'Take notes related to course that you view in previous step.',
       'Like or unlike this course.',
       'Check if this courses’ instructors has giving any other courses.',
       'List your finished and continuing courses.',
       'View all your notes that you took in courses.',
       'View one of your certificates from your finished courses.'
        
    ]);

    const [currentTask, setCurrentTask] = useState(-1);
    const [taskTimes, setTaskTimes] = useState([]);
    const [time, setTime] = useState({
        sec: 0,
        min: 0,
        hr: 0
    });


  const  nextTask = () => {
        setCurrentTask(currentTask + 1);
        console.log(currentTask);

        if (currentTask > -1 && currentTask < 11 ){
            const taskTime = `Task${currentTask + 1} Finish Time is: ${time.min} minute , ${time.sec} second `;
            currentTask === 0 && setTaskTimes([]);
            setTaskTimes((prev) => [...prev, taskTime]);
        }

        console.log(taskTimes);

        reset();
        starStopWatch();
  }


const [intervalId, setIntervalId] = useState();

const updateTimer = () => {
    setTime((prev) => {
        let newTime = { ...prev };
        // update sec and see if we need to increase min
        if (newTime.sec < 59) newTime.sec += 1;
        else {
            newTime.min += 1;
            newTime.sec = 0;
        }
        // min has increased in *newTime* by now if it was updated, see if it has crossed 59
        if (newTime.min === 60) {
            newTime.min = 0;
            newTime.hr += 1;
        }

        return newTime;
    });
};

const starStopWatch = () => {
    let id = setInterval(updateTimer, 1000);
        setIntervalId(id);
};

const restartTest = () => {
    const localStorageKey = "userTestTimes";
    const localStorageArray = JSON.parse(localStorage.getItem(localStorageKey)) || [];
    localStorageArray.push(taskTimes);


    localStorage.setItem(localStorageKey, JSON.stringify(localStorageArray));
    setCurrentTask(-1);
};

// const pauseOrResume = () => {
//     if (!intervalId) {
//         let id = setInterval(updateTimer, 1000);
//         setIntervalId(id);
//     } else {
//         clearInterval(intervalId);
//         setIntervalId("");
//     }
// };

const reset = () => {
    clearInterval(intervalId);
    setTime({
        sec: 0,
        min: 0,
        hr: 0
    });
};


    const renderContent = () => {
       if (currentTask === -1) {
            return <button className='task-buttons' onClick={nextTask}>Start Tasks</button>
       } else if (currentTask < 11) {
            return <button className='task-buttons' onClick={nextTask}>Task Done</button>
       } else {
            return <button className='task-buttons' onClick={restartTest}>Restart Test</button>
       }
    };
 
  return (
    <>
      <div className='main-container'>
        <div className='main-container-content'>

        {currentTask === 11 &&
            (taskTimes.map((taskTime,index) => <div key={index}>{taskTime}</div>))
        }


        {currentTask > -1 ? 
            <div className='current-task'>{tasks[currentTask]}</div> :
            <div className='start-tasks'></div>
        }

        {(currentTask > -1 && currentTask < 11) &&
            <h2 className='stop-watch'>{`${time.hr < 10 ? 0 : ""}${time.hr} : ${time.min < 10 ? 0 : ""}${time.min} : ${time.sec < 10 ? 0 : ""}${time.sec}`}</h2>
        }

        {renderContent()}


        </div>
      </div>
    </>
  );
};

export default MainPage;
