import React, { useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './components/hooks/use-http';

function App() {
  const [tasks, setTasks] = useState([]);

  const transformtasks= tasksobj=>{
    const loadedTasks=[];
    for(const taskKey in tasksobj){
      loadedTasks.push({id:taskKey, text: tasksobj[taskKey].text})
    }
    setTasks(loadedTasks);
  }
  
   const httpdata=useHttp({url:'https://movie-react-http-default-rtdb.firebaseio.com/tasks.json'}, transformtasks);
   
   const {isLoading,error,sendRequest: fetchTasks}= httpdata;

  useEffect(() => {
    fetchTasks();
  }, []);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
      />
    </React.Fragment>
  );
}

export default App;
