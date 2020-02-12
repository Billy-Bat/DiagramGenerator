// Style variable
var width = 700;
var height = 800;

var table_width = 100;
var table_heigth = 100;

var column_color = '#f0f0ff';
var column_height = 25;
var column_padding_left = 5;
var column_padding_bottom = 5;

var header_radius = 5;
var header_height = 25;
var header_color = '#6f6f81';
var header_padding_left = 5;
var header_padding_bottom = 5;
var header_textsize = 10;

var text_color = 'white';

// --------------------------------- onLoad --------------------------------- //
var customBase = document.createElement('custom');
var custom = d3.select(customBase); // replacement of SVG

// Canvas and Context
var canvas = d3.select('#D3Container').append('canvas')  
            .attr('width', width).attr('height', height)
            .call(d3.zoom().scaleExtent([1, 8]).on("zoom", zoom));
var svg = d3.select("#D3Container").append("svg")
            .attr("width", width)
            .attr("height", height)
            .style("position", "absolute")
            .style("top", 100)
            .style("left", 100);

var context = canvas.node().getContext('2d');
// var canvas_g = canvas.append("g");
// Create an in memory only element of type 'custom'
var detachedContainer = document.createElement("custom");

var data = [];


// Example data
var example_data = [{
    'table_name' : 'Table01',
    'table_cols' : [{'col_name' : 'id', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'Username', 'd_type': 'VARCHAR', 'f_key':[], 'p_key':false},
                    {'col_name' : 'PhoneNumber', 'd_type': 'VARCHAR', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Photo', 'd_type': 'BYTES', 'f_key':[], 'p_key':false}],
    'Size_Mb' : 45
    },
    {'table_name' : 'Table02',
    'table_cols' : [{'col_name' : 'e_mailid', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'e_mail', 'd_type': 'VARCHAR', 'f_key':['Table01.id'], 'p_key':false},
                    {'col_name' : 'e_mailid', 'd_type': 'Int', 'f_key':[], 'p_key':true}],
    'Size_Mb' : 0.5
    }
]

// Define D3 classes


// DRAW THE CANVAS ON LOAD
draw(canvas, example_data);


// - - - - - - - - - - - - - - - Drawing Functions - - - - - - - - - - - - - - - - - -//

function zoom() {
    var transform = d3.event.transform;
    context.save();
    context.clearRect(0, 0, width, height);
    context.translate(transform.x, transform.y);
    context.scale(transform.k, transform.k);
    draw();
    context.restore();
}  

// function draw_table(x, y, table_data){
//     // Draw Header
//     header_name = table_data.table_name;
//     draw_header(x, y, header_name);
//     // Draw Columns
//     col_data = table_data.table_cols;
//     draw_columns(x, y, col_data);
// }

// function draw_header(x, y, table_name){
//     context.fillStyle = header_color;
//     context.fillRect(x, y, table_width, header_height);
//     // Fill the text
//     context.fillStyle = text_color;
//     context.fillText(table_name, x+header_padding_left, y+header_height-header_padding_bottom);
//     // Add to dataBinding

// }

// function draw_columns(x, y, column_data){
//     for (var i = 0; i < column_data.length; i++){
//         c_col = column_data[i];
//         // Get current position
//         c_x = x;
//         c_y = y + header_height + i*column_height;
//         context.fillStyle = column_color;
//         context.fillRect(c_x, c_y, table_width, column_height);
//         // Fill Text
//         context.fillStyle = 'orange';
//         context.fillText(c_col.col_name, c_x+column_padding_left, 
//                          c_y+column_height-column_padding_bottom);
//         // Add to dataBinding
//     }

// }


//- - - - - - -  - - -- - - - - -  on click fcn ---- - - - - - - - - - - - -  --  -- //

//- - - - - - - - - - - - - - - - - - - -  --  -- - - - - - - - - - - //


function draw(canvas, data = example_data){
    var tables = svg.selectAll("g.node")
    svg.append("circle").attr("cx", 30)
                        .attr("cy", 30)
                        .attr("r", 20);


    // for (var i = 0; i < data.length; i++){
    //     table_data = data[i];
    //     draw_table(i*200, i*200, table_data);
        

    // }

}