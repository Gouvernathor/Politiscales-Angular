/**
 * similar to the python sorted builtin
 */
export function sorted(array: Iterable<number>, key: undefined, reverse?: boolean): number[];
export function sorted(array: Iterable<string>, key: undefined, reverse?: boolean): string[];
export function sorted<T>(array: Iterable<T>, key: (_:T) => number, reverse?: boolean): T[];
export function sorted<T>(array: Iterable<T>, key: (_:T) => string, reverse?: boolean): T[];
export function sorted<T>(array: Iterable<T>, key?: ((_:T) => any), reverse: boolean = false): T[] {
    return [...array].sort((a, b) => {
        if (key) {
            a = key(a);
            b = key(b);
        }
        let rv = 0;
        if (a < b) {
            rv = -1;
        } else if (a > b) {
            rv = 1;
        }
        if (reverse) {
            rv *= -1;
        }
        return rv;
    });
}

/**
 * Deterministic and reseedable RNG with utility methods
 */
export class RNG {
    private readonly m;
    private readonly a;
    private readonly c;
    private state!: number;
    /**
     * @param seed integer between 0 and 2^31 - 1 ; if not passed, generates it from Math.random()
     */
    constructor(seed?: number) {
        // LCG using GCC's constants
        this.m = 0x80000000; // 2**31;
        this.a = 1103515245;
        this.c = 12345;

        this.seed = seed;
    }
    /**
     * @param seed integer between 0 and 2^31 - 1 ; if undefined, generates it from Math.random()
     */
    set seed(seed: number|undefined) {
        this.state = seed ? seed : Math.floor(Math.random() * (this.m - 1));
    }
    /**
     * @returns a number presumably in [[0, 2**31[[
     */
    randInt() {
        this.state = (this.a * this.state + this.c) % this.m;
        return this.state;
    }
    /**
     * @returns a number in [0, 1[
     */
    random() {
        return this.randInt() / this.m;
    }
    /**
     * @returns a number in [[min, max[[
     */
    randRange(min: number, max: number) {
        return min + Math.floor(this.random() * (max - min));
    }
    /**
     * @returns one of the elements
     */
    choice<T>(array: string | T[]) {
        return array[this.randRange(0, array.length)];
    }
}
