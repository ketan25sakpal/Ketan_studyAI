'use client';

import React from 'react';
import { voiceOptions, voiceCategories } from '@/lib/constants';
import { cn } from '@/lib/utils';

interface VoiceSelectorProps {
  disabled?: boolean;
  className?: string;
  value?: string;
  onChange: (voiceId: string) => void;
}

const VoiceSelector = ({
  disabled,
  className,
  value,
  onChange,
}: VoiceSelectorProps) => {
  return (
    <div className={cn('flex flex-col gap-6', className)}>
      {Object.entries(voiceCategories).map(([category, voices]) => (
        <div key={category} className="space-y-3">
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
            {category} Voices
          </h4>
          <div className="voice-selector-options flex flex-wrap gap-3">
            {voices.map((voiceKey) => {
              const voice = voiceOptions[voiceKey as keyof typeof voiceOptions];
              const isSelected = value === voiceKey;

              return (
                <button
                  key={voiceKey}
                  type="button"
                  disabled={disabled}
                  onClick={() => onChange(voiceKey)}
                  className={cn(
                    'voice-selector-option flex flex-col p-4 border rounded-xl transition-all text-left min-w-[200px] flex-1',
                    isSelected
                      ? 'voice-selector-option-selected border-[#212a3b] bg-[#212a3b]/5 shadow-sm'
                      : 'voice-selector-option-default border-slate-200 hover:border-slate-300 bg-white',
                    disabled && 'voice-selector-option-disabled opacity-50 cursor-not-allowed'
                  )}
                >
                  <span className="font-bold text-[#212a3b]">{voice.name}</span>
                  <span className="text-xs text-slate-500 mt-1 line-clamp-2">
                    {voice.description}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default VoiceSelector;
