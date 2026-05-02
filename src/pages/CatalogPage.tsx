import { useState } from "react"
import { CatalogCard } from "../components/TreeCards/CatalogCard"
import { MiniCard } from "../components/TreeCards/miniCard"
import { ProfileCard } from "../components/TreeCards/ProfileCard"
import { FormCard } from "../components/TreeCards/FormCard"

export function CatalogPage() {
  const [activeCard, setActiveCard] = useState(false)
  const [, setComment] = useState("")

  return (
    <div className="h-full w-full flex flex-col items-center gap-8 py-8 pt-16">
      <div className="w-full flex flex-row justify-center items-center gap-5">
        <CatalogCard
          tag="Листьові"
          image=""
          title="Дуб Старий"
          subtitle="Quercus robur"
          description="Величне довговічне листяне дерево, відоме
        своєю грандіозною присутністю та глибокою
        кореневою системою. Життєво важливе для
        біорізноманіття."
          info={{
            sun: "Повне",
            ground: "Суглинок",
            distance: "10м",
            location: "Тернопільська",
          }}
        />
        <MiniCard
          image="https://krasavica.info/uploads/posts/2022-12/1672292311_krasavica-info-p-tsveti-duba-vkontakte-4.jpg"
          active={activeCard}
          title="Дуб Старий"
          subtitle="Quercus robur"
          onClick={() => setActiveCard((prev) => !prev)}
        />
        <FormCard
          image="https://krasavica.info/uploads/posts/2022-12/1672292311_krasavica-info-p-tsveti-duba-vkontakte-5.jpg"
          title="Дуб Старий"
          username="ANyone"
          price={400}
          onChange={setComment}
          location="Тернопіль вул. Грушевського, 15"
        />
      </div>
      <ProfileCard
        image="https://krasavica.info/uploads/posts/2022-12/1672292311_krasavica-info-p-tsveti-duba-vkontakte-5.jpg"
        title="Дуб Старий"
        subtitle="Quercus robur"
        planted={new Date("2020-05-04")}
        location="Тернопіль вул. Грушевського, 15"
      />
    </div>
  )
}
