import React from 'react';
import { Space } from 'antd';
import { useSelector } from 'react-redux';
import { ToolTwoTone, DatabaseTwoTone, PieChartTwoTone, UnlockTwoTone } from '@ant-design/icons';

const UsefulLinks = () => {
	const { infralogins } = useSelector(({ projects }) => projects.userInfo);
	const [statisticLink, setStatisticLink] = React.useState(null);
	const links = [
		{
			title: 'Заявить о проблеме',
			link: 'http://script.kolocall.com/includes/iticket',
			icon: <ToolTwoTone />,
		},
		{
			title: 'TeamPass',
			link: 'http://192.168.137.103/teampass',
			icon: <UnlockTwoTone />,
		},
		{
			title: 'Статистика',
			link: statisticLink,
			icon: <PieChartTwoTone />,
		},
		{
			title: 'Админраздел',
			link: 'http://admin.kolocall.com',
			icon: <DatabaseTwoTone />,
		},
		{
			title: 'График перерывов',
			link: 'https://docs.google.com/spreadsheets/d/1auMh2uKQ3Mv_CbzpmLIfwk1SZutVh7aGsn8HfoIEH5s/edit?pli=1#gid=1948876889',
			icon: <ToolTwoTone />,
		},
		{
			title: 'Обратная связь',
			link: 'https://docs.google.com/forms/d/e/1FAIpQLScRFy32-HM2aDESYfgWBysLXMZ3wa6E-EPpc1-RfQIsDePL4w/viewform',
			icon: <ToolTwoTone />,
		},
	];

	const getStatisticLink = () => {
		const dataType = '&data_type=html#';
		let baseLink =
			'http://192.168.137.102/operstatistics/ru/agent.asp?report=0&period=1&details=7&disableEmptyRow=on';

		for (let i = 0; i < infralogins.length; i++) {
			let login = infralogins[i].username;

			baseLink += `&category=KOLOCALLN%5C${login}`;
		}

		setStatisticLink(baseLink + dataType);
	};

	React.useEffect(() => {
		getStatisticLink(); // eslint-disable-next-line
	}, []);

	return (
		<Space direction="vertical">
			{links.map((link) => (
				<a key={link.title} href={link.link} rel="noreferrer" target="_blank">
					{link.title}
				</a>
			))}
		</Space>
	);
};

export default UsefulLinks;
