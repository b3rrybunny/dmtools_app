import '../../css/BasicCon.css';

function BasicCon ({content, align='', justify='', width='auto', height='auto', margin='0', bgColor='rgba(255, 255, 255, 0.616)' }) {
    return (
        <div className="basic-container" style={{
            width: (width), 
            height: (height),
            margin: (margin + 'px'),
            justifyContent: justify,
            alignContent: align,
            backgroundColor: bgColor
            }}>
            {content}
        </div>
    );
}

export default BasicCon;