
function count() // functie care numara si afiseaza cate taskuri mai sunt de facut (items left stanga jos)
{
    var nr = document.getElementsByClassName('task').length; // lungimea vectorului de taskuri
    var copy = nr;
    var checks = document.getElementsByClassName("checkbox-round buton"); // vectorul de casute (bifate/nebifate)

    for (let i = 0; i < nr; i++) {
        // verific daca am casuta bifata
        if (checks[i].checked == true) {
           console.log(i);
           copy--;
        }
    }
    // in functie de numar, afisez in stanga jos
    if(copy == 1)
        document.getElementsByClassName("items")[0].innerHTML = copy+" item left";
    else
        document.getElementsByClassName("items")[0].innerHTML = copy+" items left";
}

count(); // prima apelare a functiei, imediat cum e pornita pagina WEB

function remove(id) // functie care sterge un task(un div intreg), dupa id-ul dat
{
    document.getElementById(id).remove();
    count();
}

function removeAll() // functie care sterge toate taskurile bifate(corespondent butonului de clear completed)
{
    var nr = document.getElementsByClassName("task").length;
    var checkbox = document.getElementsByClassName("checkbox-round buton");

    for (let i = 0; i < nr; i++) {
        if(checkbox[i]) // verific daca task ul mai e valid
            if(checkbox[i].checked == true) {
                var id = checkbox[i].parentNode.id;
                remove(id);
                i--;
            }
    }
}

function verify() // functie care verifica daca un task are casuta bifata. daca da, ii atribuie clasa de
                // complete pentru schimbarea aspectului taskului(se face gri)
{
    var task = document.getElementsByClassName("task");
    var checkbox = document.getElementsByClassName("checkbox-round buton");
    var nr = document.getElementsByClassName('task').length;

    for (let i = 0; i < nr; i++)
        if (checkbox[i].checked == true)
            task[i].classList.add("complete");
        else
            task[i].classList.remove("complete");
}

function checkAll() // functie care se apeleaza daca sageata (stanga sus)e apasata pentru
                    // bifa/debifa toate taskurile existente
{
    var checkbox = document.getElementsByClassName("checkbox-round buton");
    var nr = checkbox.length;

    if(checkbox[0].checked == true)
        for (let i = 0; i < nr; i++) {
            checkbox[i].checked = false;
        }
    else
        for (let i = 0; i < nr; i++)
            checkbox[i].checked = true;
    
    verify();
    count();
}

var id_needed; // id care este mentionat mai jos

function lowerbuttons(id) // functie care in functie de id-ul butonului apasat(cele din footer)
                          // afiseaza sau ascunde taskurile bifate sau nebifate(in functie de caz)
{
    var button = document.getElementsByClassName("butoane");
    var checkbox = document.getElementsByClassName("checkbox-round buton");
    var nr = checkbox.length;

    if (id == "allclick") {
        for (let i = 0; i < nr; i++) {
            var new_id = "id" + (i + 1);
            document.getElementById(new_id).style.display = "";
        }
        id_needed = "allclick";
        document.getElementById(id).setAttribute("active", "");
    } else if (id == "nowclick") {
        for (let i = 0; i < nr; i++) {
            var new_id = "id" + (i + 1);
            if(checkbox[i].checked == false)
                document.getElementById(new_id).style.display = "";
            else
                document.getElementById(new_id).style.display = "none";
        }
        id_needed = "nowclick";
    } else if (id == "doneclick") {
        for (let i = 0; i < nr; i++) {
            var new_id = "id" + (i + 1);
            if(checkbox[i].checked == true)
                document.getElementById(new_id).style.display = "";
            else
                document.getElementById(new_id).style.display = "none";
        }
        id_needed = "doneclick";
    } 
}

function call() // functia care foloseste id-ul de mai sus pentru a face ca taskurile bifate(daca suntem la sectiunea now)
                // sa se ascunda si sa fie apoi afisate la sectiunea done, dar si vice versa pentru categoria done
{
    lowerbuttons(id_needed);
}

function addtask(text) // functia care adauga efectiv un task nou in lista dupa apelarea ei prin apasarea tastei enter
{
    var div = document.createElement("div");
    var nr = document.getElementsByClassName("task").length;
    var id ="id" + (nr+1);
    div.setAttribute("id", id);

    div.innerHTML = "<input type='checkbox' class='checkbox-round buton' onchange='count();verify();call()'/><p class='task'>"+text+"</p><i class='fa fa-times-circle custom' aria-hidden='true' onclick='remove(\""+id+"\")'></i>";
    document.getElementById("alltasks").appendChild(div);
    count();
}

document.getElementById("newtask").onkeydown = function(event) { // functie ajutatoare care detecteaza daca in campul
                                        // new task a fost apasat enter pentru adaugarea unui task nou
                                        // de asemenea, daca nu e niciun text in caseta, pe langa enter, nu se va introduce un task nou
	if (event.keyCode == 13) {
		text = document.getElementById("newtask").value;
		if (text != "") {
			document.getElementById("newtask").value = ""
			addtask(text);
		}
	}
}
