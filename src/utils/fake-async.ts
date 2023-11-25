export function fakeAsync<T>(result: T, timeInMs = 1000): Promise<T> {
    return new Promise(res => {
        setTimeout(() => res(result), timeInMs)
    })
}
