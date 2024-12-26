import PodcastDisplay from './podcast-display'

export default function Home() {
  const podcastData = {
    title: "The Future of AI in Everyday Life",
    messages: [
      { type: 'text', content: "Artificial Intelligence is rapidly changing the way we live and work." },
      { type: 'image', content: "/placeholder.svg?height=200&width=300" },
      { type: 'text', content: "From smart homes to autonomous vehicles, AI is becoming ubiquitous." },
      { type: 'text', content: "We explore the potential benefits and challenges of widespread AI adoption." },
      { type: 'image', content: "/placeholder.svg?height=200&width=300" },
      { type: 'text', content: "Experts weigh in on the ethical considerations of AI development." },
      { type: 'text', content: "Discover how AI might shape your daily routine in the coming years." },
      { type: 'text', content: "AI-powered personal assistants are becoming more sophisticated and helpful." },
      { type: 'image', content: "/placeholder.svg?height=200&width=300" },
      { type: 'text', content: "Machine learning algorithms are improving healthcare diagnostics and treatment plans." },
      { type: 'text', content: "The impact of AI on job markets and the future of work is a hot topic of debate." },
      { type: 'text', content: "Privacy concerns arise as AI systems process vast amounts of personal data." },
      { type: 'image', content: "/placeholder.svg?height=200&width=300" },
      { type: 'text', content: "The development of AI raises questions about human creativity and problem-solving skills." },
      { type: 'text', content: "Researchers are working on making AI systems more transparent and explainable." }
    ]
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <PodcastDisplay title={podcastData.title} messages={podcastData.messages} />
    </div>
  )
}

