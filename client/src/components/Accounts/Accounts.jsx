/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import AccountCard from "./AccountCard";
import AccountTable from "./AccountTable";
import { useEffect, useState } from "react";
import image1 from '../../assets/60b0b4e857b85-bp-cover-image.jpg'
import image2 from '../../assets/60b0cd1857a1b-bp-cover-image.jpg'
import image3 from '../../assets/60b0d09cd2e5d-bp-cover-image.jpg'
import image4 from '../../assets/60b0d3d276202-bp-cover-image.jpg'
import image5 from '../../assets/60b0d4a678ea3-bp-cover-image.jpg'
import banner from '../../assets/people_2.png'
import people from '../../assets/shape_7.png'
import { userList } from "../../actions/auth";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTable, faThLarge } from '@fortawesome/free-solid-svg-icons';
const images = [image1, image2, image3, image4, image5]
const Accounts = () => {

    const dispatch = useDispatch();
    const [display, setDisplay] = useState(false)
    const [searchValue, setSearchValue] = useState('')

    const handleDisplay = () => {
        setDisplay(!display)
    }
    const handleSearch = (e) => {
        setSearchValue(e.target.value)
    }

    useEffect(() => {
        dispatch(userList());
    }, [dispatch]);

    const users = useSelector((state) => state.auth.userList || []);



    const search = users && users?.users?.filter(item => item.name?.toLowerCase().trim().includes(searchValue?.toLowerCase().trim()))


    return (
        <>

            <div className="bg-yellow-400 rounded-lg mt-5 " style={{ backgroundImage: `url(${people})` }}>
                <div className="h-3" >
                    <div className="text-white w-96 flex justify-center items-center">
                        <i className="fa-regular fa-bullhorn"></i>
                        <div className=" mt-10 ">
                            <h1 className=" text-4xl font-bold italic">All Member Profiles
                            </h1>
                            <span className="text-lg"> Browse all the members of the community!</span>
                        </div>
                    </div>
                </div>
                <div className="h-44 bg-no-repeat bg-right " style={{ backgroundImage: `url(${banner})` }}>
                </div>
            </div>
            <div className="relative flex  justify-between overflow-hidden my-10">
                <div className="relative flex items-center justify-between rounded-2xl bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:px-10">
                    <div className="flex items-center">
                        <input
                            type="search"
                            onChange={handleSearch}
                            className="peer cursor-pointer relative z-10 h-12 w-12 rounded-full border bg-transparent pl-12 outline-none transition-all duration-300 ease-in-out focus:w-full focus:cursor-text focus:border-lime-300 focus:pl-16 focus:pr-4"
                        />
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="absolute inset-y-0 my-11 h-10 w-12 border-r border-transparent stroke-gray-500 px-3.5 transition-all duration-300 ease-in-out peer-focus:border-lime-300 peer-focus:stroke-lime-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
                <div className="flex items-center space-x-4 text-4xl">
                    <button onClick={handleDisplay} className="text-gray-500 hover:text-lime-500 focus:outline-none ">
                        <FontAwesomeIcon icon={faTable} />
                    </button>
                    <button onClick={handleDisplay} className="text-gray-500 hover:text-lime-500 focus:outline-none">
                        <FontAwesomeIcon icon={faThLarge} />
                    </button>
                </div>
            </div>
            <div className={`text-3xl cursor-pointer mt-3 mr-10 ${!display && 'rotate-90'} `} onClick={handleDisplay}>
                <i className="fa-solid fa-list-ul"></i>
            </div>
            <div className="mt-10">
                {!display
                    ? <AccountCard images={images} searchValue={searchValue} search={search} />
                    : <AccountTable images={images} searchValue={searchValue} search={search} />
                }
            </div>

        </>
    )
}

export default Accounts