import React from 'react';
// import axios from 'axios';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Button, Table, Typography } from 'antd';
import Loader from '../../components/Loader';
import ResourceSearch from '../../components/ResourceSearch';

const { Paragraph } = Typography;

const Infralogins = () => {
	const [searchValue, setSearchValue] = React.useState('');

	const { infralogins, infralogins_all } = useSelector(({ projects }) => projects.userInfo);

	const availableLogin = [...infralogins, ...infralogins_all];
	// const [infraLogins, setInfraLogins] = React.useState();

	// const fetchUserLogins = () => {
	// 	axios.post('/infralogins').then(({ data }) => {
	// 		setInfraLogins(data);
	// 	});
	// };

	// React.useEffect(() => {
	// 	fetchUserLogins();
	// }, []);

	const columns = [
		{
			title: 'Отображаемое имя',
			dataIndex: 'displayname',
			key: 'displayname',
		},
		{
			title: 'Логин',
			dataIndex: 'username',
			key: 'username',
			render: (username) => (
				<Paragraph
					className="inline-paragraph table-paragraph"
					copyable={{
						tooltips: false,
					}}>
					{username}
				</Paragraph>
			),
		},
		{
			title: 'Пароль',
			dataIndex: 'password',
			key: 'password',
			render: (password) => (
				<Paragraph
					className="inline-paragraph table-paragraph"
					copyable={{
						tooltips: false,
					}}>
					{password}
				</Paragraph>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список твоих логинов в Infra</b>
				<ResourceSearch onSearch={(value) => setSearchValue(value)} />
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/dash'}>Назад</Link>
				</Button>
			</div>
			<div className="box">
				{!infralogins ? (
					<Loader />
				) : (
					<Table
						size="middle"
						rowKey={(record) => record.id}
						columns={columns}
						dataSource={availableLogin?.filter((pwd) =>
							pwd.displayname.toLowerCase().includes(searchValue.toLowerCase()),
						)}
					/>
				)}
			</div>
		</>
	);
};

export default Infralogins;
