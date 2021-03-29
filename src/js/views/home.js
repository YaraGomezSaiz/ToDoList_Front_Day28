import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

import Task from "../component/task.jsx";

export function Home() {
	const [todos, setTodos] = useState(null);
	const [inputTask, setInputTask] = useState(null);

	useEffect(
		() => {
			//GET TODO LIST
			fetch(process.env.BASENAME + "todos/", {
				method: "GET",
				headers: { "Content-Type": "application/json" }
			})
				.then(response => response.json())
				.then(resultJson => setTodos(resultJson));
		},

		[]
	);

	//POST TODO
	function postTodo() {
		let todo = {
			label: inputTask,
			is_done: false
		};

		fetch(process.env.BASENAME + "todos/", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo)
		})
			.then(response => response.json())
			.then(resultJson => {
				let todosArrayCopy = [...todos, resultJson];
				setTodos(todosArrayCopy);
			});
	}

	//UPDATE TODO
	function updateTodo(todo) {
		fetch(process.env.BASENAME + "todos/" + todo.id, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo)
		})
			.then(response => response.json())
			.then(resultJson => {
				let arrayCopy = [...todos];
				let arrayPos = arrayCopy.findIndex(item => item.id === todo.id);
				arrayCopy[arrayPos] = todo;
				setTodos(arrayCopy);
			});
	}

	//DELETE TODO
	function deleteTodo(id) {
		fetch(process.env.BASENAME + "todos/" + id, {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => {
				let arrayCopy = [...todos];
				let arrayPos = arrayCopy.findIndex(item => item.id === id);
				arrayCopy.splice(arrayPos, 1);
				setTodos(arrayCopy);
			});
	}

	return (
		<div className="text-center mt-5">
			<input
				type="text"
				placeholder="Introduce new task"
				onChange={() => setInputTask(event.target.value)}
				onKeyDown={event => (event.key === "Enter" ? postTodo() : null)}
			/>

			{todos != null ? (
				<ul>
					{todos.map(todo => {
						return <Task key={todo.id} todo={todo} updateTodo={updateTodo} deleteTodo={deleteTodo} />;
					})}
				</ul>
			) : (
				"Loading"
			)}
		</div>
	);
}
