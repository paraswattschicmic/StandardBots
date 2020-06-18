import React from 'react'
import { TextField, Radio, RadioGroup, FormControlLabel } from '@material-ui/core'
import { SketchPicker } from 'react-color'
import './index.css'

interface AppProps {
  //code related to your props goes here
  changeValuesInVisulizer(
    joint0: number,
    joint1: number,
    joint2: number,
    joint3: number,
    joint4: number,
    joint5: number,
    joint6: number,
    joint7: number,
    joint8: number,
    colorValue: string,
    gripperSize: number,
    backgroundColor: string
  ): any
}

interface AppState {
  joint0: number
  joint1: number
  joint2: number
  joint3: number
  joint4: number
  joint5: number
  joint6: number
  joint7: number
  joint8: number
  colorValue: number
  backgroundColor: any
  gripperSize: number
  pickerVisible: boolean
}

class ApiForm extends React.Component<AppProps, AppState> {
  constructor(props: any) {
    super(props)
    // this.palletRef = React.createRef()
    this.state = {
      joint0: 0,
      joint1: 0,
      joint2: 0,
      joint3: 0,
      joint4: 0,
      joint5: 0,
      joint6: 0,
      joint7: 0,
      joint8: 0,
      colorValue: 0,
      backgroundColor: '#ffffff',
      gripperSize: 0,
      pickerVisible: false
    }
  }
  // handleClick = (e: any) => {
  //   console.log('e', e)
  //   // if (this.palletRef && this.palletRef.current.contains(e.target)) {
  //   //   return
  //   // }
  //   this.setState({
  //     pickerVisible: false
  //   });
  // }

  // componentDidMount() {
  //   document.addEventListener('mousedown', this.handleClick)
  // }

  // componentWillUnmount() {
  //   document.removeEventListener('mousedown', this.handleClick)
  // }

  handleValueChange = (value: number) => {
    this.setState({ colorValue: value } as any, () => {
      this.props.changeValuesInVisulizer(
        this.state.joint0,
        this.state.joint1,
        this.state.joint2,
        this.state.joint3,
        this.state.joint4,
        this.state.joint5,
        this.state.joint6,
        this.state.joint7,
        this.state.joint8,
        this.state.colorValue ? 'black' : 'white',
        this.state.gripperSize,
        this.state.backgroundColor
      )
    })
  }

  onBackgroundChange = (value: any) => {
    this.setState({ backgroundColor: value.hex } as any, () => {
      this.props.changeValuesInVisulizer(
        this.state.joint0,
        this.state.joint1,
        this.state.joint2,
        this.state.joint3,
        this.state.joint4,
        this.state.joint5,
        this.state.joint6,
        this.state.joint7,
        this.state.joint8,
        this.state.colorValue ? 'black' : 'white',
        this.state.gripperSize,
        this.state.backgroundColor
      )
    })
  }

  onChangeValue = (event: any) => {
    this.setState({ [event.target.name]: event.target.value } as any, () => {
      this.props.changeValuesInVisulizer(
        this.state.joint0,
        this.state.joint1,
        this.state.joint2,
        this.state.joint3,
        this.state.joint4,
        this.state.joint5,
        this.state.joint6,
        this.state.joint7,
        this.state.joint8,
        this.state.colorValue ? 'black' : 'white',
        this.state.gripperSize,
        this.state.backgroundColor
      )
    })
  }

  render() {
    return (
      <div style={{ backgroundColor: 'white', scrollBehavior: 'auto', overflowY: 'auto', minHeight: '50%' }}>
        <form noValidate autoComplete="off" className="input-form">
          <TextField
            id="outlined-basic"
            name={'gripperSize'}
            label="Gripper Open Percent"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          {/* <TextField
            classes={{
              root: 'input-box'
            }}
            className={'input-fields'}
            id="outlined-basic"
            name={'joint0'}
            label="Join 0 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          /> */}
          <TextField
            id="outlined-basic"
            name={'joint1'}
            label="Join 1 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint2'}
            label="Join 2 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint3'}
            label="Join 3 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint4'}
            label="Join 4 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint5'}
            label="Join 5 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint6'}
            label="Join 6 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint7'}
            label="Join 7 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <TextField
            id="outlined-basic"
            name={'joint8'}
            label="Join 8 Radians"
            variant="outlined"
            type={'number'}
            onChange={this.onChangeValue}
          />
          <RadioGroup
            aria-label="position"
            name="colorValue"
            value={this.state.colorValue}
            onChange={event => this.handleValueChange(Number(event.target.value))}
            row
          >
            <label>{'Toggle Color '}</label>
            {[
              { label: 'White', value: 0 },
              { label: 'Black', value: 1 }
            ].map((item, index) => {
              return (
                <FormControlLabel
                  checked={index === this.state.colorValue ? true : false}
                  key={item.value}
                  value={item.value}
                  control={<Radio color="primary" />}
                  label={item.label ? item.label : ''}
                  className="form-group"
                  labelPlacement="end"
                />
              )
            })}
          </RadioGroup>
          <div
            // ref={this.palletRef}
            className={'color-picker-container'}
            onClick={() => this.setState({ pickerVisible: !this.state.pickerVisible })}
          >
            <label>{'Background Color '}</label>
            <div className={'background-indicator'}>
              <span
                className={'color-pallete'}
                onClick={() => this.setState({ pickerVisible: !this.state.pickerVisible })}
                style={{ backgroundColor: this.state.backgroundColor }}
              >
                &nbsp;
              </span>
              <label>{this.state.backgroundColor}</label>
            </div>
          </div>
          {this.state.pickerVisible && (
            <SketchPicker color={this.state.backgroundColor} onChangeComplete={color => this.onBackgroundChange(color)} />
          )}
        </form>
      </div>
    )
  }
}

export default ApiForm
