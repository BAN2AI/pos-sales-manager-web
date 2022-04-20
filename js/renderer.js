let materialDesignKit = require("material-design-kit")
let dom_factory = require("dom-factory")
let siema = require("siema")

var mySiema = new siema({
	selector: '.slide',
	duration: 200,
	easing: 'ease-out',
	perPage: 1,
	startIndex: 0,
	draggable: true,
	multipleDrag: true,
	threshold: 20,
	loop: false,
	rtl: false,
	onInit: () => {},
	onChange: () => {},
  });

  document.querySelector('.prev').addEventListener('click', () => mySiema.prev());
  document.querySelector('.next').addEventListener('click', () => mySiema.next());  
  

let currentId = 0;
let medecin = {
	numero : "156465",
	nom: "Ngonga Ngonga",
	pass: "123457"
}

let files = [
    {
        code: "5b9cbd6c",
        index: 0,
       medecin: "156465",
        patient: "Erin Hodges"
    },
    {
        code: "5b9cbd6c",
        index: 1,
        medecin: "156465",
        patient: "Goodman Rowland"
    },
    {
        code: "5b9cbd6c80",
        index: 2,
        medecin: "157458",
        patient: "Emma Odom"
    },
    {
        code: "5b9cbd6c2",
        index: 3,
        medecin: "12345",
        patient: "Eileen Wong"
    },
    {
        code: "5b9cbd6c",
        index: 4,
        medecin: "54646",
        patient: "Foley Humphrey"
    },
    {
        code: "5b9cbd6c",
        index: 5,
        medecin: "3455345",
        patient: "Vang Barker"
    },
    {
        code: "5b9cbd6c4c",
        index: 6,
        medecin: "64466",
        patient: "Mcdaniel Douglas"
    },
    {
        code: "5b9cbd6c9",
        index: 7,
        medecin: "75765",
        patient: "Boone Gates"
    },
    {
        code: "5b9cbd6",
        index: 8,
        medecin: "Schultz Hoffman",
        patient: "Augusta Richard"
    },
    {
        code: "5b9cbd6ce8",
        index: 9,
        medecin: "156465",
        patient: "Green Larson"
    },
    {
        code: "5b9cbd6cb",
        index: 10,
        medecin: "Calderon Sosa",
        patient: "Jan Woodard"
    },
    {
        code: "5b9cbd6c",
        index: 11,
        medecin: "456197",
        patient: "Richard Head"
    },
    {
        code: "5b9cbd6c7",
        index: 12,
        medecin: "36434355",
        patient: "Nichole Bradshaw"
    },
    {
        code: "5b9cbd6c85",
        index: 13,
        medecin: "789465",
        patient: "Simpson Vazquez"
    },
    {
        code: "5b9cbd6",
        index: 14,
        medecin: "156465",
        patient: "Iris Good"
    },
    {
        code: "5b9cbd6c7c",
        index: 15,
        medecin: "13453",
        patient: "Janet Bruce"
    },
    {
        code: "5b9cbd6c9",
        index: 16,
        medecin: "4643534",
        patient: "Liza Ellis"
    },
    {
        code: "5b9cbd6c8",
        index: 17,
        medecin: "36434355",
        patient: "Robbins Morton"
    },
    {
        code: "5b9cbd6c61a",
        index: 18,
        medecin: "87465",
        patient: "Cook Bolton"
    },
    {
        code: "796864645",
        index: 19,
        medecin: "456197",
        patient: "Cameron Brooks"
    }
]

openFile = (idFile) => {
	currentId = idFile;
	document.querySelector('.home').style.left = "-390px";
	document.querySelector('#pnumero').innerHTML = "Code du patient : " + idFile;
	document.querySelector('#pnom').innerHTML = "Nom du patient : " + idFile;
	document.querySelector('.diagnosis').style.display = 'block';
}


loadFiles = (fil) => {
	document.querySelector('.file_list').innerHTML = "";


	fil.forEach((el) => {
		var fileobject = document.createElement('div');
		var filecode = document.createElement('div');
		var filename = document.createElement('div');
		var sharcontainer = document.createElement('div');
		sharcontainer.className = "sharebtn";
		var icon_share = document.createElement('span');
		icon_share.className = "icon icon-share"
		sharcontainer.appendChild(icon_share); 
		var imgcontainer = document.createElement('div');
		imgcontainer.setAttribute("class", "img");
		var img = document.createElement('img');
		img.setAttribute("src", "folder.svg");
		imgcontainer.addEventListener('click', () => {
			openFile(el.number);
		});
		fileobject.className = "file";
		filecode.className = "code";
		filename.className = "pname"
		filecode.innerHTML = el.code;
		filename.innerHTML = el.patient;
		fileobject.appendChild(sharcontainer);;
		imgcontainer.appendChild(img);
		fileobject.appendChild(imgcontainer);
		fileobject.appendChild(filecode);
		fileobject.appendChild(filename);	
			
		document.querySelector('.file_list').appendChild(fileobject);
	});

	var select = document.querySelectorAll(".sharebtn"); 
	select.forEach((element) => {
		element.onclick = (e) => {
			var target = e.currentTarget;
			console.log(target.parentElement.querySelector('.code').innerHTML);
			document.querySelector(".background_hover").style.display = "block";
			document.querySelector(".dialog_box").style.display = "block";
		}
	}) 


	document.querySelector(".background_hover").onclick = () => {
		document.querySelector(".background_hover").style.display = "none";
			document.querySelector(".dialog_box").style.display = "none";
	}
} 

document.querySelector('.sb-search-submit').onclick = (e) => {
	e.preventDefault();
} 
document.querySelector('.submit').onclick = () => {
	// if (medecin.pass == document.querySelector('.pass').value && medecin.nom == document.querySelector('.identifiant').value) {
		document.querySelector('.login').style.display = 'none';
		document.querySelector('.home').style.display = 'block';
		let res = files.filter((file) => { file.medecin == medecin.numero });
		console.log(res);
		loadFiles(files);
	// } else {
	// 	alert("le mot de pass ou le nom d'utilisateur saisi est incorrect");
	// }
};



;( function( window ) {
	
	function UISearch( el, options ) {	
		this.el = el;
		this.inputEl = el.querySelector( 'form > input.sb-search-input' );
		this._initEvents();
	}

	UISearch.prototype = {
		_initEvents : function() {
			var self = this,
				initSearchFn = function( ev ) {
					ev.stopPropagation();
					
					if( !classie.has( self.el, 'sb-search-open' ) ) { // open it
						ev.preventDefault();
						self.open();
					}
					else if( classie.has( self.el, 'sb-search-open' ) && /^\s*$/.test( self.inputEl.value ) ) { // close it
						self.close();
					}
				}

			this.el.addEventListener( 'click', initSearchFn );
			this.inputEl.addEventListener( 'click', function( ev ) { ev.stopPropagation(); });
		},
		open : function() {
			var self = this;
			classie.add( this.el, 'sb-search-open' );
			// close the search input if body is clicked
			var bodyFn = function( ev ) {
				self.close();
				this.removeEventListener( 'click', bodyFn );
			};
			document.addEventListener( 'click', bodyFn );
		},
		close : function() {
			classie.remove( this.el, 'sb-search-open' );
		}
	}

	// add to global namespace
	window.UISearch = UISearch;

} )( window );



goHome = () => {
	currentId = 0;
	document.querySelector('.home').style.left = "0px";
	document.querySelector('.diagnosis').style.display = 'none';
}


document.querySelector('.sb-search-input').onkeyup = (e) => {
	var value = document.querySelector('.sb-search-input').value;
	var filtered = files.filter((file) => file.patient.toLowerCase().search("" + value.toLowerCase() + "") != -1 || file.code.search("" + value + "") != -1 );
	loadFiles(filtered);
}

