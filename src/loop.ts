import { MultiBar } from 'cli-progress'

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export async function loop(multibar: MultiBar, totalLoop: number = 1000, msDelay: number = 200, label: string, color: string = '\x1b[32m', syncShift: number = 1) {
    const bar = multibar.create(totalLoop, 0, { progress: label, color: color })
    for (let index = 0; index < totalLoop; index++) {
        await delay(msDelay * syncShift)
        bar.increment()
    }
    bar.stop()
}