import '../../css/SideBySide.css';
function SideBySide ({ content, gap=7 }) {
    return (
        <div className='side-by-side' style={{gap: ({gap} + 'px')}}>
            {content}
        </div>
    )
}
export default SideBySide;