# Simple Flashcard App

This is a simple flashcard app. This allows you to create study decks and add cards to each deck. You are able to enter "Study Mode" for each deck to answer the questions and keep track of which questions you most recently got right and wrong.

It is built using React + Redux. 

## Requirements
You will need Node installed. This program expects Node to be installed at `/usr/bin/node`. This
script was tested working on Node v5.10.1 on OSX but is likely to work on most other
configurations as well.

## Getting Started
Clone this repo and install the dependencies.
```
git clone https://github.com/kevinsuh/Flashcards.git
cd SimpleFlashcard
npm install
```
We use [webpack](https://webpack.github.io/) with a [babel-loader](https://github.com/babel/babel-loader) to bundle and transpile our modules. We use [webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html) to host this app on our local server. It will be available at `localhost:8080`. To run webpack and this dev server:
```
npm run start
```

You will see your terminal update whenever your bundle is recompiled (changes are made). While this is listening, you can go to `localhost:8080` to visit the app.

## Program Design
Its backend is currently mocked in order to showcase the app functionality. It comes preloaded with "Math" and "Computer Science" study decks. Our mock data is in `/src/storage` and our mock REST API calls are in `/src/api`. We run a backend load with this initial data for each of our 3 router pages (`localhost:8080`, `localhost:8080/decks/1`, `localhost:8080/decks/1/study`, in case you refresh the page or go there directly.

The root view of this application is a list of study decks. It will show the most recent number of cards that you got correct vs. incorrect. If you recently added a card and have not answered it in study mode, it is referred to as a "new" card. Once you enter study mode and get it wrong or right, it will move to the correct / incorrect box.

You can click on a deck to see the list of question + answer cards associated with the deck. You are able to enter "Study Mode" to answer each of the questions one by one. Once you reach the end of your questions and "Confirm", then the statuses for each of the cards will get updated to how you did on this most recent study (`correct`, `incorrect`, or `pristine`).

## Testing
To run tests, simply run:
```npm run test```
To run tests on every change, run:
```npm run test:watch```

The test will run some basic tests to see if the components have rendered as expected. It will also run a test to make sure the spacing algorithm is correct with one full run of study mode.