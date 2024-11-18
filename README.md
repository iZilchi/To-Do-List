# ProcrastiMate Project Documentation
## I. Project Overview
**ProcrastiMate** is a to-do list web application that allows user to manage their tasks effectively by being able to sort the tasks based on <ins>Importance</ins> and <ins>Urgency</ins>. This application aims to enhance the productivity of individuals by aiding their time management and decision making in prioritizing tasks.

### Application Features
- **Login** and **Register** into an account to use the to-do list application.
- **Task Display**
  - View created tasks in the **_To-do_** View.
  - View the completed tasks in the **_Completed_** View.
- **Task Management**
  - Create tasks and categorize them by assigning its Importance and Urgency.
  - Delete tasks by clicking on the "-" button.
  - Mark tasks as completed by clicking on the "✓" button.
- **Task Sorting**
  - Sort tasks by Importance and Urgency by clicking the **_Importance Urgency_** sort button.
  - Sort tasks by Importance by clicking the **_Importance_** sort button.
  - Sort tasks by Urgency by clicking the **_Urgency_** sort button.
  - Manually sort tasks by preference by clicking the **_↑_** and **_↓_** button to move them up or down.
- A **Progress bar** is shown at the top of the to-do list container to monitor the progress of tasks that are completed.

## II. System Architecture


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


## VI. Development Process and Design Decisions


## VII. Correctness and Efficiency


## VIII. How to Run the Project


## IX. Contributors
- **Front End Developer**
  - **Pagcaliuangan, Kent Melard D.** <!-- Lagyan ng mention -->
- **Back End Developer**
  - **Landicho, Alessandra Marie M.** <!-- Lagyan ng mention -->
- **Full Stack Developer**
  - **Padua, Chris Justine L.** <!-- Lagyan ng mention -->

## X. Acknowledgement

