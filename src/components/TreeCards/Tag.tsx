export function Tag({ text }: { text: string }) {
    return(
        <div className="absolute top-3 left-3 bg-cream text-green dark:bg-black/60 dark:text-white backdrop-blur px-3 py-1 rounded-full text-xs font-bold uppercase">
          {text}
        </div>  
    )
}   