import { faker } from "@faker-js/faker";
//pieni easter egg tähän :)) https://www.youtube.com/watch?v=R6S-b_k-ZKY

const getRandomLake = () => {
  return faker.address.cityName() + " lake";
};

export default getRandomLake;
