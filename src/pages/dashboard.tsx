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

    const [state1, setState1] = useState<{
        series: ApexCharts.ApexOptions["series"];
        options: ApexCharts.ApexOptions
    }>({
        series: [{
            name: "Percentage",
            data: [13, 3, 9, 43, 8, 6, 9, 1, 14]
        }],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Hate speech Probability over videos",
                align: "left"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            }
        },


    });

    const [state2, setState2] = useState<{
        series: ApexCharts.ApexOptions["series"];
        options: ApexCharts.ApexOptions
    }>({

        series: [{
            name: "Percentage",
            data: [1, 41, 5, 5, 9, 2, 6, 41, 18]
        }],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Deepfake Probability over videos",
                align: "left"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            }
        },


    });
    const [state3, setState3] = useState<{
        series: ApexCharts.ApexOptions["series"];
        options: ApexCharts.ApexOptions
    }>({

        series: [{
            name: "Percentage",
            data: [70, 41, 85, 57, 92, 82, 79, 91, 54]
        }],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Audio Similarity over videos",
                align: "left"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            }
        },


    });
    const [state4, setState4] = useState<{
        series: ApexCharts.ApexOptions["series"];
        options: ApexCharts.ApexOptions
    }>({

        series: [{
            name: "Percentage",
            data: [80, 41, 35, 31, 49, 62, 69, 91, 81]
        }],
        options: {
            chart: {
                height: 350,
                type: "line",
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: "straight"
            },
            title: {
                text: "Video Similarity over videos",
                align: "left"
            },
            grid: {
                row: {
                    colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
            }
        },
    });

    const [selectedChannel, setSelectedChannel] = useState<CHANNEL | null>(null)
    const [channels, setChannels] = useState<CHANNEL[]>([])

    useEffect(() => {
        getOwnedChannelList()
    }, []);


    const [ownedChannels, setOwnedChannels] = useState<string[]>([])

    const getOwnedChannelList = () => {
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
    }

    useEffect(() => {
        getChannelList()
    }, [ownedChannels])

    const getChannelList = () => {

        const channelRef = dbRef(firebaseDatabase, 'channels/');

        onValue(channelRef, (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                const tempChannels: CHANNEL[] = []; // Temporary array to hold the channels

                setChannels([])

                Object.keys(data).map((key, index) => {
                    const convertingChannel: CHANNEL = {
                        name: key,
                        ready: data[key].ready,
                        data: data[key].data,
                    } as CHANNEL

                    if (ownedChannels.includes(convertingChannel.name)) {
                        tempChannels.push(convertingChannel); // Push to the temporary array
                    }


                })
                setChannels(tempChannels);

                if (tempChannels.length > 0) {
                    setSelectedChannel(tempChannels[0])
                }

            } else {

            }
        });
    }


    // useEffect that updates the chart states based on selectedChannel
    useEffect(() => {
        if (selectedChannel) {
            setState1(prevState => ({
                ...prevState,
                series: [selectedChannel.data[0]],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[0].name + ' over videos'
                    }
                }
            }));
            setState2(prevState => ({
                ...prevState,
                series: [selectedChannel.data[1]],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[1].name + ' over videos'
                    }
                }
            }));
            setState3(prevState => ({
                ...prevState,
                series: [selectedChannel.data[2]],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[2].name + ' over videos'
                    }
                }
            }));
            setState4(prevState => ({
                ...prevState,
                series: [selectedChannel.data[3]],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[3].name + ' over videos'
                    }
                }
            }));
        }
    }, [selectedChannel]);


    return (
        <div>
            <>
                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex space-x-1">
                        {channels.map((channel, index) => {
                            return <span
                                onClick={() => {
                                    setSelectedChannel(channel)
                                }}
                                key={index}
                                         className=" cursor-pointer inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                                {channel.name}
                            </span>
                        })}
                    </div>
                </header>
            </>

            {channels.length === 0 ? <>
            </> : <>
                <div className={`grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 pt-10 gap-2`}>
                    <ReactApexChart options={state1.options} series={state1.series} type="line" height={350} />
                    <ReactApexChart options={state2.options} series={state2.series} type="line" height={350} />
                    <ReactApexChart options={state3.options} series={state3.series} type="line" height={350} />
                    <ReactApexChart options={state4.options} series={state4.series} type="line" height={350} />
                </div>
            </>}
        </div>
    );

}
export default Dashboard;