import { GiLogicGateXor } from 'react-icons/gi';
import classnames from 'classnames';
import logicBlockList from '../data/logicBlocks';
import SingleLogicBlock from '../components/singleLogicBlock';

const LogicBlockView = () => {
  const logicBlockListView = logicBlockList.map((logicBlock) => (
    <SingleLogicBlock key={logicBlock.id} data={logicBlock} logicView />
  ));

  return (
    <div className="resize logicInitialWidth flex flex-col">
      <div className="w-full logicBlockHeader text-white p-2 flex items-center justify-center gap-2">
        <GiLogicGateXor />
        লজিক ব্লক
      </div>
      {/* logical blocks will stay here */}
      <div className="flex flex-col m-2 items-center justify-center h-full gap-8">
        {logicBlockListView}
      </div>
    </div>
  );
};

export default LogicBlockView;
