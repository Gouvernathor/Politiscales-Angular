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
