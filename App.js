import React from 'react';
import { Button, StyleSheet, Text, View, Vibration } from 'react-native';

let BREAK_TIME = 5*60;
let WORK_TIME = 25*60;

const ONE_SECOND_IN_MS = 1000;

const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  2 * ONE_SECOND_IN_MS,
  3 * ONE_SECOND_IN_MS
];

export default class App extends React.Component {

  constructor(props){
    super(props);
    this.state = { 
      counter: WORK_TIME, 
      isWorking: true,
      isPaused: true
    };
  }

  componentDidMount(){
    this.interval = setInterval(() => this.dec(), 1000);
  }

  componentWillUnmount(){
    clearInterval(this.interval);
  }

  stop() {
    this.setState((prevState) => ({ 
      counter: this.state.counter,
      isWorking: this.state.isWorking,
      isPaused: true 
    }));
  }

  start() {
    this.setState((prevState) => ({ 
      counter: this.state.counter,
      isWorking: this.state.isWorking,
      isPaused: false
    }));
  }

  reset() {
    this.setState((prevState) => ({ 
      counter: WORK_TIME, 
      isWorking: true,
      isPaused: true
    }));
  }

  dec() {
    if (!this.state.isPaused) {
      if(this.state.counter == 0) {
        Vibration.vibrate(PATTERN)
        if(this.state.isWorking){
          this.setState(prevState => ({ counter: BREAK_TIME, isWorking: !this.state.isWorking, isPaused: this.state.isPaused }));
        }else{
          this.setState(prevState => ({ counter: WORK_TIME, isWorking: !this.state.isWorking, isPaused: this.state.isPaused }));
        }
      }else{
        this.setState(prevState => ({ counter: this.state.counter - 1, isWorking: this.state.isWorking, isPaused: this.state.isPaused }));
      }
    }
    
  }


  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.isWorking ? "WORKING" : "NOT WORKING"}</Text>
        <Text>Minutes: {parseInt((this.state.counter) / 60)}, Seconds: {this.state.counter % 60}</Text>
        <View style={styles.container2}>
          <Button onPress={() => {this.start()}} title="start"></Button>
          <Button onPress={() => {this.stop()}} title="stop"></Button>
          <Button onPress={() => {this.reset()}} title="reset"></Button>
        </View>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container2: {
    display: "flex",
    flexDirection: "row"
  }
});

