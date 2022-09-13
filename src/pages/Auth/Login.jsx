import React from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import axios from 'axios';
import brandLogo from '../../assets/img/brand_logo.svg';
//Redux
import { useDispatch } from 'react-redux';
import { setUserInfo } from '../../redux/actions/projects';

const Login = ({ onLogin }) => {
	const [isLoading, setIsLoading] = React.useState(false);
	const dispatch = useDispatch();

	let history = useHistory();

	const onFinish = (values) => {
		setIsLoading(true);
		axios
			.get('/csrf-cookie')
			.then(() => {
				axios
					.post('/login', values)
					.then(({ data }) => {
						localStorage.setItem('auth_name', data.name);
						const inProjectCount = data.projects.in.reduce(
							(total, current) => total + current.weight,
							0,
						);
						const outProjectCount = data.projects.out.reduce(
							(total, current) => total + current.weight,
							0,
						);

						const resultData = {
							...data,
							projects: {
								...data.projects,
								in_count: inProjectCount,
								out_count: outProjectCount,
							},
						};

						dispatch(setUserInfo(resultData));
						onLogin();
						history.push('/dash');
					})
					.catch((error) => message.error(error.response.data.message));
			})
			.finally(() => setIsLoading(false));
	};

	return (
		<div className="login">
			<img
				style={{
					width: '80px',
					marginBottom: 24,
				}}
				src={brandLogo}
				alt="barndlogo"
			/>
			<Form className="login-form" onFinish={onFinish} autoComplete="off" size="large">
				<Form.Item
					name="username"
					rules={[
						{
							required: true,
							message: 'Введите логин!',
						},
					]}>
					<Input
						prefix={<UserOutlined className="site-form-item-icon" />}
						placeholder="Логин"
					/>
				</Form.Item>

				<Form.Item
					name="password"
					rules={[
						{
							required: true,
							message: 'Введите пароль!',
						},
					]}>
					<Input.Password
						prefix={<LockOutlined className="site-form-item-icon" />}
						placeholder="Пароль"
					/>
				</Form.Item>

				<Form.Item>
					<Button
						type="primary"
						htmlType="submit"
						className="login-form-button"
						loading={isLoading}>
						Войти
					</Button>
				</Form.Item>
			</Form>
		</div>
	);
};

export default Login;
