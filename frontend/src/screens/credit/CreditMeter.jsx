import { Box } from "@mui/material";
import React from "react";
import ReactApexChart from "react-apexcharts";

function CreditMeter({ creditScore }) {
    const data = {
        series: [creditScore / 10],
        options: {
            chart: {
                height: 350,
                type: "radialBar",
                offsetY: -10,
            },
            plotOptions: {
                radialBar: {
                    startAngle: -135,
                    endAngle: 135,
                    dataLabels: {
                        name: {
                            fontSize: "0px",
                            color: "#000",
                            offsetY: 120,
                        },
                        value: {
                            offsetY: 4,
                            fontSize: "35px",
                            fontWeight: "bold",
                            // color:
                            //     creditScore < 500
                            //         ? "red"
                            //         : creditScore == 500
                            //         ? "yellow"
                            //         : "green",
                            formatter: function (val) {
                                return val * 10;
                            },
                        },
                    },
                },
            },
            fill: {
                type: "gradient",
                gradient: {
                    shade: "#000",
                    shadeIntensity: 0.15,
                    inverseColors: false,
                    opacityFrom: 1,
                    opacityTo: 1,
                    stops: [0, 50, 65, 91],
                    background: "#000 !important",
                },
                background: "#000 !important",
            },
            stroke: {
                dashArray: 4,
            },
            labels: ["Credit Score"],
        },
    };
    return (
        <Box sx={{
            height: "150px !important",
        }}>
            <ReactApexChart
                options={data.options}
                series={data.series}
                type="radialBar"
                height={200}
                background= "#000 !important"
                style={{ background: "#000 !important" }}
            />
        </Box>
    );
}

export default CreditMeter;
