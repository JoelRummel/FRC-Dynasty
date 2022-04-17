export default function ensureType<P>() {
    function func<T extends Record<string, P>>(obj: T): T {
        return obj;
    }
    return func;
}