import { Input } from "../components/Input"
import SearchIcon from "../assets/icons/search.svg"
import { useEffect, useState } from "react"
import { Button } from "../components/Button/Button"
import { apiClient } from "../services/apiClient"
import type { Species } from "../types/tree"
import { CatalogCard } from "../components/TreeCards/CatalogCard"
import { useSpecies } from "../hooks/useSpecies"
import { useNavigate } from "react-router-dom"

export function CatalogPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [activeCategory, setActiveCategory] = useState<string | null>('всі види')
  const { species, loading } = useSpecies()
  const [visibleCount, setVisibleCount] = useState(6)
  const [isLoadingMore, setIsLoadingMore] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    apiClient.get<Species[]>("/species").then((res) => {
      const unique = Array.from(
        new Set(res.map((s) => s.category).filter(Boolean))
      )

      setCategories(unique)
    })
  }, [])

  const handleCardClick = (speciesId: string) => {
    navigate(`/plant?speciesId=${speciesId}`)
  }

  const handleCategoryClick = (category: string) => {
    setActiveCategory(category)
    setVisibleCount(6) // Скидаємо лічильник видимих карток при зміні категорії
  }

  const handleLoadMore = () => {
    setIsLoadingMore(true)

    setTimeout(() => {
      setVisibleCount((prev) => prev + 6)
      setIsLoadingMore(false)
    }, 800)
  }

  const filteredSpecies = species.filter((s) => {
    const matchesCategory =
      activeCategory === "всі види" ||
      s.category === activeCategory

    const matchesSearch =
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.latinName.toLowerCase().includes(searchTerm.toLowerCase())

    return matchesCategory && matchesSearch
  })

  return (
    <div className="h-full items-center w-full bg-cream dark:bg-dark flex flex-col items-start py-20 px-6">
      <div className="w-full gap-20 flex-col flex max-w-7xl">
        <div className="flex w-full flex-col items-start gap-6">
          <div className="flex flex-col md:flex-row w-full justify-start md:justify-between gap-6 items-start md:items-end md:gap-2">
            <div className="flex max-w-[567px] flex-col items-start gap-4">
              <h1 className="text-[60px] font-bold text-green dark:text-green-light">
                Каталог дерев
              </h1>
              <p className="text-[18px] text-dark-footer font-regular dark:text-white/70">
                Ознайомтесь з нашою добіркою видів, спеціально підібраних під кліматичні умови України. Найкращі види для міста та екологічного впливу в нашому регіоні.
              </p>
            </div>
            <Input icon={SearchIcon} placeholder="Пошук за назвою або тегом..." className="md:ml-auto md:max-w-[300px] text-input-text dark:text-neutral-400" value={searchTerm} onChange={(value) => {
              setSearchTerm(value)
              setVisibleCount(6)
            }} />
          </div>
          <div className="flex flex-row w-full items-center flex-wrap gap-4">
            <Button label="всі види" variant="filter_beta" active={activeCategory === 'всі види'} onClick={() => handleCategoryClick('всі види')} />
            {loading
              ? Array.from({ length: 5 }).map((_, i) => (
                <div
                  key={i}
                  className="h-9 w-28 rounded-full bg-neutral-300 dark:bg-neutral-700 animate-pulse"
                />
              ))
              : categories.map((category) => (
                <Button
                  key={category}
                  active={activeCategory === category}
                  label={category}
                  variant="filter_beta"
                  onClick={() => handleCategoryClick(category)}
                />
              ))}
          </div>
        </div>
        <div className="grid w-full justify-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
              <CatalogCardSkeleton key={i} />
            ))
            : filteredSpecies.slice(0, visibleCount).map((tree) => (
              <CatalogCard
                key={tree.id}
                tag={tree.category}
                image={tree.imageUrl}
                title={tree.name}
                subtitle={tree.latinName}
                description={tree.description}
                info={{
                  sun: tree.info.sun,
                  ground: tree.info.ground,
                  distance: tree.info.distance,
                  location: tree.info.location,
                }}
                onClick={() => handleCardClick(tree.id)}
              />
            ))}
          {isLoadingMore &&
            Array.from({ length: 3 }).map((_, i) => (
              <CatalogCardSkeleton key={`skeleton-${i}`} />
            ))}
        </div>
        {visibleCount < filteredSpecies.length && (
          <div className="flex justify-center w-full">
            <Button
              label="Показати ще"
              variant="beta"
              className="max-w-[260px]"
              onClick={handleLoadMore}
            />
          </div>
        )}
      </div>

    </div>
  )
}

export function CatalogCardSkeleton() {
  return (
    <div className="w-full max-w-[420px] overflow-hidden rounded-3xl bg-cream-footer dark:bg-neutral-900 shadow-md animate-pulse">
      {/* IMAGE */}
      <div className="h-[240px] w-full bg-neutral-300 dark:bg-neutral-700" />

      {/* CONTENT */}
      <div className="p-8 flex flex-col gap-4">
        <div className="space-y-2">
          <div className="h-6 w-2/3 rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="h-4 w-1/3 rounded bg-neutral-300 dark:bg-neutral-700" />
        </div>

        <div className="space-y-2">
          <div className="h-4 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="h-4 w-full rounded bg-neutral-300 dark:bg-neutral-700" />
          <div className="h-4 w-2/3 rounded bg-neutral-300 dark:bg-neutral-700" />
        </div>

        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <div
              key={i}
              className="h-10 rounded-xl bg-neutral-300 dark:bg-neutral-700"
            />
          ))}
        </div>

        <div className="h-12 w-full rounded-xl bg-neutral-300 dark:bg-neutral-700" />
      </div>
    </div>
  )
}
