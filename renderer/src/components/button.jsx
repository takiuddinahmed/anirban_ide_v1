import classnames from 'classnames';
import PropTypes from 'prop-types';

function Button({
  bgColor,
  hoverColor,
  textColor,
  css,
  children,
  onClick,
  hide,
}) {
  return (
    <button
      type="button"
      className={classnames(
        `bg-${bgColor} text-${textColor} hover:bg-${hoverColor} py-2 px-4 rounded ${css} flex items-center gap-2 text-sm pointer`
      )}
      onClick={onClick}
      style={{ visibility: hide ? 'hidden' : 'visible' }}
    >
      {children}
    </button>
  );
}

Button.propTypes = {
  bgColor: PropTypes.string,
  hoverColor: PropTypes.string,
  textColor: PropTypes.string,
  css: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func,
  hide: PropTypes.bool,
};

Button.defaultProps = {
  bgColor: '',
  hoverColor: '',
  textColor: '',
  css: '',
  children: '',
  onClick: () => {},
  hide: false,
};

export default Button;
