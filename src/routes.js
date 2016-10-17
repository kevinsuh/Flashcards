// mapping of URL's to routed components
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DeckList from './components/deck_list';
import Deck from './components/deck';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={DeckList} />
		<Route path="decks/:id" component={Deck} />
	</Route>
);