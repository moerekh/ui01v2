import React from 'react';
import class_catalog from './class_catalog.js';

class StudentInterface extends React.Component {
  constructor(props) {
    let default_value = false;

    super(props)

    this.state = {
      username: default_value,
      email: default_value,
      subject: default_value,
      topic: default_value,
      time: default_value,
      time_value: default_value,
      schedule: []
    }

    this.setUserName = this.setUserName.bind(this)
    this.setUserEmail = this.setUserEmail.bind(this)
    this.setSubjectOption = this.setSubjectOption.bind(this)
    this.setTopicOption = this.setTopicOption.bind(this)
    this.setTimeOption = this.setTimeOption.bind(this)
    this.addClassButton = this.addClassButton.bind(this)
  }

  setUserName = (event) => {
    this.setState({
      username: event.target.value
    })
  }

  setUserEmail = (event) => {
    this.setState({
      email: event.target.value
    })
  }

  setSubjectOption = (event) => {
    this.setState({
      subject: event.target.value,
      topic: this.default_value,
      time: this.default_value,
      time_value: this.default_value
    })
  }

  setTopicOption = (event) => {
    this.setState({
      topic: event.target.value,
      time: this.default_value,
      time_value: this.default_value
    })
  }

  setTimeOption = (event) => {
    /** regex should reflect the following:
     * matched_time[0] === "HH:MM AM/PM"
     * matched_time[1] === "HH"
     * matched_time[2] === "MM"
     * matched_time[3] === "AM/PM"
    */
    let time_regex   = new RegExp(/(\d+)\D(\d+)\s(\w+)/),
        matched_time = event.target.value.match(time_regex),
        new_time     = parseInt(matched_time[1]);
    
    if (matched_time[1] === 12 && matched_time[3] === "AM") {
      matched_time[1] = 0;
    }
    
    if (matched_time[1] < 12 &&
        matched_time[3] === 'PM') {
          new_time = new_time + 12;
    }

    this.setState({
      time: event.target.value,
      time_value: new_time
    })
      
  }

  addClassButton = (event) => {
    event.preventDefault();

    if (!this.state.subject ||
        !this.state.topic ||
        !this.state.time) {
          return false;
    }

    let new_schedule = this.state.schedule.slice();
    new_schedule.push({
      subject: this.state.subject,
      topic: this.state.topic,
      time: this.state.time,
      time_value: this.state.time_value
    })
    this.setState({
      schedule: new_schedule,
      subject: this.default_value,
      topic: this.default_value,
      time: this.default_value,
      time_value: this.default_value
    });
  }

  render() {

    let topicOptions;
    let timeOptions;
    let subjectOptions;

    subjectOptions = class_catalog.map((subject) => (
      <OptionComponent 
        key={subject.name}
        value={subject.name}
        label={subject.name}
      ></OptionComponent>
    ))

    if (this.state.subject) {
      for(let subject in class_catalog) {
        let s = class_catalog[subject];
        
        if (s.name === this.state.subject) {
          let topics = s.topics;
          topicOptions = topics.map(topic => (
            <OptionComponent 
              key={topic.name}
              value={topic.name}
              label={topic.name}
            ></OptionComponent>
          ))

          if (this.state.topic) {
            for (let topic in topics) {
              let t = topics[topic];

              if (t.name === this.state.topic) {
                timeOptions = t.times.map((p) => (
                  <OptionComponent 
                    key={p}
                    value={p}
                    label={p}
                  ></OptionComponent>
                ))
              }
            }
          }
        }
      }
    }

    return (
      <div className="container">
        {/* Introductory text */}
        <Introduction></Introduction>


        {/* Form */}
        <div className="container">
          <form>

          <div className="row">
            <div className="col">
              <TextInput 
                fieldName="username" 
                fieldLabel="Username"
                onChange={this.setUserName}
              ></TextInput>

              <TextInput 
                fieldName="email" 
                fieldLabel="Email"
                onChange={this.setUserEmail}  
              ></TextInput>
            </div>

            <div className="col">
              <SelectSection
                label="Subject:"
                name="subject"
                onChange={this.setSubjectOption}
              >
                {subjectOptions}
              </SelectSection>
              
              <SelectSection
                label="Topic:"
                name="topic"
                onChange={this.setTopicOption}
              >
                {topicOptions}
              </SelectSection>

              <SelectSection
                label="Time:"
                name="time"
                onChange={this.setTimeOption}
              >
                {timeOptions}
              </SelectSection>
            </div>
          </div>            

          <div className="row">
            <div className="col">
              <button 
                className="btn btn-primary"
                onClick={this.addClassButton}
              >
                Add Class
              </button>
            </div>
          </div>
            
          </form>
        </div>

        <hr/>

        {/* Table */}
        <DisplayClassSchedule
          schedule = {this.state.schedule}
          username = {this.state.username}
          email = {this.state.email}
        ></DisplayClassSchedule>
      </div>
    )
  }
}

class Introduction extends React.Component {

  render() {
      return(
        <div className="container">
          <div className="row">
            <div className="col">
              <h1>ReactJS App:  Class Schedule Maker</h1>
            </div>
          </div>
        </div>
      );
  }
}

class TextInput extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>{this.props.fieldLabel}:</label>
            <input 
              className="form-control" 
              type="text" 
              name={this.props.fieldName}
              onChange={this.props.onChange}
            ></input>
          </div>
        </div>
      </div>
    );
  }
}

class SelectSection extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>
              {this.props.label}
              <select 
                className="form-control"
                name={this.props.name}
                label={this.props.label}
                onChange={this.props.onChange}
              >
                <option placeholder="Make a selection">Make a selection</option>
                {this.props.children}
              </select>
            </label>
          </div>
        </div>
      </div>
    )
  }
}

class OptionComponent extends React.Component {
  render() {
    return(
      <option value={this.props.value}>{this.props.label}</option>
    )
  }
}

class DisplayClassSchedule extends React.Component {

  render() {
    return(
      <div className="table_info">
        <div className="row">
            <div className="col">
            <div className="username">
            <p>Username:  {this.props.username}</p>
          </div>
          <div className="email">
            <p>Email:  {this.props.email}</p>
          </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <table className="table">
              <thead>
                <tr>
                  <th>Subject</th>
                  <th>Topic</th>
                  <th>Time</th>
                </tr>
              </thead>
              <tbody>
                <GetSchedule
                  schedule={this.props.schedule}
                ></GetSchedule>
              </tbody>
            </table>
          </div>
          </div>
        </div>
        
    )
  }
}

class GetSchedule extends React.Component {
  render() {
    if (this.props.schedule.length === 0) {
      return <ReceivedNoSchedule></ReceivedNoSchedule>;
    }

    if (this.props.schedule.length > 0) {
      return <PrintSchedule
          schedule={this.props.schedule}
      ></PrintSchedule>;
    }
  }
}

class PrintSchedule extends React.Component {
  render() {
    let classes = this.props.schedule.sort((a, b) => (a['time_value'] > b['time_value'])? 1 : -1);

    let printSchedule = classes.map((course) => (
      <tr key={course.topic + course.value}>
          <td>{course.subject}</td>
          <td>{course.topic}</td>
          <td>{course.time}</td>
        </tr>
    ))
    return (
      <>
        {printSchedule}
      </>
    )
  }
}

class ReceivedNoSchedule extends React.Component {
  render() {
    return(
      <tr><td colSpan="3">No class schedule available</td></tr>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossOrigin="anonymous" />
      </header>
      <main>
        <StudentInterface></StudentInterface>
      </main>
    </div>
  );
}

export default App;
