import React, { Component } from 'react'
import './App.css'
import 'font-awesome/css/font-awesome.min.css'
import Collapsible from 'react-collapsible'

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      items: [],
      tags: [],
      isLoaded: false,
    }
  }

  componentDidMount() {

    const url = 'https://www.hatchways.io/api/assessment/students';

    fetch(url)
      .then(results => results.json())
      .then(json => {
        
        let data = json.students.map((student) => {

        return (
            <div className="students" key={student.id}>
              
              <img alt="Student Profile" src={student.pic}/>
              
              <h1>{student.firstName} {student.lastName}</h1>
              <ul key={student.id}>
                <li>Email: {student.email}</li>
                <li>Company: {student.company}</li>
                <li>Skill: {student.skill}</li>
                <li>Average: {student.grades.map(Number).reduce((a, b) => a + b) / student.grades.length}%</li>
              </ul>

              <Collapsible trigger="+">
                <ul key={student.id}>
                  {student.grades.map((grade, i) => {
                    return (
                      <li>Test {i+1}: {grade}%</li>
                    )
                  })}
                    <br />
                  <input placeholder="Add tag..." className="tagInput" key={student.id} onKeyDown={(e) => {this.addTag(e, student.id)}} />
                  {console.log(this.state.tags)}
                <br/>
                </ul>
              </Collapsible>
              

              <div className="content-collapse"></div>
            </div>
        )
        });

        this.setState({
          isLoaded: true,
          items: data
        })
        
      });

  }

  addTag = (e) => {

    if (e.key === 'Enter') {

        this.setState({
          tags: e.target.value
        })
      }
  }
  
  render() {

    var { isLoaded, items } = this.state;
    
    if (!isLoaded) {
      return <div className="students">Loading...</div>
    }
    else {
      return (
        <div className="App">

        <div className="search-bars">
          <input type="text" placeholder="Search by name..." /><br />
          <input type="text" placeholder="Search by tag..." />
        </div>

          {items}

        </div>
      );
    }
  }

  // showContent(index) {

    

  // }

}

export default App;
