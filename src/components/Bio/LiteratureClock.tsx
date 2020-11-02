import React, { Component } from "react";
import "../../styles/bio/_literature_clock.scss";
import Time from "../Utils/Time";

interface IQuote {
    time: string;
    quote_first: string;
    quote_time_case: string;
    quote_last: string;
    title: string;
    author: string;
}

interface IStatLiteratureClock {
    currentTime: Time;
    quote: IQuote;
}

interface IPropLiteratureCLock {
    className?: string;
}

function nowTime() {
    const date = new Date();
    return new Time(date.getHours(), date.getMinutes());
}

class LiteratureClock extends Component<
    IPropLiteratureCLock,
    IStatLiteratureClock
> {
    // @ts-ignore
    private timerID: NodeJS.Timeout;

    constructor(props: IPropLiteratureCLock) {
        super(props);
        this.state = {
            currentTime: new Time(0, 0),
            quote: {
                time: "",
                // tslint:disable-next-line:object-literal-sort-keys
                quote_first: "",
                quote_time_case: "",
                quote_last: "",
                title: "",
                author: "",
            },
        };
    }

    public componentDidMount() {
        this.setState({
            currentTime: nowTime(),
        });
        this.fetchQuote();
        this.timerID = setInterval(() => this.tick(), 10000);
    }

    public componentWillUnmount() {
        clearInterval(this.timerID);
    }

    public fetchQuote() {
        const time = nowTime().toString();
        const url =
            "https://raw.githubusercontent.com/lbngoc/literature-clock" +
            `/master/docs/times/${time}.json`;

        fetch(url)
            .then((response) => response.json())
            .then((resultJson) => {
                const i = Math.floor(Math.random() * resultJson.length);
                return resultJson[i];
            })
            .then((finalQuote) => {
                this.setState({
                    quote: finalQuote,
                });
            });
    }

    private tick() {
        this.setState({
            currentTime: nowTime(),
        });
        this.fetchQuote();
    }

    public render() {
        const time = this.state.currentTime.toString();
        const { quote } = this.state;

        return (
            <blockquote className={`literature-main ${this.props.className}`}>
                <div className="literature-timer">{time}</div>
                <div className="literature-quote text-wrap">
                    {quote.quote_first}
                    <span className="literature-time-case">
                        {quote.quote_time_case}
                    </span>
                    {quote.quote_last}
                    <footer className="text-white literature-author blockquote-footer text-right">
                        {quote.author}
                        <cite title={quote.title}>{quote.title}</cite>
                    </footer>
                </div>
            </blockquote>
        );
    }
}

export default LiteratureClock;
