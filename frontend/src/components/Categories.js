import React from 'react';

const Categories = (props) => {
	const { categories } = props;
	return (
		<div className='categories'>
			<ul>
			{categories.length && categories.map((category, i) =>
				<li key={i}>
					{category.name}
				</li>
			)}
			</ul>
		</div>
	)
}

export default Categories