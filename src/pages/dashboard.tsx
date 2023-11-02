import ReactApexChart from 'react-apexcharts'
import {ApexOptions} from "apexcharts";
import React, {useEffect, useState} from "react";
import {ref as dbRef} from "@firebase/database";
import {firebaseDatabase} from "../../firebase.ts";
import {child, get, onValue} from "firebase/database";

interface CHANNEL {
    name: string,
    ready: boolean,
    data: {
        categories: number[],
        data: number[],
        name: string
    }[]
}

const Dashboard = () => {

    const state1: {
        series: ApexOptions['series'],
        options: ApexOptions
    } = {
        series: [{
            name: "Percentage",
            data: [13, 3, 9, 43, 8, 6, 9, 1, 14]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Hate speech Probability over videos',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },


    };

    const state2: {
        series: ApexOptions['series'],
        options: ApexOptions
    } = {

        series: [{
            name: "Percentage",
            data: [1, 41, 5, 5, 9, 2, 6, 41, 18]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Deepfake Probability over videos',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },


    };
    const state3: {
        series: ApexOptions['series'],
        options: ApexOptions
    } = {

        series: [{
            name: "Percentage",
            data: [70, 41, 85, 57, 92, 82, 79, 91, 54]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Audio Similarity over videos',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },


    };
    const state4: {
        series: ApexOptions['series'],
        options: ApexOptions
    } = {

        series: [{
            name: "Percentage",
            data: [80, 41, 35, 31, 49, 62, 69, 91, 81]
        }],
        options: {
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Video Similarity over videos',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },
    };

    const [selectedChannel, setSelectedChannel] = useState('')
    const [channels, setChannels] = useState<CHANNEL[]>([])

    useEffect(() => {
        getChannelList()
    }, []);


    const [ownedChannels, setOwnedChannels] = useState<string[]>([])

    const getChannelList = () => {
        const emailID = localStorage.getItem('email').split('@')[0]

        if (emailID === null) {
            return;
        }


        const userRef = dbRef(firebaseDatabase, 'users/' + emailID);
        get(child(userRef, '/channels')).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const channelList: string[] = Object.keys(data).map((key, index) => {
                    return data[key]
                })
                setOwnedChannels(channelList)
            } else {
                console.log("No data available");
            }

        })


        const channelRef = dbRef(firebaseDatabase, 'channels/');

        onValue(channelRef, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {


                const channelListMaps: CHANNEL[] = Object.keys(snapshot.val()).map((key, index): CHANNEL => {
                    const convertingChannel: CHANNEL = {
                        name: key,
                        ready: snapshot.val()[key].ready,
                        data: snapshot.val()[key].data,
                    } as CHANNEL

                    if (ownedChannels.includes(convertingChannel.name)) {
                        return convertingChannel;
                    }

                })

                setChannels(channelListMaps)


            } else {

            }
        });
    }


    return (
        <div>
            <>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex">
                        {channels.map((channel, index) => {
                            return <span key={index}
                                         className="cursor-pointer inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                {/*{channel.name}*/}
                            </span>
                        })}
                    </div>
                </header>
            </>

            <div className={`grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 pt-10 gap-2`}>
                <ReactApexChart
                    options={state1.options} series={state1.series} type="line" height={350}/>
                <ReactApexChart options={state2.options} series={state2.series} type="line" height={350}/>
                <ReactApexChart options={state3.options} series={state3.series} type="line" height={350}/>
                <ReactApexChart options={state4.options} series={state4.series} type="line" height={350}/>
            </div>
        </div>
    );

}
export default Dashboard;