function DisplayStatus (props) {
    var show = (props.type) ? 'block' : 'none';
    var color = (props.type === 'success') ? '#35c45b' : '#d41c1c';

    return (
        <div style={{
            display: show,
            background: color,
            margin: 'auto',
            padding: 20,
            maxWidth: 300,
            borderRadius: 5
        }}>
            {props.message}
        </div>
    );
}

export default DisplayStatus;