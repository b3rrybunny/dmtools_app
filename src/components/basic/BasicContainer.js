import '../../css/BasicCon.css';

function BasicCon ({content, align='', justify='', width='auto', height='auto', margin='0' }) {
    return (
        <div className="basic-container" style={{
            width: (width), 
            height: (height),
            margin: (margin + 'px'),
            justifyContent: justify,
            alignContent: align,
            }}>
            {content}
        </div>
    );
}

export default BasicCon;