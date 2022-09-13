import React from 'react';
import { Col, Card, Typography } from 'antd';
import { Link } from 'react-router-dom';
// import ClipboardCopy from './ClipboardCopy';

const { Paragraph } = Typography;

const UserPasswords = ({ title, password, username }) => {
	return (
		<Col span={12}>
			<Card
				title={`Доступ в ${title}`}
				extra={title === 'InfraCallCenter' ? <Link to="/infralogins">Все</Link> : null}>
				<div>
					<b>Логин:</b>
					<Paragraph
						className="inline-paragraph"
						copyable={{
							tooltips: false,
						}}>
						{username}
					</Paragraph>
				</div>
				<div>
					<b>Пароль:</b>
					<Paragraph
						className="inline-paragraph"
						copyable={{
							tooltips: false,
						}}>
						{password}
					</Paragraph>
				</div>
			</Card>
		</Col>
	);
};

export default UserPasswords;
