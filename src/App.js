
import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './Header'
import About from './About'
import Footer from './Footer'


const App = () => {
  const [data, setData] = useState([]);
  const [player, setPlayer] = useState("");
  const [baseball, setBaseball] = useState(true);
  const handleChange = (e) => {
    setPlayer(e.target.value);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    getData();
  }
  const getData = async () => {
    const array = [];
    try{
      const url = `https://www.balldontlie.io/api/v1/players?search=${player}`;
      const res = await axios.get(url);
      array.push(res.data);
      setData(array);
      setBaseball(false);
    }catch(e){
      const url = `http://lookup-service-prod.mlb.com/json/named.search_player_all.bam?sport_code='mlb'&active_sw='Y'&name_part=${player}%25`;
      const res = await axios.get(url);
      array.push(res.data);
      setData(array);
      setBaseball(true);
    }
  }
  console.log(data);
  return(
    <Router>
      <Header name={"Sports"} />
      <Route path='/about' component={About}/>
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            onChange={handleChange}
            placeholder="Enter a player"
          />
        </label>
      </form>
      {data.map((data) => {
          return(
            <div className="container" key="data.id">
              <div className="divTable">
              <div className="divTableBody">
                <div className="divTableRow">
                  <div className="divTableCell">Name</div>
                  <div className="divTableCell">{baseball? data.name_first:data.data[0].first_name} {baseball? data.name_first:data.data[0].last_name}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Team</div>
                  <div className="divTableCell">{baseball? data.name_first:data.data[0].team.full_name}</div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Height</div>
                  <div className="divTableCell">
                    {" "}
                    {baseball? data.name_first:data.data[0].height_feet} feet {baseball? data.data.name_first:data.data[0].height_inches} inches
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Weight</div>
                  <div className="divTableCell">
                    {" "}
                    {baseball? data.name_first:data.data[0].weight_pounds} lbs
                  </div>
                </div>
                <div className="divTableRow">
                  <div className="divTableCell">Position</div>
                  <div className="divTableCell">{baseball? data.data.name_first:data.data[0].position}</div>
                </div>
              </div>
            </div>
            </div>
              
          )
        
      })}
      <Footer />

      
      
    </Router>
    
  )
}

export default App;
