import React from 'react';
import PageLayout from './PageLayout.jsx';
import PageTitle from './PageTitle.jsx';

export const AboutPage = () => {
	return (
		<PageLayout>
			<PageTitle/>
			<div>
				<h2> About </h2>
				<p> Search youtube subs for what you want </p>
			</div>
		</PageLayout>
	);
};

export const ContactsPage = () => {
	return (
		<PageLayout>
			<PageTitle/>
			<div>
				<h2> Contacts </h2>
				<p> Anton Shevchenya </p>
			</div>
		</PageLayout>
	);
};
