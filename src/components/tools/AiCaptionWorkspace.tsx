import React, { useState } from 'react';
import { Sparkles, Copy, Check, RefreshCw, Send, Hash, Sliders } from 'lucide-react';

export const AiCaptionWorkspace: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [platform, setPlatform] = useState<'instagram' | 'linkedin' | 'twitter' | 'tiktok'>('instagram');
  const [tone, setTone] = useState<'engaging' | 'professional' | 'casual' | 'inspiring' | 'witty'>('engaging');
  const [includeHashtags, setIncludeHashtags] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const [captions, setCaptions] = useState<string[]>([
    "Great tools shouldn't come with friction. Simplify your everyday workflow and spend more time building what actually matters. 🚀 What is one daily task you automated recently?",
    "Simplicity is the ultimate sophistication. When you strip away the unnecessary noise, productivity takes care of itself. ✨ Check out the new workflow in our bio.",
  ]);

  const presetTopics = [
    'Launching a new digital product',
    'Behind the scenes of remote work',
    'Weekly productivity tips & mindset',
    'Coffee break & creative thoughts',
  ];

  const handleGenerate = () => {
    if (!topic.trim()) return;
    setIsGenerating(true);

    setTimeout(() => {
      const pName = platform.charAt(0).toUpperCase() + platform.slice(1);
      const sampleTags = includeHashtags
        ? '\n\n#Productivity #WorkSmart #DigitalTools #Creativity #ToolNova'
        : '';

      const generated: string[] = [];

      if (tone === 'professional') {
        generated.push(
          `Delighted to share our latest milestone regarding ${topic.trim()}. In fast-paced environments, precision and reliability remain our strongest differentiators. Looking forward to your insights in the comments below.${sampleTags}`
        );
        generated.push(
          `Efficiency is not about doing more; it is about eliminating friction. As we reflect on ${topic.trim()}, what strategies have yielded the highest leverage for your team this quarter?${sampleTags}`
        );
      } else if (tone === 'witty') {
        generated.push(
          `Nobody told me ${topic.trim()} would require this much coffee, but here we are and honestly? 10/10 would recommend doing it again tomorrow. ☕️😂${sampleTags}`
        );
        generated.push(
          `Current status: conquering ${topic.trim()} one keystroke at a time. Send snacks and good vibes. 🙌${sampleTags}`
        );
      } else if (tone === 'inspiring') {
        generated.push(
          `Every big achievement starts as a humble idea. Keep showing up, keep refining, and watch how ${topic.trim()} transforms your journey. You got this! 🌟${sampleTags}`
        );
        generated.push(
          `Growth doesn't happen in your comfort zone. Today was all about pushing forward with ${topic.trim()}. What bold move are you making today? ✨${sampleTags}`
        );
      } else {
        // Engaging / Casual
        generated.push(
          `Here is everything you need to know about ${topic.trim()} in one glance. 💡 Drop a 🔥 in the comments if this resonated with you today!${sampleTags}`
        );
        generated.push(
          `Quick question for the community: how do you approach ${topic.trim()} when you need fast, high-quality results? Let's talk in the replies! 👇${sampleTags}`
        );
      }

      setCaptions(generated);
      setIsGenerating(false);
    }, 700);
  };

  const handleCopy = (text: string, idx: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIdx(idx);
    setTimeout(() => setCopiedIdx(null), 2000);
  };

  return (
    <div className="w-full bg-white rounded-2xl border border-slate-200/90 shadow-sm p-5 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Input Configuration */}
        <div className="lg:col-span-6 space-y-5">
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              What is your post about?
            </label>
            <textarea
              rows={3}
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="e.g., Announcing a clean redesign for our app with faster load times..."
              className="w-full px-3.5 py-2.5 text-sm bg-slate-50 border border-slate-300 rounded-xl focus:bg-white focus:ring-2 focus:ring-indigo-600 focus:outline-none resize-none transition-colors"
            />

            {/* Quick Inspiration Pills */}
            <div className="flex flex-wrap gap-1.5 mt-2">
              {presetTopics.map((pill) => (
                <button
                  key={pill}
                  type="button"
                  onClick={() => setTopic(pill)}
                  className="text-[11px] font-medium text-slate-600 bg-slate-100 hover:bg-slate-200 px-2.5 py-1 rounded-md transition-colors"
                >
                  + {pill}
                </button>
              ))}
            </div>
          </div>

          {/* Platform selection */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Target Platform
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'instagram', label: 'Instagram' },
                { id: 'linkedin', label: 'LinkedIn' },
                { id: 'twitter', label: 'X (Twitter)' },
                { id: 'tiktok', label: 'TikTok' },
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPlatform(p.id as any)}
                  className={`py-2 px-3 rounded-lg text-xs font-semibold border transition-all ${
                    platform === p.id
                      ? 'bg-indigo-50 text-indigo-700 border-indigo-300 shadow-xs'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          {/* Tone of Voice */}
          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase mb-2">
              Tone of Voice
            </label>
            <div className="flex flex-wrap gap-1.5">
              {[
                { id: 'engaging', label: 'Engaging' },
                { id: 'professional', label: 'Professional' },
                { id: 'casual', label: 'Casual' },
                { id: 'inspiring', label: 'Inspiring' },
                { id: 'witty', label: 'Witty & Fun' },
              ].map((t) => (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => setTone(t.id as any)}
                  className={`py-1.5 px-3 rounded-md text-xs font-medium border transition-colors ${
                    tone === t.id
                      ? 'bg-indigo-600 text-white border-indigo-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-medium text-slate-700">
              <input
                type="checkbox"
                checked={includeHashtags}
                onChange={(e) => setIncludeHashtags(e.target.checked)}
                className="rounded text-indigo-600 accent-indigo-600 w-4 h-4"
              />
              <span>Include relevant hashtags</span>
            </label>

            <button
              type="button"
              id="generate-captions-btn"
              onClick={handleGenerate}
              disabled={isGenerating || !topic.trim()}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs md:text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 shadow-xs transition-all"
            >
              <Sparkles className="w-4 h-4" />
              <span>{isGenerating ? 'Drafting...' : 'Generate Captions'}</span>
            </button>
          </div>
        </div>

        {/* Right Output Variations */}
        <div className="lg:col-span-6 flex flex-col space-y-4 p-5 bg-indigo-50/40 border border-indigo-100 rounded-2xl">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-indigo-900 uppercase tracking-wider">
              Generated Variations ({captions.length})
            </span>
            <span className="text-[11px] font-medium text-indigo-700 bg-white px-2 py-0.5 rounded border border-indigo-200">
              {platform.toUpperCase()} Ready
            </span>
          </div>

          <div className="space-y-3 flex-1">
            {captions.map((caption, idx) => (
              <div
                key={idx}
                className="p-4 bg-white rounded-xl border border-indigo-100/90 shadow-xs flex flex-col justify-between space-y-3"
              >
                <p className="text-xs md:text-sm text-slate-800 leading-relaxed whitespace-pre-line">
                  {caption}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-400">
                  <span>{caption.length} characters</span>
                  <button
                    type="button"
                    onClick={() => handleCopy(caption, idx)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-indigo-700 hover:text-indigo-900 bg-indigo-50 hover:bg-indigo-100 px-3 py-1 rounded-md transition-colors"
                  >
                    {copiedIdx === idx ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
