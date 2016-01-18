function httpGet(theUrl) {
  var xmlHttp = new XMLHttpRequest();
  xmlHttp.open("GET", theUrl, false);
  xmlHttp.send(null);
  return xmlHttp.responseText;
}

var time = [];

function createRadio(acourse, asection, anoption, atime) {
  function lol() {
    console.log("lol");
    //alert(document.getElementById(acourse+asection).value);
  }
  var display = document.getElementById("display");
  var label = document.createElement("label");
  var element = document.createElement("input");
  time = atime;
  if (asection == "TST") {
    element.setAttribute("type", "radio"); 
    element.setAttribute("value", time);
    element.setAttribute("id", acourse+asection);
    element.setAttribute("checked", "checked");
    element.setAttribute("onclick", "lol()");
  } 
  else {
    element.setAttribute("type", "radio"); 
    element.setAttribute("value", time);
    element.setAttribute("id", acourse+asection);
    element.setAttribute("name", acourse+asection);
    element.setAttribute("onclick", "lol()");
  } 
  label.appendChild(element);
  label.innerHTML += anoption;
  display.appendChild(label);
}

 function myFunction(course) {
    var pageRequest = httpGet("https://api.uwaterloo.ca/v2/terms/1161/"+course.split(" ")[0] + "/" + course.split(" ")[1]+"/schedule.json?key=f23af34c506a470a8b500970c808fbfb");

    var num_lecs = 0;
    var num_tuts = 0;
    var num_labs = 0;
    var num_tsts = 0;
    
    var section; // e.g. LEC 001, TST 201

    if (JSON.parse(pageRequest)["meta"]["message"] == "Request successful") {
      display.innerHTML += "<br>" + course + ": ";
      for (i=0; i<JSON.parse(pageRequest)["data"].length; i++) {
        section = JSON.parse(pageRequest)["data"][i]["section"];
        time[0] = JSON.parse(pageRequest)["data"][i]["classes"][0]["date"]["weekdays"];
        time[1] = JSON.parse(pageRequest)["data"][i]["classes"][0]["date"]["start_time"];
        time[2] = JSON.parse(pageRequest)["data"][i]["classes"][0]["date"]["end_time"];
      //  alert(time);
        if (section.split(" ")[0] == "LEC") {
          createRadio(course, "LEC", section, time);
          num_lecs++;
        }
        else if (section.split(" ")[0] == "TUT") {
          createRadio(course, "TUT", section, time);
          num_tuts++;
        }
        else if (section.split(" ")[0] == "LAB") {
          createRadio(course, "LAB", section, time);
          num_labs++;
        } 
        else if (section.split(" ")[0] == "TST") {
          createRadio(course, "TST", section, time);  
          num_tsts++;
        }
      }
    }
    else {
      display.innerHTML += "<br>" + course + ": " + "Course not found";
    }   
  }


function displaySchedule() {
  displayButton.addEventListener("click", function() {
  var course1 = document.getElementById("subject1").value + " " + document.getElementById("code1").value;
  var course2 = document.getElementById("subject2").value + " " + document.getElementById("code2").value;
  var course3 = document.getElementById("subject3").value + " " + document.getElementById("code3").value;
  var course4 = document.getElementById("subject4").value + " " + document.getElementById("code4").value;
  var course5 = document.getElementById("subject5").value + " " + document.getElementById("code5").value;
  myFunction(course1);
  myFunction(course2);
  myFunction(course3);
  myFunction(course4);
  myFunction(course5);
  }
  );
}
