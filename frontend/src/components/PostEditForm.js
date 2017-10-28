import React from "react";

const PostEditForm = ({ onSubmit, onChange, title, body }) => {
	return (
		<form className="post-edit-form" onSubmit={onSubmit} autoComplete="off">
			<label>
				<input
					name="title"
					type="text"
					value={title}
					onChange={onChange}
				/>
			</label>
			<br />
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

export default PostEditForm;