
var dropdownbox = d3.select("#selDataset");
var tbody = d3.select("#overview_table");

d3.csv("data/confirmed_death_us_daily.csv").then((dailydata) => {
    //console.log(dailydata);

    var us_confirmed = dailydata.filter(eachdata => eachdata.state == "United States" && eachdata.status == "confirmed");
    console.log(us_confirmed);
    var us_death = dailydata.filter(eachdata => eachdata.state == "United States" && eachdata.status == "death");
    console.log(us_death);
    var us_confirmed_objectvalues = Object.values(us_confirmed[0]);
    var us_confirmed_objectkeys = Object.keys(us_confirmed[0]);
    var us_death_objectvalues = Object.values(us_death[0]);
    
    var us_confirmed_number = us_confirmed[0].total;
    var us_death_number = us_death[0].total;
    var us_fatality = us_death[0].total/us_confirmed[0].total;

    var table_row = tbody.append("tr")
    table_row.append("td").text("US");
    table_row.append("td").text(us_confirmed_number);
    table_row.append("td").text(us_death_number);
    table_row.append("td").text(us_fatality);



    var line_y_us_confirmed = us_confirmed_objectvalues.slice(40);
    var line_y_us_death = us_death_objectvalues.slice(40);
    console.log(line_y_us_confirmed);
    var line_x_date = us_confirmed_objectkeys.slice(40);
    console.log(line_x_date);


    //us confirmed line
    var us_confirmed_trace_line = {
        x: line_x_date,
        y: line_y_us_confirmed,
        type: "line",
    };

    var us_confirmed_line_data = [us_confirmed_trace_line];
    var us_confirmed_line_layout = { title: "New Cases Confirmed by day in US"};
    Plotly.newPlot("us_line_confirmed", us_confirmed_line_data, us_confirmed_line_layout);

    var us_death_trace_line = {
        x: line_x_date,
        y: line_y_us_death,
        type: "line",
    };

    var us_death_line_data = [us_death_trace_line];
    var us_death_line_layout = { title: "Death by day in US"};
    Plotly.newPlot("us_line_death", us_death_line_data, us_death_line_layout);

    //us map
    var map_data = dailydata.filter(eachdata => eachdata.code != "" && eachdata.status == "confirmed");

    var map_locations = map_data.map((eachdata) => {
        return eachdata.code;
    });
    var map_total_cases = map_data.map((eachdata) => {
        return eachdata.total;
    });
    var map_state_names = map_data.map((eachdata) => {
        return eachdata.state;
    });

    console.log(map_total_cases);

    var us_map_data = [{
        type: 'choropleth',
        locationmode: 'USA-states',
        locations: map_locations,
        z: map_total_cases,
        text: map_state_names,
        autocolorscale: true,
    }];

    var us_map_layout = {
        title: 'Cumulative Cases by State',
        geo:{
            scope: 'usa',
            countrycolor: 'rgb(255, 255, 255)',
            showland: true,
            landcolor: 'rgb(217, 217, 217)',
            showlakes: true,
            lakecolor: 'rgb(255, 255, 255)',
            subunitcolor: 'rgb(255, 255, 255)',
            lonaxis: {},
            lataxis: {}
        },
        width: 1100, 
        height: 500, 
        margin: { t: 60, b: 60 }
    };

    Plotly.newPlot("us_map_confirmed", us_map_data, us_map_layout, {showLink: false});
    
    
    map_state_names.forEach(element => {
        dropdownbox.append("option").text(element);
    });
});

function byStateCharts() {

    var selected_state = dropdownbox.property("value");

    d3.csv("data/confirmed_death_us_daily.csv").then((data) => {

        var confirmed_data_for_selectedstate = data.filter(eachdata => eachdata.state == selected_state && eachdata.status == "confirmed");
        console.log(confirmed_data_for_selectedstate);
        var death_data_for_selectedstate = data.filter(eachdata => eachdata.state == selected_state && eachdata.status == "death");
        var object_values_confirmed = Object.values(confirmed_data_for_selectedstate[0]);
        var object_values_death = Object.values(death_data_for_selectedstate[0]);
        var object_keys = Object.keys(confirmed_data_for_selectedstate[0]);
    
        //line area
        var confirmed_line_y = object_values_confirmed.slice(40);
        var line_x = object_keys.slice(40);

        var confirmed_trace_line = {
            x: line_x,
            y: confirmed_line_y,
            type: "line"
        };
    
        var confirmed_data_line = [confirmed_trace_line];
        var confirmed_layout_line = {title: "New Cases Confirmed by day"};   
        Plotly.newPlot("confirmed_line", confirmed_data_line, confirmed_layout_line);

        var death_line_y = object_values_death.slice(40);

        var death_trace_line = {
            x: line_x,
            y: death_line_y,
            type: "line"
        };
    
        var death_data_line = [death_trace_line];
        var death_layout_line = {title: "Death by day"};   
        Plotly.newPlot("death_line", death_data_line, death_layout_line);

        
    
    
    });
};

dropdownbox.on("change", byStateCharts);

