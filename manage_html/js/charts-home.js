"use strict";

document.addEventListener("DOMContentLoaded", function () {
    Chart.defaults.global.defaultFontColor = "#fff";

    // ------------------------------------------------------- //
    // Line Chart
    // ------------------------------------------------------ //
    var legendState = true;
    if (window.outerWidth < 576) {
        legendState = false;
    }

    const LINECHART = document.getElementById("lineChart");
    var homeLineChart = new Chart(LINECHART, {
        type: "line",
        options: {
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            max: 60,
                            min: 10,
                        },
                        display: true,
                        gridLines: {
                            display: false,
                        },
                    },
                ],
            },
            legend: {
                display: legendState,
            },
        },
        data: {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9"],
            datasets: [
                {
                    label: "每日用户访问量",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#00FFFF",
                    pointBorderColor: "#00FFFF",
                    pointHoverBackgroundColor: "#00FFFF",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    borderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 0,
                    data: [20, 27, 20, 35, 30, 40, 33, 25, 39],
                    spanGaps: false,
                },
                {
                    label: "商品购物量",
                    fill: true,
                    lineTension: 0.2,
                    backgroundColor: "transparent",
                    borderColor: "#00FF7F",
                    pointBorderColor: "#00FF7F",
                    pointHoverBackgroundColor: "#00FF7F",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    borderWidth: 2,
                    pointBackgroundColor: "#fff",
                    pointBorderWidth: 5,
                    pointHoverRadius: 5,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 2,
                    pointRadius: 1,
                    pointHitRadius: 10,
                    data: [25, 17, 28, 25, 33, 27, 30, 33, 27],
                    spanGaps: false,
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    const BARCHARTEXMPLE1 = document.getElementById("barChartExample1");
    var barChartExample = new Chart(BARCHARTEXMPLE1, {
        type: "bar",
        options: {
            scales: {
                xAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "#fff",
                        },
                    },
                ],
                yAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "#fff",
                        },
                    },
                ],
            },
        },
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "当日订单",
                    backgroundColor: [
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                        "rgba(0, 255, 255, 0.57)",
                    ],
                    borderColor: [
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                        "rgba(0, 255, 255, 1)",
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "昨日订单",
                    backgroundColor: [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                    ],
                    borderColor: [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                    ],
                    borderWidth: 1,
                    data: [35, 40, 60, 47, 88, 27, 30],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Line Chart 1
    // ------------------------------------------------------ //
    const LINECHART1 = document.getElementById("lineChart1");
    var myLineChart1 = new Chart(LINECHART1, {
        type: "line",
        options: {
            scales: {
                xAxes: [
                    {
                        display: true,
                        gridLines: {
                            display: false,
                        },
                    },
                ],
                yAxes: [
                    {
                        ticks: {
                            max: 40,
                            min: 10,
                            stepSize: 0.1,
                        },
                        display: false,
                        gridLines: {
                            display: false,
                        },
                    },
                ],
            },
            legend: {
                display: true,
            },
        },
        data: {
            labels: [
                "1",
                "2",
                "3",
                "4",
                "5",
                "6",
                "7",
                "8",
                "9",
                "10",
                "11",
                "12",
                "13",
                "14",
                "15",
                "16",
                "17",
                "18",
                "19",
                "20",
                "21",
                "22",
            ],
            datasets: [
                {
                    label: "商家入住",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "transparent",
                    borderColor: "#FFFFCC",
                    pointBorderColor: "#FFFF99",
                    pointHoverBackgroundColor: "#FFFF99",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    borderWidth: 2,
                    pointBackgroundColor: "#FFFF99",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 1,
                    pointHitRadius: 0,
                    data: [20, 21, 25, 22, 24, 18, 20, 23, 19, 22, 25, 19, 24, 27, 22, 17, 20, 17, 20, 26, 22],
                    spanGaps: false,
                },
                {
                    label: "商品数量",
                    fill: true,
                    lineTension: 0.3,
                    backgroundColor: "transparent",
                    borderColor: "rgba(255, 255, 102, 0.24)",
                    pointBorderColor: "rgba(255, 255, 102, 0.24)",
                    pointHoverBackgroundColor: "rgba(255, 255, 102, 0.24)",
                    borderCapStyle: "butt",
                    borderDash: [],
                    borderDashOffset: 0.0,
                    borderJoinStyle: "miter",
                    borderWidth: 2,
                    pointBackgroundColor: "rgba(255, 255, 102, 0.24)",
                    pointBorderWidth: 2,
                    pointHoverRadius: 4,
                    pointHoverBorderColor: "#fff",
                    pointHoverBorderWidth: 0,
                    pointRadius: 1,
                    pointHitRadius: 0,
                    data: [24, 20, 23, 19, 22, 20, 25, 21, 23, 19, 21, 23, 19, 24, 19, 22, 21, 24, 19, 21, 20],
                    spanGaps: false,
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Bar Chart
    // ------------------------------------------------------ //
    const BARCHARTEXaMPLE2 = document.getElementById("barChartExample2");
    var barChartExample = new Chart(BARCHARTEXaMPLE2, {
        type: "bar",
        options: {
            scales: {
                xAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "#fff",
                        },
                    },
                ],
                yAxes: [
                    {
                        display: false,
                        gridLines: {
                            color: "#fff",
                        },
                    },
                ],
            },
        },
        data: {
            labels: ["January", "February", "March", "April", "May", "June", "July"],
            datasets: [
                {
                    label: "昨日用户注册量",
                    backgroundColor: [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                    ],
                    borderColor: [
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                        "rgba(255, 255, 255, 0.7)",
                    ],
                    borderWidth: 1,
                    data: [65, 59, 80, 81, 56, 55, 40],
                },
                {
                    label: "当日注册用户量",
                    backgroundColor: [
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                    ],
                    hoverBackgroundColor: [
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                        "rgba(0,255,127, 0.7)",
                    ],
                    borderColor: [
                        "rgba(0,255,127, 1)",
                        "rgba(0,255,127, 1)",
                        "rgba(0,255,127, 1)",
                        "rgba(0,255,127, 1)",
                        "rgba(0,255,127, 1)",
                        "rgba(0,255,127, 1)",
                        "rgba(0,255,127, 1)",
                    ],
                    borderWidth: 1,
                    data: [35, 40, 60, 47, 88, 27, 30],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart 1
    // ------------------------------------------------------ //
    const PIECHARTHOME1 = document.getElementById("pieChartHome1");
    var myPieChart = new Chart(PIECHARTHOME1, {
        type: "doughnut",
        options: {
            cutoutPercentage: 90,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["First", "Second", "Third", "Fourth"],
            datasets: [
                {
                    data: [300, 50, 100, 60],
                    borderWidth: [0, 0, 0, 0],
                    backgroundColor: [ "#4C9900", "#66CC00", "#80FF00","#CCFF99"],
                    hoverBackgroundColor: ["#4C9900", "#66CC00", "#80FF00","#CCFF99"],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart 2
    // ------------------------------------------------------ //
    const PIECHARTHOME2 = document.getElementById("pieChartHome2");
    var myPieChart = new Chart(PIECHARTHOME2, {
        type: "doughnut",
        options: {
            cutoutPercentage: 90,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["First", "Second", "Third", "Fourth"],
            datasets: [
                {
                    data: [80, 70, 100, 60],
                    borderWidth: [0, 0, 0, 0],
                    backgroundColor: ["#FFFF00", "#FFFF33", "#FFFF66", "#FFFF99"],
                    hoverBackgroundColor: ["#FFFF00", "#FFFF33", "#FFFF66", "#FFFF99"],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart 3
    // ------------------------------------------------------ //
    const PIECHARTHOME3 = document.getElementById("pieChartHome3");
    var myPieChart = new Chart(PIECHARTHOME3, {
        type: "doughnut",
        options: {
            cutoutPercentage: 90,
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["First", "Second", "Third", "Fourth"],
            datasets: [
                {
                    data: [120, 90, 77, 95],
                    borderWidth: [0, 0, 0, 0],
                    backgroundColor: ["#da4d60", "#e96577", "#f28695", "#ffb6c1"],
                    hoverBackgroundColor: ["#da4d60", "#e96577", "#f28695", "#ffb6c1"],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Sales Bar Chart 1
    // ------------------------------------------------------ //
    const SALESBARCHART1 = document.getElementById("salesBarChart1");
    var barChartHome = new Chart(SALESBARCHART1, {
        type: "bar",
        options: {
            scales: {
                xAxes: [
                    {
                        display: false,
                        barPercentage: 0.2,
                    },
                ],
                yAxes: [
                    {
                        display: false,
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                    ],
                    borderColor: [
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                        "#FFFF99",
                    ],
                    borderWidth: 0.2,
                    data: [35, 55, 65, 85, 40, 30, 18, 35, 20, 70],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Sales Bar Chart 21
    // ------------------------------------------------------ //
    const SALESBARCHART2 = document.getElementById("salesBarChart2");
    var barChartHome = new Chart(SALESBARCHART2, {
        type: "bar",
        options: {
            scales: {
                xAxes: [
                    {
                        display: false,
                        barPercentage: 0.2,
                    },
                ],
                yAxes: [
                    {
                        display: false,
                    },
                ],
            },
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"],
            datasets: [
                {
                    label: "Data Set 1",
                    backgroundColor: [
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                    ],
                    borderColor: [
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                        "#CCFFE5",
                    ],
                    borderWidth: 0.2,
                    data: [44, 75, 65, 34, 60, 45, 22, 35, 30, 63],
                },
            ],
        },
    });

    // ------------------------------------------------------- //
    // Pie Chart
    // ------------------------------------------------------ //
    const VISITPIECHART = document.getElementById("visitPieChart");
    var pieChartExample = new Chart(VISITPIECHART, {
        type: "pie",
        options: {
            legend: {
                display: false,
            },
        },
        data: {
            labels: ["A", "B", "C", "D"],
            datasets: [
                {
                    data: [300, 50, 100, 80],
                    borderWidth: 0,
                    backgroundColor: ["#0066CC", "#0080FF", "#3399FF", "#66B2FF"],
                    hoverBackgroundColor: ["#0066CC", "#0080FF", "#3399FF", "#66B2FF"],
                },
            ],
        },
    });

    var pieChartExample = {
        responsive: true,
    };
});
