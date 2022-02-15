import PropTypes from 'prop-types';
import classnames from 'classnames';
import { useDrag } from 'react-dnd';

function BasicLogicBlock({ data = {}, dashBoard, dragRef }) {
  return (
    <div className="" ref={dragRef}>
      <span
        className={classnames(
          `logic ${
            dashBoard ? 'moveUp' : ''
          } flex items-center pl-10 gap-2 px-3 logicBlock  cursor-pointer text-white disable-text-selection`
        )}
        style={{ backgroundColor: data.color }}
      >
        {data.icon()}
        {data.title}
      </span>
    </div>
  );
}

export default BasicLogicBlock;
