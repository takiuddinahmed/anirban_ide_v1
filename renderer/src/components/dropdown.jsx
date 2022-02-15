// import proptype
import PropTypes from 'prop-types';

function Dropdown({ active, selectPort, availablePorts = [] }) {
  const showAvailablePorts = availablePorts.map((port) => {
    return (
      <div
        className="hover:bg-blue-300 px-2 cursor-pointer"
        onClick={() => selectPort(port)}
      >
        {port?.path}
      </div>
    );
  });

  return (
    <div
      className={`${
        active ? 'block' : 'hidden'
      } absolute mt-2 flex flex-col top-100 overflow-visible w-full border-2 border-blue-500 rounded-lg py-1 z-50 leading-7`}
    >
      {showAvailablePorts}
    </div>
  );
}

Dropdown.propTypes = {
  active: PropTypes.string.isRequired,
};

export default Dropdown;
