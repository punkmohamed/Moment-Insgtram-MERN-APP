/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import avatar from '../../assets/memories.png'
import images1 from "../../assets/ai-image-generator-one.webp"
import images2 from "../../assets/medium.webp"
import images3 from "../../assets/bird-8788491_1280.webp"
import images4 from "../../assets/istockphoto-1213934035-612x612.jpg"
import images5 from "../../assets/subhome-ai.jpg"
const AccountCard = ({ search, images }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mx-14">
            {search && search.length > 0
                ? search?.map((user, index) => {
                    const imageUrl = images[index % images.length];
                    return (
                        <div key={user.id} className=" relative max-w-72.5 bg-white rounded-lg shadow-md overflow-hidden">
                            <img
                                className="h-32 w-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                                src={imageUrl}
                                alt="Group Cover Image"
                            />
                            <div className="p-4">
                                <div className="relative size-29 -mt-18 mx-auto mb-4">
                                    <img
                                        className="size-full object-cover rounded-full ring-4 bg-white ring-white transition-transform duration-300 ease-in-out transform hover:scale-105"
                                        src={user.imageUrl || avatar}
                                        alt="Avatar"
                                    />
                                </div>
                                <Link to={`/creators/${user.name}`}><h5 className="text-center text-lg font-bold text-gray-900 mb-1">{user.name}</h5></Link>
                            </div>
                            <div className="flex justify-center space-x-8 mt-4 sm:mt-0 mb-3">
                                <div className="flex -space-x-4 rtl:space-x-reverse">
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={images1} alt="" />
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={images2} alt="" />
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={images3} alt="" />
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={images4} alt="" />
                                    <img className="w-10 h-10 border-2 border-white rounded-full dark:border-gray-800" src={images5} alt="" />
                                </div>
                                <a className="flex items-center justify-center w-10 h-10 text-xs font-medium text-white bg-gray-700 border-2 border-white rounded-full hover:bg-gray-600 dark:border-gray-800" href="#" >+99</a>
                            </div>
                        </div>
                    )
                })
                : <div>No Users found</div>}

        </div>
    )
}

export default AccountCard