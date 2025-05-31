import '../../css/BasicCon.css';

function BasicCon ({content, width='auto', height='auto' }) {
    return (
        <div className="basic-container" style={{width: (width), height: (height)}}>
            {content}
        </div>
    );
}

export default BasicCon;