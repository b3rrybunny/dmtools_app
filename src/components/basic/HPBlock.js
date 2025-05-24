import '../../css/HPBlock.css';

function HPBlock ({hp, onChange}) {

    const handleAdd = () => {
        onChange('+');
    }

    const handleSubtract = () => {
        onChange('-');
    }

    return (
        <div className='hp-block side-by-side'>
            <h4>❤ HP: </h4>
            <button type='button' className='btn btn-outline-light' onClick={handleAdd}>+</button>
            <h4> {hp} </h4>
            <button type='button' className='btn btn-outline-light' onClick={handleSubtract}>-</button>
        </div>
    );
}

export default HPBlock;