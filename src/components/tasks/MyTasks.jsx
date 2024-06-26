import {
  CheckIcon,
  DocumentMagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { useEffect, useState } from 'react';

import {  useSelector } from 'react-redux';
import TaskDetailsModal from './TaskDetailsModal';
import { useGetTasksQuery, useUpdateStatusMutation } from '../../redux/features/tasks/tasksApi';



const MyTasks = () => {
  // const { tasks, userSpecificTasks } = useSelector((state) => state.tasksSlice);
  const {data:tasks}= useGetTasksQuery()
  const { name } = useSelector((state) => state.userSlice);
  const [isOpen, setIsOpen] = useState(false);
  const [taskId, setTaskId] = useState(null);

 const [update,{data,error}] = useUpdateStatusMutation()


  const userSpecificTasks = tasks?.filter(task=> task.assignedTo === name)

  const handleDetails = (id) => {
    setTaskId(id);
    setIsOpen(!isOpen);
  };




  return (
    <div>
      <TaskDetailsModal isOpen={isOpen} setIsOpen={setIsOpen} taskId={taskId} />
      <h1 className="text-xl my-3">My Tasks</h1>
      <div className=" h-[750px] overflow-auto space-y-3">
        {userSpecificTasks?.map((item) => (
          <div
            key={item._id}
            className="bg-secondary/10 rounded-md p-3 flex justify-between"
          >
            <h1>{item.title}</h1>
            <div className="flex gap-3">
              <button
                onClick={() => handleDetails(item._id)}
                className="grid place-content-center"
                title="Details"
              >
                <DocumentMagnifyingGlassIcon className="w-5 h-5 text-primary" />
              </button>
              <button
                onClick={() => update({ id : item._id, status : {status: "done" }})}
                className="grid place-content-center"
                title="Done"
              >
                <CheckIcon className="w-5 h-5 text-primary" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
