import React, { Component } from 'react'
import './AddTaskView.scss'
import sassColors from '../../_shared.scss'
import Creatable from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import { ipc_get } from '../../util'

const selectStyles = {
  option: (provided) => ({
    ...provided,
    color: sassColors.textColorLight,
  }),
  container: (provided) => ({
    ...provided,
    flexGrow: '1',
    fontFamily: ['Lucida Sans Unicode', 'Lucida Grande', 'sans-serif'],
    fontSize: '12px',
  }),
  valueContainer: (provided) => ({
    ...provided,
    padding: 0,
  }),
}

const selectTheme = (theme) => ({
  ...theme,
  borderRadius: 0,
  colors: {
    primary: sassColors.borderColor,
    primary75: '',
    primary50: sassColors.cardColorDarkest, // item click color
    primary25: sassColors.cardColorDarker, // item hover color
    danger: '#771831', // x button glyph color
    dangerLight: '#D5345F', // x button background color
    neutral0: sassColors.cardColorDark, // background color
    neutral5: '',
    neutral10: sassColors.cardColorDarker, // selected items background
    neutral20: 'transparent', // deselected border
    neutral30: sassColors.borderColor, // hover border color
    neutral40: '',
    neutral50: sassColors.textColorLight, // placeholder text color
    neutral60: sassColors.textColorLight, // carrat color
    neutral70: '',
    neutral80: sassColors.textColorLight, // cursor and selected item text color
    neutral90: '',
  }
})

const animatedComponents = makeAnimated()

export default class AddTaskView extends Component {
  constructor() {
    super()
    this.state = { groups: [], selectedGroups: [] }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleGroupCreate = this.handleGroupCreate.bind(this)
    this.handleValueChange = this.handleValueChange.bind(this)
  }
  render() {
    return (
      <div className='add-task'>
        <center>
          <h2>Add Task</h2>
        </center>
        <form className='task-form'>
          <div className='label-pair'>
                <label htmlFor='title'>
                  <span className='label-text'>Title</span>
                </label>
                <input id='title' name='title' type='text' placeholder='Title' />
          </div>
          <div className='label-pair'>
                <label htmlFor='type'>
                  <span className='label-text'>Group</span>
                </label>
                <Creatable
                  isMulti
                  isClearable
                  components={animatedComponents}
                  createOptionPosition='first'
                  onChange={this.handleValueChange}
                  onCreateOption={this.handleGroupCreate}
                  options={this.state.groups}
                  styles={selectStyles}
                  theme={selectTheme}
                  value={this.state.selectedGroups}
                />
          </div>
          <div className='label-pair'>
            <label htmlFor='due-date'>
              Due Date
            </label>
            <input type='datetime-local' name='due-date' id='due-date' />
          </div>
          <div className='label-pair'>
            <label htmlFor='description'>
              <span className='label-text'>Description</span>
            </label>
            <textarea name='description' id='description' placeholder='Description' />
          </div>
        </form>
        <div className='label-pair'>
          <button className='submit-btn' onClick={this.handleSubmit}>Submit</button>
        </div>
      </div>
    )
  }
  componentDidMount() {
      ipc_get('groups').then((groups) => this.setState({groups: groups}))
  }
  handleSubmit() {
    var task = {
      title: document.getElementById('title').value,
      groups: this.state.selectedGroups.map((group) => group.value),
      due: document.getElementById('due-date').value,
      description: document.getElementById('description').value,
    }
    console.log(task)
    ipc_get('newTask', task).then((response) => console.log(response))
  }
  handleGroupCreate(newValue) {
    var groups = this.state.selectedGroups
    var newOption = {
      label: newValue,
      value: newValue.replace(/\W/g, '_')
    }
    groups.push(newOption)
    this.setState({ selectedGroups: groups })
  }
  handleValueChange(newValue, actionMeta) {
    console.group('Value Changed');
    console.log(newValue);
    console.log(`action: ${actionMeta.action}`);
    console.groupEnd();
    this.setState({ selectedGroups: newValue });
  }
}
