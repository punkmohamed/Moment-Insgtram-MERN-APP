import { useEffect, useMemo } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { getPostsByCreator, getPostsBySearch } from '../../actions/posts';
import MyProfile from '../profile/MyProfile';
import useUser from '../../hooks/useUser';
import { userList } from '../../actions/auth';

const CreatorOrTag = () => {
  const { userImg, user } = useUser()
  const { name } = useParams();
  const dispatch = useDispatch();
  const { posts, isLoading } = useSelector((state) => state.posts);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.startsWith('/tags')) {
      dispatch(getPostsBySearch({ tags: name }));
    } else {
      dispatch(getPostsByCreator(name));

    }
  }, [dispatch, location.pathname, name, userImg, user]);

  const users = useSelector((state) => state.auth.userList || []);
  const userId = useMemo(() => {
    return users?.users?.find((user) => user?.name === name)?._id;
  }, [users, name]);

  useEffect(() => {
    dispatch(userList());
  }, [dispatch]);





  return (
    <>
      {userId && <MyProfile userId={userId} />}
    </>
    // <div className="p-6">
    //   <h2 className="text-3xl font-bold mb-6">{name}</h2>
    //   <div className="mb-12 border-t border-gray-300" style={{ margin: '20px 0 50px 0' }}></div>
    //   {isLoading ? (
    //     <div className="flex justify-center items-center">
    //       <div className="animate-spin border-t-4 border-blue-500 border-solid rounded-full w-12 h-12"></div>
    //     </div>
    //   ) : (
    //     <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
    //       {posts?.map((post) => (
    //         <div key={post._id} className="flex flex-col">
    //           <Post post={post} />
    //         </div>
    //       ))}
    //     </div>
    //   )}
    // </div>
  );
};

export default CreatorOrTag;
