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

    const notificationUpdate = useCallback(async (message:string) => {
      setNotificationCount(prev => prev + 1);
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

    return (
        <>
        {
            user ? (
            <div className={'menu flex gap-[1rem]'}>
                <button className="self-center relative">
                  <img src={'/icons/notification.webp'} className="self-center rounded-md h-[auto] w-[35px] relative" width={100} height={100}  alt="website banner" />
                  {notificationCount > 0 && <span className='absolute top-4 left-6 bg-red-600 text-white p-2 text-xs rounded-full flex justify-center items-center h-4 w-4'>{notificationCount}</span>}
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