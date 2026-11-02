import React from 'react';

export function renderMarkdown(text: string): React.ReactNode {
  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];
  let currentList: string[] = [];

  const flushList = (keyPrefix: string) => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`${keyPrefix}-list`} className="space-y-1.5 my-2.5 pl-4 list-disc text-slate-700 text-sm leading-relaxed">
          {currentList.map((item, i) => (
            <li key={i}>{formatInline(item)}</li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  lines.forEach((line, index) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList(`line-${index}`);
      return;
    }

    // Check for unordered bullet list
    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      currentList.push(trimmed.slice(2));
      return;
    }

    // Check for ordered list like 1. 2.
    const orderedMatch = trimmed.match(/^(\d+)\.\s+(.*)$/);
    if (orderedMatch) {
      flushList(`ordered-${index}`);
      elements.push(
        <div key={`ord-${index}`} className="flex items-start gap-2 text-sm text-slate-700 my-1.5">
          <span className="font-semibold text-teal-700 min-w-[20px] tabular-nums">
            {orderedMatch[1]}.
          </span>
          <div className="flex-1 leading-relaxed">{formatInline(orderedMatch[2])}</div>
        </div>
      );
      return;
    }

    // If we have accumulated bullet points, flush them before headers or paragraphs
    flushList(`flush-${index}`);

    // H3 Heading (### Title)
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h3 key={`h3-${index}`} className="text-sm md:text-base font-bold text-slate-900 mt-4 mb-2 first:mt-0 tracking-tight">
          {formatInline(trimmed.slice(4))}
        </h3>
      );
      return;
    }

    // H2 Heading (## Title)
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h2 key={`h2-${index}`} className="text-base md:text-lg font-bold text-slate-900 mt-5 mb-2 first:mt-0 tracking-tight">
          {formatInline(trimmed.slice(3))}
        </h2>
      );
      return;
    }

    // Ordinary paragraph
    elements.push(
      <p key={`p-${index}`} className="text-sm text-slate-700 leading-relaxed my-2">
        {formatInline(trimmed)}
      </p>
    );
  });

  flushList('final');
  return <div className="space-y-1">{elements}</div>;
}

function formatInline(text: string): React.ReactNode {
  // Replace **bold** with <strong> and *italic* with <em>
  const parts: React.ReactNode[] = [];
  let remaining = text;
  let keyIndex = 0;

  while (remaining.length > 0) {
    // Check for bold **text**
    const boldMatch = remaining.match(/\*\*(.*?)\*\*/);
    if (boldMatch && boldMatch.index !== undefined) {
      if (boldMatch.index > 0) {
        parts.push(remaining.substring(0, boldMatch.index));
      }
      parts.push(
        <strong key={`b-${keyIndex++}`} className="font-semibold text-slate-900">
          {boldMatch[1]}
        </strong>
      );
      remaining = remaining.substring(boldMatch.index + boldMatch[0].length);
      continue;
    }

    // Check for italic *text*
    const italicMatch = remaining.match(/\*(.*?)\*/);
    if (italicMatch && italicMatch.index !== undefined) {
      if (italicMatch.index > 0) {
        parts.push(remaining.substring(0, italicMatch.index));
      }
      parts.push(
        <em key={`i-${keyIndex++}`} className="italic text-slate-800">
          {italicMatch[1]}
        </em>
      );
      remaining = remaining.substring(italicMatch.index + italicMatch[0].length);
      continue;
    }

    // If no markdown tokens left
    parts.push(remaining);
    break;
  }

  return <>{parts}</>;
}
