import React, { Component } from "react";
import axios from "axios";

class App extends Component {
    constructor() {
        super();
        this.state = {
            result: null,
            fromCurrency: "USD",
            toCurrency: "GBP",
            amount: 1,
            currencies: [],
        }

        this.convertHandler = this.convertHandler.bind(this);
        this.selectHandler = this.selectHandler.bind(this);
    }

    // Initializes the currencies with values from the api
    componentDidMount() {

        let url = "http://data.fixer.io/api/latest?access_key=91621b72535926c5dfb7205215e2436d";

        axios
            .get(url)
            .then(response => {
                // Initialized with 'EUR' because the base currency is 'EUR'
                // and it is not included in the response

                console.log(response);

                const currencyAr = ["EUR"]
                for (const key in response.data.rates) {
                    currencyAr.push(key)
                }
                this.setState({ currencies: currencyAr.sort() })
            })
            .catch(err => {
                console.log("Opps", err.message);
            });
    }

    // Event handler for the conversion
    convertHandler = () => {
        let url = "http://data.fixer.io/api/latest?access_key=91621b72535926c5dfb7205215e2436d&base" + this.state.fromCurrency + "&symbols=" + this.state.toCurrency;

        if (this.state.fromCurrency !== this.state.toCurrency) {
            axios
                .get(url)
                .then(response => {
                    const result = this.state.amount * (response.data.rates[this.state.toCurrency]);
                    this.setState({ result: result.toFixed(5) })
                })
                .catch(err => {
                    console.log("Opps", err.message);
                });
        } else {
            this.setState({ result: "You cant convert the same currency!" })
        }
    };

    // Updates the states based on the dropdown that was changed
    selectHandler = (event) => {
        if (event.target.name === "from") {
            this.setState({ fromCurrency: event.target.value })
        }
        if (event.target.name === "to") {
            this.setState({ toCurrency: event.target.value })
        }
    }

    render() {
        return (
            <div className="Converter">
                <h2><span>Currency </span> Converter <span role="img" aria-label="money">&#x1f4b5;</span> </h2>
                <div className="Form">
                    <input
                        name="amount"
                        type="text"
                        value={this.state.amount}
                        onChange={event =>
                            this.setState({ amount: event.target.value })
                        }
                    />
                    <select
                        name="from"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.fromCurrency}
                    >
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <select
                        name="to"
                        onChange={(event) => this.selectHandler(event)}
                        value={this.state.toCurrency}
                    >
                        {this.state.currencies.map(cur => (
                            <option key={cur}>{cur}</option>
                        ))}
                    </select>
                    <button onClick={this.convertHandler}>Convert</button>
                </div>
                {this.state.result &&
                    <h3>{this.state.result}</h3>
                }
            </div>
        );
    }
}

export default App;

