export class DateUtil {
    private static padL = (nr: number, len = 2, chr = `0`) => `${nr}`.padStart(2, chr);

    static format(d: Date) {
        return [
            this.padL(d.getFullYear()),
            this.padL(d.getMonth() + 1),
            this.padL(d.getDate())
        ].join('/')
            + ' ' +
            [
                this.padL(d.getHours()),
                this.padL(d.getMinutes()),
                this.padL(d.getSeconds())
            ].join(':');
    }
}