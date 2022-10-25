import React from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import StreamList from './StreamList';
import StreamCreate from './StreamCreate';
import StreamEdit from './StreamEdit';
import StreamDelete from './StreamDelete';
import StreamShow from './StreamShow';

const App = () => {
	return (
		<div>
			<BrowserRouter>
				<div>
					<Route path='/' exact component={StreamList} />
					<Route path='/streams/new' component={StreamCreate} />
					<Route path='/streams/edit' component={StreamEdit} />
					<Route path='/streams/delete' component={StreamDelete} />
					<Route path='/streams/show' component={StreamShow} />
				</div>
			</BrowserRouter>
		</div>
	);
};

export default App;