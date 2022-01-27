test('omit days that were skipped', () => {
	const beforeDate = new Date();

	jest.useFakeTimers('modern');
	jest.setSystemTime(new Date(2022, 0, 13));

	const today = new Date();

	expect(today).not.toEqual(beforeDate);
});