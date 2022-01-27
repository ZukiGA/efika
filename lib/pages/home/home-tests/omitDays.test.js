import omitDays from "../../../reducers/reducers-utils/omitDays";

const daysToDo = {
	2021: { 11: {
		 15: 'today',
		 27: 'next'
	  } },
	2022: {
	  0: {
		 2: 'next',
	  },
	},
 };

 const daysToDoOmitted = {
	2021: {
	  11: {
		 15: 'omitted',
		 27: 'omitted'
	  },
	},
	2022: {
	  0: {
		 2: 'omitted',
	  },
	},
 };

const today = new Date(2021, 11, 15);
const nextDay = new Date(2022, 0, 13);

test('omit days over 1 month', () => {
	expect(omitDays(daysToDo, today, nextDay)).toEqual(daysToDoOmitted);
});
