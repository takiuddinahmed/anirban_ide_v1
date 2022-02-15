import React, { useEffect } from 'react';
import { useDrag, useDrop } from 'react-dnd';

import BasicLogicBlock from './basicLogicBlock';

function SingleWorkSpaceBlock({ data, index, addBlock }) {
  data.source = 'workspace';
  data.index = index;
  const [{ isDragging }, drag] = useDrag({
    type: 'logic',
    item: data,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'logic',
    drop: (item) => {
      console.log(item);
      addBlock(item, index + 1);
    },
    hover: (item) => {
      let hoverIndex = index;
      let itemIndex = item.index;
    },
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  const drugOverDetect = () => {
    if (isOver) {
      return { paddingBottom: '60px', transition: 'all 0.3s ease-in-out' };
    }
    if (isDragging) {
      return { display: 'none' };
    }

    return { transition: 'none', paddingBottom: '0px' };
  };

  return (
    <>
      <div style={drugOverDetect()}>
        <div className="workspace-block-parent-div" ref={drop}>
          <BasicLogicBlock data={data} dragRef={drag} />
        </div>
      </div>
    </>
  );
}

export default SingleWorkSpaceBlock;
