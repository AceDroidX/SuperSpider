// https://www.kohai.top/article/design-a-async-queue-base-js
export class AsyncQueue {
    name: string;
    queue: any;
    running: boolean;
    static create(name: string) {
        return new this(name);
    }

    constructor(name: string) {
        this.name = name;
        // 任务队列
        this.queue = [];
        // 是否有任务正常执行
        this.running = false;
    }

    async funcBetweenTasks() {
        // override this method as you need
    }

    push(fun: () => any) {
        return new Promise((resovle, reject) => {
            // 将 fun 包装一层放进任务队列中
            this.queue.push(async () => {
                this.running = true;
                try {
                    const res = await fun();
                    resovle(res);
                } catch (e) {
                    reject(e);
                }

                console.log(`${this.name} queue length: ${this.queue.length}`);
                await this.funcBetweenTasks()

                this.running = false;
                // 获取下一个任务并执行
                const next = this.queue.shift();
                next?.();
            });
            // 若当前未有任务执行中，则触发队列的执行
            if (!this.running) {
                this.queue.shift()?.();
            }
        });
    }
}
