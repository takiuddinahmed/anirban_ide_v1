import { useDrag } from 'react-dnd';
import BasicLogicBlock from './basicLogicBlock';

function SingleLogicBlock({ data, logicView }) {
  data.source = 'logic';
  const [{ isDragging }, drag] = useDrag({
    type: 'logic',
    item: data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  return (
    <>
      <BasicLogicBlock data={data} logicView={logicView} dragRef={drag} />
      {/* {isDragging ? <div> Drugging </div> : <p> Not dragging </p>} */}
    </>
  );
}

export default SingleLogicBlock;
