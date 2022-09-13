import React from 'react';
import { Form, Input, Button, Radio, Transfer, message } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const CreateProject = () => {
	const [isLoading, setIsLoading] = React.useState(false);
	const [userList, setUserList] = React.useState([]);
	const [targetKeys, setTargetKeys] = React.useState([]);

	const projectTypes = [
		{ label: 'Входящий', value: 0 },
		{ label: 'Исходящий', value: 1 },
	];

	React.useEffect(() => {
		axios.get('/users').then(({ data }) => {
			setUserList(data);
		});
	}, []);

	const onFinish = (values) => {
		const newProject = { ...values, users: targetKeys };
		setIsLoading(true);
		axios
			.post('/projects', newProject)
			.then(({ data }) => {
				console.log(data);
				message.success(data.message);
			})
			.catch((rsp) => {
				console.log(rsp);
				message.error('Произошла ошибка');
			})
			.finally(() => setIsLoading(false));
	};

	const onChangeUsers = (nextTargetKeys) => {
		setTargetKeys(nextTargetKeys);
	};

	return (
		<>
			<div className="controls box" style={{ padding: '14px 25px' }}>
				<b>Новый проект</b>
				<Button type="primary" style={{ marginLeft: 'auto' }}>
					<Link to={'/projects'}>Назад</Link>
				</Button>
			</div>
			<div className="box" style={{ marginTop: 20 }}>
				<Form name="basic" onFinish={onFinish} autoComplete="off">
					<Form.Item
						label="Имя"
						name="name"
						rules={[{ required: true, message: 'Введите имя!' }]}>
						<Input />
					</Form.Item>

					<Form.Item
						label="Тип"
						name="type"
						rules={[{ required: true, message: 'Укажите тип проекта!' }]}>
						<Radio.Group
							options={projectTypes}
							optionType="button"
							buttonStyle="solid"
						/>
					</Form.Item>

					<Form.Item label="Ссылка на скрипт" name="scriptlink">
						<Input />
					</Form.Item>

					<Form.Item label="Пользователи">
						<Transfer
							dataSource={userList}
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
						Добавить проект
					</Button>
				</Form>
			</div>
		</>
	);
};

export default CreateProject;
