import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Input, Button, message, Switch, Select } from 'antd';
import axios from 'axios';
import Loader from '../../components/Loader';

const EditInfrapwd = () => {
	const [userList, setUsertList] = React.useState([]);
	const [infrapwdUser, setInfrapwdUser] = React.useState([]);
	const [isLoadingPage, setIsLoadingPage] = React.useState(true);
	const [isLoading, setIsLoading] = React.useState(false);
	const [initValues, setInitvalues] = React.useState({});
	const [isAllAccess, setIsAllAccess] = React.useState(false);

	const { id } = useParams();

	React.useEffect(() => {
		axios
			.get('/users')
			.then(({ data }) => {
				const newData = data.map((user) => {
					return { label: user.name, value: user.id };
				});
				setUsertList(newData);
			})
			.finally(() => console.log('users fetched at edit page'));
	}, []);

	// let history = useHistory();

	React.useEffect(() => {
		axios
			.get(`/infrapwds/${id}/edit`)
			.then(({ data }) => {
				setInitvalues(data);
				setIsAllAccess(data.access_to_all === 1 ? true : false);
				if (data.users.length > 0) {
					const infrapwdUser = data.users.map((user) => user.id);
					setInfrapwdUser(infrapwdUser);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoadingPage(false);
			});
	}, [id]);

	const onFinish = (values) => {
		setIsLoading(true);
		const newInfrapwd = { ...values, users: infrapwdUser };
		axios
			.put(`/infrapwds/${id}`, newInfrapwd)
			.then(({ data }) => {
				message.success(data.message);
				// history.push('/projects');
			})
			.catch(() => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	const handleAccessAllChange = (checked) => {
		setIsAllAccess(checked);
		if (checked === true) {
			setInfrapwdUser([]);
		}
	};

	const onChangeUsers = (value) => {
		setInfrapwdUser(value);
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Редактировать логин</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/infrapwds'}>Назад</Link>
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

							<Form.Item
								label="Доступен всем"
								name="access_to_all"
								valuePropName="checked">
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
								Обновить логин
							</Button>
						</Form>
					</>
				)}
			</div>
		</>
	);
};

export default EditInfrapwd;
