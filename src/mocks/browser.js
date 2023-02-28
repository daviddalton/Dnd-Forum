import { setupWorker, rest } from 'msw'

const worker = setupWorker(
    rest.get('/wiki/classes/barbarian', (req, res, ctx) => {
        return res(ctx.json({
            
        }))
    }),
)

// worker.start()