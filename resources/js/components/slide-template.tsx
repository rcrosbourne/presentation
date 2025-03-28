import type { FC } from "react"
import { Button } from "@/components/ui/button"

type SlideProps = {
  slide: {
    type: string
    title: string
    [key: string]: any
  }
}

export const SlideTemplate: FC<SlideProps> = ({ slide }) => {
  switch (slide.type) {
    case "title":
      return (
        <div className="flex h-[600px] flex-col items-center justify-center p-8 text-center">
          <div className="absolute -left-6 -top-6 h-24 w-24 rounded-full bg-yellow-400" />
          <div className="absolute -right-6 -top-6 h-16 w-16 rounded-full bg-blue-400" />
          <div className="absolute -bottom-6 -left-6 h-16 w-16 rounded-full bg-green-400" />
          <div className="absolute -bottom-6 -right-6 h-24 w-24 rounded-full bg-purple-400" />

          <h1 className="mb-4 text-5xl font-bold tracking-tight text-primary">{slide.title}</h1>
          <p className="mb-8 text-2xl text-muted-foreground">{slide.subtitle}</p>
          <p className="mt-16 text-xl font-medium">Presented by: {slide.presenter}</p>
        </div>
      )

    case "content":
      return (
        <div className="flex h-[600px] flex-col p-12">
          <div className="mb-8 flex items-center">
            <div className="mr-4 h-8 w-8 rounded-full bg-primary" />
            <h2 className="text-3xl font-bold text-primary">{slide.title}</h2>
          </div>

          <ul className="mt-8 space-y-6">
            {slide.bullets.map((bullet: string, index: number) => (
              <li key={index} className="flex items-start">
                <div className="mr-4 mt-1 h-6 w-6 rounded-full bg-secondary" />
                <span className="text-2xl">{bullet}</span>
              </li>
            ))}
          </ul>
        </div>
      )

    case "image":
      return (
        <div className="flex h-[600px] flex-col p-12">
          <div className="mb-8 flex items-center">
            <div className="mr-4 h-8 w-8 rounded-full bg-primary" />
            <h2 className="text-3xl font-bold text-primary">{slide.title}</h2>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <img
              src={slide.imageUrl || "/placeholder.svg"}
              alt={slide.title}
              className="max-h-[300px] rounded-xl border-4 border-secondary object-cover shadow-lg"
            />
            <p className="mt-6 text-xl text-center">{slide.caption}</p>
          </div>
        </div>
      )

    case "quiz":
      return (
        <div className="flex h-[600px] flex-col p-12">
          <div className="mb-8 flex items-center">
            <div className="mr-4 h-8 w-8 rounded-full bg-primary" />
            <h2 className="text-3xl font-bold text-primary">{slide.title}</h2>
          </div>

          <div className="flex flex-1 flex-col items-center justify-center">
            <p className="mb-8 text-2xl font-medium">{slide.question}</p>

            <div className="grid grid-cols-2 gap-4">
              {slide.options.map((option: string, index: number) => (
                <Button
                  key={index}
                  variant="outline"
                  size="lg"
                  className="h-20 text-xl border-2 border-primary/50 hover:border-primary hover:bg-primary/10"
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )

    default:
      return <div>Slide type not supported</div>
  }
}

