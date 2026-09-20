import React, { useState } from 'react';
import { useAgriData } from '../context/AgriDataContext';
import { BookOpen, Clock, User, ArrowRight, Sparkles, ChevronRight, X } from 'lucide-react';
import { AgriArticle } from '../types';

interface AgriKnowledgeProps {
  navigate: (path: string) => void;
}

export const AgriKnowledge: React.FC<AgriKnowledgeProps> = ({ navigate }) => {
  const { articles } = useAgriData();
  const [selectedArticle, setSelectedArticle] = useState<AgriArticle | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const filteredArticles = articles.filter((a) => {
    if (selectedCategory === 'ALL') return true;
    return a.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-forest-950 via-forest-900 to-emerald-950 text-white rounded-3xl p-8 sm:p-12 shadow-xl border border-forest-800 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <span className="text-xs font-bold text-emerald-300 uppercase tracking-wider bg-forest-950/80 px-3 py-1 rounded-full border border-forest-700 inline-flex items-center gap-1.5">
            <BookOpen className="w-3.5 h-3.5" /> AgroConnect Knowledge Hub
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white">
            Farming Techniques & Government Schemes
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Expert agricultural research, organic ZBNF practices, PM-KISAN eligibility guides, and crop protection science compiled by leading agronomists.
          </p>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs font-semibold">
        {['ALL', 'Organic Farming', 'Government Schemes', 'Farming Techniques'].map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl transition-colors whitespace-nowrap ${
              selectedCategory === cat
                ? 'bg-forest-700 text-white shadow-xs'
                : 'bg-white border border-earth-200 text-slate-600 hover:bg-earth-100'
            }`}
          >
            {cat === 'ALL' ? 'All Articles' : cat}
          </button>
        ))}
      </div>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredArticles.map((art) => (
          <div
            key={art.id}
            onClick={() => setSelectedArticle(art)}
            className="group bg-white rounded-3xl border border-earth-200 overflow-hidden shadow-soft hover:shadow-soft-lg hover:border-forest-500 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="relative aspect-16/9 w-full overflow-hidden bg-earth-50">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 text-[10px] font-bold text-forest-900 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full">
                  {art.category}
                </span>
              </div>

              <div className="p-6 pt-0 space-y-3">
                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{art.readTime}</span>
                  </span>
                  <span>•</span>
                  <span>{art.publishedDate}</span>
                </div>

                <h3 className="font-bold text-slate-900 group-hover:text-forest-700 transition-colors line-clamp-2 text-base">
                  {art.title}
                </h3>

                <p className="text-xs text-slate-500 line-clamp-3 leading-relaxed">{art.summary}</p>
              </div>
            </div>

            <div className="p-6 pt-0 border-t border-earth-100 mt-4 flex items-center justify-between text-xs pt-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-full bg-forest-100 text-forest-700 font-bold flex items-center justify-center text-[10px]">
                  {art.author.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-slate-800 text-[11px]">{art.author}</div>
                  <span className="text-[10px] text-slate-400 block">{art.authorRole}</span>
                </div>
              </div>

              <div className="text-forest-700 font-bold group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Read Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Article Detail Modal */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl p-6 sm:p-10 max-w-2xl w-full max-h-[85vh] overflow-y-auto space-y-6 shadow-2xl animate-fade-in">
            <div className="flex items-center justify-between border-b border-earth-100 pb-3">
              <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                {selectedArticle.category}
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="p-2 rounded-lg text-slate-400 hover:bg-earth-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 leading-tight">
                {selectedArticle.title}
              </h2>
              <div className="flex items-center gap-3 text-xs text-slate-400">
                <span>By {selectedArticle.author} ({selectedArticle.authorRole})</span>
                <span>•</span>
                <span>{selectedArticle.publishedDate}</span>
              </div>
            </div>

            <img
              src={selectedArticle.imageUrl}
              alt={selectedArticle.title}
              className="w-full h-56 object-cover rounded-2xl"
            />

            <div className="space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {selectedArticle.content.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="pt-4 border-t border-earth-100 flex justify-end">
              <button
                onClick={() => setSelectedArticle(null)}
                className="bg-forest-700 hover:bg-forest-800 text-white font-bold text-xs px-6 py-2.5 rounded-xl"
              >
                Close Guide
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
