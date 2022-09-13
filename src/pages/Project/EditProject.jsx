import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Form, Button, message, Slider, Transfer } from 'antd';
import axios from 'axios';
import Loader from '../../components/Loader';

const EditProject = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [isLoadingPage, setIsLoadingPage] = React.useState(true);
	const [initValues, setInitvalues] = React.useState({});
	const [targetKeys, setTargetKeys] = React.useState([]);
	const [userList, setUsertList] = React.useState([]);
	const { id } = useParams();

	// const projectTypes = [
	// 	{ label: 'Входящий', value: 0 },
	// 	{ label: 'Исходящий', value: 1 },
	// ];

	const marks = {
		0: 0,
		1: 1,
		2: 2,
		3: 3,
	};

	React.useEffect(() => {
		axios.get('/users').then(({ data }) => {
			setUsertList(data);
		});
	}, []);

	// let history = useHistory();

	React.useEffect(() => {
		axios
			.get(`/projects/${id}/edit`)
			.then(({ data }) => {
				setInitvalues(data);
				if (data.users.length > 0) {
					const projectUser = data.users.map((user) => user.id);
					setTargetKeys(projectUser);
				}
			})
			.catch((err) => console.log(err))
			.finally(() => {
				setIsLoadingPage(false);
			});
	}, [id]);

	const onFinish = (values) => {
		setIsLoading(true);
		const newProject = { ...values, users: targetKeys };
		axios
			.put(`/projects/${id}`, newProject)
			.then(({ data }) => {
				message.success(data.message);
				// history.push('/projects');
			})
			.catch((rsp) => {
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};
	// #region onChangeUsers
	const onChangeUsers = (value) => {
		setTargetKeys(value);
	};
	// #endregion onChangeUsers

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Редактировать проект</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/projects'}>Назад</Link>
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
							<Form.Item name="weight" label="Вес">
								<Slider marks={marks} step={null} max={3} />
							</Form.Item>
							<Form.Item label="Пользователи">
								<Transfer
									dataSource={userList.filter((user) => user.role !== 0)}
									titles={['Все', 'Кто знает']}
									targetKeys={targetKeys}
									onChange={onChangeUsers}
									rowKey={(record) => record.id}
									render={(item) => item.name}
								/>
							</Form.Item>

							<Button
								className="btn-resource"
								type="primary"
								htmlType="submit"
								loading={isLoading}>
								Обновить проект
							</Button>
						</Form>
					</>
				)}
			</div>
		</>
	);
};

export default EditProject;
