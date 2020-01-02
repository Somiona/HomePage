class Time {
    private readonly hour: string
    private readonly minute: string

    constructor(hh: number, mm: number) {
        // fuxxxxk
        this.toString = this.toString.bind(this)
        this.to_str = this.to_str.bind(this)
        this._range = this._range.bind(this)

        this.hour = this.to_str(hh)
        this.minute = this.to_str(mm)
    }

    public toString() {
        return this.hour + ":" + this.minute
    }

    private to_str(time: number) {
        if (time in this._range(0, 60)) {
            return time < 10 ? "0" + time : time.toString()
        }
        return "00"
    }

    private _range(from = 0, to: number) {
        const arr = [...Array(to).keys()]
        arr.splice(0, from)
        return arr
    }

}

export default Time
