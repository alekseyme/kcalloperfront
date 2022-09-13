import React from 'react';
import { Row, Col, Card, Space } from 'antd';
import { useSelector } from 'react-redux';
import UserPasswords from '../../components/UserPasswords';
import UsefulLinks from '../../components/UsefulLinks';
// import { Link } from 'react-router-dom';

const Dashboard = () => {
	const { userInfo } = useSelector(({ projects }) => projects);

	const passwords = userInfo.passwords;
	const username = userInfo.username;
	const projects = userInfo.projects;

	// const role = userInfo.role;
	// const isResourceShown = role === 0 || role === 1;

	return (
		<>
			{/* {isResourceShown > 1000 && (
				<Row gutter={22} style={{ marginTop: 22 }}>
					<Col span={3}>
						<Card
							title="Пользователи"
							className="card-resource"
							extra={<div>25</div>}
							actions={[
								<Link to="/users" key="list">
									<UnorderedListOutlined />
								</Link>,
								<Link to="/users/create" key="create">
									<PlusOutlined />
								</Link>,
							]}></Card>
					</Col>
					<Col span={3}>
						<Card
							title="Проекты"
							className="card-resource"
							extra={<div>49</div>}
							actions={[
								<Link to="/projects" key="list">
									<UnorderedListOutlined />
								</Link>,
								<Link to="/projects/create" key="create">
									<PlusOutlined />
								</Link>,
							]}></Card>
					</Col>
					<Col span={3}>
						<Card
							title="Логины ICC"
							className="card-resource"
							extra={<div>36</div>}
							actions={[
								<Link to="/infrapwds" key="list">
									<UnorderedListOutlined />
								</Link>,
								<Link to="/infrapwds/create" key="create">
									<PlusOutlined />
								</Link>,
							]}></Card>
					</Col>
				</Row>
			)} */}
			<div className="parent" style={{ marginTop: 22 }}>
				<div className="div1">
					<Card title="Входящие проекты" className="projects-list">
						<Space direction="vertical">
							{projects.in.map((project) => (
								<a
									key={project.id}
									href={project.scriptlink}
									rel="noreferrer"
									target="_blank">
									{project.name}
								</a>
							))}
						</Space>
					</Card>
				</div>
				<div className="div2">
					<Row gutter={[22, 22]}>
						<Col span={12}>
							<Card title="Подключено проектов">
								<div>
									<b>Входящих:</b> {projects.in_count}
								</div>
								<div>
									<b>Исходящих:</b> {projects.out_count}
								</div>
							</Card>
						</Col>
						{Object.keys(passwords).map((pwdtype, index) => (
							<UserPasswords
								title={
									pwdtype === 'infrapwd'
										? 'InfraCallCenter'
										: pwdtype === 'rocketpwd'
										? 'RocketChat'
										: 'TeamPass'
								}
								key={index}
								password={passwords[pwdtype]}
								username={username}
							/>
						))}
					</Row>
				</div>
				<div className="div3">
					<Card title="Полезные ссылки">
						<UsefulLinks />
					</Card>
				</div>
				<div className="div4"></div>
				<div className="div5"></div>
				<div className="div6"></div>
				<div className="div7"></div>
			</div>
		</>
	);
};

export default Dashboard;
