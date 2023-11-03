import ReactApexChart from 'react-apexcharts'
import React, {useEffect, useState} from "react";
import {ref as dbRef} from "@firebase/database";
import {firebaseDatabase} from "../../firebase.ts";
import {child, get, onValue} from "firebase/database";
import axios from "axios";

interface CHANNEL {
    channelName: string,
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
            }, yaxis: {
                min: 0,
                max: 100,
                decimalsInFloat: 0,
                tickAmount: 5
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
            },
            yaxis: {
                min: 0,
                max: 100,
                decimalsInFloat: 0,
                tickAmount: 5
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
            },
            yaxis: {
                min: 0,
                max: 100,
                decimalsInFloat: 0,
                tickAmount: 5
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
            },
            yaxis: {
                min: 0,
                max: 100,
                decimalsInFloat: 0,
                tickAmount: 5
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
        const email = localStorage.getItem('email')

        if (email === null) {
            return;
        }

        const emailID = email.split('@')[0].replace('.', '')

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

        onValue(channelRef, async (snapshot) => {
            const data = snapshot.val();
            if (snapshot.exists()) {
                const tempChannels: CHANNEL[] = []; // Temporary array to hold the channels

                setChannels([])

                Object.keys(data).map((key, index) => {
                    const convertingChannel: CHANNEL = {
                        channelName: key,
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

            const percentageData1 = selectedChannel.data[0].data.map((value, index) => {
                return value * 100
            })

            setState1(prevState => ({
                ...prevState,
                series: [{
                    name: "Percentage",
                    data: percentageData1 as number[]
                }],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[0].name + ' over videos'
                    }
                }
            }));

            const percentageData2 = selectedChannel.data[1].data.map((value, index) => {
                return value * 100
            })

            setState2(prevState => ({
                ...prevState,
                series: [{
                    name: "Percentage",
                    data: percentageData2 as number[]
                }],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[1].name + ' over videos'
                    }
                }
            }));


            const percentageData3 = selectedChannel.data[2].data.map((value, index) => {
                return value * 100
            })

            setState3(prevState => ({
                ...prevState,
                series: [{
                    name: "Percentage",
                    data: percentageData3 as number[]
                }],
                options: {
                    ...prevState.options,
                    title: {
                        ...prevState.options.title,
                        text: selectedChannel.data[2].name + ' over videos'
                    }
                }
            }));

            const percentageData4 = selectedChannel.data[3].data.map((value, index) => {
                return value * 100
            })

            setState4(prevState => ({
                ...prevState,
                series: [{
                    name: "Percentage",
                    data: percentageData4 as number[]
                }],
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

    const [channelNames, setChannelNames] = useState({});

    useEffect(() => {
        // Fetch channel names when the component mounts
        const fetchChannelNames = async () => {
            let names = {};
            for (let channel of channels) {
                names[channel.name] = await channelIDtoName(channel.name);
            }
            setChannelNames(names);
        };

        fetchChannelNames();
    }, [channels]);


    const channelIDtoName = async (channelID) => {
        try {
            const res = await axios.post('http://34.224.212.94:8080/get-name', {
                "channel_id": channelID
            });
            return res.data;
        } catch (error) {
            console.error("Error fetching channel name:", error);
            return channelID; // Return channelID as fallback
        }
    };


    return (
        <div>
            <>
                {channels.length > 0 && <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex space-x-1">
                        {channels.map((channel, index) => {
                            return (
                                <span
                                    onClick={() => {
                                        setSelectedChannel(channel)
                                    }}
                                    key={index}
                                    className="cursor-pointer inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                            {channelNames[channel.name]}
                        </span>
                            )
                        })}
                    </div>
                </header>}
            </>

            {channels.length === 0 ? <>
                <div className="bg-indigo-100">
                    <div
                        className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:flex lg:items-center lg:justify-between lg:px-8">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Ready to dive in?
                            <br/>
                            Add A Channel to get started.
                        </h2>
                    </div>
                </div>
            </> : <>
                {selectedChannel.ready ? <>
                    <div className={`grid grid-cols-1 grid-rows-4 sm:grid-cols-2 sm:grid-rows-2 pt-10 gap-2`}>
                        <ReactApexChart options={state1.options} series={state1.series} type="line" height={350}/>
                        <ReactApexChart options={state2.options} series={state2.series} type="line" height={350}/>
                        <ReactApexChart options={state3.options} series={state3.series} type="line" height={350}/>
                        <ReactApexChart options={state4.options} series={state4.series} type="line" height={350}/>
                    </div>
                </> : <div className={`grid place-items-center py-32`}>
                    <img src="/loader.gif   " alt="loader"/>
                </div>}
            </>}

        </div>
    );

}
export default Dashboard;