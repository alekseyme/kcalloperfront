import React from 'react';
import axios from 'axios';
import { Table, Space, Button, Tag, message } from 'antd';
import { Link } from 'react-router-dom';
import Loader from '../../components/Loader';
import ResourceSearch from '../../components/ResourceSearch';

const Infrapwd = () => {
	const [infrapwdList, setInfrapwdList] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(true);
	const [searchValue, setSearchValue] = React.useState('');

	React.useEffect(() => {
		axios
			.get('/infrapwds')
			.then(({ data }) => {
				setInfrapwdList(data);
			})
			.finally(() => setIsLoading(false));
	}, []);

	const onDeleteInfrapwd = (e, infrapwdId) => {
		const thisButton = e.currentTarget;
		thisButton.innerText = 'Удаляю';

		axios
			.delete(`/infrapwds/${infrapwdId}`)
			.then(({ data }) => {
				const newinfrapwdList = infrapwdList.filter(
					(infrapwd) => infrapwd.id !== infrapwdId,
				);
				setInfrapwdList(newinfrapwdList);
				message.success(data.message);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				thisButton.innerText = 'Удалить';
			});
	};

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
		},
		{
			title: 'Пароль',
			dataIndex: 'password',
			key: 'password',
		},
		{
			title: 'Доступен для',
			dataIndex: 'users',
			key: 'users',
			render: (users) => {
				if (users.length) {
					return (
						<>
							{users.map((user) => (
								<Tag color="blue" key={user.id}>
									{user.name}
								</Tag>
							))}
						</>
					);
				}
			},
		},
		{
			title: 'Действия',
			key: 'action',
			render: (_, record) => (
				<Space size="middle">
					<Link to={`/infrapwds/${record.id}/edit`}>Ред</Link>
					<Button type="link" onClick={(e) => onDeleteInfrapwd(e, record.id)}>
						Удалить
					</Button>
				</Space>
			),
		},
	];

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Список логинов ICC</b>
				<ResourceSearch onSearch={(value) => setSearchValue(value)} />
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/infrapwds/create'}>Добавить логин</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				{isLoading ? (
					<Loader />
				) : (
					<Table
						style={{ width: '100%' }}
						rowKey={(record) => record.id}
						columns={columns}
						dataSource={infrapwdList?.filter((pwd) =>
							pwd.displayname.toLowerCase().includes(searchValue.toLowerCase()),
						)}
						pagination={{ hideOnSinglePage: true }}
					/>
				)}
			</div>
		</>
	);
};

export default Infrapwd;
