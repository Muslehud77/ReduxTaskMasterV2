
import { useGetSingleTaskQuery } from '../../redux/features/tasks/tasksApi';
import Modal from '../ui/Modal';



const TaskDetailsModal = ({ isOpen, setIsOpen, taskId }) => {
  
  
  const { data: task } = useGetSingleTaskQuery(taskId,{});

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={task?.title}>
      {task?.description}
    </Modal>
  );
};

export default TaskDetailsModal;
