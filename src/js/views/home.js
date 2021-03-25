import React, { useState, useEffect } from "react";
import rigoImage from "../../img/rigo-baby.jpg";
import "../../styles/home.scss";

export function Home() {
	const [todos, setTodos] = useState(null);
	const [post, setPost] = useState(null);
	const [inputTask, setInputTask] = useState(null);

	useEffect(
		() => {
			//GET TODO LIST
			fetch("https://3000-scarlet-wallaby-qpo3v7br.ws-eu03.gitpod.io/todos", {
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

		fetch("https://3000-scarlet-wallaby-qpo3v7br.ws-eu03.gitpod.io/todos", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo)
		})
			.then(response => response.json())
			.then(resultJson => setPost(resultJson));
	}

	//UPDATE TODO
	function updateTodo() {
		let todo = {
			label: "Task 1 Updated",
			is_done: false
		};

		fetch("https://3000-scarlet-wallaby-qpo3v7br.ws-eu03.gitpod.io/todos/1", {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(todo)
		})
			.then(response => response.json())
			.then(resultJson => setPost(resultJson));
	}

	//DELETE TODO
	function deleteTodo() {
		fetch("https://3000-scarlet-wallaby-qpo3v7br.ws-eu03.gitpod.io/todos/1", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" }
		})
			.then(response => response.json())
			.then(resultJson => setPost(resultJson));
	}

	return (
		<div className="text-center mt-5">
			<input type="text" placeholder="Introduce a task" onChange={() => setInputTask(event.target.value)} />

			<div
				type="button"
				className="btn btn-success"
				onClick={() => {
					postTodo();
				}}>
				Post
			</div>

			<div
				type="button"
				className="btn btn-success"
				onClick={() => {
					updateTodo();
				}}>
				Update
			</div>
			<div
				type="button"
				className="btn btn-success"
				onClick={() => {
					deleteTodo();
				}}>
				Delete
			</div>

			{todos != null ? (
				<ul>
					{todos.map(todo => {
						return <li key={todo.id}> {todo.label} </li>;
					})}
				</ul>
			) : (
				"Loading"
			)}
		</div>
	);
}
