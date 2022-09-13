import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Form, Input, Button, Radio, Transfer, message } from 'antd';
import axios from 'axios';
import Loader from '../../components/Loader';

const EditUser = () => {
	const [isLoadingPage, setIsLoadingPage] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(false);
	const [initValues, setInitValues] = React.useState({});
	const [targetKeys, setTargetKeys] = React.useState([]);
	const [projectsList, setProjectsList] = React.useState([]);
	const { id } = useParams();

	const { userInfo } = useSelector(({ projects }) => projects);

	const isAdmin = userInfo.role === 0;

	const roles = [
		{ label: 'Админ', value: 0 },
		{ label: 'Супервайзер', value: 1 },
		{ label: 'Оператор', value: 2 },
	];

	React.useEffect(() => {
		axios
			.get(`/users/${id}/edit`)
			.then(({ data }) => {
				setInitValues(data.user);
				const availableProjects = data.user.projects.map((project) => project.id);
				setTargetKeys(availableProjects);
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoadingPage(false);
			});
	}, [id]);

	React.useEffect(() => {
		axios.get('/projects').then(({ data }) => {
			setProjectsList(data);
		});
	}, []);

	const onProjectChange = (nextTargetKeys) => {
		setTargetKeys(nextTargetKeys);
	};

	const onFinish = (values) => {
		setIsLoading(true);
		const newUser = { ...values, projects: targetKeys };
		axios
			.put(`/users/${id}`, newUser)
			.then(({ data }) => {
				message.success(data.message);
			})
			.catch(() => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Редактировать пользователя</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/users'}>Назад</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				{isLoadingPage ? (
					<Loader />
				) : (
					<>
						<Form
							name="basic"
							onFinish={onFinish}
							initialValues={initValues}
							autoComplete="off">
							<Form.Item
								label="Имя"
								name="name"
								rules={[{ required: true, message: 'Введите имя!' }]}>
								<Input disabled={!isAdmin} />
							</Form.Item>
							<Form.Item
								label="Логин"
								name="username"
								rules={[{ required: true, message: 'Введите логин!' }]}>
								<Input disabled={!isAdmin} />
							</Form.Item>

							<Form.Item
								label="Пароль в RocketChat"
								name="rocketpwd"
								rules={[
									{ required: true, message: 'Введите пароль в RocketChat!' },
								]}>
								<Input disabled={!isAdmin} />
							</Form.Item>

							<Form.Item
								label="Пароль в TeamPass"
								name="teampasspwd"
								rules={[{ required: true, message: 'Введите пароль в TeamPass!' }]}>
								<Input disabled={!isAdmin} />
							</Form.Item>

							<Form.Item
								label="Роль"
								name="role"
								rules={[{ required: false, message: 'Укажите роль!' }]}>
								<Radio.Group
									options={roles}
									optionType="button"
									buttonStyle="solid"
									disabled={!isAdmin}
								/>
							</Form.Item>

							<Form.Item label="Доступные проекты" name="projects">
								<Transfer
									dataSource={projectsList}
									titles={['Все', 'Доступные']}
									targetKeys={targetKeys}
									onChange={onProjectChange}
									rowKey={(record) => record.id}
									render={(item) => item.name}
								/>
							</Form.Item>

							<Button
								className="btn-resource"
								type="primary"
								htmlType="submit"
								loading={isLoading}>
								Обновить пользователя
							</Button>
						</Form>
					</>
				)}
			</div>
		</>
	);
};

export default EditUser;
