import React from 'react';
import { Layout, Menu } from 'antd';
import { Switch, Route, Link, Redirect } from 'react-router-dom';
import {
	Dashboard,
	Project,
	EditProject,
	EditUser,
	CreateUser,
	User,
	EditInfrapwd,
	CreateInfrapwd,
	Infrapwd,
	Infralogins,
	Changes,
} from './index';
import {
	ProjectOutlined,
	UserOutlined,
	UnorderedListOutlined,
	ContactsOutlined,
	InfoCircleOutlined,
} from '@ant-design/icons';
import { useSelector } from 'react-redux';

import UserBlock from '../components/UserBlock';

import logo from '../assets/img/logo.svg';
import brandLogo from '../assets/img/brand_logo.svg';

const { Header, Content, Sider } = Layout;

const Home = ({ onSuccessLogout }) => {
	// let location = useLocation();
	const [collapsed, setCollapsed] = React.useState(false);

	const { userInfo } = useSelector(({ projects }) => projects);

	// const isAdmin = userInfo.role === 0;
	const role = userInfo.role;
	const isResourceAvailable = role === 1 || role === 0;

	const onCollapse = () => {
		setCollapsed((prev) => !prev);
	};

	return (
		<Layout>
			<Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
				<div className="brand-logo">
					{/* <Link to="/"> */}
					<img src={collapsed ? brandLogo : logo} alt="logo" />
					{/* </Link> */}
				</div>
				<Menu className="menu" theme="dark" defaultSelectedKeys={['/dash']} mode="inline">
					<Menu.Item key="/dash" icon={<ProjectOutlined />}>
						<Link to="/dash">Дашборд</Link>
					</Menu.Item>
					<Menu.Item key="/changes" icon={<InfoCircleOutlined />}>
						<Link to="/changes">Изменения</Link>
					</Menu.Item>
					{
						//Оператор
						role === 2 && (
							<>
								<Menu.Item key="/schedule" icon={<UnorderedListOutlined />}>
									<Link to="/schedule">График</Link>
								</Menu.Item>
							</>
						)
					}
					{
						//Админ или супервайзер
						isResourceAvailable && (
							<>
								<Menu.Divider style={{ backgroundColor: '#002140' }} />
								<Menu.Item key="/projects" icon={<UnorderedListOutlined />}>
									<Link to="/projects">Проекты</Link>
								</Menu.Item>
								<Menu.Item key="/users" icon={<UserOutlined />}>
									<Link to="/users">Пользователи</Link>
								</Menu.Item>
								<Menu.Item key="/infrapwds" icon={<ContactsOutlined />}>
									<Link to="/infrapwds">Доступы в ICC</Link>
								</Menu.Item>
							</>
						)
					}
				</Menu>
			</Sider>
			<Layout>
				<Header>
					<UserBlock onLogout={onSuccessLogout} />
				</Header>
				<Content
					className="site-layout"
					style={{
						padding: '0 32px',
					}}>
					<Switch>
						<Route exact path="/dash">
							<Dashboard />
						</Route>
						<Route exact path="/changes">
							<Changes />
						</Route>
						<Route exact path="/infralogins">
							<Infralogins />
						</Route>
						{
							//Оператор
							role === 2 && (
								<Switch>
									<Route exact path="/schedule">
										<div>В разработке...</div>
									</Route>
								</Switch>
							)
						}

						{
							//Админ или супервайзер
							isResourceAvailable && (
								<Switch>
									<Route exact path="/projects">
										<Project />
									</Route>
									<Route exact path="/projects/:id/edit">
										<EditProject />
									</Route>
									<Route exact path="/users">
										<User />
									</Route>
									<Route exact path="/users/:id/edit">
										<EditUser />
									</Route>
									<Route exact path="/users/create">
										<CreateUser />
									</Route>
									<Route exact path="/infrapwds">
										<Infrapwd />
									</Route>
									<Route exact path="/infrapwds/:id/edit">
										<EditInfrapwd />
									</Route>
									<Route exact path="/infrapwds/create">
										<CreateInfrapwd />
									</Route>
									<Redirect to="/" />
								</Switch>
							)
						}

						<Redirect to="/" />
					</Switch>
				</Content>
			</Layout>
		</Layout>
	);
};

export default Home;
