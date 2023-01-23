interface ProgressBarPRops {
    progress: number
}

export function ProgressBar(props: ProgressBarPRops) {
    return (
        <div className='h-3 rounded-xl bg-zinc-700 x-full mt-4'>
            <div 
                role="progressbar"
                aria-label="Progresso de hábitos completados nesse dia"
                aria-valuenow={props.progress}
                className='h-3 rounded-xl bg-violet-600 transition-all'
                style={{
                    width: `${props.progress}%`
                }}
            />
        </div>
    )
}