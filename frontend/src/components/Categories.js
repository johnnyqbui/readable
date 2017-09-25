import React from 'react';

const Categories = (props) => {
	const { categories, onSelect, selectedCategory } = props;
	return (
		<div className='categories'>
			<h2>Categories</h2>
			<ul>
			{categories.length && categories.map((category, i) =>
				<li
					key={i}
					onClick={e => onSelect(category.name)}
				>
					{category.name}
				</li>
			)}
			</ul>
		</div>
	)
}

export default Categories