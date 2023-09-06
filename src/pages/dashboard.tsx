import ReactApexChart from 'react-apexcharts'
import {ApexOptions} from "apexcharts";

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


    return (
        <div>
            <div>
                <label htmlFor="search" className="block text-sm font-medium leading-6 text-gray-900">
                    Quick search
                </label>
                <div className="relative mt-2 flex items-center">
                    <input
                        type="text"
                        name="search"
                        id="search"
                        className="block w-full rounded-md border-0 py-1.5 pr-14 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                    <div className="absolute inset-y-0 right-0 flex py-1.5 pr-1.5">
                        <kbd
                            className="inline-flex items-center rounded border border-gray-200 px-1 font-sans text-xs text-gray-400">
                            Search
                        </kbd>
                    </div>
                </div>
            </div>

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