import React from 'react';//import react library functions
import logo from './logo.svg';
import './App.css';//link the app.css
import ReactDOM from 'react-dom'//it import react dom

function Square(props) {//this function takes props as input and returns what should be display or render
  return (
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

class Board extends React.Component {//board extends  react component
  constructor(props) {//defines constructor
    super(props);//takes all the react properties
    this.state = {// it defines the initial state of the variables
      squares: Array(9).fill(null),//to take 9 square with null value
      xIsNext: true,//intialize IsNext to true
    };
  }

  handleClick(i) {//inbuilt event function
    const squares = this.state.squares.slice();//slice method take the portion of the array which we have selected
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';//choosing between 'x' and '0' and set 'x' as true which is called
    this.setState({//whenver setstate is called automatically render method is called
      squares: squares,
      xIsNext: !this.state.xIsNext,//each time player click it flips between x and 0
    });
  }

  renderSquare(i) {//used to show values in the box
    return (
      <Square
        value={this.state.squares[i]}//the content of the ith box is assigned to the "value"
        onClick={() => this.handleClick(i)}//binds handclick of the current box to onclick
      />
    );
  }

  render() {
    const winner = calculateWinner(this.state.squares);//storing the result of the calculator to content
    let status;
    if (winner) {
      status = 'Winner: ' + winner;//display the winner
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');//if winner is not declared then it should ask for the next player
    }

    return (//return the values of the each on the screen
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

 export default class Game extends React.Component {//there is one class in the file so this class  game is made as default which extends the reactcomponent
  render() {
    return (//calling the component class board
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

ReactDOM.render(
  <Game />,
  document.getElementById('root')
);

function calculateWinner(squares) {//finding the winner by checking the rule
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

        

