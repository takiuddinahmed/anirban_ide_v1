import { useDrop } from 'react-dnd';
import { FaTrashAlt } from 'react-icons/fa';

function WorkSpaceTrash({ remove }) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'logic',
    hover: (item, monitor) => {
      if (!item) return;
    },
    drop: (item) => {
      if (item.source === 'workspace') {
        remove(item.index);
      }
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));
  return (
    <div
      className="dltBtn trashIcon z-50"
      ref={drop}
      style={isOver ? { transform: 'scale(1.2)' } : {}}
    >
      <FaTrashAlt className="text-5xl" />
      <p className="text-sm font-semibold mt-1">ডিলিট ব্লক</p>
    </div>
  );
}

export default WorkSpaceTrash;
