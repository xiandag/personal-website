// set the dimensions and margins of the diagram
var margin = {top: 0, right: 30, bottom: 0, left: 30},
    width = 1500 - margin.left - margin.right,
    height = 1250 - margin.top - margin.bottom;
  
var duration = 2000;

// declares a tree layout and assigns the size
var treemap = d3.tree()
    .size([2 * Math.PI, 600]) //angle = 2*PI, radius = 600
    .separation(function(a, b) { return (a.parent == b.parent ? 1 : 2) / a.depth; });
 
function radial(d) {
  d3.linkRadial(d)
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; })
}

function radialPoint(x, y) {
  return [y * Math.cos(x -= Math.PI / 2), y * Math.sin(x)];
}
  
var color = d3.scaleOrdinal(d3.schemeCategory20);


// load the external data
var treeData,
    root;
  
d3.csv("/csv/exTree.csv", function(error, flatData) {
  if (error) throw error;

  // assign null correctly
  flatData.forEach(function(d) {
      if (d.parent == "null") { d.parent = null};
    });
  
  // convert the flat data into a hierarchy 
  var  treeData = d3.stratify()
    .id(function(d) { return d.name; })
    .parentId(function(d) { return d.parent; })
    (flatData);

  // assign the name to each node
  treeData.each(function(d) {
      d.name = d.id;
    });
  //  assigns the data to a hierarchy using parent-child relationships
  var nodes = d3.hierarchy(treeData, function(d) {
    return d.children;
    });
  
  // maps the node data to the tree layout
  root = treemap(nodes);
       
  d3.select(self.frameElement).style("height", "1500px");  
  
 // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  var svg = d3.select("body").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .attr("class", "chart"),
    g = svg.append("g")
      .attr("transform",
        "translate(" + (width/2 ) + "," + (height / 2) + ")"); //make sure the center of circle is in the center of svg
  
   // adds the links between the nodes
  var links = g.selectAll(".link")
    .data(root.links());
  
  var linkEnter = links.enter().append("path")
    .attr("class", "link")
    .attr("id", function(d, i) { return ("link" + d.source.data.name + "-" + d.target.data.name); })
    .attr("d", d3.linkRadial().angle(0).radius(0))
    .style("stroke", function(d,i) {
                if (d.source.depth === 0) {
                    return "gray50";
                } else if (d.source.depth === 1) {
                    return "gray50"; 
                } else if (d.source.depth === 2) {
                    return findColor(d.source);
                } else {
                    return findColor(d.source.parent);
                }
            })
     .style("stroke-opacity", 0.5);
  
  var linkUpdate = links.merge(linkEnter)
      .transition()
      .duration(duration)
      .attr("d", d3.linkRadial()
          .angle(function(d) { return d.x; })
          .radius(function(d) { return d.y; }));

  // adds each node as a group
  var node = g.selectAll(".node")
    .data(root.descendants());
  
  //arrange each node on svg
  var nodeEnter = node.enter().append("g")
    .attr("class", function(d) { 
      return "node" + 
      (d.children ? " node--internal" : " node--leaf"); })
    .attr("id", function(d, i){return "node" + d.data.name; })//id of the node.
    .on("click", click)
    .on("mouseover", function(d) {
          var g = d3.select(this); // The node
          // The class is used to remove the additional text later
          var info = g.append("text")
             .attr("class", "info")
             .attr("x", 10)
             .attr("y", 10)
             .text(function(d) { return d.data.name; });
    })
    .on("mouseout", function() {
          // Remove the info text on mouse out.
          d3.select(this).select('text.info').remove()
        });

  // adds the circle to the node  
  nodeEnter.append("circle")
    .attr("r", 4)
    .style("fill", findColor);
  
  // adds the text to the node
  nodeEnter.append("text")
    .attr("class", "all")
    .attr("dy", ".35em")
    .attr("x", function(d) { return d.x < Math.PI ? 6 : -6; })
    .style("text-anchor", function(d) { return d.x < Math.PI ? "start" : "end"; })
    .attr("transform", function(d) { return "rotate(" + (d.x < Math.PI ? d.x - Math.PI / 2 : d.x + Math.PI / 2) * 180 / Math.PI + ")"; })
    .text(function(d) { return d.data.name; })
    .style("fill", findColor);
  
  var nodeUpdate = node.merge(nodeEnter)
    .transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + radialPoint(d.x, d.y) + ")"; });
  
});
  
 
  // color
function findColor(d) {
	let c = "";
  if (d.depth == 0 || d.depth == 1 || d.depth === 2) {
		c = color(d.data.name);
	}
	else {
		c = findColor(d.parent);
	}
	return c;  
}
  
function click(d) {
  //reset all nodes color
  d3.selectAll("circle").style("fill", "#c3c3c3");//reset all node colors
  d3.selectAll("path").style("stroke", "#c3c3c3");//reset the color for all links

  if (d.children) {
	  d._children = d.children;
	  d.children = null;
    //highlight the selected circle
    d3.select(this).select("circle").style("r", 6);

    while (d.parent) {
      d3.select("#node" + d.data.name).style("fill", "black");//color the node
      if (d.parent != null) {
        d3.select("#link" + d.parent.data.name + "-" + d.data.name)
          .style("stroke", "red")//color the path
          .style("stroke-width", "3px");
        var g = d3.select("#node" + d.data.name); // The node
        var info = g.append("text")
            .attr("class", "info")
            .attr("x", 10)
            .attr("y", 10)
            .text(function(d) { return d.data.name; });
      } else {
        d3.select("#link" + null + "-" + d.data.name)
          .style("stroke", "red")//color the path
          .style("stroke-width", "3px");      
      }
      d = d.parent;
    } 
  } else {
	  d.children = d._children;
	  d._children = null;
    //reset the selected circle
    d3.select(this).select("circle").style("r", 4);
    //d3.selectAll("path").style("stroke-width", "1.5px");
  }
  
}
