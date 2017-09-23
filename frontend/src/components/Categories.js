import React from 'react';

const Categories = (categories) => {
	return (
		<div className='categories'>
			<ul>
			{categories.categories && categories.categories.map((category, i) =>
				<li key={i}>
					{category.name}
				</li>
			)}
			</ul>
		</div>
	)
}

export default Categories