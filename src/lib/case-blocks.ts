import type { Work } from './works';
import type { CaseBlock, CaseImage, CaseText } from '../data/case-blocks';

export function caseText(value: CaseText, work: Work): string {
  return (typeof value === 'string' ? value : work.data[value.source]).trim();
}
export function imageIsReady(image?: CaseImage): boolean {
  return !!image && (image.approved || (image.preview && import.meta.env.PORTFOLIO_PUBLIC_ONLY !== '1')) && !!image.src && !!image.alt.trim();
}
export function hasImageContent(image?: CaseImage): boolean {
  return !!image && (imageIsReady(image) || !!image.placeholder.trim());
}
export function visibleBlocks(work: Work): CaseBlock[] {
  return work.data.blocks.filter(block => {
    switch (block.type) {
      case 'summary': return block.items.some(item => item.label.trim() && caseText(item.value, work));
      case 'narrative': return !!block.markdown.trim() || (block.useBody && !!work.body?.trim()) || block.paragraphs.some(p => caseText(p, work));
      case 'gallery': return block.images.some(hasImageContent);
      case 'timeline': return block.steps.some(step => step.title.trim() && caseText(step.text, work));
      case 'comparison': return !!caseText(block.before.text, work) && !!caseText(block.after.text, work);
      case 'results': return block.groups.some(group => group.label.trim() && group.items.some(item => caseText(item, work)));
    }
  });
}
