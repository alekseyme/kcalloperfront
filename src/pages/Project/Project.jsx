import React from 'react';
import axios from 'axios';
import { Table, Space } from 'antd';
import { Link } from 'react-router-dom';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@ant-design/icons';

import Loader from '../../components/Loader';
import ResourceSearch from '../../components/ResourceSearch';

const Project = () => {
	const [projectList, setProjectList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		axios
			.get('/projects')
			.then(({ data }) => {
				setProjectList(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const columns = [
		{
			title: 'Проект',
			dataIndex: 'name',
			key: 'name',
		},
		{
			title: 'Тип',
			dataIndex: 'type',
			key: 'type',
			render: (type) => {
				return (
					<>
						{!type ? (
							<ArrowLeftOutlined style={{ fontSize: '16px', color: '#52c41a' }} />
						) : (
							<ArrowRightOutlined style={{ fontSize: '16px', color: '#1890ff' }} />
						)}
					</>
				);
			},
		},
		{
			title: 'Ссылка на скрипт',
			dataIndex: 'scriptlink',
			key: 'scriptlink',
		},
		{
			title: 'Вес',
			dataIndex: 'weight',
			key: 'weight',
		},
		// {
		// 	title: 'Доступен для',
		// 	dataIndex: 'users',
		// 	key: 'users',
		// 	render: (users) => {
		// 		if (users.length) {
		// 			return (
		// 				<>
		// 					{users.map((user) => (
		// 						<Tag color="blue" key={user.id}>
		// 							{user.name}
		// 						</Tag>
		// 					))}
		// 				</>
		// 			);
		// 		}
		// 	},
		// },
		{
			title: 'Действия',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/projects/${record.id}/edit`}>Ред</Link>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список проектов</b>
				<ResourceSearch onSearch={(value) => setSearchValue(value)} />
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				{isLoading ? (
					<Loader />
				) : (
					<Table
						style={{ width: '100%' }}
						rowKey={(record) => record.id}
						columns={columns}
						dataSource={projectList?.filter((project) =>
							project.name.toLowerCase().includes(searchValue.toLowerCase()),
						)}
						pagination={{ hideOnSinglePage: true }}
					/>
				)}
			</div>
		</>
	);
};

export default Project;
