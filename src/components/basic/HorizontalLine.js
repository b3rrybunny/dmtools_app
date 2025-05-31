import '../../css/HorizontalLine.css'
function HorizLine ( { thickness=2, color='#000000' }) {
    return (
        <hr style={{ height: (thickness.toString() + 'px'), backgroundColor: color, border: 'none' }} />
    );
}

export default HorizLine;