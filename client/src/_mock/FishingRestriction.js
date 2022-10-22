import { faker } from "@faker-js/faker";
//rabbit hole https://www.youtube.com/watch?v=R6S-b_k-ZKY

const getRandomFishingRestriction = () => {
  return {
    fish: faker.animal.fish(),
    from: faker.date.past(),
    to: faker.date.future(),
    minLength: faker.datatype.number({ max: 100, precision: 0.1 }),
  };
};

export default getRandomFishingRestriction;
