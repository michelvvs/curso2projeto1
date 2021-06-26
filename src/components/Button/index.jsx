import './styles.css';

export const Button = (props) => {
    const {text, event, disabled} = props;
    return (
        <button disabled={disabled} className="button" onClick={event} >{text}</button>
    )
}

//onClick={this.loadMorePosts}