import React from 'react';
import class_catalog from './class_catalog.js';

class StudentInterface extends React.Component {
  constructor(props) {
    let default_value = false;

    super(props)
    this.state = {
      subject: default_value,
      topic: default_value,
      time: default_value
    }

    this.setSubjectOption = this.setSubjectOption.bind(this)
    this.setTopicOption = this.setTopicOption.bind(this)
  }

  setSubjectOption = (event) => {
    this.setState({
      subject: event.target.value,
      topic: this.default_value,
      time: this.default_value
    })
  }

  setTopicOption = (event) => {
    this.setState({topic: event.target.value})
  }

  

  render() {

    let topicOptions;
    const subjectOptions = class_catalog.map((subject) => (
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
            <TextInput fieldName="username" fieldLabel="Username"></TextInput>
            <TextInput fieldName="email" fieldLabel="Email"></TextInput>

            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>
                    Subject:
                    <select 
                      className="form-control"
                      value={this.state.subject}
                      name="subject" 
                      label="Subject:"
                      onChange={this.setSubjectOption}
                    >
                      <option placeholder="Make a selection">Make a selection</option>
                      {subjectOptions}
                    </select>
                  </label>
                </div>
              </div>
            </div>
            
            <div className="row">
              <div className="col">
                <div className="form-group">
                  <label>
                    Topic:
                    <select 
                      className="form-control"
                      value={this.state.topic}
                      name="topic" 
                      label="Topic:"
                      onChange={this.setTopicOption}
                    >
                      <option placeholder="Make a selection">Make a selection</option>
                      {topicOptions}
                    </select>
                  </label>
                </div>
              </div>
            </div>

            <AddClass></AddClass>
          </form>
        </div>


        {/* Table */}
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
              <h1>Simon Younesi's Programming Challenge</h1>
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
            <input className="form-control" type="text" name="{this.props.fieldName}"></input>
          </div>
        </div>
      </div>
    );
  }
}

class OptionComponent extends React.Component {
  render() {
    return(
      <option value={this.props.value}>{this.props.label}</option>
    )
  }
}

class AddClass extends React.Component {
  render() {
    return(
      <button className="btn btn-primary">Add Class</button>
    );
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
