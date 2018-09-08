import React from 'react';

import {Line} from 'react-chartjs-2';

const Forecast = (props) => {
    let temps = props.data.list.slice(0,20).map(data => {
        return data.main.temp;
    });
    let timeLabels = props.data.list.slice(0,20).map(data => {
        return new Date(data.dt*1000).toLocaleDateString() + " " + new Date(data.dt*1000).toLocaleTimeString();
    });
    let data = {
        labels: timeLabels,
        datasets: [
            {
                label: "Temp",
                fillColor: "rgba(151,187,205,0.2)",
                strokeColor: "rgba(151,187,205,1)",
                pointColor: "rgba(151,187,205,1)",
                pointStrokeColor: "#fff",
                pointHighlightFill: "#fff",
                pointHighlightStroke: "rgba(151,187,205,1)",
                data: temps
            }
        ]
      };
    return(
        <Line data={data} />
    );
}

export default Forecast;