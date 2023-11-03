import React, {useEffect, useState} from 'react'

import {CheckCircleIcon} from '@heroicons/react/20/solid'
import {useLocation, useNavigate} from "react-router-dom";
import {ref as dbRef} from "@firebase/database";
import {firebaseDatabase} from "../../firebase.ts";
import {child, get, set} from "firebase/database";

const tiers = [
    {
        name: 'Basic',
        id: 'tier-basic',
        href: '#',
        price: {monthly: '$15', annually: '$12'},
        description: 'Everything necessary to get started.',
        features: ['1 Channel', '48-hour support response time'],
    },
    {
        name: 'Essential',
        id: 'tier-essential',
        href: '#',
        price: {monthly: '$30', annually: '$24'},
        description: 'Everything in Basic, plus essential tools for growing your business.',
        features: ['5 Channel', '24-hour support response time'],
    },
    {
        name: 'Growth',
        id: 'tier-growth',
        href: '#',
        price: {monthly: '$60', annually: '$48'},
        description: 'Everything in Essential, plus collaboration tools and deeper insights.',
        features: [
            'Unlimited Channels',
            '1-hour, dedicated support response time'
        ],
    },
]
const Pricing = () => {
    const navigate = useNavigate()

    const [email, setEmail] = useState('')

    useEffect(() => {
        setEmail(localStorage.getItem('email') || null)
    }, []);

    const setPlan = (plan: string) => {
        if (email) {
            const emailID = email.split('@')[0].replace('.', '')

            const userRef = dbRef(firebaseDatabase, 'users/' + emailID);

            get(child(userRef, `/`))
                .then(async (snapshot) => {
                    if (snapshot.exists()) {
                        await set(userRef, {
                            ...snapshot.val(),
                            plan: plan
                        });

                        navigate('/dashboard')
                    } else {

                    }
                })
        }
    }


    return (
        <div className="bg-white py-24 sm:py-32">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl sm:text-center">
                    <h2 className="text-base font-semibold leading-7 text-red-600">Pricing</h2>
                    <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                        Choose the right plan for&nbsp;you
                    </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-gray-600 sm:text-center">
                    Distinctio et nulla eum soluta et neque labore quibusdam. Saepe et quasi iusto modi velit ut non
                    voluptas in.
                    Explicabo id ut laborum.
                </p>
                <div className="mt-20 flow-root">
                    <div
                        className="isolate -mt-16 grid max-w-sm grid-cols-1 gap-y-16 divide-y divide-gray-100 sm:mx-auto lg:-mx-8 lg:mt-0 lg:max-w-none lg:grid-cols-3 lg:divide-x lg:divide-y-0 xl:-mx-4">
                        {tiers.map((tier) => (
                            <div key={tier.id} className="pt-16 lg:px-8 lg:pt-0 xl:px-14">
                                <h3 id={tier.id} className="text-base font-semibold leading-7 text-gray-900">
                                    {tier.name}
                                </h3>
                                <p className="mt-6 flex items-baseline gap-x-1">
                                <span
                                    className="text-5xl font-bold tracking-tight text-gray-900">{tier.price.monthly}</span>
                                    <span className="text-sm font-semibold leading-6 text-gray-600">/month</span>
                                </p>
                                <p className="mt-3 text-sm leading-6 text-gray-500">{tier.price.annually} per month if
                                    paid
                                    annually</p>
                                <span
                                    onClick={() => setPlan(tier.name)}
                                    aria-describedby={tier.id}
                                    className="cursor-pointer mt-10 block rounded-md bg-red-600 px-3 py-2 text-center text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                                >
                                    Buy plan
                                </span>
                                <p className="mt-10 text-sm font-semibold leading-6 text-gray-900">{tier.description}</p>
                                <ul role="list" className="mt-6 space-y-3 text-sm leading-6 text-gray-600">
                                    {tier.features.map((feature) => (
                                        <li key={feature} className="flex gap-x-3">
                                            <CheckCircleIcon className="h-6 w-5 flex-none text-red-600"
                                                             aria-hidden="true"/>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
};
export default Pricing
