// mapping of URL's to routed components
import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import DeckList from './components/deck_list';
import Deck from './components/deck';
import StudyDeck from './components/study_deck';

export default (
	<Route path="/" component={App}>
		<IndexRoute component={DeckList} />
		<Route path="decks/:id">
			<IndexRoute component={Deck} />
			<Route path="study" component={StudyDeck}/>
		</Route>
	</Route>
);