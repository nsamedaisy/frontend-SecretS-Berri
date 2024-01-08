// guards the components and check if the user is not found should login or signup

'use client'

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../components/constant';
import { useRouter } from 'next/navigation';
import { Iuser } from '../services/interfaces/entities';
import Loader from '../components/loader';

export default function CurrentUserGuard(Component: React.JSXElementConstructor<any>) {
    return function Guard(props: any) {
        const [current_user, set_current_user] = useState<Iuser | null>(null);
        const [loading, setLoading] = useState<boolean>(true);
        const router = useRouter();

        useEffect(() => {
            const getUser = () => {
                const token = localStorage.getItem('token');

                if (!token?.trim()) router.replace('/login');

                axios.get<{ user: Iuser | null }>(API_URL + '/auth/current-user', {
                    headers: {
                        "Authorization": `bearer ${token}`,
                    }
                }).then((res) => {
                    console.log({ res })

                    if (!res.data?.user) router.replace('/login');

                    set_current_user(res.data?.user);
                }).catch(err => {
                    //
                }).finally(() => {
                    setLoading(false);
                })
            };

            getUser();
        }, []);

        return loading ? <Loader /> : <Component {...props} currentUser={current_user} />
    }
}
