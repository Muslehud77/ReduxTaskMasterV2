
import Modal from '../ui/Modal';
import { useGetSingleTaskQuery } from '../../redux/features/api/baseApi';
import { useEffect } from 'react';

const TaskDetailsModal = ({ isOpen, setIsOpen, taskId }) => {
  
  
  const { data: task } = useGetSingleTaskQuery(taskId,{});

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title={task?.title}>
      {task?.description}
    </Modal>
  );
};

export default TaskDetailsModal;
