import '../../css/SideBySide.css';
function SideBySide ({ content, gap=7, fillWidth=false }) {
    let widthValue;
    if (fillWidth === true) {
        widthValue = '100%'
    }
    else {
        widthValue = 'auto'
    }
    
    return (
        <div className='side-by-side' style={{
            gap: ((gap.toString()) + 'px'), 
            width: widthValue
            }}>
            {content}
        </div>
    )
}
export default SideBySide;