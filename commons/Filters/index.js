/* eslint-disable jsx-a11y/img-redundant-alt */
import { useState } from 'react';
import styles from './styles.module.css';
import toStartCase from '../../utils/toStartCase';

function AuthorFilter({
	data = [],
	setFilteredData = () => {},
	filteredData = [],
	activeTab = '',
}) {
	const [sortBy, setSortBy] = useState('');

	const handleFilterChange = (e) => {
		const authorName = e.target.value;

		const filteredBooks = data.filter((item) =>
			item.author.toLowerCase().includes(authorName.toLowerCase()),
		);

		setFilteredData(filteredBooks);
	};

	const onClickSort = (type) => {
		const sorted = [...filteredData];

		if (type === 'asc') {
			// Sort in ascending order
			sorted.sort((a, b) => a.author.localeCompare(b.author));
		} else {
			// Sort in descending order
			sorted.sort((a, b) => b.author.localeCompare(a.author));
		}

		setFilteredData(sorted);
	};

	if (activeTab === 'author') {
		return null;
	}

	return (
		<div className={styles.filterContainer}>
			<button
				type="button"
				className={styles.filterButton}
				onClick={() => {
					if (sortBy === 'asc') {
						setSortBy('desc');
						onClickSort('desc');
					} else {
						setSortBy('asc');
						onClickSort('asc');
					}
				}}
			>
				<img
					width={14}
					height={14}
					src="/sort.png"
					alt="sort image"
					className={styles.png}
				/>
				{sortBy ? toStartCase(sortBy) : 'Sort By'}
			</button>

			<input
				type="text"
				className={styles.filterInput}
				placeholder="Enter author's name"
				onChange={handleFilterChange}
			/>
		</div>
	);
}

export default AuthorFilter;
