
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Post from '../Posts/Post/Post';
import UpdateUser from '../updateUser/UpdateUser';
import useUser from '../../hooks/useUser';


const MyProfile = () => {
    const { user, showModal, pathname, handleSubmit, handleFileUpload, handleConfirmUpdate, form, setShowModal } = useUser()
    const { name } = useParams();
    const { posts, isLoading } = useSelector((state) => state.posts);
    const imageUrls = posts.map((post) => post.creator.imageUrl);



    if (!posts.length && !isLoading) return 'No posts';

    return (
        <>

            <div className="overflow-hidden rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
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
                            <p className="font-medium">Super Admin</p>
                            <div className="mx-auto max-w-180">
                                <h4 className="font-semibold text-black dark:text-white">
                                    qwdqw
                                </h4>
                                <h4 className="font-semibold text-black dark:text-white">
                                    asd
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="p-6">
                    <div className="mb-12 border-t border-gray-300" style={{ margin: '20px 0 50px 0' }}></div>
                    {isLoading ? (
                        <div className="flex justify-center items-center">
                            <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {posts?.map((post) => (
                                <div key={post._id} className="flex flex-col">
                                    <Post post={post} />
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default MyProfile