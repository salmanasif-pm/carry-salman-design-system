export { CarryComposition, type ThresholdChangeDetail, type Register } from './carry-composition.js';
import { CarryComposition } from './carry-composition.js';
if (typeof customElements !== 'undefined' && !customElements.get('carry-composition')) customElements.define('carry-composition', CarryComposition);
