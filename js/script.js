/**
 * Constructor of Object Node 
 * @param {string} id Node ID / as unique reference
   
 */

function Node(id) {
	this.m_id = id; //m_id : node id
	this.m_deg = 0; //node degree

}

/**
 * @param {string} id : Edge ID 
 * @param {string} predID predecessor node's id 
 * @param {double} weight  Edge weight
 * @param {string} succID syccessor node's id 
 */

function Edge(id, weight, predID, succID) {
	this.m_id = id;
	this.m_weight = weight;
	this.m_pred_id = predID;
	this.m_succ_id = succID;


}


function Graph() {

	this.m_nodes = []; // Array storing nodes
	this.m_edges = [];// Array fo storing edge
	this.m_order = 0; // Graph order
	this.m_matrix = new Array(); // Adjacing matrix
	this.m_voisins = new Array();  // neighboor Array 




	//Methodes : 

	/**
	 *  Returns Node index (in m_nodes array ) , or returns  -1 if no occurence
	 * @param {string} nodeId : the node ID
	 */
	this.getNodeIndexFromID = function (nodeId) {
		j = this.m_nodes.length;
		var i;
		for (i = 0; i < j; i++) {
			if (this.m_nodes[i].m_id == nodeId)
				return i;
		}
		return -1; // if nothing matches


	};

	/**
	 *  Returns edge index (in m_edges array ) , or returns  -1 if no occurence
	 * @param {string} edgeId Edge ID
	 */
	this.getEdgeFromID = function (EdgeIdd) {
		j = this.m_edges.length;
		var i;
		for (i = 0; i < j; i++) {
			if (this.m_edges[i].m_id == EdgeIdd)
				return i;
		}
		return -1; // if nothing matches


	};

	/**
	 * Returns an array of indexes of the edges matching a node
	 *@param {String} nodeID : node id
	 */
	this.getEdgeListFromNodeId = function (nodeID) {
		var matchEdgeList = [];
		var i = this.m_edges.length;
		var j = 0;
		var id1;
		var id2;
		for (j = 0; j < i; j++) {
			 
			id1 = this.m_edges[j].m_pred_id;
			id2 = this.m_edges[j].m_succ_id;

			if (id1 == nodeID || id2 == nodeID) {
				matchEdgeList.push(j);
			}
		}



		return matchEdgeList;


	};

	/**
	 * Create a node and add it to the m_nodes
	 *@param {string} id : Node ID
	 */
	this.addNode = function (id) {
 
		 
		this.m_nodes.push(new Node(id));
		this.m_order = this.m_order + 1;




	};

	/**
	 * Remove a node with its edges
	 *@param {string} nodeID : Node ID
	 */
	this.remNode = function (nodeID) {

		var idx = this.getNodeIndexFromID(nodeID);  

		//If node exists
		if (idx > -1) {

			// We remove the edges	 
			var j = 0;
			var id1;
			var id2;
			// We search m_edges
			while (j < this.m_edges.length) {
				// for an edge which succ or pred is matching
				// we get the ids of pred & succ of each edge
				id1 = this.m_edges[j].m_pred_id;  
				id2 = this.m_edges[j].m_succ_id;

				if (id1 == nodeID || id2 == nodeID) {

					this.remEdge(this.m_edges[j].m_id);


				} else {
					j++;
				}
			}



			// Remove the node 
			this.m_nodes.splice(idx, 1);
			// Update Graph order 
			if (this.m_order > 0) {
				this.m_order = this.m_order - 1;
			}

		}



	};

	/**
	 * Description : Add an edge
	 *@param {string} id : edge id
	 *@param {double} weight : edge's weight
	 *@param {string} predecessor_id : the id of predecessing edge
	 *@param {string} successor_id : id of successor edge
	 */
	this.addEdge = function (id, weight, predecessor_id, successor_id) {


		 
		var i = this.getNodeIndexFromID(predecessor_id);
		var j = this.getNodeIndexFromID(successor_id);
		 
		if (i > -1 && j > -1) {
			this.m_edges.push(new Edge(id, weight, predecessor_id, successor_id));

		} else {
			return -1; //error code
		}



	};


	/**
	 * Description : Remove an edge
	 *@param {string} id : the id of the edge
	 */
	this.remEdge = function (id) {


		 
		var idx = this.getEdgeFromID(id);
		if (idx > -1) {

			this.m_edges.splice(idx, 1);
		}



	};


	/**
	 * Return an array of the indexes of the edges matching two nodes (pred & succ)
	 *@param {string} id1 & id2 : noms des noeuds
	 */
	this.getEdgeIndexFrom2Nodes = function (id1, id2) {
		var matchEdgeList = [];

		var i = this.m_edges.length;
		var n1;
		var n2;
		for (var j = 0; j < i; j++) {
			// we get the pred & the succ of each edge
			n1 = this.m_edges[j].m_pred_id;
			n2 = this.m_edges[j].m_succ_id;
			if ((n1 == id1 && n2 == id2) || (n1 == id2 && n2 == id1)) {
				matchEdgeList.push(j);
			}
		}



		return matchEdgeList;


	};

	/**
	 * Generate an html table for adjacing matrix
	 * @return {HTML Table} 
	 */
	this.makeTable = function () {

		var table = document.createElement('table');
		if (this.m_matrix.length > 0) {

			var caption = document.createElement('caption');
			caption.textContent = "2. Adjacency Matrix";
			caption.padding = "10px";
			table.appendChild(caption);
			var len = this.m_matrix.length;
			var headArray = [];
			var i;
			var l = this.m_nodes.length;
			for (i = 0; i < l; i++) {
				headArray.push(this.m_nodes[i].m_id);

			}
			var mat = [];
			mat = this.m_matrix;


			mat.splice(0, 0, headArray);
			mat[0].splice(0, 0, " ");

			for (var i = 1; i <= len; i++) {

				mat[i].splice(0, 0, headArray[i]);

			}
			var matLen = mat.length;
			for (var i = 0; i < matLen; i++) {
				var row = document.createElement('tr');
				for (var j = 0; j < matLen; j++) {
					var cell;
					if (i == 0) {
						cell = document.createElement('th');
					} else {
						cell = document.createElement('td');
					}

					cell.textContent = this.m_matrix[i][j];
					if (j == 0 && i == 0) {
						cell.id = "origin";
					} else if (j == 0) {
						cell.style.fontWeight = "bold";
					}

					row.appendChild(cell);
				}
				table.appendChild(row);
			}
		}
		return table;
	};

	/**
	 * Generate an html table of nodes degrees
	 * @return {HTML Table} 
	 */
	this.makeDegTable = function () {

		var table = document.createElement('table');
		if (this.m_nodes.length > 0) {

			var caption = document.createElement('caption');
			caption.textContent = "3. Node Degrees";
			table.appendChild(caption);
			var len = this.m_nodes.length;

			for (var i = 0; i < len; i++) {
				var row = document.createElement('tr');
				var cell = document.createElement('td');
				var cell2 = document.createElement('td');
				cell.textContent = this.m_nodes[i].m_id;
				row.appendChild(cell);
				cell2.textContent = this.m_nodes[i].m_deg;
				row.appendChild(cell2);

				table.appendChild(row);
			}
		}

		return table;

	};




	/**
	 * Update nodes degrees
	 */
	this.updateDegs = function () {

		var m_len = this.m_matrix.length;
		var sum;
		for (var i = 0; i < m_len; i++) {
			sum = 0;
			for (var j = 0; j < m_len; j++) {


				sum = sum + this.m_matrix[i][j];

				// A loop counts twice !
				if (j == i) {
					sum = sum + this.m_matrix[i][j];
				}

			}

			this.m_nodes[i].m_deg = sum;
		}

	};

	
	/**
	* A methode for updating neighboors array 
	*/
	this.updateVoisins = function () {
		var len = this.m_matrix.length;
		this.m_voisins = [];

		for (var i = 0; i < len; i++) {
			this.m_voisins[i] = new Array();
			this.m_voisins[i].push(this.m_nodes[i].m_id);
			var lst = " ";
			// we browse the adjacing
			for (var j = 0; j < len; j++) {
				// if intersection !=0 (means there is an edge between the two nodesm)
				if (this.m_matrix[i][j] != 0) {
					if (lst != " ") {
						lst = lst + " - ";
					}
					lst = lst + this.m_nodes[j].m_id;

				}



			}

			this.m_voisins[i].push(lst);



		}

	};

	/**
	 * Generate an html table of neighboors array
	 * @return {HTML Table} 
	 */
	this.makeVoisinsTable = function () {

		var table = document.createElement('table');
		if (this.m_voisins.length > 0) {

			var caption = document.createElement('caption');
			caption.textContent = "4. Nodes neighbors";
			table.appendChild(caption);
			var len = this.m_voisins.length;

			for (var i = 0; i < len; i++) {
				var row = document.createElement('tr');
				var cell = document.createElement('td');
				var cell2 = document.createElement('td');
				cell.textContent = this.m_voisins[i][0];
				row.appendChild(cell);
				cell2.textContent = this.m_voisins[i][1];
				row.appendChild(cell2);

				table.appendChild(row);
			}
		}

		return table;

	};


	/**
	 * Update adjacing matrix
	 *
	 */
	this.updateMatrix = function () {

		this.m_matrix = [];


		var l = this.m_nodes.length;
		var sum = 0;
		var edges = [];
		var edge_l = 0;
		for (var i = 0; i < l; i++) {
			// for each node, we add a vector (horizontal) 
			this.m_matrix[i] = new Array();

			for (var j = 0; j < l; j++) {
				sum = 0;
				// we get matching edges
				edges = this.getEdgeIndexFrom2Nodes(this.m_nodes[i].m_id, this.m_nodes[j].m_id);
				edges_l = edges.length;
				// if there are occurences
				if (edges_l > 0) {
					// we summ the weights of matching edges
					for (var k = 0; k < edges_l; k++) {
						sum = sum + this.m_edges[edges[k]].m_weight; 


					}

				}
				this.m_matrix[i].push(sum);

			}


		}
		// Update degrees
		this.updateDegs();
		this.updateVoisins();
	};
}

/*
 App main IIFE

*/

(function () {
	// I. Get page elements 
	
		// 1. Sidenav
		var sideNav_menuButton = document.getElementById("menu_button");
		var sideNav = document.getElementById("sidenav");
		var sideNav_new = document.getElementById("new");
		var sideNav_save = document.getElementById("save");
		var sideNav_open = document.getElementById("open");
		var fileUplaod = document.getElementById("file-upload");
		var sideNav_export = document.getElementById("export");
		var sideNav_about = document.getElementById("about");
		// 2. View switcher
		var switcher = document.getElementById("chkbx");

		// 3.Toolbar 
		var toolBar_addNode = document.getElementById("toolBar_addNode");
		var toolBar_remNode = document.getElementById("toolBar_remNode");
		var toolBar_addEdge = document.getElementById("toolBar_addEdge");
		var toolBar_remEdge = document.getElementById("toolBar_remEdge");


	// II. Init the object Graph
	var Graph_ = new Graph();

	// III. Init Cytoscape object 
	var cy = cytoscape({
		container: document.getElementById('cy'),


		style: [ // the stylesheet for the graph
			{
				selector: 'node',
				style: {
					'background-color': '#4CAF50',
					'label': 'data(id)',
					'text-halign': 'center',
					'text-valign': 'center',
					'border-width': '1px',
					'border-color': '#111',

				}
    },

			{
				selector: 'edge',
				style: {
					'width': 3,
					'line-color': '#ccc',
					'target-arrow-color': '#ccc',
					'label': 'data(weight)',
					'target-arrow-shape': 'triangle'
				}
    }
  ],

		// initial viewport state:
		zoom: 1,

		// interaction options:
		minZoom: 1e-50,
		maxZoom: 1e50,
		zoomingEnabled: true,
		userZoomingEnabled: true,
		panningEnabled: true,
		userPanningEnabled: true,
		boxSelectionEnabled: false,
		selectionType: 'single',
		touchTapThreshold: 8,
		desktopTapThreshold: 4,
		autolock: false,
		autoungrabify: false,
		autounselectify: false,

		// rendering options:
		headless: false,
		styleEnabled: true,
		hideEdgesOnViewport: false,
		hideLabelsOnViewport: false,
		textureOnViewport: false,
		motionBlur: false,
		motionBlurOpacity: 0.2,
		wheelSensitivity: 1,
		pixelRatio: 'auto'


	});

	// the default layout for cytoscape
	var layout = {
		
		name: 'circle',
		fit: true, // whether to fit the viewport to the graph
		padding: 30, // the padding on fit
		boundingBox: undefined, // constrain layout bounds; { x1, y1, x2, y2 } or { x1, y1, w, h }
		avoidOverlap: true, // prevents node overlap, may overflow boundingBox and radius if not enough space
		radius: 10, // the radius of the circle
		startAngle: 3 / 2 * Math.PI, // where nodes start in radians
		sweep: undefined, // how many radians should be between the first and last node (defaults to full circle)
		clockwise: true, // whether the layout should go clockwise (true) or counterclockwise/anticlockwise (false)
		sort: undefined, // a sorting function to order the nodes; e.g. function(a, b){ return a.data('weight') - b.data('weight') }
		animate: false, // whether to transition the node positions
		animationDuration: 300, // duration of animation in ms if enabled
		animationEasing: undefined, // easing of animation if enabled
		ready: undefined, // callback on layoutready
		stop: undefined // callback on layoutstop
	};

	// IV. Modals

	// Get the modal
	var modal2 = document.getElementById('rem_node_modal');
	var modal1 = document.getElementById('add_node_modal');
	var modal3 = document.getElementById('add_edge_modal');
	var modal4 = document.getElementById('rem_edge_modal');
	// Get the <span> element that closes the add_node
	var span1 = document.getElementById("close_add_node_modal");
	var span2 = document.getElementById("close_rem_node_modal");
	var span3 = document.getElementById("close_add_edge_modal");
	var span4 = document.getElementById("close_rem_edge_modal");

	// The add node modal
	var add_node_modal_id;
	var add_node_modal_err = document.getElementById("add_node_modal_err");
	var add_node_modal_go = document.getElementById("add_node_modal_go");

	// The remove node modal

	var rem_node_modal_id_go = document.getElementById("rem_node_modal_id_go");
	var rem_node_modal_id = document.getElementById("rem_node_modal_id");

	// The add edge modal

	var add_edge_modal_id;
	var add_edge_modal_weight;
	var add_edge_modal_id_err = document.getElementById("add_edge_modal_id_err");
	var add_edge_modal_weight_err = document.getElementById("add_edge_modal_weight_err");
	var add_edge_modal_pred_id = document.getElementById("add_edge_modal_pred_id");
	var add_edge_modal_succ_id = document.getElementById("add_edge_modal_succ_id"); /* add_edge_modal_pred_id */
	var add_edge_modal_go = document.getElementById("add_edge_modal_go");

	// The remove edge modal


	var rem_edge_modal_id_go = document.getElementById("rem_edge_modal_id_go");
	var rem_edge_modal_id = document.getElementById("rem_edge_modal_id");

	//Event handlers for modals : 
	// When the user clicks on <span> (x), close the add_node
	span1.onclick = function () {
		modal1.style.display = "none";
		document.getElementById("add_node_modal_id").value = "";
		add_node_modal_err.style.display = "none";

	}

	span2.onclick = function () {

		modal2.style.display = "none";

		//Reset the view 
		for (i = rem_node_modal_id.options.length - 1; i >= 0; i--) {
			rem_node_modal_id.remove(i);

		}

	}

	span3.onclick = function () {


		modal3.style.display = "none";
		document.getElementById("add_edge_modal_id").value = "";
		add_edge_modal_id_err.style.display = "none";
		add_edge_modal_id_err.style.display = "none";

		//Reset the view
		for (i = add_edge_modal_succ_id.options.length - 1; i >= 0; i--) {
			add_edge_modal_succ_id.remove(i);
			add_edge_modal_pred_id.remove(i);
		}

	}

	span4.onclick = function () {

		modal4.style.display = "none";

		//Reset the view
		for (i = rem_edge_modal_id.options.length - 1; i >= 0; i--) {
			rem_edge_modal_id.remove(i);

		}

	}



	/**	
	 * Description affiche le tableau
	 */

	function showTables() {

		var caption = document.createElement('caption');
		caption.textContent = "1. Graph Order = " + Graph_.m_order;
		caption.setAttribute("id", "order_label");
		var orderContainer = document.getElementById("orderContainer");
		orderContainer.removeChild(orderContainer.firstChild);
		orderContainer.appendChild(caption);

		var html = Graph_.makeTable();
		html.setAttribute("id", "tble")
		var tbleContainer = document.getElementById("tbleContainer");
		tbleContainer.removeChild(tbleContainer.firstChild);
		tbleContainer.appendChild(html);

		html = Graph_.makeDegTable();
		html.setAttribute("id", "degTable");
		var degTableContainer = document.getElementById("degTableContainer");
		degTableContainer.removeChild(degTableContainer.firstChild);
		degTableContainer.appendChild(html);


		html = Graph_.makeVoisinsTable();
		html.setAttribute("id", "voisTable");
		var voisinsTableContainer = document.getElementById("voisinsTableContainer");
		voisinsTableContainer.removeChild(voisinsTableContainer.firstChild);
		voisinsTableContainer.appendChild(html);





	}





	// III. Implémentation des event handlers

	/**        
	 * Open / close sidenav         
	 */

	function switchSidenav() {
		


		sideNav_menuButton.classList.toggle("change");


		if (sideNav.style.width !== "200px") {
			sideNav.style.width = "200px";
			document.getElementById("main").style.marginLeft = "200px";

			sideNav_new.style.display = "block";
			sideNav_save.style.display = "block";
			sideNav_open.style.display = "block";
			sideNav_export.style.display = "block";
			sideNav_about.style.display = "block";



		} else {
			sideNav.style.width = "50px"
			document.getElementById("main").style.marginLeft = "50px";

			sideNav_new.style.display = "none";
			sideNav_save.style.display = "none";
			sideNav_open.style.display = "none";
			sideNav_export.style.display = "none";
			sideNav_about.style.display = "none";
		}
	}

	/**    
	 * Handler for sidenav entry : new (new project)    
	 */

	function sideNavNew() {

		var a = confirm("Launch a new instance ? Every work not saved will be lost ...");
		if (a) {
			location.reload(false);
		}




	}


	/**    
	 * Handler for sidenav entry : export (export graph to img)    
	 */
	
	function base64ToBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || '';
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data);
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, {type: contentType});
  return blob;
}
	
	function sideNavExport() {

		 var b64key = 'base64,';
		var b64 = cy.png().substring( cy.png().indexOf(b64key) + b64key.length );
		var imgBlob = base64ToBlob( b64, 'image/png' );
		saveAs( imgBlob, 'graph.png' );
		  


	}




	/**    
	 * Handler for sidenav entry : save (save project)    
	 */
	function sideNavSave() {

		var txt = JSON.stringify(Graph_);
		download('unnamed.json', txt);



	}

	/**    
	 * Handler for sidenav entry : about    
	 */
	function sideNavAbout() {

		// Get the about_modal
		var about_modal = document.getElementById('myabout_modal');

		// Get the <span> element that closes the about_modal
		var span = document.getElementsByClassName("myabout-close")[0];

		about_modal.style.display = "block";

		// When the user clicks on <span> (x), close the about_modal
		span.onclick = function () {
			about_modal.style.display = "none";
		}

		// When the user clicks anywhere outside of the about_modal, close it
		window.onclick = function (event) {
			if (event.target == about_modal) {
				about_modal.style.display = "none";
			}
		}

	}


	/**    
	 * switch view from graph to data & vice versa    
	 */

	function switchView() {



		// Get the modal
		var modal = document.getElementById('myModal');
		// Get the <span> element that closes the modal
		var span = document.getElementsByClassName("close")[0];
		// When the user clicks on <span> (x), close the modal
		span.onclick = function () {
			modal.style.display = "none";
		};

		// If already opened  : 
		modal.style.display = "none";


		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function (event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		};

		if (switcher.checked == false) {
			document.getElementById("modal_txt").innerHTML = "Graphic View";
			document.getElementById("graphic_view").style.display = "block";
			document.getElementById("data_view").style.display = "none";


		} else {
			document.getElementById("modal_txt").innerHTML = "Data View";
			document.getElementById("graphic_view").style.display = "none";
			document.getElementById("data_view").style.display = "block";

		}



		 
		modal.style.display = "block";
		// Timer for auto hiding

		/*var id = setInterval(function () {
			modal.style.display = "none";
		},1000);
		 clearInterval(id) ; */

		var id = setTimeout(function () {
			modal.style.display = "none";
		}, 4000);







	}

	/**    
	 * Handler for toolbar entry : add node    
	 */


	function toolBarAddNode() {

		modal1.style.display = "none";
		modal2.style.display = "none";
		modal3.style.display = "none";
		modal4.style.display = "none";
		modal1.style.display = "block";


	}

	//When user hits the go button 
	add_node_modal_go.onclick = function () {


		add_node_modal_id = document.getElementById("add_node_modal_id").value.toUpperCase();

		if (add_node_modal_id.length == 0 || Graph_.getNodeIndexFromID(add_node_modal_id) != -1) {
			add_node_modal_err.style.display = "block";
		} else {

			Graph_.addNode(add_node_modal_id);
			Graph_.updateMatrix();
			showTables();

			cy.add({
				group: "nodes",
				data: {
					id: add_node_modal_id
				},

			});



			cy.makeLayout(layout).run();


			//close the modal
			document.getElementById("add_node_modal_id").value = "";

			add_node_modal_err.style.display = "none";
			modal1.style.display = "none";
		}
	}


	/**    
	 * Handler for toolbar entry : remove node    
	 */
	function toolBarRemNode() {


		modal1.style.display = "none";
		modal2.style.display = "none";
		modal3.style.display = "none";
		modal4.style.display = "none";


		for (var i = 0; i < Graph_.m_nodes.length; i++) {
			var option = document.createElement("option");
			option.text = Graph_.m_nodes[i].m_id;
			rem_node_modal_id.add(option);
		}

		modal2.style.display = "block";



	}

	rem_node_modal_id_go.onclick = function () {


		var id = rem_node_modal_id.options[rem_node_modal_id.selectedIndex].text.toUpperCase();
		Graph_.remNode(id);
		Graph_.updateMatrix();
		showTables();

		cy.remove("#" + id);
		cy.makeLayout(layout).run();


		//Close the modal 
		modal2.style.display = "none";
		//Reset 
		for (i = rem_node_modal_id.options.length - 1; i >= 0; i--) {
			rem_node_modal_id.remove(i);

		}

	}



	/**    
	 * Handler for toolbar entry : add edge    
	 */
	function toolBarAddEdge() {


		modal1.style.display = "none";
		modal2.style.display = "none";
		modal3.style.display = "none";
		modal4.style.display = "none";



		for (var i = 0; i < Graph_.m_nodes.length; i++) {

			var option = document.createElement("option");
			option.text = Graph_.m_nodes[i].m_id;
			add_edge_modal_pred_id.add(option);
		}
		for (var i = 0; i < Graph_.m_nodes.length; i++) {
			var option = document.createElement("option");
			option.text = Graph_.m_nodes[i].m_id;

			add_edge_modal_succ_id.add(option);
		}


		modal3.style.display = "block";


	}

	add_edge_modal_go.onclick = function () {
		 

		add_edge_modal_id = document.getElementById("add_edge_modal_id").value.toUpperCase();
		add_edge_modal_weight = parseInt( document.getElementById("add_edge_modal_weight").value) ;
		
		if (add_edge_modal_id.length == 0 || Graph_.getEdgeFromID(add_edge_modal_id) != -1) {

			add_edge_modal_id_err.style.display = "block";
		} 
		else if (add_edge_modal_weight <=0 || add_edge_modal_weight > 10000){
			add_edge_modal_weight_err.style.display = "block";
		}
		 
		else {

			var succ = add_edge_modal_succ_id.options[add_edge_modal_succ_id.selectedIndex].text.toUpperCase();
			var pred = add_edge_modal_pred_id.options[add_edge_modal_pred_id.selectedIndex].text.toUpperCase();
			Graph_.addEdge(add_edge_modal_id, add_edge_modal_weight, pred, succ);
			Graph_.updateMatrix();
			showTables();
			cy.add({
				group: "edges",
				data: {
					id: add_edge_modal_id,
					source: pred,
					target: succ,
					weight : add_edge_modal_weight
				},

			});
			cy.makeLayout(layout).run();


			 
			document.getElementById("add_edge_modal_id").value = "";
			add_edge_modal_id_err.style.display = "none";
			add_edge_modal_id_err.style.display = "none";
			modal3.style.display = "none";
			
			  
			for (i = add_edge_modal_succ_id.options.length - 1; i >= 0; i--) {
				add_edge_modal_succ_id.remove(i);
				add_edge_modal_pred_id.remove(i);
			}


		}




	}


	/**    
	 * Handler for toolbar entry : remove edge    
	 */
	function toolBarRemEdge() {


		modal1.style.display = "none";
		modal2.style.display = "none";
		modal3.style.display = "none";
		modal4.style.display = "none";


		for (var i = 0; i < Graph_.m_edges.length; i++) {
			var option = document.createElement("option");
			option.text = Graph_.m_edges[i].m_id;
			rem_edge_modal_id.add(option);
		}
		modal4.style.display = "block";




	}

	rem_edge_modal_id_go.onclick = function () {

		var id = rem_edge_modal_id.options[rem_edge_modal_id.selectedIndex].text;

		Graph_.remEdge(id);
		Graph_.updateMatrix();
		showTables();
		cy.remove("#" + id);
		cy.makeLayout(layout).run();



		  
		modal4.style.display = "none";
		  
		for (i = rem_edge_modal_id.options.length - 1; i >= 0; i--) {
			rem_edge_modal_id.remove(i);

		}

	}







	// III. Apply event handlers to page elements



	sideNav_menuButton.addEventListener("click", switchSidenav);
	sideNav_new.addEventListener("click", sideNavNew);
	sideNav_save.addEventListener("click", sideNavSave);
	sideNav_export.addEventListener("click", sideNavExport);
	sideNav_about.addEventListener("click", sideNavAbout);
	switcher.addEventListener("click", switchView);
	toolBar_addNode.addEventListener("click", toolBarAddNode);
	toolBar_remNode.addEventListener("click", toolBarRemNode);
	toolBar_addEdge.addEventListener("click", toolBarAddEdge);
	toolBar_remEdge.addEventListener("click", toolBarRemEdge);
	window.addEventListener("resize", function () {

		cy.fit();

	});





	// IV. Upload file 
	fileUplaod.accept = ".json";
	//Init the graph with existing data
	function initCY() {


		// Add nodes
		var len = Graph_.m_nodes.length;
		for (var i = 0; i < len; i++) {


			cy.add({
				group: "nodes",
				data: {
					id: Graph_.m_nodes[i].m_id,
					name: Graph_.m_nodes[i].m_id
				},

			});

		}

		len = Graph_.m_edges.length;
		for (var i = 0; i < len; i++) {

			cy.add({
				group: "edges",
				data: {
					id: Graph_.m_edges[i].m_id,
					source: Graph_.m_edges[i].m_pred_id,
					target: Graph_.m_edges[i].m_succ_id,
					weight : Graph_.m_edges[i].m_weight
				},
			});

		}

		cy.makeLayout(layout).run();
	}




	fileUplaod.addEventListener("change", function () {
		var reader = new FileReader();
		reader.addEventListener('load', function () {

			var parsed = JSON.parse(reader.result);
			Graph_.m_edges = parsed.m_edges;
			Graph_.m_nodes = parsed.m_nodes;
			Graph_.m_order = parsed.m_order;
			Graph_.updateMatrix();

			showTables();
			initCY();


		});

		reader.readAsText(fileUplaod.files[0]);

	});






})();


function download(filename, text) {
	var pom = document.createElement('a');
	pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
	pom.setAttribute('download', filename);

	if (document.createEvent) {
		var event = document.createEvent('MouseEvents');
		event.initEvent('click', true, true);
		pom.dispatchEvent(event);
	} else {
		pom.click();
	}
}