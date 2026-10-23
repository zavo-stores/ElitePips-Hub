interface CourseCardProps {
  id: number;
  title: string;
  duration: string;
  videoId: string;
  level: string;
  desc: string;
}

const levelColors: Record<string, string> = {
  Beginner: "bg-primary/20 text-primary",
  Intermediate: "bg-blue-500/20 text-blue-400",
  Advanced: "bg-purple-500/20 text-purple-400",
};

export default function CourseCard({ id, title, duration, videoId, level, desc }: CourseCardProps) {
  return (
    <div className="glass-card p-5 group">
      <div className="flex justify-between items-start mb-3 gap-2">
        <h3 className="font-semibold text-sm leading-tight">
          <span className="text-primary mr-1">{id}.</span> {title}
        </h3>
        <div className="flex gap-1.5 shrink-0">
          <span className={`text-[10px] px-2 py-0.5 rounded-full ${levelColors[level] || ""}`}>{level}</span>
          <span className="text-[10px] px-2 py-0.5 rounded-full bg-secondary text-muted-foreground">{duration}</span>
        </div>
      </div>
      <div className="aspect-video bg-background rounded-xl overflow-hidden mb-3">
        <iframe
          width="100%"
          height="100%"
          src={`https://www.youtube.com/embed/${videoId}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          loading="lazy"
          className="w-full h-full"
        />
      </div>
      <p className="text-xs text-muted-foreground leading-relaxed">{desc}</p>
    </div>
  );
}
