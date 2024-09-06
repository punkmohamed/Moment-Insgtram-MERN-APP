import { useDispatch, useSelector } from "react-redux";

import { useEffect } from "react";
import { userList } from "../../actions/auth";
import { Link } from 'react-router-dom';
const RightMembers = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(userList());
    }, [dispatch]);

    const users = useSelector((state) => state.auth.userList.users || []).slice(0, 5)
    console.log(users, "users");


    return (
        <div className=" bg-gradient-to-b from-purple-100 to-purple-400 p-4 my-5 rounded-xl">
            <div className=" flex flex-col justify-start items-start">
                <h1 className="font-bold mb-2 text-2xl">Members</h1>
                <div className="h-2 w-10 bg-green-800"></div>
            </div>
            <div className="flex flex-col items-start justify-start my-4">
                {users && users.map((user) => (
                    <div className="flex items-center space-x-4  my-2" key={user.id}>
                        {user.imageUrl ? <img
                            src={user?.imageUrl}
                            alt={user?.name}
                            className="size-12 rounded-full object-cover transition-transform duration-300 ease-in-out transform hover:scale-110"
                        /> :
                            <div className="size-12 rounded-full bg-purple-500 text-white flex items-center justify-center text-xl font-semibold transition-transform duration-300 ease-in-out transform hover:scale-110">
                                {user?.name?.charAt(0).toUpperCase()}
                            </div>
                        }
                        <Link to={`/creators/${user.name}`}>
                            <h1 className="text-lg font-semibold cursor-pointer hover:text-purple-900">{user.name}</h1>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default RightMembers