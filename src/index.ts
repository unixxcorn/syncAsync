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

const totalTask = 20
const totalLoop = 1000
const delay = 10
const syncShift = 0.5

const syncLoop = async () => {
    for (let task = 0; task < totalTask; task++) {
        await loop(multibar, totalLoop, delay, `sync  ${pad(task, 2)}`, '\x1b[31m', syncShift)

    }
}
const asyncLoop = async () => {
    for (let task = 0; task < totalTask; task++) {
        loop(multibar, totalLoop, delay, `async ${pad(task, 2)}`)

    }
}

syncLoop()
asyncLoop()

