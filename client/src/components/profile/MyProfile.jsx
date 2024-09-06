
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import UpdateUser from '../updateUser/UpdateUser';
import useUser from '../../hooks/useUser';
import PostLoader from '../Loaders/PostLoader';
import { useEffect, useState } from 'react';
import { getUserLikedPosts } from '../../actions/posts';


const MyProfile = () => {
    const { user, showModal, pathname, handleSubmit, handleFileUpload, handleConfirmUpdate, form, setShowModal } = useUser()
    const { name } = useParams();
    const [tab, setTap] = useState(true)
    const dispatch = useDispatch();
    const { posts, likedPosts, isLoading } = useSelector((state) => state.posts);
    const imageUrls = posts.map((post) => post.creator.imageUrl);

    useEffect(() => {

        if (user?.result?._id) {
            dispatch(getUserLikedPosts(user?.result?._id));
        }
    }, [dispatch]);



    if (!posts.length && !isLoading) return 'No posts';

    return (
        <>

            <div className="overflow-hidden rounded-sm  bg-white shadow-default ">
                <div className="relative z-20 h-35 md:h-65">
                    <img
                        src="https://buffer.com/cdn-cgi/image/w=1000,fit=contain,q=90,f=auto/library/content/images/size/w600/2023/10/free-images.jpg"
                        alt="profile cover"
                        className="h-full w-full rounded-tl-sm rounded-tr-sm object-cover object-center"
                    />
                </div>
                <div className="px-4 pb-6 text-center lg:pb-8 xl:pb-11.5">
                    <div className="relative z-30 mx-auto -mt-22 h-30 w-full max-w-30 rounded-full overflow-hidden bg-white/20 p-1 backdrop-blur sm:h-44 sm:max-w-44 sm:p-3">
                        <div className="relative drop-shadow-2 w-full h-full">
                            {pathname.startsWith("/creators") && imageUrls[0] ? (
                                <img
                                    className="object-cover rounded-full w-full h-full"
                                    src={imageUrls[0]}
                                    alt={name}
                                />
                            ) : user?.result.imageUrl ? (<>
                                <img
                                    className="object-cover rounded-full w-full h-full"
                                    src={user?.result.imageUrl}
                                    alt={user?.result.name}
                                />
                                <UpdateUser handleConfirmUpdate={handleConfirmUpdate} handleFileUpload={handleFileUpload} handleSubmit={handleSubmit} form={form} setShowModal={setShowModal} showModal={showModal} />
                            </>
                            ) : (
                                <div
                                    className="w-full h-full rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold"
                                >
                                    {pathname.startsWith("/creators") ? name.charAt(0) : user?.result.name.charAt(0)}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex items-center  justify-center">
                        <div className="mt-4">
                            <h3 className="mb-1.5 text-2xl font-semibold text-black dark:text-white">
                                {
                                    pathname.startsWith("/creators") ? name : user?.result.name
                                }
                            </h3>
                            <div className="ml-8">
                                <div className="flex justify-center py-4 lg:pt-4 pt-8">
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{posts?.length}</span><span className="text-sm text-blueGray-400">Posts</span>
                                    </div>
                                    <div className="mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">{likedPosts?.length}</span><span className="text-sm text-blueGray-400">Liked</span>
                                    </div>
                                    <div className="lg:mr-4 p-3 text-center">
                                        <span className="text-xl font-bold block uppercase tracking-wide text-blueGray-600">89</span><span className="text-sm text-blueGray-400">Comments</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="flex items-center -mx-4 space-x-2 overflow-x-auto overflow-y-hidden sm:justify-center flex-nowrap  text-gray-800 ">
                        <span rel="noopener noreferrer" onClick={() => setTap(!tab)} className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 cursor-pointer ${tab === true ? "border-purple-900 text-black font-bold" : "border-gray-300 text-gray-600"}`}>Yours</span>
                        <span rel="noopener noreferrer" onClick={() => setTap(!tab)} className={`flex items-center flex-shrink-0 px-5 py-2 border-b-4 cursor-pointer ${tab === false ? "border-purple-900 text-black font-bold" : "border-gray-300 text-gray-600"}`}>Liked posts</span>
                    </div>
                    <div className="mb-12 border-t border-gray-300" style={{ margin: '20px 0 50px 0' }}></div>
                    {isLoading ? (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
                            <PostLoader />
                            <PostLoader />
                            <PostLoader />
                            <PostLoader />
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {tab ? posts?.map((post) => (
                                <div key={post._id} className="flex flex-col">
                                    <Post post={post} />
                                </div>
                            )) :
                                likedPosts?.map((post) => (
                                    <div key={post._id} className="flex flex-col">
                                        <Post post={post} />
                                    </div>
                                ))
                            }
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MyProfile