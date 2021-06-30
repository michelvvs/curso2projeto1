import P from 'prop-types';
import './styles.css';

export const Button = (props) => {
  const { text, onClick, disabled } = props;
  return (
    <button disabled={disabled} className="button" onClick={onClick}>
      {text}
    </button>
  );
};

Button.defaultProps = {
  disabled: false,
};

Button.propTypes = {
  text: P.string,
  onClick: P.func,
  disabled: P.bool,
};

//onClick={this.loadMorePosts}
