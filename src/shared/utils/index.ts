/**
 * Shared utilities — barrel export
 */
export { cn } from "./cn";
export { fmtNumber, fmtPercent, fmtCompact } from "./format";
export {
  validateFile,
  formatFileSize,
  getFileExtension,
  AVATAR_RULES,
  CV_RULES,
  type FileValidationRule,
  type FileValidationResult,
} from "./file-validation";
