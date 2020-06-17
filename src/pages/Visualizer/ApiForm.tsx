import React from 'react'
import TextField from '@material-ui/core/TextField'
import './index.css'

interface AppProps {
  //code related to your props goes here
  changeValuesInVisulizer(joint0: number, joint1: number, joint2: number, joint3: number, joint4: number, joint5: number): any
}

interface AppState {
  joint0: number
  joint1: number
  joint2: number
  joint3: number
  joint4: number
  joint5: number
}

class ApiForm extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      joint0: 0,
      joint1: 0,
      joint2: 0,
      joint3: 0,
      joint4: 0,
      joint5: 0
    }
  }
  onChangeText = (event: any) => {
    console.log(event.target.name, 'event', event.target.value)
    this.setState({ [event.target.name]: event.target.value } as any, () => {
      this.props.changeValuesInVisulizer(
        this.state.joint0,
        this.state.joint1,
        this.state.joint2,
        this.state.joint3,
        this.state.joint4,
        this.state.joint5
      )
    })
  }
  render() {
    return (
      <div style={{ backgroundColor: 'white' }}>
        <form noValidate autoComplete="off" className="input-form">
          <TextField
            classes={{
              root: 'input-box'
            }}
            id="outlined-basic"
            name={'joint0'}
            label="Join 0 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeText}
          />
          <TextField
            id="outlined-basic"
            name={'joint1'}
            label="Join 1 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeText}
          />
          <TextField
            id="outlined-basic"
            name={'joint2'}
            label="Join 2 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeText}
          />
          <TextField
            id="outlined-basic"
            name={'joint3'}
            label="Join 3 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeText}
          />
          <TextField
            id="outlined-basic"
            name={'joint4'}
            label="Join 4 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeText}
          />
          <TextField
            id="outlined-basic"
            name={'joint5'}
            label="Join 5 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeText}
          />
        </form>
      </div>
    )
  }
}

export default ApiForm
