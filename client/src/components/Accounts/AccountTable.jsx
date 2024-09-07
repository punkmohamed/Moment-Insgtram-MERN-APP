/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom';
import images1 from "../../assets/ai-image-generator-one.webp"
import images2 from "../../assets/medium.webp"
import images3 from "../../assets/bird-8788491_1280.webp"
import images4 from "../../assets/istockphoto-1213934035-612x612.jpg"
import images5 from "../../assets/subhome-ai.jpg"
import avatar from '../../assets/memories.png'


const AccountTable = ({ images, search }) => {
    return (
        <>
            <div className="space-y-4">

                {search && search.length > 0
                    ? search?.map((user, index) => {
                        const imageUrl = images[index % images.length];
                        return (
                            <div className=" relative flex items-center bg-white rounded-lg shadow-md overflow-hidden" key={index}>
                                <img
                                    className="h-32 w-48 object-cover transition-transform duration-300 ease-in-out transform hover:scale-105"
                                    src={imageUrl}
                                    alt="Group Cover Image"
                                />
                                <div className="flex-1 p-4 flex flex-col sm:flex-row items-center sm:items-start justify-between">
                                    <div className="flex items-center">
                                        <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 mr-4 absolute left-4 sm:left-6 md:left-10">
                                            <img
                                                className="w-full h-full object-cover rounded-full ring-4 ring-white"
                                                src={user.imageUrl || avatar}
                                                alt="Avatar"
                                            />
                                        </div>
                                        <Link to={`/creators/${user.name}`}> <h5 className="text-lg font-bold text-gray-900">{user.name}</h5></Link>
                                    </div>
                                    <div className="flex justify-center space-x-8 mt-4 sm:mt-0">
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
                            </div>
                        );
                    })
                    : <div>No Users found</div>}
            </div >
        </>
    );
};

export default AccountTable;