"use strict";
window.addEventListener("DOMContentLoaded", start);

//student object
const Student = {
  firstName: "",
  lastName: "",
  middleName: "",
  nickName: "",
  gender: "",
  profilePic: "",
  house: "",
};

//empty array for students
let allStudents = [];

//url to json data
const url = "https://petlatkea.dk/2021/hogwarts/students.json";

//let hogwartsData;

const settings = {
  filterBy: "all",
  sortBy: "name",
  sortDir: "asc",
};

function start() {
  console.log("Hej Hogwarts");
  buttonListener();
}

function buttonListener() {
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach((button) =>
    button.addEventListener("click", selectFilter)
  );
  loadJSON();
}

async function loadJSON() {
  const jsonData = await fetch(url);
  const hogwartsData = await jsonData.json();
  //show hogwarts data in a table in the console
  //console.table(hogwartsData);
  //call createStudents function
  prepareObjects(hogwartsData);
}

function prepareObjects(hogwartsData) {
  allStudents = hogwartsData.map(prepareStudents);
  buildList();
}

function prepareStudents(stud) {
  const student = Object.create(Student);

  student.firstName = getFirstName(stud.fullname.trim());
  student.middleName = getMiddleName(stud.fullname.trim());
  student.nickName = getNickname(stud.fullname.trim());
  student.lastName = getLastName(stud.fullname.trim());
  student.gender = getGender(stud.gender.trim());
  student.house = getHouse(stud.house.trim());
  student.img = getStudentImg(stud.fullname.trim());

  return student;
  //allStudents.push(student);
}

//delegator
/* function prepareStudents() {
  hogwartsData.forEach((stud) => {
    const student = Object.create(Student);
    student.firstName = getFirstName(stud.fullname.trim());
    student.middleName = getMiddleName(stud.fullname.trim());
    student.nickName = getNickname(stud.fullname.trim());
    student.lastName = getLastName(stud.fullname.trim());
    student.gender = getGender(stud.gender.trim());
    student.house = getHouse(stud.house.trim());
    student.img = getStudentImg(stud.fullname.trim());

    return student;
    //allStudents.push(student);
  });
} */

//------filter function
function selectFilter(event) {
  //filter on a criteria
  const filter = event.target.dataset.filter;
  console.log(`User selected ${filter}`);
  setFilter(filter);
}

function setFilter(filter) {
  settings.filterBy = filter;
  console.log("setfilter");
  buildList();
}

//House filter functions
//gryffindor
function isGryffindor(student) {
  if (student.house === "gryffindor") {
    return true;
  } else {
    return false;
  }
}

//slytherin
function isSlytherin(student) {
  if (student.house === "slytherin") {
    return true;
  } else {
    return false;
  }
}
//ravenclaw
function isRavenclaw(student) {
  if (student.house === "ravenclaw") {
    return true;
  } else {
    return false;
  }
}

//hufflepuff
function isHufflepuff(student) {
  if (student.house === "hufflepuff") {
    return true;
  } else {
    return false;
  }
}

function studentFilter(filteredList) {
  //get filter depending on data-filter attribute
  //filter allStudents with correct filter function  and put it into filteredAnimals
  if (settings.filterBy === "gryffindor") {
    filteredList = allStudents.filter(isGryffindor);
  } else if (settings.filterBy === "slytherin") {
    filteredList = allStudents.filter(isSlytherin);
  } else if (settings.filterBy === "ravenclaw") {
    filteredList = allStudents.filter(isRavenclaw);
  } else if (settings.filterBy === "hufflepuff") {
    filteredList = allStudents.filter(isHufflepuff);
  }
  return filteredList;
}

function getFirstName(fullname) {
  if (fullname.includes(" ")) {
    let firstName = fullname.slice(0, fullname.indexOf(" "));
    let cleanFirstName = cleanData(firstName);
    return cleanFirstName;
  } else {
    let cleanFirstName = cleanData(fullname);
    return cleanFirstName;
  }
}

function getMiddleName(fullname) {
  const firstSpace = fullname.indexOf(" ");
  const lastSpace = fullname.lastIndexOf(" ");
  const fullMiddleName = fullname.substring(firstSpace + 1, lastSpace).trim();
  if (!fullname.includes('"') && fullname.includes(" ")) {
    let middleName =
      fullMiddleName.substring(0, 1) + fullMiddleName.substring(1);
    const cleanedMiddleName = cleanData(middleName);
    return cleanedMiddleName;
  } else if (fullMiddleName === "") {
    let middleName = null;
    return middleName;
  }
}

function getNickname(fullname) {
  if (fullname.includes('"')) {
    let nickName = fullname.substring(
      fullname.indexOf('"') + 1,
      fullname.lastIndexOf('"')
    );

    let cleanNickname = cleanData(nickName);
    return cleanNickname;
  }
}

function getLastName(fullname) {
  const lastName = fullname.substring(fullname.lastIndexOf(" ") + 1);

  if (lastName.includes("-")) {
    //split lastname into an array
    const lastNameArray = lastName.split("");

    lastNameArray.forEach((element, index, array) => {
      // if the element contains a "-" or space make the letter afterwards uppercase
      if (element === "-" || element === " ") {
        array[index + 1] = array[index + 1].toUpperCase();
      }
    });
    //then join the array into a new string by concat all elements in the array
    let result = lastNameArray.join("");
    return result;
  } else if (!fullname.includes(" ")) {
    let lastName = null;
    return lastName;
  } else {
    const cleanedLastName = cleanData(lastName);
    return cleanedLastName;
  }
}
function getGender(gender) {
  const cleanGender = cleanData(gender);
  return cleanGender;
}

function getHouse(house) {
  const cleanHouse = cleanData(house);
  return cleanHouse;
}

function getStudentImg(fullname) {
  const firstName = fullname.slice(0, fullname.indexOf(" ")).toLowerCase();
  const lastName = fullname.substring(fullname.lastIndexOf(" ") + 1);

  const imgFirstNameFirstLetter = firstName.substring(0, 1);
  const smallLastName = lastName.toLowerCase();

  if (smallLastName === "patil") {
    const image = `img/${smallLastName}_${firstName}.png`;
    return image;
  } else if (smallLastName.includes("-")) {
    const smallLastNameShort = smallLastName.slice(
      smallLastName.indexOf("-") + 1
    );
    const image = `img/${smallLastNameShort}_${imgFirstNameFirstLetter}.png`;
    return image;
  } else {
    const image = `img/${smallLastName}_${imgFirstNameFirstLetter}.png`;
    return image;
  }
}

function cleanData(data) {
  //capitalize
  const capFirstLetter = data.slice(0, 1).toUpperCase();
  const lowerCaseRest = data.slice(1).toLowerCase();
  const cleanData = capFirstLetter + lowerCaseRest;
  return cleanData;
}

function buildList() {
  const currentList = studentFilter(allStudents);
  console.log(currentList);

  displayList(currentList);
}

function displayList(student) {
  // clear the list
  document.querySelector("#container").innerHTML = "";

  // build a new list
  student.forEach(displayStudent);
}

function displayStudent(student) {
  //create clone
  const clone = document
    .querySelector("template#student")
    .content.cloneNode(true);

  //set clone data
  clone.querySelector(".firstname").textContent = student.firstName;
  clone.querySelector(".lastname").textContent = student.lastName;
  clone.querySelector("img.student_img").src = student.img;
  clone.querySelector(".house").textContent = student.house;
  clone.querySelector(".gender").textContent = student.gender;

  document.querySelector("#container").appendChild(clone);
}
