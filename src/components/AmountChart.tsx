import ApexCharts from "apexcharts";
import axios from "axios";
import moment from "moment";
import { useEffect, useState } from "react";

const AmountChart = () => {
    const [askDataSet, setAskDataSet] = useState([]);
    const [promoDataSet, setPromoDataSet] = useState([]);
    const [reportDataSet, setReportDataSet] = useState([]);

    const fetchAmountData = async () => {
        try {
            const [askData, promoData, reportData] = await Promise.all([
                axios.get("http://localhost:8080/api/history/chart/ask/amount"),
                axios.get("http://localhost:8080/api/history/chart/promotion/amount"),
                axios.get("http://localhost:8080/api/history/chart/report/amount")
            ]);

            console.log("Ask Data:", askData.data);
            console.log("Promo Data:", promoData.data);
            console.log("Report Data:", reportData.data);

            const formatData = (data) => data.map(item => ({
                x: moment().month(item.month - 1).format("MMMM"),
                y: item.amount
            }));

            setAskDataSet(formatData(askData.data));
            setPromoDataSet(formatData(promoData.data));
            setReportDataSet(formatData(reportData.data));
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    };

    useEffect(() => {
        fetchAmountData();
    }, []);

    useEffect(() => {
        console.log("Ask DataSet:", askDataSet);
        console.log("Promo DataSet:", promoDataSet);
        console.log("Report DataSet:", reportDataSet);

        const options = {
            series: [
                {
                    name: 'ASK',
                    data: askDataSet
                },
                {
                    name: 'PROMOTION',
                    data: promoDataSet
                },
                {
                    name: 'REPORT',
                    data: reportDataSet
                }
            ],
            chart: {
                type: 'area',
                stacked: false,
                height: 650,
                width: '100%',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            markers: {
                size: 0
            },
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    inverseColors: false,
                    opacityFrom: 0.45,
                    opacityTo: 0.05,
                    stops: [20, 100, 100, 100]
                }
            },
            yaxis: {
                labels: {
                    style: {
                        colors: '#8e8da4'
                    },
                    offsetX: 0,
                    formatter: function (val) {
                        return (val).toFixed(2);
                    }
                },
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                }
            },
            xaxis: {
                type: 'category',
                categories: moment.months(),
                tickAmount: 12,
                labels: {
                    rotate: -15,
                    rotateAlways: true
                }
            },
            title: {
                text: 'Total amount history',
                align: 'left',
                offsetX: 14
            },
            tooltip: {
                shared: true
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetX: -10
            }
        };

        const chart = new ApexCharts(document.querySelector("#chart"), options);
        chart.render();

        return () => {
            chart.destroy();
        };
    }, [askDataSet, promoDataSet, reportDataSet]);

    return (
        <div id="chart" style={{ width: '100%' }}></div>
    );
};

export default AmountChart;
