import React from "react";

const CommentEditForm = ({ onSubmit, onChange, body }) => {
	return (
		<form onSubmit={onSubmit} autoComplete="off">
			<label>
				<textarea
					style={{ width: 300, height: 100 }}
					name="body"
					type="text"
					value={body}
					onChange={onChange}
				/>
			</label>
			<br/>
			<input type="submit" value="Submit" />
		</form>
	);
};

export default CommentEditForm;