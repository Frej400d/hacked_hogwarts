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
const allStudents = [];

//url to json data
const url = "https://petlatkea.dk/2021/hogwarts/students.json";

let hogwartsData;

function start() {
  console.log("hej Hogwarts");
  loadJSON();
}

async function loadJSON() {
  const jsonData = await fetch(url);
  hogwartsData = await jsonData.json();
  //show hogwarts data in a table in the console
  console.table(hogwartsData);
  //call createStudents function
  prepareStudents();
}

//delegator
function prepareStudents() {
  hogwartsData.forEach((stud) => {
    const student = Object.create(Student);
    student.firstName = getFirstName(stud.fullname.trim());
    student.middleName = getMiddleName(stud.fullname.trim());
    student.Name = getNickName(stud.fullname.trim());
    student.firstName = getLastName(stud.fullname.trim());
  });
}

function getFirstName(fullname) {
  let firstName = fullname.substring(
    fullname.indexOf(0),
    fullname.indexOf(" ")
  );
  return firstName;
}

function getMiddleName() {}

function getNickName() {}

function getLastName() {}

function getGender() {}

function getHouse() {}

function getStudentImg() {}

function cleanData(data) {
  const capFirstLetter = data.slice(0, 1).toUpperCase();
  const lowerCaseRest = data.slice(1).toLowerCase();
  const cleanData = capFirstLetter + lowerCaseRest;
  return cleanData;
}

function createStudents() {}
