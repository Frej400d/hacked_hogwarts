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
  //filter buttons
  const filterButtons = document.querySelectorAll(".filter");
  filterButtons.forEach((button) =>
    button.addEventListener("click", selectFilter)
  );

  //sort buttons
  const sortButtons = document.querySelectorAll(".sort");
  sortButtons.forEach((knap) => knap.addEventListener("click", selectSort));
  loadJSON();
}

function rotateArrow() {
  console.log("arrow func");
  //const arrow = document.querySelectorAll(".arrows");

  //arrow.classList.add("rotate");

  selectSort();
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
//delegator
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

//filter
function selectFilter(event) {
  //filter on a criteria
  const filter = event.target.dataset.filter;
  console.log(`User selected ${filter}`);
  document.querySelector(".chosen").classList.remove("chosen");
  this.classList.add("chosen");
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
  if (student.house === "Gryffindor") {
    return true;
  } else {
    return false;
  }
}

//slytherin
function isSlytherin(student) {
  if (student.house === "Slytherin") {
    return true;
  } else {
    return false;
  }
}
//ravenclaw
function isRavenclaw(student) {
  if (student.house === "Ravenclaw") {
    return true;
  } else {
    return false;
  }
}

//hufflepuff
function isHufflepuff(student) {
  if (student.house === "Hufflepuff") {
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

function selectSort(event) {
  console.log("click");
  /*   document.querySelector(".arrows").classList.remove("rotate");
  document.querySelector(".arrows").classList.add("rotate"); */
  const sortBy = event.target.dataset.sort;
  const sortDir = event.target.dataset.sortDirection;

  //toggle the direction
  if (sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc";
  }

  setSort(sortBy, sortDir);
}

function setSort(sortBy, sortDir) {
  settings.sortBy = sortBy;
  settings.sortDir = sortDir;
  buildList();
}

function sortedStudents(sortedList) {
  /*   const arrows = document.querySelectorAll(".arrow"); */

  let direction = 1;
  if (settings.sortDir === "desc") {
    direction = -1;
  } else {
    settings.direction = 1;
  }

  /*   if (settings.sortDir === "desc") {
    arrows.textContent = "⭐";
  } else if (settings.sortDir === "asc") {
    arrows.textContent = "☆";
  }
 */
  sortedList = sortedList.sort(sortByProperty);

  function sortByProperty(a, b) {
    if (a[settings.sortBy] < b[settings.sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }

  return sortedList;
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
  } else if (smallLastName === "leanne") {
    const image = `img/default.png`;
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
  const sortedList = sortedStudents(currentList);

  displayList(sortedList);
}

function displayList(student) {
  // clear the list
  document.querySelector("#student_container").innerHTML = "";

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
  clone
    .querySelector("#student_article")
    .addEventListener("click", () => showPopup(student));
  document.querySelector("#student_container").appendChild(clone);
}

//popup details for students
function showPopup(studentData) {
  const popup = document.querySelector("#popup");
  popup.style.display = "block";
  popup.querySelector(".popup_studentimg").src = studentData.img;
  popup.querySelector(".popup_firstname").textContent = studentData.firstName;
  popup.querySelector(".popup_middlename").textContent = studentData.middleName;
  popup.querySelector(".popup_nickname").textContent = studentData.nickName;
  popup.querySelector(".popup_lastname").textContent = studentData.lastName;
  popup.querySelector(".popup_gender").textContent = studentData.gender;
  popup.querySelector(".house").textContent = studentData.house;
  console.log(studentData);

  //make close button
  document.querySelector("#close_popup").addEventListener("click", closePopup);

  function closePopup() {
    document.querySelector("#popup").style.display = "none";
  }
}
