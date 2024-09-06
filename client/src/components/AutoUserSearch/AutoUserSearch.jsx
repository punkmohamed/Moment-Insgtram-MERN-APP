import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { userList } from "../../actions/auth";
import avatar from '../../assets/memories.png'
import { Link } from 'react-router-dom';

const AutoUserSearch = () => {
    const [hide, setHide] = useState(false)
    const dispatch = useDispatch();
    const [searchValue, setSearchValue] = useState('')


    const handleSearch = (e) => {
        setSearchValue(e.target.value)
        if (e.target.value === '') {
            setHide(false)
        } else {
            setHide(true)
        }
    }

    useEffect(() => {
        dispatch(userList());
    }, [dispatch, userList]);

    const users = useSelector((state) => state.auth.userList || []);
    const handleClick = () => {
        setHide(false)
        setSearchValue("")
        console.log(hide, "after click");


    }


    const search = users && users?.users?.filter(item => item.name?.toUpperCase().trim().includes(searchValue?.toUpperCase().trim()))



    return (
        <div className="flex flex-col  mx-auto relative">
            <div
                className="bg-white items-center justify-between w-70 flex rounded-full shadow-lg p-2  sticky"
                style={{ top: '5px' }}
            >
                <input
                    className="font-bold uppercase rounded-full w-full  pl-4 text-gray-700 bg-gray-100 leading-tight focus:outline-none focus:shadow-outline lg:text-sm text-xs"
                    type="text"

                    onChange={handleSearch}
                    placeholder="Search for users"
                />
                <div className="bg-gray-600 p-2 hover:bg-blue-400 cursor-pointer mx-2 rounded-full">
                    <svg
                        className="w-6 h-6 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path
                            fillRule="evenodd"
                            d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                            clipRule="evenodd"
                        />
                    </svg>
                </div>
            </div>
            {hide && <div className='absolute bg-red-200 top-20 rounded-xl z-50 h-60 overflow-y-auto'>
                {search.map((user) => (
                    <div key={user.id} className="flex flex-col gap-4 lg:p-2 p-2 rounded-lg m-2  ">
                        <Link to={`/creators/${user.name}`}
                            onClick={handleClick}
                        >
                            <div className=" flex items-center justify-between w-60 p-2 lg:rounded-full md:rounded-full hover:bg-gray-100 cursor-pointer border-2 rounded-lg">
                                <div className="lg:flex md:flex items-center">
                                    <div className="h-12 w-12 mb-2 lg:mb-0 border md:mb-0 rounded-full mr-3">
                                        <img
                                            className="size-full object-cover rounded-full ring-4 bg-white ring-white transition-transform duration-300 ease-in-out transform hover:scale-105"
                                            src={user.imageUrl || avatar}
                                            alt="Avatar"
                                        />
                                    </div>
                                    <div className="flex flex-col">
                                        <div className="text-sm leading-3 text-gray-700 font-bold w-full">
                                            {user.name}
                                        </div>
                                        <div className="text-xs text-gray-600 w-full">
                                            {user.name}
                                        </div>
                                    </div>
                                </div>
                                <svg
                                    className="h-6 w-6 mr-1 invisible md:visible lg:visible xl:visible"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                        </Link>
                    </div>
                ))
                }
            </div>}

        </div>

    )
}

export default AutoUserSearch