function range(from = 0, to: number): number[] {
    const arr = [...Array(to).keys()];
    arr.splice(0, from);
    return arr;
}

function toStr(time: number): string {
    if (time in range(0, 60)) {
        return time < 10 ? `0${time}` : time.toString();
    }
    return "00";
}

class Time {
    private readonly hour: string;

    private readonly minute: string;

    public constructor(hh: number, mm: number) {
        this.toString = this.toString.bind(this);

        this.hour = toStr(hh);
        this.minute = toStr(mm);
    }

    public toString(): string {
        return `${this.hour}:${this.minute}`;
    }
}

export default Time;
