const express = require('express');
const app = express();
const port = 3001;

const mockData = [
  {
    confirmationCode: 'AAAAAA',
    checkInDate: '2020-01-10',
    checkOutDate: '2020-02-14',
    city: 'San Francisco, CA',
    rating: null,
    cityImage:
      'https://cdn.pixabay.com/photo/2013/11/13/21/14/san-francisco-210230_960_720.jpg',
    locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
  },
  {
    confirmationCode: 'BBBBBB',
    checkInDate: '2020-02-10',
    checkOutDate: '2020-03-14',
    city: 'Los Angeles, CA',
    rating: 3,
    cityImage:
      'https://cdn.pixabay.com/photo/2016/10/25/12/28/los-angeles-1768743_960_720.jpg',
    locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
  },
  {
    confirmationCode: 'CCCCCC',
    checkInDate: '2020-04-10',
    checkOutDate: '2020-04-14',
    city: 'New York City, NY',
    rating: 5,
    cityImage:
      'https://cdn.pixabay.com/photo/2016/01/19/18/00/city-1150026_960_720.jpg',
    locationDetail: 'Kasa Sand Diego at Aperture\nApartment 203'
  }
];
const reservationMap = mockData.reduce((result, res) => {
  return {
    ...result,
    [res.confirmationCode]: res
  };
}, {});

mockData.map((reservation) => {
  app.get(
    `/reservations/${reservation.confirmationCode}`,
    (req, res) => {
      res.set('Access-Control-Allow-Origin', '*')
      res.json(reservationMap[reservation.confirmationCode])
    },
  );
});

app.get('/reservations', (req, res) => {
  res.set('Access-Control-Allow-Origin', '*')
  res.json(mockData.map(res => res))
});

app.get('/reservations/*', (req, res) => {
  console.log('404');
  res.set('Access-Control-Allow-Origin', '*')
  res.status(404).send();
})


app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
