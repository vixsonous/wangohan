'use client';
import Settings from "./Settings";
import User from "./User";
import React, { memo, useCallback, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getSocket } from "@/action/socket";
import OptImage from "./ElementComponents/Image";
import Link from "next/link";
import { Heart, Star } from "@phosphor-icons/react/dist/ssr";
import { textColor } from "@/constants/constants";
import { useRouter } from "next/navigation";

const socket = getSocket(); 

export default memo(function LayoutSettings({isLoggedIn, user_id, db_notifications} : {isLoggedIn: boolean, user_id: number,db_notifications: Array<String>}) {

    const router = useRouter()
    const pathname = usePathname();
    const [user, setUser] = useState(isLoggedIn);
    const [notificationCount, setNotificationCount] = useState(0);
    const [notifications, setNotifications] = useState([] as String[]);
    const [openNotification, setOpenNotification] = useState(false);

    const likeNotificationUpdate = useCallback( (message:string) => {

      setNotifications(prev =>{
        const parsedMessage = JSON.parse(message);
        if(prev.filter(x => JSON.parse(x as string).type === 'like' && JSON.parse(x as string).recipe_id === parsedMessage.recipe_id).length > 0) {
          prev = prev.map(c => {
            const jsonParsed = JSON.parse(c as string)
            const retJson = jsonParsed.type === 'like' ? 
              {...jsonParsed, liked: jsonParsed.recipe_id === parsedMessage.recipe_id ? parsedMessage.liked : jsonParsed.liked, created_at: parsedMessage.created_at} : 
              {...jsonParsed}

            return JSON.stringify(retJson)
          });
          
          prev = prev.filter(c => {
            const jsonParsed = JSON.parse(c as string);
            return (jsonParsed.liked || jsonParsed.liked === undefined) && jsonParsed.recipe_owner_id === user_id;
          });

        } else {
          prev = parsedMessage.recipe_owner_id === user_id && (parsedMessage.liked || parsedMessage.type !== 'like') ? [...prev, message] : [...prev];
        }

        setNotificationCount(prev.filter(x => !JSON.parse(x as string).is_read).length);
        // sessionStorage.setItem(String(user_id), JSON.stringify(prev));
        return [...prev];
      });
    },[]);

    const reviewNotificationUpdate = useCallback((message: string) => {
      const parsedMessage = JSON.parse(message);
      
      setNotifications(prev =>{
        const parsedMessage = JSON.parse(message);
        prev = parsedMessage.recipe_owner_id === user_id ? [...prev, message] : [...prev];

        setNotificationCount(prev.filter(x => !JSON.parse(x as string).is_read).length);
        // sessionStorage.setItem(String(user_id), JSON.stringify(prev));
        return [...prev];
      });
    },[]);

    useEffect(() => {
      setNotifications([...db_notifications]);
      setNotificationCount(db_notifications.filter(x => !JSON.parse(x as string).is_read).length);
    },[]);

    const fetchSession = useCallback(async () => {
      const session = await fetch('/api/retrieve-session').then(res => res.json());
      if(session.body === '') {
          setUser(false);
      } else {
          setUser(true);
      }
  },[pathname]);

    useEffect(() => {
        
        fetchSession();
    },[pathname]);

    useEffect(() => {
      if(user_id) {
        socket.emit("register", user_id);
      }
      socket.on('like recipe', likeNotificationUpdate);
      socket.on('review recipe', reviewNotificationUpdate);
      return () => {
        socket.off('like recipe', likeNotificationUpdate);
        socket.off('review recipe', reviewNotificationUpdate);
      }
    },[user_id]);

    const openNotificationOnClick = useCallback(async () => {
      
      setNotifications(prev => {
        prev = prev.map(x => JSON.stringify({...JSON.parse(x as string), is_read: true}))
        // sessionStorage.setItem(String(user_id), JSON.stringify([...prev]));
        return [...prev];
      });
      const send = notifications.map(x => JSON.stringify({...JSON.parse(x as string), is_read: true}));
      setNotificationCount(0);
      setOpenNotification(prev => !prev);
      const res = await fetch('/api/notification', {
        method: 'PATCH',
        body: JSON.stringify(send)
      });
    },[notificationCount]);

  const settings = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function outsideClick(e:MouseEvent) {
      if(settings.current && btn.current && !btn.current.contains(e.target as Node)  && !settings.current.contains(e.target as Node)) 
        setOpenNotification(false);
    }

    document.addEventListener("click", outsideClick);
    // Cleanup function
    return () => {
        document.removeEventListener("click", outsideClick);
    };
  },[settings, btn]);

  return (
    <>
    {
      user ? (
      <div className={'menu flex gap-6'}>
        <div className="self-center relative">
          <button ref={btn} onClick={openNotificationOnClick}>
            <OptImage src={'/icons/notification.webp'} className="self-center rounded-md h-[auto] z-10 w-16 md:w-10 relative" width={100} height={100}  alt="website banner" />
          </button>
          {notificationCount > 0 && <span className='absolute z-10 top-4 left-6 bg-red-600 text-white p-2 text-xs rounded-full flex justify-center items-center h-4 w-4'>{
            notificationCount  
          }</span>}
          <div ref={settings} style={{scale: openNotification ? 1 : 0}} className={`transition-all duration-300 origin-top-right absolute bg-primary-bg border border-primary-text text-xs text-left w-64 max-w-64 max-h-96 overflow-y-scroll p-4 ${openNotification ? '-right-2 -top-2' : 'right-0 top-0'} rounded-lg text-wrap`}>
            <div className='text-lg font-bold'>
              <span>お知らせ</span>
            </div>
            <div>
            {
              notifications.length > 0 ? (
                notifications.map( (n, i) => {
                  const data = JSON.parse(n as string);
                  return (
                    <Link href={`/recipe/show/${data.recipe_id}`} key={i} className="flex flex-col">
                      <div className='border-b border-primary-text pb-2'></div>
                      <div className="flex py-1 gap-4 items-center ">
                        <div className='relative'>
                          <OptImage height={60} width={60} className="w-8 aspect-square object-cover rounded-sm" src={data.recipe_image}/>
                          {data.type === 'like' && <Heart className='absolute -bottom-2 -right-2' size={16} weight="fill" color={textColor.error}/>}
                          {data.type === 'review' && <Star className='absolute -bottom-2 -right-2' size={16} weight="fill" color={textColor.warning}/>}
                        </div>
                        <span className=" w-full break-words max-w-full py-2">
                          {data.notification_content}
                        </span>
                      </div>
                    </Link>
                  );
                })
              ) : (
                <span>No notifications!</span>
              )
            }
            </div>
          </div>
        </div>
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