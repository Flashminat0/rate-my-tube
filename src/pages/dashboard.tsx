import ReactApexChart from 'react-apexcharts'

const Dashboard = () => {

    const state = {

        series: [{
            name: "Desktops",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                text: 'Product Trends by Month',
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

    const state2 = {

        series: [{
            name: "Count",
            data: [10, 41, 35, 51, 49, 62, 69, 91, 148]
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
                text: 'Deepfake probability',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['20-12-2022', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
            }
        },


    };


    // @ts-ignore
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
                <ReactApexChart options={state.options} series={state.series} type="line" height={350}/>
                <ReactApexChart options={state2.options} series={state2.series} type="line" height={350}/>
                <ReactApexChart options={state.options} series={state.series} type="line" height={350}/>
                <ReactApexChart options={state.options} series={state.series} type="line" height={350}/>
            </div>
        </div>
    );

}
export default Dashboard;