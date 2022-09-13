import React from 'react';
import { Form, Input, Button, Radio, Transfer, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateUser = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [targetKeys, setTargetKeys] = React.useState([]);
	const [projectsList, setProjectsList] = React.useState([]);

	const roles = [
		{ label: 'Админ', value: 0 },
		{ label: 'Супервайзер', value: 1 },
		{ label: 'Оператор', value: 2 },
	];

	React.useEffect(() => {
		axios.get('/projects').then(({ data }) => {
			setProjectsList(data);
		});
	}, []);

	const onProjectChange = (nextTargetKeys) => {
		setTargetKeys(nextTargetKeys);
	};

	const onFinish = (values) => {
		const newUser = { ...values, projects: targetKeys };

		setIsLoading(true);
		axios
			.post('/users', newUser)
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
				<b>Новый пользователь</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/users'}>Назад</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				<Form
					name="basic"
					onFinish={onFinish}
					initialValues={{ role: 2 }}
					autoComplete="off">
					<Form.Item
						label="Имя"
						name="name"
						rules={[{ required: true, message: 'Введите имя!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Логин"
						name="username"
						rules={[{ required: true, message: 'Введите логин!' }]}>
						<Input />
					</Form.Item>
					<Form.Item
						label="Пароль в ЛК"
						name="password"
						rules={[{ required: true, message: 'Введите пароль!' }]}>
						<Input.Password />
					</Form.Item>

					<Form.Item
						label="Пароль в Infra"
						name="infrapwd"
						rules={[{ required: false, message: 'Введите пароль в Infra!' }]}>
						<Input />
					</Form.Item>

					<Form.Item label="Пароль в RocketChat" name="rocketpwd">
						<Input />
					</Form.Item>

					<Form.Item label="Пароль в TeamPass" name="teampasspwd">
						<Input />
					</Form.Item>

					<Form.Item
						label="Роль"
						name="role"
						rules={[{ required: true, message: 'Укажите роль!' }]}>
						<Radio.Group options={roles} optionType="button" buttonStyle="solid" />
					</Form.Item>

					<Form.Item label="Доступные проекты">
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
						Добавить пользователя
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateUser;
