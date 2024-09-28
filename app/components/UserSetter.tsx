
'use client';

import { User } from "@/constants/interface";
import { useAppDispatch } from "@/lib/redux/hooks";
import { setUser } from "@/lib/redux/states/userSlice";
import { useEffect } from "react";

export default function UserSetter({user}:{user: User}) {

    const dispatch = useAppDispatch();
    
    useEffect(() => {
        dispatch(setUser(user));
    },[]);
    return null;
}