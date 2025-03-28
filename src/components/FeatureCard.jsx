function FeatureCard({ icon, title, description }) {
    return (
      <div className="backdrop-blur-lg bg-black/40 p-6 rounded-xl border border-purple-500/20 shadow-[0_0_15px_rgba(168,85,247,0.15)] hover:border-purple-500/40 transition-all hover:shadow-[0_0_20px_rgba(168,85,247,0.25)] group">
        <div className="p-3 bg-purple-900/30 rounded-lg inline-block mb-4 group-hover:bg-purple-900/50 transition-colors">
          {icon}
        </div>
  
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400">{description}</p>
      </div>
    )
  }
  
  export default FeatureCard
  
  