import en from '../../messages/en.json';
import ko from '../../messages/ko.json';

export type AppMessages = typeof ko;

// Keep both locale schemas in sync at compile time.
const _enShapeCheck: AppMessages = en;
void _enShapeCheck;
