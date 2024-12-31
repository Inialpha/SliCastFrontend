import { useState, useEffect } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useSelector } from 'react-redux';
import Published from './Published';
import Completed from './Completed';
import Draft from './Draft';
import UnPublished from './UnPublished';
import { getRequest } from '../../../utils/apis';

import toCamelCaseKeys from '../../../utils/toCamelCase';

export default function AllPodcastComponent() {

  const user = useSelector((state) => state.user);                                        console.log(user)

  const [podcasts, setPodcasts] = useState(null);
  const [published, setPublished] = useState(null);
  const [drafts, setDrafts] = useState(null);
  const [completed, setCompleted] = useState(null);
  const [unPublished, setUnPublished] = useState(null);

  useEffect(() => {
    const fetchPodcast = async () => {
      const url = `${import.meta.env.VITE_API_URL}/podcasts/`;
      try {
        const res = await getRequest(url);
        if (res.ok) {
          const fetchedPodcast = await res.json()
          const camelCasePodcasts = fetchedPodcast.map((podcast) => toCamelCaseKeys(podcast));
console.log(camelCasePodcasts)
          const publishedPodcasts = camelCasePodcasts.filter((podcast) => podcast.status === "published");

          const draftPodcasts = camelCasePodcasts.filter((podcast) => podcast.status === "draft");
          const completededPodcasts = camelCasePodcasts.filter((podcast) => podcast.status === "completed");
          const unPublishedPodcasts = camelCasePodcasts.filter((podcast) => podcast.status === "unpublished");
          setPublished(publishedPodcasts);
          setDrafts(draftPodcasts);
          setCompleted(completededPodcasts)
          setUnPublished(unPublishedPodcasts)
          setPodcasts(camelCasePodcasts)
        } else {
          console.log("unable to load podcast")
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchPodcast()
  },[]);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">All Podcast</h1>
      <Tabs defaultValue="published" className="w-full">
        <TabsList className="grid w-full grid-cols-4 
">
          <TabsTrigger value="published">Published</TabsTrigger>
          <TabsTrigger value="drafts">Drafts</TabsTrigger>
          <TabsTrigger value="completed">Completed</TabsTrigger>
          <TabsTrigger value="unpublished">Unpublished</TabsTrigger>
        </TabsList>
        <TabsContent value="published">
          <Published podcasts={published} />
        </TabsContent>
        <TabsContent value="drafts">
          <Draft podcast={drafts} />
        </TabsContent>
        <TabsContent value="completed">
          <Completed podcast={completed} />
        </TabsContent>
        <TabsContent value="unpublished">
          <UnPublished podcast={unPublished} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
