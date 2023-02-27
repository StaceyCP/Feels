import { Text, View, StyleSheet } from "react-native";
import { lightBlue, blue, orange, black, white } from "../assets/colours";
import { WebView } from 'react-native-webview';
import { useEffect } from "react";
import { getUserMoods } from "../utils/api";

interface Props {
    userMoods: Array<Object>
}

export default function Chart({userMoods}: Props) {

    const moodChart = 
`<html>
    <head>
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
    <script type="text/javascript">
    google.charts.load('current', {'packages':['corechart']});
    google.charts.setOnLoadCallback(drawChart);

    function drawChart() {

        const data = google.visualization.DataTable();

        const linearChart = new google.visualization.LineChart(document.getElementById('linear_div'));
        linearChart.draw(data, linearOptions);

        const logChart = new google.visualization.LineChart(document.getElementById('log_div'));
        logChart.draw(data, logOptions);

  };  
  </script>
    </head>
    <body>
    <table class="columns">
        <tr>
        <th>Linear Scale</th>
        <th>Log Scale</th>
        </tr>
        <tr>
        <td><div id="linear_div"></div></td>
        <td><div id="log_div"></div></td>
        </tr>
    </table>
    </body>
    </html>`;

    const todaysDate: Date = new Date()
    const options: Object = {
        weekday: "long",
        day: "numeric",
        month: "long",
    }
    const formattedDate: String = todaysDate.toLocaleDateString('en-UK', options);

    return (
        <View style={styles.chartContainer}>
            <Text style={styles.date}>{formattedDate}</Text>
            <View style={styles.chart}>
                <WebView source={{html: (moodChart)}}></WebView>
            </View>
        </View>
    );
  }

  const styles = StyleSheet.create({
    chartContainer: {
        height: 450,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 35,
        paddingBottom: 0,
        justifyContent: "center",
    },
    date: {
        color: white,
        margin: 10,
        marginBottom: 13,
        marginLeft: 13,
        fontSize: 25,
        fontWeight: "bold",
    },
    chart: {
        backgroundColor: lightBlue,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 25,
        width: "95%",
        height: "80%",
        marginLeft: "auto",
        marginRight: "auto",
    }
})