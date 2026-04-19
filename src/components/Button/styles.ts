export const buttonVariants = {
  alpha: "px-4 py-[7px] w-full text-[14px] rounded-full dark:bg-green-light bg-green hover:bg-green-hover dark:hover:bg-green dark:hover:text-white text-white dark:text-black font-body font-bold transition-colors disabled:opacity-50",
  beta: "px-10 py-4 w-full text-[18px] rounded-full bg-green dark:bg-green-light hover:bg-green-hover dark:hover:text-white dark:hover:bg-green text-white dark:text-black font-body font-semibold transition-colors disabled:opacity-50",
  gamma: "px-10 py-4 w-full rounded-full border-[2px] border-green text-green font-body  font-semibold hover:bg-green dark:hover:bg-green-light hover:text-white  dark:hover:text-black  transition-colors dark:border-green-light dark:text-green-light",
  delta: "px-11 w-full py-3 text-[14px] rounded-xl bg-green dark:bg-green-light text-white dark:text-black font-body font-semibold hover:bg-green-hover dark:hover:bg-green dark:hover:text-white transition-colors disabled:opacity-50",
  filter_alpha: "bg-cream-input w-full text-black/80 text-[12px] rounded-xl px-[11px] py-2 bg-cream-input active:bg-cream-active active:text-green active:font-semibold",
  filter_beta: "px-4 py-2 w-full font-body font-bold text-[12px] rounded-full text-black/80 bg-cream-input active:dark:bg-green-light active:bg-green active:text-white dark:text-black transition-colors disabled:opacity-50",
}

export type Variant = keyof typeof buttonVariants