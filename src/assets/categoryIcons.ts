import mapTree from "../assets/icons/map-tree.svg"
import mapPlant from "../assets/icons/map-plant.svg"
import mapLeaf from "../assets/icons/map-leaf.svg"
import mapFlower from "../assets/icons/map-flower.svg"
import mapPine from "../assets/icons/map-pine.svg"
import mapFruit from "../assets/icons/map-fruit.svg"
import { type TreeCategory } from "../types/tree"

export const CATEGORY_ICONS: Record<TreeCategory, string> = {
  швидкоростучі: mapPlant,
  хвойні: mapPine,
  квітучі: mapFlower,
  листяні: mapLeaf,
  плодові: mapFruit,
  дефолт: mapTree,
}
