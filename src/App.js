import React, { Component } from 'react';

class StudentInterface extends React.Component {

  render() {
    return (
      <div className="container">
        {/* Introductory text */}
        <Introduction></Introduction>


        {/* Form */}
        <MyForm></MyForm>


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
  constructor(props){
    super(props);
  }
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

class SelectInput extends React.Component {
  render() {
    return(
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>
              {this.props.fieldLabel}
              <select name="{this.props.fieldName}" className="form-control">
                <option selected disabled value="">Make a selection</option>
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

class UsernameInput extends TextInput {
  constructor(props){
    super(props);
  }
  render() {
    return(
    <TextInput fieldName="username" fieldLabel="Username"></TextInput>
    );
  }
}

class EmailInput extends React.Component {
  constructor(props){
    super(props);
  }
  render() {
    return(
    <TextInput fieldName="email" fieldLabel="Email"></TextInput>
    );
  }
}

class SubjectSelect extends SelectInput {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <SelectInput fieldName="subject" fieldLabel="Subject"></SelectInput>
    );
  }
}

class TopicSelect extends SelectInput {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <SelectInput fieldName="topic" fieldLabel="Topic"></SelectInput>
    );
  }
}

class TimeSelect extends SelectInput {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <SelectInput fieldName="time" fieldLabel="Time"></SelectInput>
    );
  }
}

class AddClass extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <button className="btn btn-primary">Add Class</button>
    );
  }
}


class MyForm extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return(
      <div className="container">
        <form>
          <UsernameInput></UsernameInput>
          <EmailInput></EmailInput>
          <SubjectSelect></SubjectSelect>
          <TopicSelect></TopicSelect>
          <TimeSelect></TimeSelect>
          <AddClass></AddClass>
        </form>
      </div>
    );
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous" />
      </header>
      <main>
        <StudentInterface></StudentInterface>
      </main>
    </div>
  );
}

export default App;
