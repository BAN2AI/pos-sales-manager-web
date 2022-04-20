// let pdfjs = require('pdfjs');



// var QRCode = require('qrcode')
// // var FormData = require('form-data');
// const uniqid = require('uniqid');
// const ipcRenderer = require("electron").ipcRenderer;
// var mysql = require('mysql2');
// // var dt      = require( 'datatables.net' )( window, $ );
// const QrScanner = require("jsqr");
// // const Datauri = require('datauri');
// // const datauri = new Datauri();
// var fs = require('fs');

var options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
};
const url = "http://localhost:3000/"
var date = new Date().toLocaleDateString('fr-FR', options);
var houre = new Date();
var minutes = houre.getMinutes();
var hour = houre.getHours();
var datehoure = date + "," + hour + ' : ' + minutes;
// var sha1 = require('js-sha1');


user = JSON.parse(localStorage.getItem("user"));


products = [];
words = [];
clients = [];
products_to_sell = [];
console.log("something is happening");
console.log(user);
let totale = 0;
let users = [];
let productt = {};
let sales = [];
let othersales = [];
function sendCommandToWorker(content) {
    ipcRenderer.send("printPDF", content);
}
$("#username").html(user.username);
if (user.level != 3) {
    $("#usermanagement-link").remove();
    $("#clientmanagement-link").remove();
    $("#productmanagement-link").remove();
    $("#reportmanagement-link").remove();
}

// get resumes

$.get(url + 'products', () => {
    console.log("data");
}).done(data => {
    console.log(data)
    products = data.data;
    badge = `<span class="badge bg-danger">Minimum</span>`;
    products.forEach((el) => {
        words.push(`${el.name}( ${el.prix_vente} CDF )`)

        $('#products-list-images .row').append(`
        <div class="col-md-6 small">
        <article class="recipe">
           <div class="pizza-box">
               <img src="${el.image}"  width="1500" height="1368" alt="">
           </div>
           <div class="recipe-content">
               <p class="recipe-tags">
               
   
               <h1 class="recipe-title"><a href="#">${el.label}</a></h1>
   
               <p class="recipe-metadata">
                   <h3 class="recipe-rating">${el.prixachat} CDF</h3>
                   
               </p>
   
               <button class="recipe-save" type="button">
                   <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="#000000"><path d="M 6.0097656 2 C 4.9143111 2 4.0097656 2.9025988 4.0097656 3.9980469 L 4 22 L 12 19 L 20 22 L 20 20.556641 L 20 4 C 20 2.9069372 19.093063 2 18 2 L 6.0097656 2 z M 6.0097656 4 L 18 4 L 18 19.113281 L 12 16.863281 L 6.0019531 19.113281 L 6.0097656 4 z" fill="currentColor"/></svg>
                   Ajouter
               </button>
   
           </div>
       </article>
   </div>
        
        `);
        $('#products-table tbody').append(
            `
            <tr>
            <td>${el.code}</td>
            <td><img src="${el.image}" height="50"></td>
            <td>${el.label}</td>
            <td>${el.entree}</td>
            <td>${el.quantites} ${el.quantites <= el.quantitesmin ? badge: ""}</td>
            <td>${el.prixachat}</td>
            <td>${el.unite}</td>
            <td>${el.devise}</td>
            <td>${el.Frounisseur}</td>
            <td>${el.prixgros}</td>
            <td>${el.prixdetails}</td>
            <td>${el.emplacement}</td>
            <td>${el.espace}</td>
            <td>${el.commentaire}</td>
            <td>
                <a id="removebtn" onclick="removeProduct('${el.code}')" data-toggle="modal" data-target="#removeModal" href="#" class="btn btn-danger btn-circle">
                    <i class="fas fa-trash"></i>
                </a>
                <a id="editbtn" onclick="editProduct('${el.code}')" href="#" data-toggle="modal" data-target="#editModal" class="btn btn-primary btn-circle">
                    <i class="fas fa-pen"></i>
                </a>
            </td>
            </tr>
            `
        )


    });

    removeProduct = (code) => {
       let pr = products.filter(el => el.code == code);
       product = pr[0];
       console.log(product);
       $("#removeModal #products-name").html(product.label);
    }
    
    editProduct = (code) => {
        let pr = products.filter(el => el.code == code);
        console.log(pr);
        $("#editModal #name").val(pr[0].label);

    $("#editModal #emplacement").val(pr[0].emplacement)
    $("#editModal #fournisseur").val(pr[0].Frounisseur)
    $("#editModal #unite").val(pr[0].unite)
    $("#editModal #entree").val(pr[0].entree)
    $("#editModal #taux").val(pr[0].taux)
    $("#editModal #dimension").val(pr[0].dimension)
   $("#editModal #prixachat").val(pr[0].prixachat)
   $("#editModal #prixgros").val(pr[0].prixgros)
   $("#editModal #prixdetails").val(pr[0].prixdetails)
   $("#editModal #quantites").val(pr[0].quantites)
   $("#editModal #quantitesmin").val(pr[0].quantitesmin)
   $("#editModal #commentaire").val(pr[0].commentaire)
        product = pr[0];
    }
    confirmEditProduct =() => {
        var file = $('#editModal #img')[0].files[0] != undefined ? $('#editModal #img')[0].files[0].path : "https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg";
        fetch(url + "editproduct/" + product.code, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
    // client.nom = $("#addModal #client").val();
    code: product.code,
    // productt.adresse = $("#adresse").val();
    label:  $("#editModal #name").val(),
    emplacement: $("#editModal #emplacement").val(),
    state: 0,
    image: file,
    devise: "CDF",
    unite: $("#editModal #unite").val(),
    entree:  new Date(),
    sortie: new Date(),
    taux: $("#editModal #taux").val(),
    Frounisseur: $("#editModal #fournisseur").val(),
    espace: $("#editModal #dimension").val(),
   prixachat: $("#editModal #prixachat").val(),
    prixgros: $("#editModal #prixgros").val(),
    prixdetails: $("#editModal #prixdetails").val(),
    quantites: $("#editModal #quantites").val(),
    quantitesmin: $("#editModal #quantitesmin").val(),
   commentaire: $("#editModal #commentaire").val()
            }),
    
        }).then(function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              if (data.code == 200) {

                alert("Produits modifier")
                window.location.reload();
              } else {
                  alert("Un probleme est survenu")
              }
            });
          });
    }
    confirmRemoveProduct = () => {
        fetch(url + "removeproduct/" + product.code, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
    
        }).then(function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
                alert("Un probleme est survenu sur le serveur");
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              if (data.code == 200) {

                alert("Produit supprimer avec success!");
                window.location.reload();
              } else {
                  alert("Un probleme est survenu");
              }
            });
          });
    }

    $("#productdataTable").dataTable({
    
        "paging":   true,
        "searching": true
    });
    $('#products-num').text(products.length);

    // loadFiles(products);
    // loadProducts(products);
});


// get products



// get clients
$.get(url + 'clients', () => {
    console.log("data");
}).done(data => {
    console.log(data)
    clients = data.data;
    clients.forEach((el, index) => {
       $("#clients-table tbody").append(`
       <tr>
       <td>${index}</td>
       <td>${el.nom}</td>
            <td>${el.date}</td>
            
            <td>
                
            <a id="editbtn" onclick="showClientsBuys('${el.nom}')" href="#" data-toggle="modal" data-target="#editModal" class="btn btn-primary btn-circle">
            <i class="fas fa-eye"></i>
        </a>
            </td>
            </tr>`)
    });
    $("#clientsdataTable").dataTable({
    
        "paging":   true,
        "searching": true
    });

    $('#clients-num').text(clients.length);
    showClientsBuys = (nom) => {
        $("#users-sales-table tbody").html("");
        sales.forEach((el, index) => {
            if (el.client == nom) {
                
                $("#users-sales-table tbody").append(`
            <tr>
            <td>${index}</td>
            <td>${el.date} </td>
            <td>${el.client} </td>
            <td>${el.products.length}</td>
            <td>${el.totale} cdf </td>
                 
            
                 </tr>`)
            }
            
         });
    }
    // loadFiles(products);
    // loadProducts(products);
});


// get sales
$.get(url + 'invoices', () => {
    console.log("data");
}).done(data => {
    console.log(data)
    sales = data.data;
    othersales = sales;
    let totale = 0;
    $('#sales-num').text(sales.length);
    let badge = `<span class="badge bg-danger" style="color: white;">Annulee</span>`;
    
    sales.forEach((el, index) => {
        console.log("state : ...................", el.state);
        totale += parseInt(el.totale);
        $("#sales-table tbody").append(`
        <tr>
        <td>${index}</td>
        <td>${el.date} ${el.state == 0 ? badge: ""}</td>
        <td>${el.client} </td>
        <td>${el.products.length}</td>
        <td>${el.totale} cdf </td>
             
        <td>         
            <a id="editbtn" onclick="showProductsList('${index}')" href="#" data-toggle="modal" data-target="#editModal" class="btn btn-primary btn-circle">
                <i class="fas fa-eye"></i>
            </a>
            ${ el.state == 0 ? "" : `<a id="editbtn" onclick="cancelFacture('${index}')" href="#"  class="btn btn-danger btn-circle">
                <i class="fas fa-times"></i>
            </a>` }
        </td>
             </tr>`);

     });
     $("#sales-amount").html("Fc " + totale)


     $("#salesdataTable").dataTable({
    
        "paging":   true,
        "searching": true
    });

     showProductsList = (index) => {
        $("#products-sales-table tbody").html("");
        sales[index].products.forEach((el, index) => {
            $("#products-sales-table tbody").append(`
            <tr>
            <td>${index}</td>
            <td>${el.label} </td>
            <td>${el.quantites}</td>
            <td>${el.prix} CDF</td>
                 </tr>`)
         });
     }


     cancelFacture = (index) => {
        if (confirm('Vous voulez annuler cette facture ?')) {
            // Save it!
            fetch(url + "cancelinvoices/" + index, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                },
        
            }).then(function(response) {
                if (response.status !== 200) {
                  console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    alert("Un probleme est survenu sur le serveur");
                  return;
                }
          
                // Examine the text in the response
                response.json().then(function(data) {
                  console.log(data);
                  if (data.code == 200) {
    
                    alert("Facture annulee avec success!");
                    window.location.reload();
                  } else {
                      alert("Un probleme est survenu");
                  }
                });
              });
        
          } else {
            // Do nothing!
            
          }



        
     }
});

// get users
$.get(url + 'users', () => {
    console.log("data");
}).done(data => {
    console.log(data)
    users = data.data;
    users.forEach((el, index) => {
        $("#users-table tbody").append(`
       <tr>
       <td>${index}</td>
       <td>${el.username}</td>
       <td>${el.password}</td>
            <td>${el.level}</td>
            
            <td>
                
                <a id="users-editbtn" onclick="SetCurUsers('${el.username}')" href="#" data-toggle="modal" data-target="#editModal" class="btn btn-primary btn-circle">
                    <i class="fas fa-pen"></i>
                </a>
                <a id="users-removebtn" onclick="SetCurUsers('${el.username}')" href="#" data-toggle="modal" data-target="#removeModal" class="btn btn-danger btn-circle">
                    <i class="fas fa-trash"></i>
                </a>
            </td>
            </tr>`)
           

    });

    SetCurUsers = (name) => {
        let pr = users.filter(el => el.username == name);
        currentuser = pr[0];
        $("#removeModal #user-name").html(currentuser.username);
        $("#editModal #username").val(currentuser.username);
         $("#editModal #password").val(currentuser.password);
         $("#editModal #level").val(currentuser.level)
    }

    $("#save-modification-user").click(() => {
        fetch(url + "editusers/" + currentuser.username, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username:  $("#editModal #username").val(),
                password: $("#editModal #password").val(),
                level: $("#editModal #level").val()
            }),
    
        }).then(function(response) {
            if (response.status !== 200) {
              console.log('Looks like there was a problem. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              if (data.code == 200) {

                alert("Utilisateurs modifier")
                window.location.reload();
              } else {
                  alert("Un probleme est survenu")
              }
            });
          });
    });

    $("#confirm-remove-user").click(() => {
        fetch(url + "removeuser/" + currentuser.username, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(function(response) {
            if (response.status !== 200) {
              console.log('Un probleme est survenu. Status Code: ' +
                response.status);
              return;
            }
      
            // Examine the text in the response
            response.json().then(function(data) {
              console.log(data);
              if (data.code == 200) {
                alert("Utilisateurs Supprimer")
                window.location.reload();
              } else {
                  alert("Un probleme est survenu")
              }
            });
          });
    });

    
    // loadFiles(products);
    // loadProducts(products);
});


// set poducts

$("#add_product").click((e) => {
    e.preventDefault();
    products.sort();
    let pdt_list_u = [];
    let pdt_list = `<option value="">Produit</option>`;
    products.forEach(el => {
        pdt_list_u.push(el.label);
    });
    pdt_list_u.sort();

    pdt_list_u.forEach(el => {
        pdt_list += `<option value="${el}">${el}</option>`;
    });
    

    products_to_sell.push({
        id: products_to_sell.length,
        name: "",
        prix: 0,
        quantites: 1,
        total: 0
    });
    // showDialogBox(".dialog_box6");

    $("#selling-form table tbody").append(
        `
        <tr>
					<td>${products_to_sell.length}</td>
					<td>
                    <label class="form-group">
	<select id="product_name_${products_to_sell.length}" onchange="setTotale(${products_to_sell.length})"  value="" class="product_name_select form-control form-control-user" type="text" required>
		${pdt_list
        }
	</select>
</label>
				
				</td>
                <td>
                <label class="form-group">
                <select id="product_price_type_${products_to_sell.length}" onchange="setTotale(${products_to_sell.length})"  value="" class="form-control form-control-user" type="text" required>
                <option value="details">Prix details</option>
                <option value="gros">Prix gros</option>
                </select>
            </label>
                </td>
					<td>
						<label class="form-group">
							<input id="product_number_${products_to_sell.length}" class="form-control form-control-user" onchange="setTotale(${products_to_sell.length})" value="1" type="number" required>
							<span class="field__label-wrap">
								<span class="field__label">Quantites</span>
							</span>
						</label>

					</td>
					<td id="total_product_${products_to_sell.length}">
                   
					</td>
					<td class="delete-id" id="${products_to_sell.length}">
                    <i class="fas fa-trash"></i>
                    </td>
					
				</tr>
        `
    )
    $(`#product_name_${products_to_sell.length}`).select2();
    setTotale = (value) => {
        totale = 0;
        let name = $(`#product_name_${value}`)[0].value;
        let pr = products.filter(el => el.label == name)[0];
        console.log(pr);
        pr.quantites = $(`#product_number_${value}`).val();

        let prix = pr.prixdetails;
        if ($(`#product_price_type_${value}`).val() == "gros") {
            prix = pr.prixgros; 
        } 
        pr.prix = prix;
        products_to_sell[value - 1] = pr;
        // calculer le totale
        $(`#total_product_${value}`).html(prix);
        
        products_to_sell.forEach(el => {
            console.log(el.quantites, el.prix);
            totale += parseInt(el.quantites) * parseInt(el.prix);
        });

        $(`#total-vente`).html(totale);
    }


    $(".delete-id").click((e) => {
        let target = $(`#product_name_${$(e.currentTarget).attr("id")}`)[0]; ;
     
        $(e.currentTarget).parent().remove();
        let index = parseInt($(e.currentTarget).attr("id")) -1;

        products_to_sell.splice(index, 1);

        console.log("products to sell : ", products_to_sell);
        
     
            let totale = 0;

            products_to_sell.forEach(el => {
                totale += parseInt(el.quantites) * parseInt(el.prix);
            });

            $(`#total-vente`).html(totale);
        
        
    });

    

});

saveInvoice = () => {
    
}

$('#printfacturebtn').click((e) => {
    e.preventDefault();
// save inoices
let fd = {};
    fd["totale"] = totale;
    fd["state"] = 1;
    fd["date"] = new Date();

    fd["products"] = products_to_sell;
    fd["client"] = $("#client").val();

    fetch(url + "addinvoices", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(fd),

    }).then(function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          if (data.code == 200) {
              
              $("#selling-form table tbody").html("");

                alert("Enregistrer avec succee");
                var prtContent = $("#printarea_facture");
    var html=`<html> 

    <body style="text-align: center"> 
    <h1> <strong>EL-ROHI</strong></h1>
    <h1> <strong>ALIMENTATION ET DIVERS </strong></h1>
    <h2> Adresse: N. 1788, ROUTE LIKASI, C/KAMPEMBA </h2>
    <h3> Nom du client : ${$("#client").val()}</h3>

    <hr>
    <table>
    <thead>
    <th>Label</th>
    <th>Quantites</th>
    <th>Prix</th>
    </thead>
    <tbody>
    `;
    products_to_sell.forEach(el => {
        html += `<tr>
            <td>${el.label}</td>
            <td>${el.quantites}</td>
            <td>${el.prix}</td>
        </tr>`
    });

    products_to_sell = [];

   html+=`
   </tbody>
   </table>
   <hr>
   <table>
    <tr>
     <td>Total(Fc)<td>
     <td>:</td>
     <td>${totale}  CDF</td>
     </tr>
     <tr>
     <td>TVA(16%)<td>
     <td>:</td>
     <td>${totale * 16 / 100}  CDF</td>
     </tr>
     <tr>
     <td>Montant a payer<td>
     <td>:</td>
     <td>${ totale + (totale * 16 / 100)}  CDF</td>
     </tr>
   </table>
   </body>
   
   </html>`;

   var printWin = window.open('','','left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
   printWin.document.write(html);
   printWin.document.close();
   printWin.focus();
   printWin.print();
//    printWin.close();
          }
        });
      });

    // $.post(url + "addinvoices", fd).done(function (data) {
    //     console.log("its works");
    //     if (data.code == 200) {
    //         invoices.push({
    //             totale: totale,
    //             date: new Date(),
    //             products: products_to_sell,
    //             client: client
    //         })
    //         alert("enregistrer avec succees")
    //     }
    //     else {
    //         console.log('file not uploaded');
    //     }
    // });
    
    

        // document.getElementById('image_for_crop').appendChild(image);
        // sendCommandToWorker(html);
   
});



var barcode = "";
$(document).keydown((e) => {
    var code = (e.keyCode ? e.keyCode : e.wihch);
    if (code == 13) {
        // alert(barcode);
        addProducts(barcode);
        barcode = "";



    } else if (code == 9) {
        // alert(barcode);
        addProducts(barcode);
        barcode == "";



    } else {
        barcode += String.fromCharCode(code);
    }
});


// $("#exportpdfbtn").click(() => {
//     console.log("export pdf");
//     $("#productdataTable").tableHTMLExport({
//         type: 'pdf',
//         orientation: 'p'
//     });
// });

// $("#exportcsvbtn").click(() => {
//     console.log("export csv");
//     $("#productdataTable").tableHTMLExport({
//         type: 'csv',

//         // default file name
//         filename: 'productsexport.csv',

//         // for csv
//         separator: ',',
//         newline: '\r\n',
//         trimContent: true,
//         quoteFields: true,

//         // CSS selector(s)
//         ignoreColumns: '',
//         ignoreRows: '',

//         // your html table has html content?
//         htmlContent: false,

//         // debug
//         consoleLog: false,
//     });
// });

function exportData($table, filename){
    /* Get the HTML data using Element by Id */
    var table = document.getElementById($table);
    // var table =table_html[0];
    console.log(table);
    /* Declaring array variable */
    var rows =[];
 
      //iterate through rows of table
    for(var i=0,row; row = table.rows[i];i++){
        //rows would be accessed using the "row" variable assigned in the for loop
        //Get each cell value/column from the row
        // column1 = row.cells[0].innerText;
        // column2 = row.cells[1].innerText;
        // column3 = row.cells[2].innerText;
        // column4 = row.cells[3].innerText;
        // column5 = row.cells[4].innerText;
        var row_cells = [];
        console.log(row.cells);
        for (let indexed = 0; indexed < row.cells.length; indexed++) {
           
            row_cells.push(row.cells[indexed].innerText);
            
        }

 
    /* add a new records in the array */
        rows.push(
            // [
            //     column1,
            //     column2,
            //     column3,
            //     column4,
            //     column5
            // ]
            row_cells
        );
 
        }
        csvContent = "data:text/csv;charset=utf-8,";
         /* add the column delimiter as comma(,) and each row splitted by new line character (\n) */
        rows.forEach(function(rowArray){
            row = rowArray.join(",");
            csvContent += row + "\r\n";
        });
 
        /* create a hidden <a> DOM node and set its download attribute */
        var encodedUri = encodeURI(csvContent);
        console.log(csvContent);
        var link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", filename);
        document.body.appendChild(link);
         /* download the data file named "Stock_Price_Report.csv" */
        link.click();
}


function exportTableToCSV($table, filename) {

    var $rows = $table.find('tr:has(td),tr:has(th)'),

        // Temporary delimiter characters unlikely to be typed by keyboard
        // This is to avoid accidentally splitting the actual contents
        tmpColDelim = String.fromCharCode(11), // vertical tab character
        tmpRowDelim = String.fromCharCode(0), // null character

        // actual delimiter characters for CSV format
        colDelim = '","',
        rowDelim = '"\r\n"',

        // Grab text from table into CSV formatted string
        csv = '"' + $rows.map(function (i, row) {
            var $row = $(row), $cols = $row.find('td,th');

            return $cols.map(function (j, col) {
                var $col = $(col), text = $col.text();

                return text.replace(/"/g, '""'); // escape double quotes

            }).get().join(tmpColDelim);

        }).get().join(tmpRowDelim)
            .split(tmpRowDelim).join(rowDelim)
            .split(tmpColDelim).join(colDelim) + '"',



        // Data URI
        csvData = 'data:application/csv;charset=utf-8,' + encodeURIComponent(csv);

        console.log(csv);

        if (window.navigator.msSaveBlob) { // IE 10+
            //alert('IE' + csv);
            window.navigator.msSaveOrOpenBlob(new Blob([csv], {type: "text/plain;charset=utf-8;"}), "csvname.csv")
        } 
        else {
            $(this).attr({ 'download': filename, 'href': csvData, 'target': '_blank' }); 
        }
}

// This must be a hyperlink
$("#exportcsvbtn").click(function (event) {
    
    exportData('productdataTable', 'exportproduit.csv');

});

$("#client-exportcsvbtn").click(function (event) {
    
    exportData('clientsdataTable', 'exportclient.csv');

});

$("#rapports-exportcsvbtn").click(function (event) {
    exportData('salesdataTable', 'exportrapport.csv');

});

$("#exportpdfbtn").click(function (event) {
    event.preventDefault();
    var prtContent = $("#products-table").html();
//    html+=`</tbody></table><hr> <h3> ${totale}  CDF</h3></body></html>`;
   var printWin = window.open('','','left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
   printWin.document.write(`<html><head><link href="dasboard/css/sb-admin-2.css" rel="stylesheet"></head><body>`);
   printWin.document.write(prtContent);
   printWin.document.close();
   printWin.focus();
   printWin.print();
});

$("#rapports-exportpdfbtn").click(function (event) {
    event.preventDefault();
    var prtContent = $("#sales-table").html();

//    html+=`</tbody></table><hr> <h3> ${totale}  CDF</h3></body></html>`;

   var printWin = window.open('','','left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
   printWin.document.write(`<html><head><link href="dasboard/css/sb-admin-2.css" rel="stylesheet"></head><body>`);
   printWin.document.write(prtContent);
   printWin.document.close();
   printWin.focus();
   printWin.print();

});

$("#client-exportpdfbtn").click(function (event) {
    event.preventDefault();
    var prtContent = $("#clients-table").html();

//    html+=`</tbody></table><hr> <h3> ${totale}  CDF</h3></body></html>`;

   var printWin = window.open('','','left=0,top=0,width=1,height=1,toolbar=0,scrollbars=0,status  =0');
   printWin.document.write(prtContent);
   printWin.document.close();
   printWin.focus();
   printWin.print();

});


saveProducts = () => {
    // client.nom = $("#nom").val();

    productt.name = $("#name").val();
    
    let fd = {};
    var file = $('#addModal #img')[0].files[0] != undefined ? $('#addModal #img')[0].files[0].path : "https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg";
    // client.nom = $("#addModal #client").val();
    fd["code"] = uniqid(new Date().getMilliseconds());
    // productt.adresse = $("#adresse").val();
    fd["label"] = $("#addModal #name").val();
    fd["emplacement"] = $("#addModal #emplacement").val();
    fd["state"] = 0;
    fd["image"] = file;
    fd["unite"] = $("#addModal #unite").val();
    fd["entree"] = new Date();
    fd["sortie"] = new Date();
    fd["devise"] = "CDF";
    fd["Frounisseur"] = $("#addModal #fournisseur").val();
    fd["espace"] = $("#addModal #dimension").val();
    fd["prixachat"] = $("#addModal #prixachat").val();
    fd["prixgros"] = $("#addModal #prixgros").val();
    fd["prixdetails"] = $("#addModal #prixdetails").val();
    fd["quantites"] = $("#addModal #quantites").val();
    fd["quantitesmin"] = $("#addModal #quantitesmin").val();
    fd["commentaire"] = $("#addModal #commentaire").val();
 
    $.post(url + "addproduct", fd).done(function (data) {
        if (data.code == 200) {
    //         products.push(
    //             {
    // Frounisseur: product.owner,
    // state: 0,
    // unite: product.unite,
    // label: product.name,
    // image: 'https://s-media-cache-ak0.pinimg.com/736x/49/80/6f/49806f3f1c7483093855ebca1b8ae2c4.jpg',
    // entree: new Date(), total: 134,
    // prixachat: $("#prixachat").val(),
    // prixgros: $("#prixgros").val(),
    // prixdetails: $("#prixdetails").val(),
    // prix: $("#prixdetails").val(),
    // Taux: $("#taux").val(),
    // devise: $("#devise").val(),
    // quantitesmin: $("#quantitesmin").val(),
    // devise: product.devise,
    // quantites: productt.quantite,
    // label: product.code,                   
    // image: fd.file,
    // entree: product.entree,
    // sortie: '',
    // emplacement: product.emplacement,
    // espace: product.dimension, commentaire: product.commentaire
    //             }
    //         );
    window.location.reload();
        }
        else {
            alert("Probleme d'enregistrement")
            console.log('file not uploaded');
        }
    });
    
}

saveUser = () => {
    
    fetch(url + "adduser", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: $("#username-rg").val(),
            password: $("#password").val(),
            level: $("#level").val()
        }),

    }).then(function(response) {
        if (response.status !== 200) {
          console.log('Looks like there was a problem. Status Code: ' +
            response.status);
          return;
        }
  
        // Examine the text in the response
        response.json().then(function(data) {
          console.log(data);
          if (data.code == 200) {
            alert("Utilisateurs enregistrer")
            window.location.reload();
          } else {
              alert("Un probleme est survenu")
          }
        });
      });


}


filterstartDate = () => {
    var d1 = new Date($('#date-debut').val());
  
    othersales = sales.filter (e => new Date(e.date).getTime() >=  new Date(d1).getTime());
    // sales.filter (e => new Date(e.date).getTime() <=  new Date(d1).getTime())
    $("#sales-table tbody").html("");
        othersales.forEach((el, index) => {
            $("#sales-table tbody").append(`
            <tr>
            <td>${index}</td>
            <td>${el.date} </td>
            <td>${el.products.length}</td>
            <td>${el.client} </td>
            <td>${el.totale} cdf </td>
                 
            <td>         
                <a id="editbtn" onclick="showProductsList('${index}')" href="#" data-toggle="modal" data-target="#editModal" class="btn btn-primary btn-circle">
                    <i class="fas fa-eye"></i>
                </a>
            </td>
                 </tr>`)
         });
  
}

filterendDate= () => {

    var d1 = new Date($('#date-fin').val());
// var d2 = new Date($('#date-fin').val());

othersales = othersales.filter (e => new Date(e.date).getTime() <=  new Date(d1).getTime());
if (!Date.parse($('#date-fin').val())) {
    filterstartDate()
}
$("#sales-table tbody").html("");
    othersales.forEach((el, index) => {
        $("#sales-table tbody").append(`
        <tr>
        <td>${index}</td>
        <td>${el.date} </td>
        <td>${el.products.length}</td>
        <td>${el.client} </td>
        <td>${el.totale} cdf </td>
             
        <td>         
            <a id="editbtn" onclick="showProductsList('${index}')" href="#" data-toggle="modal" data-target="#editModal" class="btn btn-primary btn-circle">
                <i class="fas fa-eye"></i>
            </a>
        </td>
             </tr>`)
     });
     othersales = sales;


}