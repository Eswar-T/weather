import './App.css';
import React from 'react';
import Button from 'react-bootstrap/Button';
import { Table, Spinner } from 'react-bootstrap';
import * as moment from 'moment'

const App = () => {
  const [cityname, setcityname] = React.useState('');
  const [weatherArr, setWeatherArray] = React.useState({});
  const [showloader, setshowloader] = React.useState(false);
  const fetchMyAPI = async () => {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${cityname}&appid=1635890035cbba097fd5c26c8ea672a1`)
    response = await response.json();
    console.log(response)
    setshowloader(true);
    setTimeout(() => {
      setWeatherArray(response);
      setshowloader(false);
    }, 2000)
  }

  return (
    <div className="App">
      <div className='headerView' >
        <h1 className='title'>Weather in  your city</h1>
        <input className='inputView' value={cityname} onChange={(e) => setcityname(e.target.value)} />
        <Button className='buttonView' onClick={() => fetchMyAPI()}>Search</Button>
        {showloader &&
          <>
            <Spinner animation="border" className='spinnerView' variant="warning" />
          </>
        }
      </div>
      <div className='tableView'>
        {weatherArr?.list?.map((data) => (
          <div className='table-container'>
            <Table bordered>
              <thead>
                <tr>
                  <th className='tableDate' colSpan={2}>Date:{moment(data.dt_txt).format('DD/MM/YYYY')}</th>
                </tr>
                <tr>
                  <th className='contentBgColor' colSpan={2}>Temperature</th>
                </tr>
                <tr>
                  <th className='contentBgColor'>Max</th>
                  <th className='contentBgColor'>Min</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className='contentBgColor'>{data.main.temp_max}</td>
                  <td className='contentBgColor'>{data.main.temp_min}</td>
                </tr>
                <tr>
                  <th>Pressure</th>
                  <td>{data.main.pressure}</td>
                </tr>
                <tr>
                  <th>Humidity</th>
                  <td>{data.main.humidity}</td>
                </tr>
              </tbody>
            </Table>
          </div>
        ))
        }
      </div>

    </div>
  );
}

export default App;
