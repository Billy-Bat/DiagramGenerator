var example_data_r = [{
    'table_name' : 'User_Table',
    'table_cols' : [{'col_name' : 'id', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'Username', 'd_type': 'VARCHAR', 'f_key':['User_Info.e_mail'], 'p_key':false},
                    {'col_name' : 'PhoneNumber', 'd_type': 'VARCHAR', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Photo', 'd_type': 'BYTES', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Adress_Id', 'd_type': 'id', 'f_key':['User_adress.Place_Id'], 'p_key':false}],
    'Size_Mb' : 45
    },
    {'table_name' : 'User_Info',
    'table_cols' : [{'col_name' : 'e_mailid', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'e_mail', 'd_type': 'VARCHAR', 'f_key':['User_Table.id'], 'p_key':false},
                    {'col_name' : 'ThisisCol', 'd_type': 'Int', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Other', 'd_type': 'Int', 'f_key':[], 'p_key':false}],
    'Size_Mb' : 15
    },
    {'table_name' : 'User_other',
    'table_cols' : [{'col_name' : 'e_mailid', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'e_mail', 'd_type': 'VARCHAR', 'f_key':['User_Table.id'], 'p_key':false},
                    {'col_name' : 'ThisisCol', 'd_type': 'Int', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Other', 'd_type': 'Int', 'f_key':[], 'p_key':false},
                    {'col_name' : 'super', 'd_type': 'VARCHAR', 'f_key':['User_Table.Adress_Id'], 'p_key':false},
                    {'col_name' : 'NotWhat', 'd_type': 'Int', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Pswd', 'd_type': 'Int', 'f_key':[], 'p_key':false},
                    {'col_name' : 'Facebook', 'd_type': 'VARCHAR', 'f_key':['User_Table.id'], 'p_key':false},
                    {'col_name' : 'Other', 'd_type': 'Int', 'f_key':[], 'p_key':false}],
    'Size_Mb' : 14
    },
    {'table_name' : 'User_adress',
    'table_cols' : [{'col_name' : 'Place_Id', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'PlaceName', 'd_type': 'Int', 'f_key':[], 'p_key':false}],
    'Size_Mb' : 14

    },
    {'table_name' : 'Company_Info',
    'table_cols' : [{'col_name' : 'CP_ID', 'd_type': 'Int', 'f_key':[], 'p_key':true},
                    {'col_name' : 'CP_name', 'd_type': 'VARCHAR', 'f_key':[], 'p_key':false}],
    'Size_Mb' : 14

    }
];

// Design variable
var width = 10000;
var height = 10000;
var link_colors = ["#51addf", "#c582aa", "#005b9d", "#35a993", "#cc373c", "#f7d783"] // increase the size to support more f_key in one table
// Frame placemenet
var offset_x = -width/2;
var offset_y = -height/2
var pan_x = 0;
var pan_y = 0;
var table_width = 140;
var header_height = 22;
var col_height = 20;
var type_textoffset = 70;
// Zoom Variables
var zoom = d3.zoom()
    .on("zoom", panned);
    
function panned() {
    // Only pan for now add a slider for the zoom
    var t = d3.event.transform;
    offset_x = Math.round((offset_x + t.x)*100)/100;
    offset_y = Math.round((offset_y + t.y)*100)/100;
    svg.attr("transform",'translate(' + offset_x + ',' + offset_y + ')');
}

// Tooltip 
var tooltip = d3.select(".body").append("div")	
    .attr("class", "tooltip")				
    .style("opacity", 0);

// Define the main container
var svg = d3.select("#D3Container")
    .append("svg")
    .attr("id", "SVGContainer")
    .attr("width", width)
    .attr("height", height)
    .attr("transform", "translate(" + offset_x + "," + offset_y + ")")
    .call(zoom);

// DropShadows
var defs = svg.append("defs");
var filter_t = defs.append("filter")
      .attr("id", "dropshadow_table")
filter_t.append("feGaussianBlur")
    .attr("in", "SourceAlpha")
    .attr("stdDeviation", 4)
    .attr("result", "blur");
filter_t.append("feOffset")
    .attr("in", "blur")
    .attr("dx", 1)
    .attr("dy", 1)
    .attr("result", "offsetBlur");
var feMerge = filter_t.append("feMerge");
feMerge.append("feMergeNode")
    .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
    .attr("in", "SourceGraphic");
var filter_s = defs.append("filter")
    .attr("id", "dropshadow_link")
filter_s.append("feGaussianBlur")
  .attr("in", "SourceAlpha")
  .attr("stdDeviation", 1)
  .attr("result", "blur");
filter_s.append("feOffset")
  .attr("in", "blur")
  .attr("dx", 0.05)
  .attr("dy", 0.05)
  .attr("result", "offsetBlur");
var feMerge = filter_s.append("feMerge");
feMerge.append("feMergeNode")
  .attr("in", "offsetBlur")
feMerge.append("feMergeNode")
  .attr("in", "SourceGraphic");

// Retrieve the position distributions for the tables
const [Positions, example_data] = getTablePos(example_data_r);
// Create the Tables
for (var s = 0; s < example_data.length; s++){
    // Get optimal Position
    table_x = Positions[s].x;
    table_y = Positions[s].y;
    // create the container
    tablegroup = svg.append("g").attr('class', 'table')
                    .attr("x", table_x)
                    .attr("y", table_y)
                    .on("mouseover", handleMouseOver)
                    .on("mouseout", handleMouseOut)
                    .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended));;
    
    // header
    header = tablegroup.selectAll("rect").data([{'x':1, 'y':1}])
        .enter().append("rect")
        .attr("class", 'header_rect')
        .attr("x", function(d){return d3.select(this.parentNode).attr("x");})
        .attr("y",function(d){return d3.select(this.parentNode).attr("y");})
        .attr("width", table_width)
        .attr("height", header_height)
        .attr("fill", "black")
        .attr("filter", "url(#dropshadow_table)");
    header_text = tablegroup.selectAll("text").data([example_data[s]])
            .enter().append("text")
            .attr("class", 'header_text')
            .attr("x", function(d){return d3.select(this.parentNode).attr("x");})
            .attr("y", function(d){return d3.select(this.parentNode).attr("y");})
            .attr("dx", "1em")
            .attr("dy", header_height/2)
            .attr("fill", "white")
            .text(function(d) {return d.table_name; });
    
    // columns
    col_group = tablegroup.append('g').attr('class', 'columns_desc')
                    .attr("x", function(d){return d3.select(this.parentNode).attr("x");})
                    .attr("y",function(d){return d3.select(this.parentNode).attr("y");});

    cols = col_group.selectAll("rect").data(example_data[s].table_cols)
            .enter().append("rect")
            .attr("class", 'column_rect')
            .attr("x", function(d){return Number(d3.select(this.parentNode).attr("x"));})
            .attr("y", function(d,i){return Number(d3.select(this.parentNode).attr("y")) + (i+1)*col_height;})
            .attr("anchorL", function(d,i){return [Number(d3.select(this.parentNode).attr("x")), Number(d3.select(this.parentNode).attr("y"))+(i+1)*col_height/2];})
            .attr("anchorR", function(d,i){return [Number(d3.select(this.parentNode).attr("x"))+table_width, Number(d3.select(this.parentNode).attr("y"))+(i+1)*col_height/2];})
            .attr("height", col_height)
            .attr("width", table_width)
            .on("mouseover", showcolumntooltip)
            .on("mouseout", closecolumntooltip)
            .attr("filter", "url(#dropshadow_table)");

    col_text = col_group.selectAll(".col_text").data(example_data[s].table_cols)
                .enter().append("text")
                .attr("class", 'col_text')
                .attr("x", function(d,i){ return Number(d3.select(this.parentNode).attr("x"));})
                .attr("y", function(d,i){ return Number(d3.select(this.parentNode).attr("y")) + (i+1)*col_height;})
                .attr("dy", "1em")
                .attr("dx", "1em")
                .text(function(d) {return d.col_name; });

    // Types indicators
    col_type = col_group.selectAll(".col_type_text").data(example_data[s].table_cols)
                .enter().append("text")
                .attr("class", 'col_type_text')
                .attr("x", function(d,i){ return Number(d3.select(this.parentNode).attr("x"))+type_textoffset;})
                .attr("y", function(d,i){ return Number(d3.select(this.parentNode).attr("y")) + (i+1)*col_height;})
                .attr("dy", "1em")
                .attr("dx", "1em")
                .text(function(d) {return d.d_type; });
    // col_tooltip
    col_tooltip = col_group.selectAll(".col_tooltip").data(example_data[s].table_cols)
                 .enter().append("text")
        
}

// Create the conection nodes
var tables_cols = svg.selectAll(".table").selectAll('.columns_desc').selectAll(".column_rect")._groups;
var table_header  = svg.selectAll(".table").selectAll('.header_text')._groups;
var tables_nb = tables_cols.length;
var nodemapper = {};
var remainingkey = {};
var nodepair = [];

// Establish the Node Pairs
for (var i = 0; i < tables_nb; i++){
    cols_nb = tables_cols[i].length;
    t_name = table_header[i][0].__data__.table_name;
    for (var j = 0; j < cols_nb; j++){
        node = tables_cols[i][j];
        c_name = node.__data__.col_name;
        // Append to the dictionary mapper
        origin_key = t_name + '.' + c_name;
        nodemapper[origin_key] = node;
        if (node.__data__.f_key.length > 0){
            c_key = node.__data__.f_key;
            // Try to connect if target already passed
            if (c_key in nodemapper){
                nodepair.push([nodemapper[c_key], nodemapper[origin_key]]);
            } else {
                remainingkey[c_key] = origin_key;
            }
        }


        if (origin_key in remainingkey){
            nodepair.push([nodemapper[origin_key], nodemapper[remainingkey[origin_key]]]);
            delete remainingkey[origin_key];
        }
    }
}

var link_curve = d3.linkHorizontal()
  .x(function(d) {
    return d.x;
  })
  .y(function(d) {
    return d.y;
  });

// Create canvas

DrawConnections();

// ***********************************************************************************//
// ------------------------------ Fcn To draw Connections --------------------------- //
function lineData(target, source){
    var ParentDiv = document.getElementById('D3Container').getBoundingClientRect();
    pan_x = width/2 + offset_x;
    pan_y = height/2 + offset_y;

    t_rect = target.getBoundingClientRect();
    s_rect = source.getBoundingClientRect();

    anchor_lx = Math.round((s_rect.x - ParentDiv.x - pan_x)*100)/100;
    anchor_ly = Math.round((s_rect.y - ParentDiv.y - pan_y + col_height/2)*100)/100;
    anchor_rx = Math.round((t_rect.x - ParentDiv.x - pan_x)*100)/100;
    anchor_ry = Math.round((t_rect.y - ParentDiv.y - pan_y + col_height/2)*100)/100;

    // check the shortest path between the two
    if (t_rect.x <= s_rect.x){
        anchor_rx = anchor_rx + table_width;
    } else {
        anchor_lx = anchor_lx + table_width;
    }

    data = {
        source: {
            x : anchor_lx,
            y : anchor_ly,

        },
        target:  {
            x : anchor_rx,
            y : anchor_ry,
        }
    }
    return data
}

function DrawConnections(){
    for (var i = 0; i < nodepair.length; i++){
        // Group 
        var linkgroup = svg.append("g").attr("class", "link");
        c_color = link_colors[i];
        // Lines 
        linkgroup.selectAll('path').data([lineData(nodepair[i][0], nodepair[i][1])])
            .enter().append("path")
            .attr("d", link_curve)
            .attr("fill", "none")
            .attr("transform", "translate(" + width/2 + "," + height/2 + ")")
            .attr("stroke_width", 10)
            .attr("stroke", c_color)
            .attr("marker-end", 'url(#head)')
            .attr("filter", "url(#dropshadow_link)");

        linkgroup.selectAll('marker').data([lineData(nodepair[i][0], nodepair[i][1])])
            .enter().append('marker')
            .attr("id", 'head')
            .attr('refX', 4.5)
            .attr('refY', 4)
            .attr('markerWidth', 40)
            .attr('markerHeight', 40)
            .attr('orient', 'auto')
            .append('path')
            .attr('class', c_color)
            .attr("d", 'M0,0 V8 L4,4 Z')
            .style("stroke", 'black');
            // 'M 0,0 m -5,-5 L 5,0 L -5,5 Z', viewbox: '-5 -5 10 10'

    //         .attr("refX", 6)
    // .attr("refY", 6)
    // .attr("markerWidth", 30)
    // .attr("markerHeight", 30)
    // .attr("markerUnits","userSpaceOnUse")
    // .attr("orient", "auto")
    // .append("path")
    // .attr("d", "M 0 0 12 6 0 12 3 6")


    //     svg.append("svg:defs").append("svg:marker")

    }
}

function UpdateConnections(){
    svg.selectAll('.link').remove();
    DrawConnections();
}

// ------------------------------ Mouse Clicks --------------------------- //
function handleMouseOver(d, i) {
}

function handleMouseOut(d, i){
}

function showcolumntooltip(d, i){
    // put the tooltip next to the column row
    var arrow_size = 10;
    Rect = this.getBoundingClientRect();
    x_tooltip = Rect.x + table_width+arrow_size;
    y_tooltip = Rect.y - col_height;

    tooltip.transition()		
            .duration(600)		
            .style("opacity", .8);		
    tooltip.html("<h2 class='tooltip_className'>" + d.col_name +"</h1>"
               + "IS P_KEY: " + d.p_key + "<br />"
               + "IS TRIGGER: " + d.p_key + "<br />"
               + "COL SIZE: " + "3000" + "<br />"
               + "<div class='arrow-left' style='left:" + (-arrow_size) +";top:" + col_height +"'></div>"
        )	
            .style("left", (x_tooltip) + "px")		
            .style("top", (y_tooltip) + "px");	

    // d3.select('.body').append('div')
    // .attr('class', 'tooltip')
    // .style('top', d3.event.pageY)
    // .style('left', d3.event.pageX)
}

function closecolumntooltip(d, i){
    d3.selectAll('.tooltip').transition().duration(500)		
    .style("opacity", 0);	;

}


// ------------------------------  Dragg ------------------------------ //

function dragstarted(d) {
    d3.select(this).raise().classed("active", true);
    d3.select(this).style('cursor', 'grabbing');

}

function dragged(d){
    c_x = d3.select(this).attr('x');
    c_y = d3.select(this).attr('y');
    var new_x = d3.event.x;
    var new_y = d3.event.y;
    var drag_x = Math.round((new_x - c_x)*100)/100;
    var drag_y = Math.round((new_y - c_y)*100)/100;
    d3.select(this).attr("transform", "translate("+  drag_x + "," + drag_y + ")");
    UpdateConnections();
  
}

function dragended(d) {
    d3.select(this).classed("active", false);
    d3.select(this).style('cursor', 'default');
}

// -------------------------------- Position Tools ----------------------- //

function getTablePos(data){
    // This function returns a set of position to get the tables evenly spread
    // table with the most outgoing p_key connection is placed on the center
    // after that 
    var byring = 4; // nb of table on each ring
    var count;
    VisibleFrame = document.getElementById('D3Container').getBoundingClientRect();


    var svg_center_x = VisibleFrame.width/2 -  offset_x; 
    var svg_center_y = VisibleFrame.height/2 -  offset_y; 
    // Order the tables in a list by number of connections
    var list_collec = [];
    for (var i = 0; i < data.length; i++){
        count = 0;
        for (var j = 0; j < data[i].table_cols.length; j++){
            if (data[i].table_cols[j].f_key.length > 0){
                count += 1;
            }
        }
        list_collec.push({'table': data[i], 'count':count});
    }
    // sort the collection
    list_collec.sort(function(a, b) {
        return ((a.count > b.count) ? -1 : ((a.count == b.count) ? 0 : 1));
    });
    var rings = Math.ceil((list_collec.length - 1)/4);
    Pos = [{'x':svg_center_x, 'y':svg_center_x}];

    var min_radius = list_collec[0].table.table_cols.length * col_height * 2;
    for (var r = 0; r < rings; r++){
        anglespos = 3.14/byring;
        for (var r_nb = 0; r_nb < byring; r_nb++){
            c_angle = anglespos*(r_nb+1);
            p_x = min_radius*Math.cos(c_angle);
            p_y = min_radius*Math.sin(c_angle);
            Pos.push({'x':svg_center_x+p_x, 'y':svg_center_x+p_y})
        }
    }

    var data_ordered = [];
    for (var i=0; i < list_collec.length; i++) data_ordered.push(list_collec[i].table);
    return [Pos, data_ordered];
}

function getTranslation(transform) {
    // Create a dummy g for calculation purposes only. This will never
    // be appended to the DOM and will be discarded once this function 
    // returns.
    var g = document.createElementNS("http://www.w3.org/2000/svg", "g");
    
    // Set the transform attribute to the provided string value.
    g.setAttributeNS(null, "transform", transform);
    
    // consolidate the SVGTransformList containing all transformations
    // to a single SVGTransform of type SVG_TRANSFORM_MATRIX and get
    // its SVGMatrix. 
    var matrix = g.transform.baseVal.consolidate().matrix;
    
    // As per definition values e and f are the ones for the translation.
    return [matrix.e, matrix.f];
  }