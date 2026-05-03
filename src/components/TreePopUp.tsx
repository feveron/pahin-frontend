import type { Tree } from "../types/tree"
import { MapPin } from "lucide-react"

interface Props {
  tree: Tree
  onClose: () => void
}
export function TreePopup({ tree }: Props) {
  return (
    <div className="w-[260px] bg-white dark:bg-black rounded-2xl shadow-xl  overflow-hidden ">
      {/* Юзер */}
      <div className="px-4 py-3 flex items-center gap-3  bg-cream dark:bg-dark">
        <div className="w-10 h-10 rounded-full bg-green dark:bg-dark-comment flex items-center justify-center text-lg font-bold text-cream">
          {tree.userName[0]}
        </div>
        <div>
          <p className="font-semibold text-sm dark:text-white ">
            {tree.userName}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-400  tracking-wide font-medium">
            ОХОРОНЕЦЬ ЗЕМЛІ
          </p>
        </div>
      </div>
      {/* Body */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-cream-input leading-tight">
              {tree.speciesName}
            </h2>
            <div className="flex items-center gap-1 mt-1">
              <MapPin className="w-3.5 h-3.5 text-gray-700 dark:text-brown" />
              <span className="text-xs text-gray-700 dark:text-cream-footer">
                {tree.locationName}
              </span>
            </div>
          </div>
          {/*<div className=" rounded-xl flex-shrink-0">
            <Icon
              src={Logo}
              size={24}
              className="text-green dark:text-green-light"
            />
          </div>*/}
        </div>

        <div className="mt-3 bg-cream-comment dark:bg-dark-comment rounded-xl px-4 py-3">
          <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed italic">
            "{tree.message}"
          </p>
        </div>

        <div className="mt-3 pb-3">
          <span className="text-xs text-gray-400 uppercase tracking-wide font-medium">
            Посаджено: {tree.createdAt}
          </span>
        </div>
      </div>
    </div>
  )
}
