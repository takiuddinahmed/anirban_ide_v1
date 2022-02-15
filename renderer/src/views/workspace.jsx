import { useState, useEffect } from 'react';
import { RiDashboardFill } from 'react-icons/ri';
import { AiOutlineUsb, AiOutlineClose } from 'react-icons/ai';

import { BsUpload, BsTrash } from 'react-icons/bs';
import { GiLogicGateXor } from 'react-icons/gi';
import { BiCodeAlt } from 'react-icons/bi';
import { VscCopy } from 'react-icons/vsc';

// import LogicBlock from '../components/basicLogicBlock';
import SingleWorkSpaceBlock from '../components/workSpaceSingleLogicBlock';
import Dropdown from '../components/dropdown';
import Button from '../components/button';
import StartBlock from '../components/startBlock';
import WorkSpaceTrash from '../components/workSpaceTrash';

import Status from '../components/status';

const { ipcRenderer } = window.require('electron');

const WorkSpaceView = ({
  selectedBlocks = [],
  setSelectedBlocks,
  copyCode,
  arduinoCode,
}) => {
  const [dropdownShow, setDropdownShow] = useState(false);
  const [copyBtnText, setCopyBtnText] = useState('কপি কোড');
  const [serialPorts, setSerialPorts] = useState([]);
  const [selectedPort, setSelectedPort] = useState({});
  const [uploadingStatusVisibility, setUploadingStatusVisibility] =
    useState(false);

  const [uploadingStatus, setUploadingStatus] = useState({});

  useEffect(() => {
    ipcRenderer.on('copy_code', (event, msg) => {
      setCopyBtnText(msg);
      const timer = setTimeout(() => {
        setCopyBtnText('কপি কোড');
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    });
  }, []);

  const checkSelectedPortAvaibility = () => {
    const available = serialPorts.some(
      (port) => port.path === selectedPort.path
    );
    if (!available) {
      setSelectedPort({});
    }
  };

  useEffect(() => {
    // get port update
    ipcRenderer.on('get_available_serial_ports', (event, msg) => {
      setSerialPorts(msg);
      if (selectedPort?.path?.length) {
        checkSelectedPortAvaibility();
      }
    });

    // get upload update
    ipcRenderer.on('update_upload_info', (event, msg) => {
      console.log(msg);
      setUploadingStatus(msg);
    });
  }, []);

  useEffect(() => {}, []);

  const toggleDropdown = () => {
    console.log('toggle');
    setDropdownShow(!dropdownShow);
  };

  const selectPort = (port) => {
    setSelectedPort(port);
    toggleDropdown();
  };

  const setmodal = (aa) => {
    console.log(aa);
  };

  const cancelUpload = () => {
    ipcRenderer.send('cancel-upload');
  };

  const codeUpload = () => {
    if (selectedPort?.path) {
      setUploadingStatusVisibility(true);
      setUploadingStatus({});
      ipcRenderer.send('code-upload', { arduinoCode, selectedPort });
    } else {
      alert('select a port');
    }
  };

  const addSelectedBlock = (block) => {
    setSelectedBlocks((s) => [...s, block]);
  };

  const closeUploadingStatus = () => {
    setUploadingStatusVisibility(false);
  };

  const addSelectedBlocksBasedonIndex = (item, index) => {
    console.log(item);
    setSelectedBlocks((s) => {
      console.log({ s, index, item });
      if (s.length > 0) {
        if (item.source === 'logic') {
          return [...s.slice(0, index), item, ...s.slice(index)];
          // eslint-disable-next-line no-else-return
        } else if (item.source === 'workspace') {
          let itemIndex = item.index;
          console.log({ index, itemIndex });
          const newArr = [...s.slice(0, index), item, ...s.slice(index)];
          if (itemIndex > index) {
            itemIndex += 1;
          }
          return newArr.filter((_item, _index) => _index !== itemIndex);
        }
      }
      return [item];
    });
  };

  const removeSelectedBlockByIndex = (index) => {
    setSelectedBlocks((s) => {
      return [...s.slice(0, index), ...s.slice(index + 1)];
    });
  };

  const render_single_block = selectedBlocks.map((block, index) => {
    if (block?.id) {
      return (
        <>
          <SingleWorkSpaceBlock
            data={block}
            index={index}
            addBlock={addSelectedBlocksBasedonIndex}
            // allData={selectedBlocks}
          />
        </>
      );
    }
    return (
      <>
        <div style={{ height: '60px' }} />
      </>
    );
  });

  return (
    <div className="flex-grow bg-gray-200 relative relative">
      <div className="w-full z-50 workSpaceHeader text-center text-white p-2 flex items-center justify-center gap-2">
        <RiDashboardFill />
        ওয়ার্কস্পেস
      </div>
      <div className="flex items-center workSpaceHeader2 justify-evenly p-2">
        <div className="relative border-2 border-blue-500 m-2 rounded-lg flex items-center gap-2">
          <Button bgColor="blue-500" textColor="white" onClick={toggleDropdown}>
            <AiOutlineUsb />
            সিলেক্ট পোর্ট
          </Button>
          <p className="text-blue-500">{selectedPort?.path}</p>
          <Button bgColor="" textColor="red-500">
            <AiOutlineClose
              onClick={() => {
                setSelectedPort({});
              }}
            />
          </Button>

          <Dropdown
            availablePorts={serialPorts}
            selectPort={selectPort}
            active={dropdownShow}
          />
        </div>

        <Button
          bgColor="blue-500"
          textColor="white"
          css="m-2"
          onClick={codeUpload}
        >
          <BsUpload />
          কোড আপলোড
        </Button>
        <Button
          bgColor="blue-500"
          textColor="white"
          css="m-2"
          onClick={() => {
            copyCode();
          }}
        >
          <VscCopy />
          {copyBtnText}
        </Button>
      </div>

      {/* workspace */}
      <div className="fixScreen workSpaceBody workSpaceTopClearance noScrollBar relative">
        <div
          className="w-full flex flex-col items-center "
          style={{ marginTop: '200px' }}
        >
          <StartBlock addBlock={addSelectedBlocksBasedonIndex} />
          {render_single_block}
        </div>
      </div>
      <WorkSpaceTrash remove={removeSelectedBlockByIndex} />

      <Status
        status={uploadingStatus}
        visible={uploadingStatusVisibility}
        close={closeUploadingStatus}
        cancel = {cancelUpload}
      />
    </div>
  );
};

export default WorkSpaceView;
