import {Disclosure, Menu, Transition} from "@headlessui/react";
import {Bars3Icon, BellIcon, XMarkIcon} from "@heroicons/react/24/outline";
import React, {Fragment, useEffect, useState} from "react";
import {Outlet, useLocation, useNavigate} from "react-router-dom";

import {GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {firebaseAuth, firebaseDatabase, firebaseStorage} from "../firebase.ts";
// Import the functions you need from the SDKs you need
import {getDatabase, ref as dbRef, set, child, get} from "firebase/database";
import SimpleModal from "../components/simpleModal.tsx";


const Layout = () => {
    const navigate = useNavigate();
    const location = useLocation()

    const [email, setEmail] = useState(null)
    const [photoURL, setPhotoURL] = useState(null)
    const [name, setName] = useState(null)

    const provider = new GoogleAuthProvider();

    const [isHome, setIsHome] = useState(false)
    const [isDashboard, setIsDashboard] = useState(false)
    const [isTeam, setIsTeam] = useState(false)


    useEffect(() => {
        if (location.pathname.includes('team')) {

            setIsDashboard(false)
            setIsHome(false)
            setIsTeam(true)

            setNavigation((prevState) => {
                return prevState.map((item) => {
                    if (item.name === 'Team') {
                        return {...item, current: true}
                    } else {
                        return {...item, current: false}
                    }
                })
            })
        } else if (location.pathname.includes('dashboard')) {

            setIsDashboard(true)
            setIsHome(false)
            setIsTeam(false)

            setNavigation((prevState) => {
                return prevState.map((item) => {
                    if (item.name === 'Dashboard') {
                        return {...item, current: true}
                    } else {
                        return {...item, current: false}
                    }
                })
            })
        } else {
            setIsDashboard(false)
            setIsHome(true)
            setIsTeam(false)

            setNavigation((prevState) => {
                return prevState.map((item) => {
                    if (item.name === 'Home') {
                        return {...item, current: true}
                    } else {
                        return {...item, current: false}
                    }
                })
            })
        }

    }, [location.pathname]);


    useEffect(() => {
        if (email) {
            localStorage.setItem('email', email)
            setUser((prevState) => {
                return {...prevState, email: email}
            })
        }

        if (photoURL) {
            localStorage.setItem('photoURL', photoURL)
            setUser((prevState) => {
                return {...prevState, imageUrl: photoURL}
            })
        }

        if (name) {
            localStorage.setItem('name', name)
            setUser((prevState) => {
                return {...prevState, name: name}
            })
        }
    }, [email, photoURL]);

    useEffect(() => {
        setEmail(localStorage.getItem('email') || null)
        setPhotoURL(localStorage.getItem('photoURL') || null)
        setName(localStorage.getItem('name') || null)
    }, [location.pathname]);


    const useri = {
        name: '',
        email: '',
        imageUrl: '',
    }

    const [user, setUser] = useState(useri)


    const onLogin = () => {
        signInWithPopup(firebaseAuth, provider)
            .then((result) => {
                // This gives you a Google Access Token. You can use it to access the Google API.
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                console.log(!!token)
                // The signed-in user info.
                const user = result.user;
                // IdP data available using getAdditionalUserInfo(result)
                // ...


                setEmail(user.email)
                setPhotoURL(user.photoURL)
                setName(user.displayName)

                loginHandler(user.displayName, user.email, user.photoURL)

            }).catch((error) => {
            console.log(error)
            // Handle Errors here.
            // const errorCode = error.code;
            // const errorMessage = error.message;
            // The email of the user's account used.
            // const email = error.customData.email;
            // The AuthCredential type that was used.
            // const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
        });

    }

    const loginHandler = async (
        name: string,
        email: string,
        photoURL: string
    ) => {
        const emailID = email.split('@')[0]

        const ref = dbRef(firebaseDatabase, 'users/' + emailID);

        get(child(ref, `/`)).then(async (snapshot) => {
            if (snapshot.exists()) {
                console.log(snapshot.val());
            } else {
                await set(ref, {
                    username: name,
                    email: email,
                    profile_picture: photoURL,
                    plan: 'None'
                });
            }
        })
    }

    useEffect(() => {
        if (email) {
            handleIsWorthy()
        }
    }, [location.pathname, email]);

    const [isWorthy, setIsWorthy] = useState(false)
    const [plan, setPlan] = useState('None')

    const handleIsWorthy = () => {
        const emailID = email.split('@')[0]

        const ref = dbRef(firebaseDatabase, 'users/' + emailID);

        get(child(ref, `/`)).then(async (snapshot) => {
            if (snapshot.exists()) {
                const {username, email, profile_picture, plan} = snapshot.val()

                setPlan(plan)


                if (plan === 'None') {
                    setIsWorthy(false)
                } else {
                    setIsWorthy(true)
                }

            } else {

            }
        })
    }

    useEffect(() => {
        isWorthy && handleCanAddChannel()
    }, [isWorthy]);

    const [canAddChannel, setCanAddChannel] = useState(false)

    const handleCanAddChannel = () => {
        if (isWorthy) {
            const emailID = email.split('@')[0]

            const channelRef = dbRef(firebaseDatabase, 'channels/' + emailID);

            get(child(channelRef, `/`)).then(async (snapshot) => {
                if (snapshot.exists()) {
                    console.log(snapshot.val());

                } else {
                    setCanAddChannel(true)
                }
            })
        }
    }


    const navigation2 = [
        {name: 'Dashboard', href: '/dashboard', current: false},
        {name: 'Pricing', href: '/pricing', current: true},
        // {name: 'Team', href: '/team', current: false},
    ]

    const [navigation, setNavigation] = useState(navigation2)

    const userNavigation = [
        {name: 'Your Profile', href: '#'},
        {name: 'Settings', href: '/settings'},
        {name: 'Sign out', href: '/logout'},
    ]

    function classNames(...classes: string[]) {
        return classes.filter(Boolean).join(' ')
    }

    const [open, setOpen] = useState(false);
    const [channelID, setChannelID] = useState('')


    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };


    const [modelOpen, setModelOpen] = useState(false)

    return (
        <div className={'h-full bg-gray-100'}>
            <div className={`h-full`}>
                <div className="min-h-full">
                    <Disclosure as="nav" className="bg-gray-800">
                        {({open}) => (
                            <>
                                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                                    <div className="flex h-16 items-center justify-between">
                                        <div className="flex items-center">
                                            <div className="flex-shrink-0">
                                                <img
                                                    className="h-8 w-8"
                                                    src="https://tailwindui.com/img/logos/mark.svg?color=red&shade=500"
                                                    alt="Your Company"
                                                />
                                            </div>
                                            <div className="hidden md:block">
                                                <div className="ml-10 flex items-baseline space-x-4">
                                                    {navigation.map((item) => (
                                                        <button
                                                            key={item.name}
                                                            // href={item.href}
                                                            onClick={() => {
                                                                navigate(item.href)
                                                            }}
                                                            className={classNames(
                                                                item.current
                                                                    ? 'bg-gray-900 text-white'
                                                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                                'rounded-md px-3 py-2 text-sm font-medium'
                                                            )}
                                                            aria-current={item.current ? 'page' : undefined}
                                                        >
                                                            {item.name}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="hidden md:block">
                                            <div className="ml-4 flex items-center md:ml-6">
                                                <button
                                                    type="button"
                                                    className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                                >
                                                    <span className="absolute -inset-1.5"/>
                                                    <span className="sr-only">View notifications</span>
                                                    <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                                </button>

                                                {/* Profile dropdown */}
                                                {email ? <Menu as="div" className="relative ml-3">
                                                    <div>
                                                        <Menu.Button
                                                            className="relative flex max-w-xs items-center rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                            <span className="absolute -inset-1.5"/>
                                                            <span className="sr-only">Open user menu</span>
                                                            <img className="h-8 w-8 rounded-full" src={user.imageUrl}
                                                                 alt=""/>
                                                        </Menu.Button>
                                                    </div>
                                                    <Transition
                                                        as={Fragment}
                                                        enter="transition ease-out duration-100"
                                                        enterFrom="transform opacity-0 scale-95"
                                                        enterTo="transform opacity-100 scale-100"
                                                        leave="transition ease-in duration-75"
                                                        leaveFrom="transform opacity-100 scale-100"
                                                        leaveTo="transform opacity-0 scale-95"
                                                    >
                                                        <Menu.Items
                                                            className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                            {userNavigation.map((item) => (
                                                                <Menu.Item key={item.name}>
                                                                    {({active}) => (
                                                                        <button
                                                                            // href={item.href}
                                                                            onClick={() => {
                                                                                navigate(item.href)
                                                                            }}
                                                                            className={classNames(
                                                                                active ? 'bg-gray-100' : '',
                                                                                'block px-4 py-2 text-sm text-gray-700'
                                                                            )}
                                                                        >
                                                                            {item.name}
                                                                        </button>
                                                                    )}
                                                                </Menu.Item>
                                                            ))}
                                                        </Menu.Items>
                                                    </Transition>
                                                </Menu> : <span
                                                    onClick={onLogin}
                                                    className={classNames(
                                                        'bg-gray-900 text-white',
                                                        'rounded-md px-3 py-2 text-sm font-medium ml-5 cursor-pointer'
                                                    )}>Login</span>}

                                            </div>
                                        </div>
                                        <div className="-mr-2 flex md:hidden">
                                            {/* Mobile menu button */}
                                            <Disclosure.Button
                                                className="relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                                                <span className="absolute -inset-0.5"/>
                                                <span className="sr-only">Open main menu</span>
                                                {open ? (
                                                    <XMarkIcon className="block h-6 w-6" aria-hidden="true"/>
                                                ) : (
                                                    <Bars3Icon className="block h-6 w-6" aria-hidden="true"/>
                                                )}
                                            </Disclosure.Button>
                                        </div>
                                    </div>
                                </div>

                                <Disclosure.Panel className="md:hidden">
                                    <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                                        {navigation.map((item) => (
                                            <Disclosure.Button
                                                key={item.name}
                                                as="button"
                                                // href={item.href}
                                                onClick={() => {
                                                    navigate(item.href)
                                                }}
                                                className={classNames(
                                                    item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                                    'block rounded-md px-3 py-2 text-base font-medium'
                                                )}
                                                aria-current={item.current ? 'page' : undefined}
                                            >
                                                {item.name}
                                            </Disclosure.Button>
                                        ))}
                                    </div>
                                    {email ? <div className="border-t border-gray-700 pb-3 pt-4">
                                        <div className="flex items-center px-5">
                                            <div className="flex-shrink-0">
                                                <img className="h-10 w-10 rounded-full" src={user.imageUrl} alt=""/>
                                            </div>
                                            <div className="ml-3">
                                                <div
                                                    className="text-base font-medium leading-none text-white">{user.name}</div>
                                                <div
                                                    className="text-sm font-medium leading-none text-gray-400">{user.email}</div>
                                            </div>
                                            <button
                                                type="button"
                                                className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                                            >
                                                <span className="absolute -inset-1.5"/>
                                                <span className="sr-only">View notifications</span>
                                                <BellIcon className="h-6 w-6" aria-hidden="true"/>
                                            </button>
                                        </div>
                                        <div className="mt-3 space-y-1 px-2">
                                            {userNavigation.map((item) => (
                                                <Disclosure.Button
                                                    key={item.name}
                                                    as="button"
                                                    // href={item.href}
                                                    onClick={() => {
                                                        navigate(item.href)
                                                    }}
                                                    className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                                                >
                                                    {item.name}
                                                </Disclosure.Button>
                                            ))}
                                        </div>

                                    </div> : <div className={`mx-2`}>
                                        <hr/>
                                        <br/>
                                        <span
                                            onClick={onLogin}
                                            className={classNames(
                                                'bg-gray-900 text-white',
                                                'rounded-md px-3 py-2 text-sm font-medium w-full flex items-center mt-5 relative bottom-4 text-center cursor-pointer'
                                            )}>Login</span></div>}

                                </Disclosure.Panel>
                            </>
                        )}
                    </Disclosure>

                    <header className="bg-white shadow">
                        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between">
                            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
                                {isHome && 'Home'}
                                {isDashboard && 'Dashboard'}
                                {isTeam && 'Team'}
                            </h1>
                            {isDashboard && isWorthy && <span
                                onClick={() => {
                                    setModelOpen(true)
                                    handleClickOpen()
                                }}
                                className={classNames(
                                    'bg-red-600 text-white',
                                    'rounded-md px-3 py-2 text-sm font-medium  flex items-center mt-5 relative bottom-4 text-center cursor-pointer w-max'
                                )}>Add Channel
                            </span>}
                        </div>
                    </header>
                    <main>
                        <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                            <>
                                <SimpleModal
                                    open={open}
                                    onClose={handleClose}>
                                    <div>
                                        {plan}
                                    </div>

                                </SimpleModal>

                            </>
                            <Outlet/>
                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Layout;