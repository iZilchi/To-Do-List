# ProcrastiMate Project Documentation
## I. Project Overview
**ProcrastiMate** is a to-do list web application that allows user to manage their tasks effectively by being able to sort the tasks based on <ins>Importance</ins> and <ins>Urgency</ins>. This application aims to enhance the productivity of individuals by aiding their time management and decision making in prioritizing tasks.

### Application Features
- **Login** and **Register** into an account to use the to-do list application.
- **Task Display**
  - View created tasks in the **_To-do_** View.
  - View the completed tasks in the **_Completed_** View.
- **Task Management**
  - **_Create_** tasks and categorize them by assigning its Importance and Urgency.
  - **_Delete_** tasks by clicking on the "-" button.
  - Mark tasks as **_completed_** by clicking on the "✓" button.
- **Task Information Display**
  - **_View_** the full information of tasks by clicking them in the list.
  - **_Edit_** the tasks by clicking the edit button in the task info container.
  - **_Delete_** the tasks by clicking the delete button in the task info container.
- **Task Sorting**
  - Sort tasks by Importance and Urgency by clicking the **_Importance Urgency_** sort button.
  - Sort tasks by Importance by clicking the **_Importance_** sort button.
  - Sort tasks by Urgency by clicking the **_Urgency_** sort button.
  - Manually sort tasks by preference by clicking the **_↑_** and **_↓_** button to move them up or down.
- A **Progress bar** is shown at the top of the to-do list container to monitor the progress of tasks that are completed.

## II. System Architecture
**ProcrastiMate** is a single-page application developed using HTML, CSS, and Javascript with React library. It implements Firebase API for the backend and utilizes Realtime Database for data management and User Authentication for account system.

### Components:
#### Frontend
1. **Login/Registration Page:**
   - Handles account login and creation functionality.
   - Required component to access the to-do list application.
2. **To-Do List Page:**
   - **AddTaskForm**
     - Handles the task creation functionality.
     - Creates tasks and sends data to Realtime Database.
   - **ProgressBar**
     - Visualizes the progress of completed tasks.
   - **DisplayButton**
     - Handles the display of to-do and completed tasks.
     - Filters the tasks based on status (To-do / Completed).
   - **SortButton**
     - Handle the sorting of tasks by importance and urgency, importance only, and urgency only.
   - **TaskList**
     - Maps the tasks created by the user and displays the list of tasks in the container.
     - Encapsulates the TaskItem.
   - **TaskItem**
     - Contains the complete button, task name, manual sort buttons (up and down), and delete button.
     - Allows user to complete task, move their order up or down, and delete task.
   - **TaskInfo**
     - Contains the task title, priority, status, and description.
     - Allows user to edit the task values or delete them.
3. **About Page:**
   - Contains the information about the following:
     - **Product Description:** ***ProcrastiMate***
     - **Computer Science Concept:** ***Eisenhower Matrix***
     - **Custom Sorting Algorithm:** ***EisenSort***
     - **Developers**
#### Backend
1. **Firebase User Authentication**
   - Handles user authentication and authorization.
2. **Firebase Realtime Database**
   - Handles data storage, retrieval, and update (task data).
   - Provides realtime updates based on the user changes.

## III. Applied Computer Science Concept
**ProcrastiMate** applies these following Computer Science concepts:

### Data Structure
The application makes use of `<List>` in a form of state variable to store the tasks that the user creates.

This is the syntax for the task list used in the code:
`const [tasks, setTasks] = useState([]);`

### Sorting Algorithms
The application offers a custom sorting algorithm that sorts the tasks into three categories:
- **eisenSort:**
  - ***Importance-Urgencu***
  - ***Importance***
  - ***Urgency***
 
 ### Framework
 The application based its custom sorting algorithm on a framework called the Eisenhower Matrix. This framework is used for managing tasks based on importance and urgency. The concept of Eisenhower Matrix is that tasks are categorized into ***Four Quadrants***:
 ![image](https://github.com/user-attachments/assets/e7f84752-3f90-4998-b34a-efd98aaffce5)
 
 [Link for the Eisenhower Framework and Diagram **_- Asana_**](https://asana.com/resources/eisenhower-matrix)

- **Tasks Categorization**
  - **Do**: Important & Urgent
  - **Schedule**: Important but Not Urgent
  - **Delegate**: Not Important but Urgent
  - **Delete**: Not Important & Not Urgent

For the sake of applying the concept to create a custom sorting algorithm, we made some modifications and set a hierarchy for the four categories. 

Here is the modified concept that we used in the application:
- **Tasks Categorization (Hierarchy)**
  1. **Do**: Important & Urgent
  2. **Attend To**: Not Important but Urgent
  3. **Schedule**: Important but Not Urgent
  4. **Do Latest**: Not Important & Not Urgent
 
We decided to prioritize the tasks that are urgent because deadlines are important. Considering that the to-do list web application that we developed is for personal use only, the user cannot **Delegate** the tasks to other people. That is why, even if the task is not important but if it is urgent, then it should still be **Attended To** first. Additionally, we changed the **Delete** category into **Do Latest** category. Which is more fitting for tasks that are not important and not urgent but the user still wants to do it like leisure activities. 

This modified concept is the main framework of our custom sorting algorithm. By being able to categorize the tasks using Importance and Urgency, we are able to derive **3 Sorting Algorithms** that we used in our web application.

## IV. Algorithms Used
The web application utilizes a custom sorting algorithm called eisenSort() that is created based on the Eisenhower Matrix framework with the built in sort() function of javascript.


### eisenSort
The code for eisenSort:
```
const eisenSort = (tasks, activeSort) => {
 return tasks.slice().sort((a, b) => {
  if (activeSort === "importance-urgency") {
   return a.scale - b.scale;
  } else if (activeSort === "importance") {
   return a.importance - b.importance;
  } else if (activeSort === "urgency") {
   return a.urgency - b.urgency;
  } else {
   return a.initialOrder - b.initialOrder;
  }
 });
};
```
Each tasks created are assigned with values corresponding to their importance and urgency. The values assigned are as follows:

**Importance:**
```
Important = 1
Not Important = 2
```

**Urgency:**
```
Urgent = 1
Not Urgent = 2
```

This algorithm sorts the tasks based on the sorting button selected which is indicated by the _activeSort_ parameter. There are 3 values for _activeSort_ and they are _"importance-urgency", "importance", and "urgency"_. 


### Importance Urgency Sort
When the **_"importance-urgency"_** is active, the algorithm sorts the tasks based on their scale. The following scale is created based on the values of importance and urgency that each tasks contains:

**Scale:**
```
Importance = 1 && Urgency = 1 => Scale = 1 (Important & Urgent)
Importance = 2 && Urgency = 1 => Scale = 2 (Not Important but Urgent)
Importance = 1 && Urgency = 2 => Scale = 3 (Important but Not Urgent)
Importance = 2 && Urgency = 2 => Scale = 4 (Not Important & Not Urgent)
```

This algorithm sorts the scale value of the tasks in ascending order making sure that the tasks with the highest prioritization is displayed at the top of the to-do list.


### Importance Sort
When the **_"importance"_** is active, the algorithm sorts the tasks using the value of importance prioritizing those tasks with importance value of 1 before those with importance value of 2.


### Urgency Sort
And lastly, when the **_"urgency"_** is active, the algorithm sorts the tasks using the value of urgency prioritizing those tasks with urgency value of 1 before those with urgency value of 2.

Overall, this custom sorting algorithm helps enhance the to-do list web application by being able to provide three sorting options that the users can use based on their preference. this algorithm significantly improves the usability of the application.


## V. Security Mechanisms
To enhance the security of the web application, the following security mechanisms are implemented:
- **Protected Route** are used to make sure that the to-do list page will only be accessible to authenticated users.
- **Input Validation** is implemented to ensure that the user will input the appropriate data to the input fields. A format for email and password are created to validate if the user inputs an appropriate email account with a standard password format for strength purposes. The developers also make sure that the users can't create a task with an empty input or no name.
- **Error handling** is implemented to handle errors in login/registration system. An error message is displayed that tells them what went wrong in the login/registration process. This also lets us know if there are any errors in data management when accessing the database.

## VI. Development Process and Design Decisions
**Computer Science Theory Influence:**
- The developers used **List** data structure for storing the list of tasks. This is because it allows for flexible storage of data related to tasks that have different values unlike arrays. The data for task, value for importance and urgency, and the order of the tasks are dynamically stored in list.
- The developers utilized **Firebase API** because it has realtime database and user authentication that is easy to implement since we are new to using APIs.
- The design of the application is directed towards **minimalist design**. The developers want to make the application easy to use by offering a simple design that user can easily comprehend.
- **React library** is utilized in developing the application. This lets the developers organize their codes thanks to the library's ability to create components. Through this, maintaining a part of the application is easier and efficient.

## VII. Correctness and Efficiency
To ensure the correctness and efficiency of the application, the developers thoroughly tested the overall functionality of the application from login to task completion to make sure that every features perform as how they are intended to. Morever, security mechanisms are added to constraint user and guide them in using the application ensuring that only the correct inputs are accepted. Lastly, the developers came up with a minimal UI for the application to make it easier for the user to use the application.

## VIII. How to Run the Project
To run the application, make sure that you have the following dependencies used installed. You can do this by running this command once the code is cloned:
`npm install`
Once the dependencies are installed, you may now run the web application.

Running the application:
1. Open the folder where the code is located.
2. Open a new terminal and run these syntax `npm run dev`.
3. Wait for the terminal to display the following:
  > [!NOTE]
  > The local address provided in the terminal can vary depending on personal devices.

   ![image](https://github.com/user-attachments/assets/fabf63c7-be43-4bf0-bcd4-26660afaff85)

   
5. Paste the local address in your web browser to access the web application or you can just simply click the application while holding down the control key in VS Code.


## IX. Contributors
- **Front End Developer**
  - **Pagcaliuangan, Kent Melard D.** 
- **Back End Developer**
  - **Landicho, Alessandra Marie M.** 
- **Full Stack Developer**
  - **Padua, Chris Justine L.**

## X. Acknowledgement
We would like to express our heartfelt gratitude to our professor **Ms. Fatima Marie P. Agdon** for her invaluable guidance, constructive suggestions, and encouragement throughout the development of this project. Her insights and support played a vital role in shaping this program and improving its overall quality.

We would also like to extend our appreciation to our frontend developer, **Kent Melard D. Pagcaliuangan**, and backend developer, **Alessandra Marie M. Landicho**, for their exceptional dedication, hard work, and creativity. Their relentless efforts and skills were instrumental in bringing this project to fruition.

This project is the result of the collective contributions and commitment of everyone involved, and we are truly grateful for their efforts.
