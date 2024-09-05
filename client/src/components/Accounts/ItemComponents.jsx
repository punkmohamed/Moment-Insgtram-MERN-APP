/* eslint-disable react/prop-types */

const ItemComponent = ({ setShowModal, handleUpdate }) => {


    return (
        <div
            className="options absolute bg-white text-gray-600 origin-top-right right-0 mt-2 w-36 rounded-md shadow-lg overflow-hidden"
        >
            <span className="flex py-3 px-2 text-sm font-bold hover:bg-gray-100 cursor-pointer" onClick={handleUpdate}>
                <span className="mr-auto  ">Edit</span>
                <svg viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5" >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                </svg>
            </span>
            <span
                className="flex py-3 px-2 text-sm font-bold bg-red-400 text-white cursor-pointer"
                onClick={() => setShowModal(true)}
            >
                <span className="mr-auto ">Delete</span>
                <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="w-5 h-5"
                    style={{ marginRight: '10px' }}
                >
                    <path
                        fillRule="evenodd"
                        d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                        clipRule="evenodd"
                    />
                </svg>
            </span>
        </div>
    );
};

export default ItemComponent;
