/* eslint-disable react/prop-types */

import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getNotifications, updateNotifications } from "../../actions/noti";
import { useEffect, useState } from "react";

const Notifictions = ({ notifications }) => {
    const [allNotifications, setAllNotifications] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getNotifications())
    }, [dispatch])
    const { notification, isLoading } = useSelector((state) => state.notiReducer || []);
    useEffect(() => {
        if (notification) {
            setAllNotifications([...notification, ...notifications]);
        }
    }, [notification, notifications]);
    const handleRead = () => {
        dispatch(updateNotifications({ isRead: true }))
        setAllNotifications(allNotifications.filter((notification) => notification.isRead === false))

    }

    return (
        <div className="">
            <div className="relative max-w-[340px] mx-auto bg-white shadow-lg rounded-lg">
                <div className="py-3 px-5">
                    <h3 className="text-xs font-semibold uppercase text-gray-400 mb-1">Notifications</h3>
                    <div className="divide-y divide-gray-200">
                        {allNotifications.length > 0 ? (
                            allNotifications.filter((notification) => !notification.isRead).map((notification) => (
                                <Link key={notification._id} to={`posts/${notification.link}`}>
                                    <button
                                        className="w-full text-left py-2 p-1 focus:outline-none focus-visible:bg-indigo-50 hover:bg-green-300 rounded-lg"
                                    >
                                        <div className="flex items-center">
                                            <img
                                                className="rounded-full items-start flex-shrink-0 mr-3  size-10"
                                                src={notification?.sender.imageUrl}
                                                alt={notification.sender}
                                            />
                                            <div>
                                                <h4 className="text-sm font-semibold text-gray-900">
                                                    {notification?.sender.name}
                                                </h4>
                                                <div className="text-[13px]">
                                                    {notification.message}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </Link>
                            ))
                        ) : (
                            <p className="text-gray-500 text-sm">No notifications</p>
                        )}
                    </div>
                </div>
                {allNotifications.length > 0 &&
                    <button onClick={handleRead} className="absolute bottom-5 right-5 inline-flex items-center text-sm font-medium text-white bg-indigo-500 hover:bg-indigo-600 rounded-full text-center px-3 py-2 shadow-lg focus:outline-none focus-visible:ring-2">
                        <svg className="w-3 h-3 fill-current text-indigo-300 flex-shrink-0 mr-2" viewBox="0 0 12 12">
                            <path d="M11.866.146a.5.5 0 0 0-.437-.139c-.26.044-6.393 1.1-8.2 2.913a4.145 4.145 0 0 0-.617 5.062L.305 10.293a1 1 0 1 0 1.414 1.414L7.426 6l-2 3.923c.242.048.487.074.733.077a4.122 4.122 0 0 0 2.933-1.215c1.81-1.809 2.87-7.94 2.913-8.2a.5.5 0 0 0-.139-.439Z" />
                        </svg>
                        <span>Mark as Read</span>
                    </button>}
            </div>
        </div>
    );
}

export default Notifictions;
