
// const http = require('http')
// const fs = require('fs')
// const path=require('path')
// const PORT = 4000;


// const handleFileData = (request, response) => {
//     response.writeHead(200,{'content-type':'text/plain'})
//     const info = response.write("this is mishra.")
//     console.log(info);
//     response.end()
// }

// const server = http.createServer(handleFileData);
//  server.listen(PORT);


// fs.writeFileSync("newTask.txt","Hey, I'm Chetan.")

// const tasks=fs.readFileSync("newTask.txt",'utf-8')
// const taskList=tasks.split('\n')
// console.log(taskList);

// fs.writeFileSync("newFile.txt","hey,I'm newFile")

// const PATH=path.basename("newFile.txt")
// fs.appendFileSync(PATH, "\n" + "hey new file")
// fs.unlinkSync(PATH)
// console.log("Unlink file successfull")


const fs = require('fs');
const path = require('path');
const readline = require('readline');

// Function to add a new task
function addTask(taskDescription) {
    // Read the existing tasks from the file
    fs.readFile(path.join(__dirname, 'tasks.txt'), 'utf8', (err, data) => {
        if (err) {
            // If the file does not exist, create it
            fs.writeFile(path.join(__dirname, 'tasks.txt'), '', (err) => {
                if (err) {
                    console.log('Error creating file');
                }
            });
        }

        // Add the new task to the list
        fs.appendFile(path.join(__dirname, 'tasks.txt'), `${taskDescription},incomplete\n`, (err) => {
            if (err) {
                console.log('Error adding task');
            }
        });
    });
}

// Function to view a list of tasks
function viewTasks() {
    fs.readFile(path.join(__dirname, 'tasks.txt'), 'utf8', (err, data) => {
        if (err) {
            console.log('No tasks available');
        } else {
            const tasks = data.split('\n');
            tasks.forEach((task, index) => {
                if (task) {
                    const [description, status] = task.split(',');
                    console.log(`${index + 1}. ${description} - ${status}`);
                }
            });
        }
    });
}

// Function to mark a task as complete
function completeTask(taskNumber) {
    fs.readFile(path.join(__dirname, 'tasks.txt'), 'utf8', (err, data) => {
        if (err) {
            console.log('No tasks available');
        } else {
            const tasks = data.split('\n');
            if (taskNumber > 0 && taskNumber <= tasks.length) {
                tasks[taskNumber - 1] = tasks[taskNumber - 1].replace('incomplete', 'complete');
                fs.writeFile(path.join(__dirname, 'tasks.txt'), tasks.join('\n'), (err) => {
                    if (err) {
                        console.log('Error updating task status');
                    }
                });
            } else {
                console.log('Invalid task number');
            }
        }
    });
}

// Function to remove a task
function removeTask(taskNumber) {
    fs.readFile(path.join(__dirname, 'tasks.txt'), 'utf8', (err, data) => {
        if (err) {
            console.log('No tasks available');
        } else {
            const tasks = data.split('\n');
            if (taskNumber > 0 && taskNumber <= tasks.length) {
                tasks.splice(taskNumber - 1, 1);
                fs.writeFile(path.join(__dirname, 'tasks.txt'), tasks.join('\n'), (err) => {
                    if (err) {
                        console.log('Error removing task');
                    }
                });
            } else {
                console.log('Invalid task number');
            }
        }
    });
}

// Example usage
