import '../../css/HPBlock.css';

function HPBlock({ hp, onChange }) {

    const handleAdd = () => {
        onChange('+');
    }

    const handleSubtract = () => {
        onChange('-');
    }

    return (
        <div className='hp-block side-by-side'>
            <h4>❤ HP: </h4>
            <button
                type='button'
                className='btn btn-outline-dark'
                onClick={handleAdd}
                style={{
                    '--bs-btn-padding-y': '.25rem',
                    '--bs-btn-padding-x': '1rem',
                    '--bs-btn-font-size': '1rem'
                }}>+</button>
            <h4> {hp} </h4>
            <button
                type='button'
                className='btn btn-outline-dark'
                onClick={handleSubtract}
                style={{
                    '--bs-btn-padding-y': '.25rem',
                    '--bs-btn-padding-x': '1rem',
                    '--bs-btn-font-size': '1rem'
                }}>–</button>
        </div>
    );
}

export default HPBlock;