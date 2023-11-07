var boja;
var json='Yes';
let button = document.getElementById("button");

firebase.database().ref("Brojac").once('value', function (snapshot) {
  snapshot.forEach(function (childSnapshot) {
    var childKey = childSnapshot.key;
    var childData = childSnapshot.val();
    task_array.push(Object.values(childData));
  });

  task_brojac = task_array[task_array.length - 1][0];
  document.getElementById("broj").value = "Broj Porudzbine: " + task_brojac;

});

button.addEventListener("click", function () {

  let broj = document.getElementById("broj").value;

  let ime = document.getElementById("ime").value;

  let brojtelefona = document.getElementById("brojtelefona").value;

  let naselje = document.getElementById("naselje").value;

  let adresa = document.getElementById("ulica").value;

  let sprat = document.getElementById("sprat").value;

  let stan = document.getElementById("stan").value;



  let napomena = document.getElementById("napomena").value;

  let vreme = document.getElementById("vreme").value;

  let korisnik = "PFRW";
  var d = new Date();
  var dan = (d.getDate() < 10 ? '0' : '')
    + d.getDate();
  var mesec = ((d.getMonth() + 1) < 10 ? '0' : '')
    + (d.getMonth() + 1);
  console.log(mesec, dan);
  var godina = d.getFullYear();
  var sati = d.getHours();
  if (sati < 10) {
    sati = '0' + sati;
  }
  var minuti = d.getMinutes();
  var sekunde = d.getSeconds();
  let vremeporudzbine = godina + '-' + mesec + '-' + dan + ' ' + sati + ":" + minuti + ":" + sekunde;
  task_array = [];
  firebase.database().ref("Brojac").once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      task_array.push(Object.values(childData));
    });

    task_brojac = task_array[task_array.length - 1][0];
    let broj = document.getElementById("broj").value;
    broj = task_brojac;
  });

  if (brojtelefona == "" || ulica == "") {
    alert("Please enter the fields");

  }
  else {
    var key = firebase.database().ref().child("Porudzbina").push().key;
    var data = {
      adresa: "Ulica: " + adresa,
      broj: broj,
      ime: "Ime ili prezime:" + ime,
      brojtelefona: "Broj telefona: " + brojtelefona,
      naselje: "Naselje: " + naselje,
      sprat: "Sprat:" + sprat,
      stan: "Stan:" + stan,
      interfon: "Interfon:",
      napomena: "Napomena:" + napomena,
      vreme: "Vreme potrebno da porudzbina stigne: " + vreme,
      korisnik: "Korisnik:" + korisnik,
      vremeporudzbine: "Vreme narucivanja: " + vremeporudzbine,
      zona: '',
      key: key
    };

    var updates = {};
    updates["/Porudzbina/" + key] = data;
    firebase.database().ref().update(updates);

    create_unfinished_task();


    document.getElementById("broj").value = "Broj Porudzbine: " + task_brojac;
    document.getElementById("ime").value = "";
    document.getElementById("brojtelefona").value = "";
    document.getElementById("naselje").value = "";
    document.getElementById("ulica").value = "";
    document.getElementById("sprat").value = "";
    document.getElementById("stan").value = "";

    document.getElementById("napomena").value = "";
    document.getElementById("vreme").value = "";

    var data1 =
    {
      key: key,
      broj: task_brojac + 1,
    };
    var updates1 = {};
    updates1["/Brojac/" + key] = data1;
    firebase.database().ref().update(updates1);

  }
})


function create_unfinished_task() {
  unfinished_task_container = document.getElementsByClassName("container1")[0];
  unfinished_task_container.innerHTML = "";

  task_array = [];
  firebase.database().ref("Porudzbina").once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      task_array.push(Object.values(childData));

    });

    for (var i, i = task_array.length - 1; i >= 0; i--) {
      task_ulica = task_array[i][0];
      task_broj = task_array[i][1];
      task_brojtelefon = task_array[i][2];
      task_ime = task_array[i][3];
      task_interfon = task_array[i][4];
      task_key = task_array[i][5];
      task_korisnik = task_array[i][6];
      task_napomena = task_array[i][7];
      task_naselje = task_array[i][8];
      task_sprat = task_array[i][9];
      task_stan = task_array[i][10];
      task_vreme = task_array[i][11];
      task_vremeporudzbine = task_array[i][12];
      task_zona = task_array[i][13];

      var broj1 = task_broj.slice(16);

      var broj2 = task_vremeporudzbine.slice(30, 41);
      if (task_korisnik == "Korisnik:PFRW") {

        task_container = document.createElement("div");
        task_container.setAttribute("class", "task_container");
        task_container.setAttribute("data-key", task_key);

        pocetnovreme = task_vremeporudzbine.slice(30, 41);

        sat = task_vremeporudzbine.slice(30, 32);
        minuti = task_vremeporudzbine.slice(33, 35);
        sekunde = task_vremeporudzbine.slice(36, 40);

        var vreme = task_vreme.match(/(\d+)/);
        var potrebnovreme;
        var sat1;
        var minutinovo;
        if (vreme != null) {

          potrebnovreme = vreme[0];

          minutinovo = parseInt(minuti);
          minutinovo1 = parseInt(potrebnovreme)
          minutinovo = minutinovo + minutinovo1;
          koliko = 0;
          while (minutinovo >= 60) {

            minutinovo = minutinovo - 60;
            koliko += 1;
          }
          sat1 = parseInt(sat);
          sat1 = sat1 + koliko;

        }

        vremedastigne = sat1 + ':' + minutinovo + ':' + sekunde;
        var minutinovo2 = minutinovo + 35;
        var koliko2 = 0;
        while (minutinovo2 >= 60) {

          minutinovo2 = minutinovo2 - 60;
          koliko2 += 1;
        }

        sat2 = sat1 + koliko2;
        var vremenajkasnije1 = sat2 + ':' + minutinovo2 + ':' + sekunde;

        task_data = document.createElement('div');
        task_data.setAttribute('id', 'task_data');

        container = document.createElement('div');
        container.setAttribute('class', 'containter');

        row = document.createElement('div');
        row.setAttribute('class', 'row');

        row1 = document.createElement('div');
        row1.setAttribute('class', 'row');

        row2 = document.createElement('div');
        row2.setAttribute('class', 'row');

        col2 = document.createElement('div');
        col2.setAttribute('class', 'col-1');

        col22 = document.createElement('div');
        col22.setAttribute('class', 'col-3');

        col8 = document.createElement('div');
        col8.setAttribute('class', 'col-8');

        col41 = document.createElement('div');
        col41.setAttribute('class', 'col-4');

        col42 = document.createElement('div');
        col42.setAttribute('class', 'col-4');

        col43 = document.createElement('div');
        col43.setAttribute('class', 'col-4');

        //times
        col44 = document.createElement('div');
        col44.setAttribute('class', 'col-3 44');

        col45 = document.createElement('div');
        col45.setAttribute('class', 'col-3 45');

        col46 = document.createElement('div');
        col46.setAttribute('class', 'col-3 46');

        col47 = document.createElement('div');
        col47.setAttribute('class', 'col-3 47')


        hr = document.createElement('hr');
        hr.setAttribute('style', 'color:white');

        status1 = document.createElement('p');
        status1.innerHTML = 'Status: ';

        ime = document.createElement('p');
        ime.setAttribute('id', 'task_ime');
        ime.setAttribute('contenteditable', false);
        ime.innerHTML = task_ime;

        broj = document.createElement('p');
        broj.setAttribute('id', 'task_broj');
        broj.setAttribute('contenteditable', false);
        broj.innerHTML = broj1;

        brojtelefona = document.createElement('p');
        brojtelefona.setAttribute('id', 'task_brojtelefon');
        brojtelefona.setAttribute('contenteditable', false);
        brojtelefona.innerHTML = task_brojtelefon;

        ulica = document.createElement('p');
        ulica.setAttribute('id', 'task_ulica');
        ulica.setAttribute('contenteditable', false);
        ulica.innerHTML = task_ulica;

        zona = document.createElement('p');
        zona.setAttribute('id', 'task_zona');
        zona.setAttribute('contenteditable', false);
        zona.innerHTML = task_zona;

        napomena = document.createElement('p');
        napomena.setAttribute('id', 'task_napomena');
        napomena.setAttribute('contenteditable', false);
        napomena.innerHTML = task_napomena;

        kvadratic = document.createElement('div');
        kvadratic.setAttribute('id', 'kvadrat');
        kvadratboja(task_ulica, kvadratic, task_broj);

        var isporuke = vremeIsporuke(task_ulica, task_broj);

        vreme = document.createElement('p');
        vreme.setAttribute('id', 'task_vreme');
        vreme.setAttribute('contenteditable', false);
        vreme.innerHTML = "Vreme <br> spremanja: <br>" + vremedastigne.bold();

        vremeporudzbine = document.createElement('p');
        vremeporudzbine.setAttribute('id', 'task_vremeporudzbine');
        vremeporudzbine.setAttribute('contenteditable', false);
        vremeporudzbine.innerHTML = "Vreme <br> narucivanja:<br> " + broj2.bold();

        vremenajkasnije = document.createElement('p');
        vremenajkasnije.setAttribute('id', 'task_vremenajkasnije');
        vremenajkasnije.setAttribute('contenteditable', false);
        vremenajkasnije.innerHTML = 'Maksimalno vreme isporuke:<br> ' + vremenajkasnije1.bold();

        vremeisporuke = document.createElement('p');
        vremeisporuke.setAttribute('id', 'task_vremenajkasnije');
        vremeisporuke.setAttribute('contenteditable', false);
        vremeisporuke.innerHTML = 'Tacno vreme isporuke:<br>' + isporuke.bold();

        task_tool = document.createElement('div');
        task_tool.setAttribute('id', 'task_tool');

        task_edit_button = document.createElement('button');
        task_edit_button.setAttribute('id', 'task_edit_button');
        task_edit_button.setAttribute('onclick', "task_edit(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this)");
        fa_edit = document.createElement('i');
        fa_edit.setAttribute('class', 'fa fa-pencil');

        task_delete_button = document.createElement('button');
        task_delete_button.setAttribute('id', 'task_delete_button');
        task_delete_button.setAttribute('onclick', "task_delete(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement)");
        fa_delete = document.createElement('i');
        fa_delete.setAttribute('class', 'fa fa-trash');


        unfinished_task_container.append(task_container);
        task_container.appendChild(hr);
        task_container.appendChild(task_data);
        task_data.append(container);

        container.appendChild(row);
        row.appendChild(col2);
        col2.append(broj);

        row.appendChild(col8);
        col8.appendChild(row1);
        row1.appendChild(col41);
        col41.append(ulica);
        row1.appendChild(col42);
        col42.append(brojtelefona);
        row1.appendChild(col43);
        col43.append(napomena);
        col8.appendChild(row2);
        row2.appendChild(col44);
        col44.append(vremeporudzbine);
        row2.appendChild(col45);
        col45.append(vreme);
        row2.appendChild(col46);
        col46.append(vremenajkasnije);
        row2.appendChild(col47);
        col47.append(vremeisporuke);

        row.appendChild(col22);
        col22.append(status1);
        col22.append(kvadratic);
        col22.append(task_tool);

        var database = firebase.database();
        var path = "PFRW";
        var dataRef = database.ref(path);

        dataRef.once('value', function(snapshot) {
          var value = snapshot.val();
          if(value=='Yes'){
            col22.append(zona);
          }
        });
        
        task_tool.append(task_edit_button);
        task_edit_button.append(fa_edit);
        task_tool.append(task_delete_button);
        task_delete_button.append(fa_delete);

      }
    }

  });
}

function checkZone(task_zona) {

  if (task_zona == '' || task_zona == null) {
    return 'no';
  }

  var path = "Podesavanja/PFRW";
  var database = firebase.database();
  var ref = firebase.database().ref(path);
  var dataRef = database.ref(path);
  dataRef.once('value', function(snapshot) {
    var value = snapshot.val();
  });
  
}

function vremeIsporuke(ulica, brojporudzbine) {
  let ima = 'Nije isporucena';
  task_array2 = [];
  firebase.database().ref("ZavrsenePorudzbine").once("value", function (snapshot1) {
    snapshot1.forEach(function (childSnapshot1) {
      var childKey1 = childSnapshot1.key;
      var childData1 = childSnapshot1.val();
      task_array2.push(Object.values(childData1));
    });
    for (var j, j = task_array2.length - 1; j >= 0; j--) {
      task_ulica2 = task_array2[j][0];
      task_broj2 = task_array2[j][1];
      task_brojtelefon2 = task_array2[j][2];

      task_ime2 = task_array2[j][3];
      task_interfon2 = task_array2[j][4];
      task_key2 = task_array2[j][5];
      task_korisnik2 = task_array2[j][6];
      task_napomena2 = task_array2[j][7];
      task_naselje2 = task_array2[j][8];
      task_sprat2 = task_array2[j][9];
      task_stan2 = task_array2[j][10];
      task_vreme2 = task_array2[j][11];
      task_vremeporudzbine2 = task_array2[j][12];
      task_isporuke2 = task_array2[j][13];
      if (ulica == task_ulica2 && task_brojtelefon2 == brojporudzbine) {
        ima = task_isporuke2;
      }
    }
  });
  return ima;
}
function kvadratboja(ulica, kvadrat, brojporudzbine) {
  var zelena;
  task_array2 = [];
  firebase.database().ref("ZavrsenePorudzbine").once("value", function (snapshot1) {
    snapshot1.forEach(function (childSnapshot1) {
      var childKey1 = childSnapshot1.key;
      var childData1 = childSnapshot1.val();
      task_array2.push(Object.values(childData1));
    });
    for (var j, j = task_array2.length - 1; j >= 0; j--) {
      task_ulica2 = task_array2[j][0];
      task_broj2 = task_array2[j][1];
      task_brojtelefon2 = task_array2[j][2];
      task_ime2 = task_array2[j][3];
      task_interfon2 = task_array2[j][4];
      task_key2 = task_array2[j][5];
      task_korisnik2 = task_array2[j][6];
      task_napomena2 = task_array2[j][7];
      task_naselje2 = task_array2[j][8];
      task_sprat2 = task_array2[j][9];
      task_stan2 = task_array2[j][10];
      task_vreme2 = task_array2[j][11];
      task_vremeporudzbine2 = task_array2[j][12];


      if (ulica == task_ulica2 && task_brojtelefon2 == brojporudzbine) {
        kvadrat.style.backgroundColor = "green";
      }
    }
  });

}

function task_edit(task, edit_button) {
  edit_button.setAttribute("id", "task_edit_button_editing");
  edit_button.setAttribute("onclick", "finish_edit(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this)");
  console.log(task);


  ulica = task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
  ulica.setAttribute("contenteditable", true);
  ulica.setAttribute("id", "task_ulica");


  brojtelefona = task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0];
  brojtelefona.setAttribute("contenteditable", true);
  brojtelefona.setAttribute("id", "ime_editing");

  napomena = task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0];
  napomena.setAttribute("contenteditable", true);
  napomena.setAttribute("id", "brojtelefona");


}
function finish_edit(task, edit_button) {
  edit_button.setAttribute("id", "task_edit_button");
  edit_button.setAttribute("onclick", "task_edit(this.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement, this)");


  ulica = task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0];
  ulica.setAttribute("contenteditable", false);
  ulica.setAttribute("id", "task_ulica");

  brojtelefona = task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0];
  brojtelefona.setAttribute("contenteditable", false);
  brojtelefona.setAttribute("id", "ime_editing");

  napomena = task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0];
  napomena.setAttribute("contenteditable", false);
  napomena.setAttribute("id", "brojtelefona");



  // change in firebase to
  var key = task.getAttribute("data-key");

  firebase.database().ref("/Porudzbina/" + key).update({
    adresa: task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[0].childNodes[0].innerHTML,
    brojtelefona: task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[1].childNodes[0].innerHTML,
    napomena: task.childNodes[1].childNodes[0].childNodes[0].childNodes[1].childNodes[0].childNodes[2].childNodes[0].innerHTML,
    key: key,
  });


}


function task_delete(task) {
  var key = task.getAttribute("data-key");
  task_to_remove = firebase.database().ref("Porudzbina/" + key);
  task_to_remove.remove();

  task.remove();
  create_unfinished_task();

}

firebase.database().ref("Brojac").on('value', function (snapshot) {

  task_array1 = [];
  firebase.database().ref("Brojac").once('value', function (snapshot) {
    snapshot.forEach(function (childSnapshot) {
      var childKey = childSnapshot.key;
      var childData = childSnapshot.val();
      task_array.push(Object.values(childData));
    });

    task_brojac = task_array[task_array.length - 1][0];
    document.getElementById("broj").value = "Broj Porudzbine:" + task_brojac;

  });

});
firebase.database().ref("Porudzbina").on('value', function (snapshot) {
  create_unfinished_task();
});
firebase.database().ref("ZavrsenePorudzbine").on('value', function (snapshot) {
  create_unfinished_task();
});
firebase.database().ref("Brojac").orderByChild("key")
  .once("value", snapshot => {
    // Check if it is a SHOP.
    if (snapshot.exists()) {

    }
    else {
      var i = 1;
      var key = firebase.database().ref().child("Brojac").push().key;
      var data = {
        broj: i,
        key: key
      };

      var updates = {};
      updates["/Brojac/" + key] = data;
      firebase.database().ref().update(updates);
    }
  });

  firebase.database().ref("PFRW").on('value', function (snapshot) {
    create_unfinished_task();
   
  });