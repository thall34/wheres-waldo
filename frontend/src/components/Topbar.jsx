function Topbar({ points, message, characters }) {
    return (
        <div className='topBar'>
            <p>You have found {points} characters out of {characters.length}</p>
            <p>{message}</p>
        </div>
    )
};

export default Topbar;