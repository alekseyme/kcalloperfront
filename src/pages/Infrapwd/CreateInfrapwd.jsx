import React from 'react';
import { Form, Input, Button, Select, Switch, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateInfrapwd = () => {
	const [userList, setUserList] = React.useState([]);
	const [infrapwdUser, setInfrapwdUser] = React.useState([]);
	const [isLoading, setIsLoading] = React.useState(false);
	const [isAllAccess, setIsAllAccess] = React.useState(false);

	React.useEffect(() => {
		axios
			.get('/users')
			.then(({ data }) => {
				const newData = data.map((user) => {
					return { label: user.name, value: user.id };
				});
				setUserList(newData);
			})
			.finally(() => console.log('users fetched'));
	}, []);

	const handleAccessAllChange = (checked) => {
		setIsAllAccess(checked);
		if (checked === true) {
			setInfrapwdUser([]);
		}
	};

	const onFinish = (values) => {
		const newInfrapwd = { ...values, users: infrapwdUser };
		setIsLoading(true);
		axios
			.post('/infrapwds', newInfrapwd)
			.then(({ data }) => {
				message.success(data.message);
			})
			.catch(() => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	const onChangeUsers = (checkedValues) => {
		setInfrapwdUser(checkedValues);
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Новый логин</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/infrapwds'}>Назад</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				<Form
					name="basic"
					onFinish={onFinish}
					autoComplete="off"
					initialValues={{ access_to_all: false }}>
					<Form.Item
						label="Отображаемое имя"
						name="displayname"
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
						label="Пароль"
						name="password"
						rules={[{ required: true, message: 'Введите пароль!' }]}>
						<Input />
					</Form.Item>

					<Form.Item label="Доступен всем" name="access_to_all" valuePropName="checked">
						<Switch onChange={handleAccessAllChange} />
					</Form.Item>

					{!isAllAccess && (
						<Form.Item label="Пользователи">
							<Select
								mode="multiple"
								optionFilterProp="label"
								style={{ width: '100%' }}
								placeholder="Выбрать пользователей"
								defaultValue={infrapwdUser}
								onChange={onChangeUsers}
								options={userList}></Select>
						</Form.Item>
					)}

					<Button
						className="btn-resource"
						type="primary"
						htmlType="submit"
						loading={isLoading}>
						Добавить логин
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateInfrapwd;
