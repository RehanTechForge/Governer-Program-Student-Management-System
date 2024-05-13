#! /usr/bin/env node
import inquirer from 'inquirer';
// Define a student object creator function
const createStudent = (name, roll_no, marks) => ({ name, roll_no, marks });
// Define functions for managing students
const addStudent = (students, student) => [...students, student];
const removeStudent = (students, roll_no) => students.filter(student => student.roll_no !== roll_no);
const displayAllStudents = (students) => {
    if (students.length === 0) {
        console.log("No students found.");
    }
    else {
        students.forEach(student => displayStudent(student));
    }
};
const searchStudent = (students, roll_no) => {
    const student = students.find(student => student.roll_no === roll_no);
    if (student) {
        displayStudent(student);
    }
    else {
        console.log("Student not found.");
    }
};
const displayStudent = (student) => {
    console.log("Name:", student.name);
    console.log("Roll No:", student.roll_no);
    console.log("Marks:", student.marks);
};
// Main function using recursion
const main = (students) => {
    inquirer.prompt([
        {
            type: 'list',
            name: 'choice',
            message: 'Student Management System',
            choices: [
                'Add Student',
                'Remove Student',
                'Display All Students',
                'Search Student',
                'Exit'
            ]
        }
    ]).then(answer => {
        switch (answer.choice) {
            case 'Add Student':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'name',
                        message: 'Enter name:'
                    },
                    {
                        type: 'input',
                        name: 'roll_no',
                        message: 'Enter roll no:'
                    },
                    {
                        type: 'input',
                        name: 'marks',
                        message: 'Enter marks:'
                    }
                ]).then(answers => {
                    const student = createStudent(answers.name, answers.roll_no, parseInt(answers.marks));
                    main(addStudent(students, student));
                });
                break;
            case 'Remove Student':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roll_no',
                        message: 'Enter roll no of student to remove:'
                    }
                ]).then(answer => {
                    main(removeStudent(students, answer.roll_no));
                });
                break;
            case 'Display All Students':
                displayAllStudents(students);
                main(students);
                break;
            case 'Search Student':
                inquirer.prompt([
                    {
                        type: 'input',
                        name: 'roll_no',
                        message: 'Enter roll no of student to search:'
                    }
                ]).then(answer => {
                    searchStudent(students, answer.roll_no);
                    main(students);
                });
                break;
            case 'Exit':
                console.log("Exiting...");
                break;
        }
    });
};
// Initial call to main function
main([]);
