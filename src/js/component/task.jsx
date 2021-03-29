import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Task(props) {
	const [inputUpdateValue, setInputUpdateValue] = useState(props.todo.label);

	let showSaveDelBtn = false;

	// Al guardar cambios se introduce el nuevo titulo en el objeto y se llama
	//a la funcion del componenete home "UpdateTodoItem" para actualizarlo en el array
	function updateTodo() {
		let obj = props.todo;
		obj.label = inputUpdateValue;
		props.updateTodo(obj);
		//setComments("Task " + props.Item.id + "has been updated");
	}

	if (props.todo.label !== inputUpdateValue) {
		showSaveDelBtn = true;
	} else {
		showSaveDelBtn = false;
	}

	return (
		<div>
			<input
				type="text"
				defaultValue={props.todo.label}
				onChange={event => setInputUpdateValue(event.target.value)}
			/>

			{showSaveDelBtn ? (
				""
			) : (
				<div
					type="button"
					className="btn btn-light far fa-trash-alt"
					onClick={() => {
						props.deleteTodo(props.todo.id);
					}}
				/>
			)}

			{showSaveDelBtn ? (
				<div type="button" className="btn btn-light far fa-save" onClick={() => updateTodo()} />
			) : (
				""
			)}
			{showSaveDelBtn ? (
				<div
					type="button"
					className="btn btn-light far fa-times-circle"
					onClick={() => setInputUpdateValue(props.todo.label)}
				/>
			) : (
				""
			)}
		</div>
	);
}

Task.propTypes = {
	todo: PropTypes.object,
	updateTodo: PropTypes.func,
	deleteTodo: PropTypes.func
};
