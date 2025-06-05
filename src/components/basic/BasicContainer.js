import '../../css/BasicCon.css';

function BasicCon ({content, width='auto', height='auto', margin='0' }) {
    return (
        <div className="basic-container" style={{width: (width), height: (height), margin: (margin + 'px')}}>
            {content}
        </div>
    );
}

export default BasicCon;