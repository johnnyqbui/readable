import React from 'react';

const Categories = (props) => {
	const { categories, onSelect, selectedCategory } = props;

	return (
		<div className='categories'>
			<h2>Categories</h2>
			<ul>
			{categories.length && categories.map((category, i) => {
				return (
					<li
						key={i}
						onClick={e => onSelect(category.name)}
						className={ category.name === selectedCategory && 'isActive'}
					>
						{category.name}
					</li>
				)
			})}
			</ul>
		</div>
	)
}

export default Categories