import React from 'react';
import class_catalog from './class_catalog.js';

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
    const options = class_catalog.map((subject) => (
      <option value={subject.name}>{subject.name}</option>
    ))

    return(
      <div className="row">
        <div className="col">
          <div className="form-group">
            <label>
              {this.props.label}
              <select name="{this.props.name}" className="form-control">
                <option selected disabled value="">Make a selection</option>
                {options}
              </select>
            </label>
          </div>
        </div>
      </div>
    );
  }
}

class UsernameInput extends TextInput {
  render() {
    return(
    <TextInput fieldName="username" fieldLabel="Username"></TextInput>
    );
  }
}

class EmailInput extends React.Component {
  render() {
    return(
    <TextInput fieldName="email" fieldLabel="Email"></TextInput>
    );
  }
}

class AddClass extends React.Component {
  render() {
    return(
      <button className="btn btn-primary">Add Class</button>
    );
  }
}


class MyForm extends React.Component {
  render() {
    return(
      <div className="container">
        <form>
          <UsernameInput></UsernameInput>
          <EmailInput></EmailInput>
          <SelectInput 
            name="subject" 
            label="Subject:"
          >
          </SelectInput>
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
