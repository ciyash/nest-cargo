import { Component, Input } from '@angular/core';
@Component({
  standalone: true, selector: 'app-company-logo',
  template: `<div class="wordmark" [class.compact]="compact" role="img" [attr.aria-label]="label + ' logo'" [style.--brand]="palette[0]" [style.--accent]="palette[1]">
    <span class="monogram" aria-hidden="true"><span class="letters">{{initials}}</span><svg class="arrow" viewBox="0 0 24 24" fill="none"><path d="M4 12h15m-6-6 6 6-6 6" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/></svg></span>
    <span class="type"><strong>{{label}}</strong><span class="rule"></span><small>MOVE FORWARD. TOGETHER.</small></span>
  </div>`,
  styles: [`.wordmark.compact{padding:0;gap:10px;max-width:230px}.compact .monogram{width:38px;height:38px;border-radius:11px 11px 11px 3px;box-shadow:none}.compact .letters{font-size:16px}.compact .arrow{width:14px;height:14px;top:1px;right:3px}.compact .type strong{font-size:15px;letter-spacing:0;color:inherit}.compact .type{color:inherit}.compact .rule,.compact .type small{display:none}:host{display:block;max-width:100%}.wordmark{display:flex;align-items:center;gap:16px;max-width:390px;margin:0 auto;text-align:left;padding:14px 0}.monogram{position:relative;display:flex;align-items:center;justify-content:center;flex-shrink:0;width:70px;height:70px;border-radius:20px 20px 20px 5px;background:var(--brand);color:white;box-shadow:5px 5px 0 color-mix(in srgb,var(--accent) 25%,transparent)}.letters{font-family:Arial,sans-serif;font-size:27px;font-weight:800;letter-spacing:-1px;transform:translateY(3px)}.arrow{position:absolute;right:8px;top:4px;width:23px;height:23px;color:var(--accent)}.type{min-width:0;display:flex;flex-direction:column;gap:8px}.type strong{font-family:Arial,sans-serif;font-size:clamp(22px,3vw,31px);font-weight:800;letter-spacing:-1px;line-height:1.12;color:var(--brand);overflow-wrap:anywhere}.rule{height:3px;width:38px;background:var(--accent);border-radius:3px}.type small{font-family:Arial,sans-serif;font-size:8px;letter-spacing:1.5px;line-height:1.5;font-weight:700;color:#64748b}@media(max-width:420px){.wordmark{gap:12px}.monogram{width:58px;height:58px;border-radius:16px 16px 16px 4px}.letters{font-size:23px}.type small{font-size:7px;letter-spacing:1px}}`]
})
export class CompanyLogoComponent {
  @Input() text: string | null = '';
  @Input() letters: string | null = '';
  @Input() compact = false;
  get label() { return this.text?.trim() || 'Your Company'; }
  get initials() {
    if (/^[a-z]{2}$/i.test(this.letters?.trim() || '')) return this.letters!.trim().toUpperCase();
    const words = this.label.match(/\p{L}+/gu) || ['CN'];
    const initials = words.length > 1 ? Array.from(words[0])[0] + Array.from(words[1])[0] : Array.from(words[0]).slice(0,2).join('');
    return (initials.length === 1 ? initials + initials : initials).toUpperCase();
  }
  get palette() { return ['#153b70','#35ccb1']; }
}
