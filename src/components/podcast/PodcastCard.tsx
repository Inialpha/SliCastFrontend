import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ThumbsUp, ThumbsDown, MessageSquare, Edit, Trash2 } from 'lucide-react'

import { Badge } from "@/components/ui/badge"
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

export default function PodcastCard({ podcast, fromDashboard = false }: {podcast: PodcastCardProps}) {
  const fallbackColor = "bg-gradient-to-br from-purple-600 to-blue-600"

  const [deletingPodcast, setDeletingPodcast] = useState(null)

  const navigate = useNavigate();
  const openPodcast = (podcast) => {
    navigate('/podcast', {state: { podcast }    })
  }
  const editPodcast = (podcast) => {
    navigate('/edit', {state: { podcast }       })
  }

  const deletePodcast = (podcast) => {
    if (!deletingPodcast) {
      setDeletingPodcast(podcast);
    } else {
      //TODO delete podcast
    }
  }
  return (
    <Card className="w-full mx-w-md overflow-hidden"
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
      <CardContent className="p-6" onClick={() => openPodcast(podcast)}>
        {podcast.title && ( <h2 className="text-2xl font-bold mb-2 line-clamp-2">{podcast.title}</h2>[0]
        )}
        {podcast?.authorsDetails?.length > 0 && (
          <div className="flex text-sm text-gray-600 dark:text-gray-400 mb-4 gap-2">
            By {podcast?.authorsDetails?.map((author, idx) => (
              <p key={idx}>{author.firstName} {author.lastName}</p>
            ))}
          </div>
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
        {fromDashboard && (
          <p className="text-sm mb-4 ">Status: {podcast.status}</p>
        )}
      </CardContent>
      <hr className="  border-2 " />
      <CardFooter className="p-4 px-6 flex flex-wrap justify-between items-center gap-2">
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ThumbsUp className="w-4 h-4" />
          <span className="sr-only">Upvote</span>
          <span aria-hidden="true">{podcast.upVotes.length}</span>
          <span className="hidden md:inline">{podcast.upVotes.length > 1 ? "Upvotes" : "Upvote"} </span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <ThumbsDown className="w-4 h-4" />
          <span className="sr-only">Downvote</span>
          <span aria-hidden="true">{podcast.downVotes.length}</span>
          <span className="hidden md:inline">{podcast.downVotes.length > 1 ? "Downvotes" : "Downvote"} </span>
        </Button>
        <Button variant="outline" size="sm" className="flex items-center gap-1">
          <MessageSquare className="w-4 h-4" />
          <span className="sr-only">Comments</span>
          <span aria-hidden="true">{podcast.comments.length}</span>
          <span className="hidden md:inline">{podcast.comments.length > 1 ? "Comments" : "Comment"} </span>
        </Button>
        {fromDashboard && (
        <div className="p-4 px-6 flex flex-wrap justify-end items-center gap-2 w-full">
          <Button variant="ghost" size="sm" className="flex items-center"
            onClick={() => editPodcast(podcast)}
          >
          <Edit className="w-4 h-4" />
          <span className="sr-only">Edit</span>
        </Button>
        <Button variant="ghost" size="sm" className="flex items-center text-destructive"          onClick={() => deletePodcast(podcast)}
        >
          <Trash2 className="w-4 h-4" />
          <span className="sr-only">Delete</span>
        </Button>
        {podcast.status === "published" ? (
          <Button variant="ghost" size="sm" className="flex items-center text-destructive" >Unpublish</Button>
        ) : (
          <Button variant="ghost" size="sm" className="flex items-center">Publish</Button>
        )}
        </div>
        )}
        
      </CardFooter>
    </Card>
  )
}
