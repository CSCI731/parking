export const borough = (boro) => {
  switch (boro) {
    case 'B':
      return 'Bronx';
    case 'K':
      return 'Brooklyn';
    case 'M':
      return 'Manhattan';
    case 'Q':
      return 'Queens';
    case 'S':
      return 'Staten Island';
    default:
      return boro;
  }
};

export const sideOfStreet = (sos) => {
  switch (sos) {
    case 'N' :
      return 'North';
    case 'S':
      return 'South';
    case 'E':
      return 'East';
    case 'W':
      return 'West';
    default:
      return sos;
  }
};

export default {
  borough,
  sideOfStreet,
}