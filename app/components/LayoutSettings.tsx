'use client';
import Settings from "./Settings";
import User from "./User";
import React, { memo, useCallback, useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { getSocket } from "@/action/socket";

const socket = getSocket(); 

export default memo(function LayoutSettings({isLoggedIn, user_id} : {isLoggedIn: boolean, user_id: number}) {

    const pathname = usePathname();
    const [user, setUser] = useState(isLoggedIn);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([] as String[]);
    const [openNotification, setOpenNotification] = useState(false);

    const notificationUpdate = useCallback( (message:string) => {
      setNotificationCount(prev => prev + 1);

      setNotifications(prev =>{
        const parsedMessage = JSON.parse(message);
        if(prev.filter(x => JSON.parse(x as string).recipe_id === parsedMessage.recipe_id).length > 0) {
          prev = prev.map(c => JSON.stringify({...JSON.parse(c as string), liked: JSON.parse(c as string).recipe_id === parsedMessage.recipe_id ? parsedMessage.liked : JSON.parse(c as string).liked}));
          prev = prev.filter(c => JSON.parse(c as string).liked && JSON.parse(c as string).recipe_owner_id === user_id);
        } else {
          prev =parsedMessage.recipe_owner_id === user_id && parsedMessage.liked ? [...prev, message] : [...prev];
        }

        sessionStorage.setItem(String(user_id), JSON.stringify(prev));
        return [...prev];
      });
    },[]);

    useEffect(() => {
      const sessionNotifications = sessionStorage.getItem(String(user_id));
      setNotifications(sessionNotifications ? JSON.parse(sessionNotifications) as String[] : [] as String[]);
    },[]);

    useEffect(() => {
        const fetchSession = async () => {
            const session = await fetch('/api/retrieve-session').then(res => res.json());
            if(session.body === '') {
                setUser(false);
            } else {
                setUser(true);
            }
        }
        fetchSession();
    },[pathname]);

    useEffect(() => {
      if(user_id) {
        socket.emit("register", user_id);
      }
      socket.on('like recipe', notificationUpdate);
      return () => {
        socket.off('like recipe', notificationUpdate);
      }
    },[user_id]);

    const openNotificationOnClick = useCallback(() => {
      sessionStorage.removeItem(String(user_id));
      setOpenNotification(prev => !prev);
    },[]);

    return (
        <>
        {
            user ? (
            <div className={'menu flex gap-6'}>
                <button onClick={openNotificationOnClick} className="self-center relative">
                  <img src={'/icons/notification.webp'} className="self-center rounded-md h-[auto] z-10 w-[35px] relative" width={100} height={100}  alt="website banner" />
                  {notifications.length > 0 && <span className='absolute z-10 top-4 left-6 bg-red-600 text-white p-2 text-xs rounded-full flex justify-center items-center h-4 w-4'>{notifications.length}</span>}
                  <div style={{scale: openNotification ? 1 : 0}} className={`transition-all duration-300 origin-top-right absolute bg-primary-bg border border-primary-text text-xs text-left pt-12 w-64 max-w-64 p-4 ${openNotification ? '-right-2 -top-2' : 'right-0 top-0'} rounded-lg text-wrap`}>
                    {
                      notifications.length > 0 ? (
                        notifications.map( (n, i) => {
                          const data = JSON.parse(n as string);
                          return (
                            <div key={i} className="flex flex-col">
                              <div className='border-b border-secondary-bg pb-2'></div>
                              <span className=" w-full break-words max-w-full py-2">
                                {data.user_id} liked your recipe {data.recipe_name}
                              </span>
                            </div>
                          );
                        })
                      ) : (
                        <span>No notifications!</span>
                      )
                    }
                  </div>
                </button>
                <div className="self-center flex">
                    <Settings />
                </div>
            </div>
            ):(
                <User />
            )
        }
        </>
    )
});