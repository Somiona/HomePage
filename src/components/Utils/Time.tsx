class Time {
    private readonly hour: string;
    private readonly minute: string;

    public constructor(hh: number, mm: number) {
        this.toString = this.toString.bind(this);
        this.toStr = this.toStr.bind(this);
        this.range = this.range.bind(this);

        this.hour = this.toStr(hh);
        this.minute = this.toStr(mm);
    }

    public toString(): string {
        return this.hour + ":" + this.minute;
    }

    private toStr(time: number): string {
        if (time in this.range(0, 60)) {
            return time < 10 ? "0" + time : time.toString();
        }
        return "00";
    }

    private range(from = 0, to: number): number[] {
        const arr = [...Array(to).keys()];
        arr.splice(0, from);
        return arr;
    }
}

export default Time;
