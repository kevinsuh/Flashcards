export function randomizeArray(array) {

	let currentIndex = array.length;
	let temp;
	let randomIndex;

	while (currentIndex !== 0) {

		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex -= 1;

		// swap random index with current element
		temp = array[currentIndex];
		array[currentIndex] = array[randomIndex];
		array[randomIndex] = temp;

	}

	return array;

}