import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Headphones } from 'lucide-react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
interface PodcastCardProps {
  title: string
  authors?: string[]
  description?: string
  genres?: string[]
  coverImage?: string
  episodeCount?: number
}

export default function PodcastCard({ podcast }: {podcast: PodcastCardProps}) {
  const fallbackColor = "bg-gradient-to-br from-purple-600 to-blue-600"
  const navigate = useNavigate();
  const openPodcast = (podcast) => {
    navigate('/podcast', {state: { podcast } })
  }
  return (
    <Card className="w-full mx-w-md overflow-hidden"
      onClick={() => openPodcast(podcast)}
    >
      <div className="relative h-48">
        {podcast.coverImage ? (
          <img
            src={podcast.coverImage}
            alt={`Cover image for ${title}`}
            layout="fill"
            //objectFit="cover"
            className="transition-transform duration-300 ease-in-out hover:scale-105"
          />
        ) : (
          <div className={`w-full h-full ${fallbackColor}`} />
        )}
      </div>
      <CardContent className="p-6">
        {podcast.title && ( <h2 className="text-2xl font-bold mb-2 line-clamp-2">{podcast.title}</h2>[0]
        )}
        {podcast?.authorsDetails?.length > 0 && (
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
            By {podcast.authorsDetails.map((author, idx) => (
              <p key={idx}>{author.firstName} {author.lastName}</p>
            ))}
          </p>
        )}
        {podcast.description && (
          <p className="text-sm mb-4 line-clamp-3">{podcast.description}</p>
        )}
        {podcast.genresDetails && podcast.genresDetails.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {podcast.genresDetails.map((genre) => (
              <Badge key={genre.id} variant="secondary">
                {genre.name}
              </Badge>
            ))}
          </div>
        )}
        {/*episodeCount !== undefined && (
          <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
            <Headphones className="w-4 h-4 mr-2" />
            {episodeCount} episode{episodeCount !== 1 ? 's' : ''}
          </div>
        )*/}
      </CardContent>
    </Card>
  )
}
