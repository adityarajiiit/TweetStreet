import { fetchUser, fetchUsers } from '@/lib/actions/user.action';
import { currentUser } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import Image from 'next/image'
import {profileTabs} from '@/constants'
import ThreadsTab from '@/components/shared/ThreadsTab';
import React from 'react'
import UserCard from '@/components/cards/UserCard';
const page =async ()=>{
    const user=await currentUser();
    if(!user) return null;
    const userInfo=await fetchUser(user.id)
    if(!userInfo?.onboarded) redirect('/onboarding');
    const result=await fetchUsers ({
        userId:user.id,
        searchString:'',
        pageNumber:1,
        pageSize:25
    })
    return (
     <section>
        <h1 className='head-text mb-10'>Search</h1>
        {result?.users.length ===0 ? (
            <p className='no-result'>No users</p>
        ):(
            <>
            {result?.users.map((person)=>(
                <UserCard
                key={person.id}
                id={person.id}
                name={person.name}
                username={person.username}
                imgUrl={person.image}
                personType='User'
                />
            ))}
            </>
        )}
     </section>
    )
}
export default page;
