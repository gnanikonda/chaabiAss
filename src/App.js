import { Route, Switch } from "react-router-dom";
import { Component } from "react";

import "./App.css";

class App extends Component {
  state = {
    input: "",
    displayText: "",
    correct: true,
    combinationLength: 3,
    timer: 0,
    mins: 0,
    countTime: true,
    isRunning: false,
    rightWords: 0,
    wrongWords: 0,
    totalWords: 0,
    wpm: 0,
    accuracy: 0,
  };

  componentDidMount() {
    this.getRandom();
  }

  checkLength = () => {
    const {
      input,
      displayText,
      rightWords,
      wrongWords,
      totalWords,
      mins,
      timer,
    } = this.state;

    const convert_to_mins = timer / 60 + mins;
    const words_per_minute = totalWords / convert_to_mins;
    const wpm_int = Math.round(words_per_minute, 0);

    const net_words = rightWords / convert_to_mins;
    const accuracy_of_words = Math.round(
      (net_words / words_per_minute) * 100,
      0
    );

    if (input.length === displayText.length) {
      this.setState(
        {
          displayText: "",
          input: "",
          isRunning: false,
          wpm: wpm_int,
          accuracy: accuracy_of_words,
        },
        this.getRandom
      );
    }
  };
  onChangeInput = () => {
    const {
      displayText,
      input,
      rightWords,
      wrongWords,
      totalWords,
    } = this.state;

    const check = displayText.startsWith(input);
    if (check) {
      this.setState(
        (prevState) => ({
          correct: true,
          rightWords: prevState.rightWords + 1,
          totalWords: prevState.totalWords + 1,
        }),
        this.checkLength
      );
    } else {
      this.setState((prevState) => ({
        correct: false,
        wrongWords: prevState.wrongWords + 1,
        totalWords: prevState.totalWords + 1,
      }));
    }
  };

  onEnterClick = (event) => {
    const { displayText, input } = this.state;
    const enteredInput = event.target.value;
    this.setState({ input: enteredInput }, this.onChangeInput);
  };

  checkTime = () => {
    const { timer, mins } = this.state;

    if (timer > 59) {
      this.setState((prevState) => ({
        mins: prevState.mins + 1,
        timer: 0,
      }));
    }
  };

  increaseTime = (event) => {
    const { timer, mins, isRunning } = this.state;
    const enteredInput1 = event.target.value;
    let seconds;
    let count;
    if (isRunning === true) {
      count = setInterval(() => {
        this.setState(
          (prevState) => ({ timer: prevState.timer + 10 }),
          this.checkTime
        );
      }, 1000);
    } else {
      clearInterval(count);
    }
  };

  getRandom = () => {
    const { combinationLength } = this.state;
    const alpha = "asdfjkl;";
    let final = "";
    let k = 0;

    while (k < 5) {
      let res1 = "";
      for (let i = 0; i < combinationLength; i++) {
        const res = Math.floor(Math.random() * alpha.length);
        res1 = res1 + alpha[res];
      }
      final = final + res1 + " ";

      k = k + 1;
    }
    const len = final.length - 1;

    const b = final.slice(0, len);
    this.setState({ displayText: b, isRunning: true });
  };

  selectValue = (event) => {
    const a = event.target.value;
    console.log(a);
    this.setState(
      { combinationLength: a, timer: 0, mins: 0, input: "" },
      this.getRandom
    );
  };

  render() {
    const {
      input,
      displayText,
      correct,
      timer,
      mins,
      accuracy,
      wpm,
    } = this.state;
    const pickColorClass = correct ? "inputStyles" : "inputStyles1";
    // console.log(mins, timer);
    return (
      <div className="maindiv">
        <p>
          <b>
            {mins} minutes {timer} seconds
          </b>
        </p>

        <div className="selectdiv">
          <label for="combination">Choose a number: </label>

          <select
            name="combinator"
            className="selectItem"
            id="combination"
            onClick={this.selectValue}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3" selected>
              3
            </option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </div>

        <p className="paragraph">{displayText}</p>
        <input
          type="text"
          value={input}
          className={pickColorClass}
          onChange={this.onEnterClick}
          onClick={this.increaseTime}
        />
        <div className="stats">
          <p>WPM: {wpm} </p>
          <p>Accuracy: {accuracy} %</p>
        </div>
      </div>
    );
  }
}

export default App;
