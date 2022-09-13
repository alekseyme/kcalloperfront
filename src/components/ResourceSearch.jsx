import React from 'react';
import { Input } from 'antd';

const { Search } = Input;

const ResourceSearch = ({ onSearch }) => {
	return (
		<>
			<Search
				placeholder="Поиск"
				onSearch={(value) => onSearch(value)}
				allowClear
				style={{
					width: 200,
					marginRight: 'auto',
					marginLeft: 20,
				}}
			/>
		</>
	);
};

export default ResourceSearch;
