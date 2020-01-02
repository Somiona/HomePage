import React, { Component } from "react"
import Typed from "typed.js"

interface IPropTyping {
    strings: string[]
    className?: string
}

class Typing extends Component<IPropTyping, {}> {
    // @ts-ignore
    private typed: Typed
    // @ts-ignore
    private ele: HTMLElement

    public componentDidMount() {
        const { strings } = this.props
        const options = {
            strings,
            typeSpeed: 1000,
            // tslint:disable-next-line:object-literal-sort-keys
            backSpeed: 100,
            loop: true,
        }

        // @ts-ignore
        this.typed = new Typed(this.ele, options)
    }

    public componentWillUnmount() {
        this.typed.destroy()
    }

    public render() {
        const { className } = this.props

        return (
            <div className={`typed-wrap ${className}`}>
                <span
                    style={{ whiteSpace: "pre" }}
                    ref={(el) => {
                        this.ele = el as HTMLSpanElement
                    }}
                />
            </div>
        )
    }
}

export default Typing
