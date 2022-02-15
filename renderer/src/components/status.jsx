import Button from '../components/button';
import loading from '../assets/loading.gif';
import { BsCheck2Circle } from 'react-icons/bs';
import { FcCancel } from 'react-icons/fc';

function Status({ status, visible, close, cancel }) {
  return (
    <div
      className="status shadow flex flex-col items-center"
      style={{ display: visible ? "" : "none" }}
    >
      {!status?.done ? (
        <img src={loading} alt="Loading" className="loading-img" />
      ) : status?.successfull ? (
        <BsCheck2Circle className="text-green-500" style={{ fontSize: 100 }} />
      ) : (
        <FcCancel className="text-red-500" style={{ fontSize: 100 }} />
      )}

      <div className="text-4xl font-semibold ">{status?.msg}</div>

      <Button
        bgColor="green-500"
        textColor="white"
        css="m-2 mt-8"
        hide={!status?.done}
        onClick={() => {
          close();
        }}
      >
        {/* <BsUpload /> */}
        ঠিক আছে
      </Button>
      <Button
        bgColor="green-500"
        textColor="white"
        css="m-2 mt-8"
        hide={status?.done}
        onClick={() => {
          cancel();
          close();
          
        }}
      >
        {/* <BsUpload /> */}
        বাতিল করুন
      </Button>
    </div>
  );
}
export default Status;
