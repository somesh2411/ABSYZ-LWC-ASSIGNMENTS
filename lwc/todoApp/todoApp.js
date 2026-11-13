import { LightningElement } from 'lwc';

export default class TodoApp extends LightningElement {
    taskInput = '';
    errorMessage = '';
    
    todoTasks = [];
    doneTasks = [];

    handleInputChange(event) {
        this.taskInput = event.target.value;
        this.errorMessage = '';
    }

    handleAddTask() {
        const trimmedTask = this.taskInput ? this.taskInput.trim() : '';

        if (!trimmedTask) {
            this.errorMessage = 'Please name your Task';
            return;
        }

        const isDuplicate = this.todoTasks.some(
            (task) => task.name.toLowerCase() === trimmedTask.toLowerCase()
        );

        if (isDuplicate) {
            this.errorMessage = 'Task already exists';
            return;
        }

        this.todoTasks = [
            ...this.todoTasks,
            {
                id: Date.now() + Math.random(),
                name: trimmedTask
            }
        ];

        this.taskInput = '';
        this.errorMessage = '';
    }

    handleTaskComplete(event) {
        const selectedTaskId = parseFloat(event.target.dataset.id);

        const completedTask = this.todoTasks.find((task) => task.id === selectedTaskId);

        if (completedTask) {
            this.todoTasks = this.todoTasks.filter((task) => task.id !== selectedTaskId);
            this.doneTasks = [...this.doneTasks, completedTask];
        }
    }

    get hasTodoTasks() {
        return this.todoTasks.length > 0;
    }

    get hasDoneTasks() {
        return this.doneTasks.length > 0;
    }
}