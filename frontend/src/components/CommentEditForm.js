import React from "react";

const CommentEditForm = ({ onSubmit, onChange, body }) => {
	return (
		<form className="comment-edit-form" onSubmit={onSubmit} autoComplete="off">
			<label>
				<textarea
					name="body"
					type="text"
					value={body}
					onChange={onChange}
				/>
			</label>
			<br />
			<input type="submit" value="Submit" />
		</form>
	);
};

export default CommentEditForm;