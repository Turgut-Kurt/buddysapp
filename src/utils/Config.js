const getAge = birthDate =>
  Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e10);

export default {
  baseURL: 'https://onappserver.com',
  getAge,
};
