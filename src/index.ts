import cliProgress from 'cli-progress'
import { loop } from './loop';

function pad(num: any, size: number) {
    num = num.toString();
    while (num.length < size) num = "0" + num;
    return num;
}

const multibar = new cliProgress.MultiBar({
    clearOnComplete: false,
    hideCursor: true,
    format: '{progress} | {color}{bar}\x1b[0m | {percentage}% || {value}/{total}',
}, cliProgress.Presets.shades_classic);

const totalTask = 10
const totalLoop = 1000
const delay = 5
const syncShift = 0.5
const syncFunction: Array<() => Promise<void>> = []
const asyncFunction: Array<() => Promise<void>> = []

for (let task = 0; task < totalTask; task++) {
    syncFunction.push(loop(multibar, totalLoop, delay, `sync  ${pad(task, 2)}`, '\x1b[31m', syncShift))
    asyncFunction.push(loop(multibar, totalLoop, delay, `async ${pad(task, 2)}`))
}

const syncLoop = async () => {
    for (const fn of syncFunction) {
        await fn()
    }
}
const asyncLoop = async () => {
    await Promise.all(asyncFunction.map(x => x()))
}

syncLoop()
asyncLoop()

