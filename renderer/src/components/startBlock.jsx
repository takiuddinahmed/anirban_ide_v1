import { useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';

function StartBlock({ addBlock, index = 0 }) {
  const dispatch = useDispatch();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'logic',
    drop: (item) => {
      console.log(item);
      console.log(index);
      addBlock(item, index);
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <>
      <div
        className="workspace-block-parent-div"
        ref={drop}
        style={{
          marginBottom: isOver ? '60px' : '0px',
          transition: isOver ? '0.5s ease-in' : '',
        }}
      >
        <span className="bg-red-600 logic logicBlock moveUp flex items-center justify-center gap-2 pt-3 px-3 pb-4 logicBlockWidth  cursor-pointer text-white disable-text-selection">
          {/* {data.icon} */}
          শুরু করো
        </span>
      </div>
    </>
  );
}

export default StartBlock;
