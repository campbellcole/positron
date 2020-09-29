import React, { Component } from 'react'
import './AddTaskView.scss'
import sassColors from '../../_shared.scss'
import Creatable from 'react-select/creatable'
import makeAnimated from 'react-select/animated'
import CenterCard, { CenterCardButton } from '../../components/CenterCard/CenterCard'
import LabelledInput from '../../components/LabelledInput/LabelledInput'
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
      <CenterCard title='Add Task'>
        <LabelledInput id='title' title='Title' type='text' />
        <LabelledInput id='group' title='Group' render={() => (
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
        )}/>
        <LabelledInput id='due-date' title='Due Date' type='datetime-local' />
        <LabelledInput id='description' title='Description' render={() => (
          <textarea name='description' id='description' placeholder='Description' />
        )}/>
        <LabelledInput render={() => (
          <CenterCardButton onClick={this.handleSubmit}>Submit</CenterCardButton>
        )}/>
      </CenterCard>
    )
  }
  componentDidMount() {
      ipc_get('groups').then((groups) => this.setState({groups: groups}))
  }
  handleSubmit() {
    var task = {
      id: -1,
      title: document.getElementById('title').value,
      dueDate: document.getElementById('due-date').value,
      description: document.getElementById('description').value,
      url: '',
      groups: this.state.selectedGroups.map((group) => group.value),
      completed: false
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
