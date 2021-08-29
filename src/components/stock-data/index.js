import React from "react";
import "./index.css";
class stockData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recordFlag: -1,
      liTag: []
    }
    this.search = this.search.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  search() {

    this.fetchData();

  }
  handleChange({ target }) {
    this.setState({
      [target.name]: target.value
    })
  }
  fetchData = () => {
    return fetch(`https://jsonmock.hackerrank.com/api/stocks?date=${this.state.textBox}`).then((response) => response.json()).then((data) => {
      let tempList;
      if (data && data.data.length > 0) {
        tempList = data.data.map((item, i) => {
          return (
            <div>
              <li key={i} className="py-10" value={item.date}>Open : {item.open}</li>
              <li key={i} className="py-10" value={item.date}>Close: {item.close}</li>
              <li key={i} className="py-10" value={item.date}>High: {item.high}</li>
              <li key={i} className="py-10" value={item.date}>Low: {item.low}</li>
            </div>
          )
        });



        this.setState({
          liTag: tempList,
          recordFlag: 1
        })
      }
      else {


        this.setState({
          recordFlag: 0
        })
      }
    }
    );
  }
  render() {
    return (
      <div className="layout-column align-items-center mt-50">
        <section className="layout-row align-items-center justify-content-center">
          <input name="textBox" value={this.state.texVal} type="text" onChange={this.handleChange} className="large" placeholder="5-January-2000" id="app-input" data-testid="app-input" />
          <button className="" id="submit-button" data-testid="submit-button" onClick={this.search}>Search</button>
        </section>
        <ul className="mt-50 slide-up-fade-in styled" id="stockData" data-testid="stock-data">
          {this.state.liTag}
        </ul>
        <div className="mt-50 slide-up-fade-in" id="no-result" data-testid="no-result"> {(this.state.recordFlag === 0 ? "No Record Found" : "")}</div>
      </div>
    );
  }
}

export default stockData;